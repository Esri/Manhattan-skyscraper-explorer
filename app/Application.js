/* Copyright 2017 Esri

   Licensed under the Apache License, Version 2.0 (the "License");

   you may not use this file except in compliance with the License.

   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software

   distributed under the License is distributed on an "AS IS" BASIS,

   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

   See the License for the specific language governing permissions and

   limitations under the License.*/

/*
 * Title: Manhattan Skyscraper Explorer Main Application
 * Author: Raluca Nicola
 * Date: 07/06/17
 * Description: Main application file where the UI and scene view are loaded
 */

define([
  "dojo/_base/declare",

  "esri/core/Accessor",

  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/SceneLayer",
  "esri/layers/FeatureLayer",
  "esri/tasks/support/Query",

  "app/RendererGenerator",
  "app/HeightGraph",
  "app/Timeline",
  "app/InfoWidget",
  "app/labels",
  "app/searchWidget",
  "app/categorySelection",

  "dojo/dom",
  "dojo/on",
  "dojo/query"
], function(declare, Accessor,
  Map, SceneView, SceneLayer, FeatureLayer, Query,
  RendererGenerator, HeightGraph, Timeline, InfoWidget, labels, searchWidget, categorySelection,
  dom, on, domQuery
) {
  return declare(null, {

    constructor: function(settings) {

      this.settings = settings;

      var State = Accessor.createSubclass({
        properties: {
          selectedPeriod: null,
          selectedBuilding: null,
          hoveredBuilding: null,
          filteredBuildings: null,
          selectedCategory: settings.initCategory
        }
      });

      // application state object - alerts on select, hover or period change
      this.state = new State();
    },

    /**
     * Initialize view, information widget, height graph and timeline.
     */

    init: function(containers) {

      var settings = this.settings;
      var state = this.state;

      var buildings,
        heightGraph, timeline,
        selectHighlight, hoverHighlight;

      // create map
      var map = new Map({
        basemap: "gray",
        ground: "world-elevation"
      });

      // create view
      var view = new SceneView({
        container: containers.view,
        map: map,
        padding: {
          top: 50
        },
        camera: {
          position: {
            x: -8240826.9778516665,
            y: 4967756.95441402,
            z: 1472.4,
            spatialReference: 3857
          },
          heading: 59,
          tilt: 49
        },
        constraints: {
          tilt: {
            max: 70,
            mode: "manual"
          }
        },
        highlightOptions: this.settings.highlightOptions,
        popup: {
          dockEnabled: true,
          dockOptions: {
            buttonEnabled: false,
            breakpoint: false
          },
          actions: []
        },
        environment: {
          lighting: {
            ambientOcclusionEnabled: false,
            directShadowsEnabled: false
          }
        }
      });

      // remove navigation widgets from upper left corner
      view.ui.empty("top-left");

      // set view on the window for debugging
      window.view = view;

      // we set an initial filter to display only buildings whose height is between minHeight and maxHeight
      var filter = [settings.buildingOptions.minHeight, settings.buildingOptions.maxHeight];
      var definitionExpression = generateDefinitionExpression(filter);

      // scene layer with the buildings
      var sceneLayer = new SceneLayer({
        url: settings.buildingsUrl,
        popupEnabled: false,
        outFields: ["*"],
        definitionExpression: definitionExpression
      });

      var rendererGen = new RendererGenerator(this.settings, sceneLayer, "CNSTRCT_YR", state);

      // feature layer with centroids of buildings - displayed on top of buildings to show which buildings contain information from wikipedia
      var infoPoints = new FeatureLayer({
        url: "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/ArcGIS/rest/services/Centroids_Manhattan_Information/FeatureServer/0",
        popupEnabled: false,
        // relative to scene displays icons on top of buildings
        elevationInfo: {
          mode: "relative-to-scene"
        },
        outFields: ["*"],
        returnZ: false,
        // avoid decluttering by using featureReduction
        featureReduction: {
          type: "selection"
        },
        renderer: rendererGen.createUniqueValueRenderer("WIKI", {value: 1, image: "./img/wiki.png"}),
        visible: false
      });

      map.addMany([sceneLayer, infoPoints]);

      // add labels to display Manhattan boroughs
      labels.initialize("./data/manhattan-boroughs.json", "name", { color: "#000" }, map);

      // initialize info widget
      var infoWidget = new InfoWidget(view, state);

      // initialize search widget
      searchWidget.initialize(view, infoPoints, "NAME", state);

      // create a query on the infoPoints layer to get all the buildings that will be displayed in the height graph
      var query = infoPoints.createQuery();
      query.outFields = ["OBJECTID", "NAME", "HEIGHTROOF", "CNSTRCT_YR", "WIKI", "TOP20"];
      query.returnGeometry = true;
      infoPoints.queryFeatures(query)
        .then(initGraphics)
        .otherwise(error);

      // initGraphics method takes the results of the query and stores them in the buildings array
      function initGraphics(results) {
        // turning all upper case fields to lower case to be able to use properties in lower case
        for (var i = 0; i < results.features.length; i++) {
          toLowerCase(results.features[i]);
        }
        buildings = results.features;
        categorySelection.initialize(containers.categories, settings, state);
        heightGraph = new HeightGraph(containers.heightGraph, settings, buildings, state);
        timeline = new Timeline(containers.timeline, settings, state);
        state.selectedPeriod = settings.initPeriod;
      }

      state.watch("selectedPeriod", function(newPeriod) {
        // update building symbology
        rendererGen.applyClassBreaksRenderer(newPeriod);
        // update height graph
        heightGraph.updatePeriod(newPeriod);
        // update timeline
        timeline.update(newPeriod);
      });

      view.whenLayerView(sceneLayer)
        .then(function(lv) {
          state.watch("hoveredBuilding", function(newFeature) {
            if (newFeature !== null) {
              // highlight on hover in the height graph
              heightGraph.hover(newFeature);
              // highlight newFeature on the map
              hoverHighlight = lv.highlight([newFeature.attributes.objectid]);
            }
            else {
              // remove highlight in height graph and on the map
              heightGraph.removeHover();
              if (hoverHighlight) {
                hoverHighlight.remove();
              }
            }
          });

          state.watch("selectedBuilding", function(feature) {

            if (feature !== null) {
              // remove highlight for selection in height graph and on the map
              heightGraph.deselect();
              if (selectHighlight) {
                selectHighlight.remove();
              }

              // highlight on hover in the height graph
              heightGraph.select(feature);

              // highlight feature on the map
              selectHighlight = lv.highlight([feature.attributes.objectid]);

              // zoom to the building in the map
              view.goTo({ target: feature.geometry }, { duration: 1000, easing: "out-expo" });

              // hide the search widget to show the popup
              domQuery(".esri-component.esri-search.esri-widget")[0].style.display = "none";
              // display information about the building in the popup
              infoWidget.setContent(feature.geometry, feature.attributes);

              // frame the 3D building
              var query = new Query();
              query.outFields = ["*"];
              query.objectIds = [feature.attributes.objectid];
              var result = {
                extent: null,
                firstTry: true
              };
              // the queryChain function will be run until the queryExtent function returns the 3D extent of the building
              function queryChain(result) {
                if (result.extent !== null) {
                  dom.byId("loading").style.display = "none";
                  view.goTo({ target: result.extent.expand(3), tilt: 60 }, { duration: 1000, easing: "out-expo" });
                }
                else {
                  if (!result.firstTry) {
                    dom.byId("loading").style.display = "inline";
                  }
                  lv.queryExtent(query).then(function(result) {
                    window.setTimeout(function() {
                      queryChain(result);
                    }, 1000);
                  });
                }
              }
              queryChain(result);
            }
            else {
              // remove highlights and display the search widget
              heightGraph.deselect();
              if (selectHighlight) {
                selectHighlight.remove();
              }
              domQuery(".esri-component.esri-search.esri-widget")[0].style.display = "inline";
            }
          });
        })
        .otherwise(error);

      state.watch("filteredBuildings", function(newFilter) {
        // generate a new definition expression based an the new filter
        var defExp = generateDefinitionExpression(newFilter);
        // set the definitionExpression on the buildings and points layers
        sceneLayer.definitionExpression = defExp;
        infoPoints.definitionExpression = defExp;
        // update the height graph based on the new min and max building heights
        heightGraph.updateFilter(newFilter);
      });

      // categories help users visualize the most important buildings
      state.watch("selectedCategory", function(newCategory) {
        rendererGen.applyCategory(newCategory);
        heightGraph.applyCategory(newCategory);
        // make info points visible when category "Only annotated buildings" is selected
        if (newCategory === "info") {
          infoPoints.visible = true;
        }
        else {
          infoPoints.visible = false;
        }
      });

      // when user clicks on a building, set it as the selected building in the state
      view.on("click", function(event) {
        view.hitTest(event.screenPoint).then(function(response) {
          var graphic = response.results[0].graphic;
          if (graphic && (graphic.layer.title === "Buildings Manhattan wiki")) {
            var feature = findFeature(graphic);
            if (feature) {
              if (state.selectedBuilding == null) {
                state.selectedBuilding = feature;
              }
              else {
                if (state.selectedBuilding.attributes.objectid !== feature.attributes.objectid) {
                  state.selectedBuilding = feature;
                }
              }
            }
          }
        });
      });

      // when user hovers on a building set it in the state in the hovered
      var lastHover = Date.now();
      view.on("pointer-move", function(evt) {
        var newHover = Date.now();
        if ((newHover - lastHover) > 20 && !view.interacting) {
          lastHover = newHover;
          view.hitTest({ x: evt.x, y: evt.y }).then(function(response) {
            var graphic = response.results[0] ? response.results[0].graphic : null;
            if (graphic && (graphic.layer.title === "Buildings Manhattan wiki")) {
              var feature = findFeature(graphic);
              var building = state.hoveredBuilding;
              if (feature) {
                if ((!building) || (feature.attributes.objectid !== building.attributes.objectid)) {
                  heightGraph.removeHover();
                  if (hoverHighlight) {
                    hoverHighlight.remove();
                  }
                  state.hoveredBuilding = feature;
                }
              }
              else {
                state.hoveredBuilding = null;
              }
            }
            else {
              state.hoveredBuilding = null;
            }
          });
        }
      });

      function findFeature(graphic) {
        var feature = buildings.filter(function(b) {
          return (b.attributes.objectid === graphic.attributes.OBJECTID);
        })[0];
        return feature;
      }

      // remove hovered building when mouse is outside of map
      on(dom.byId("menuDiv"), "mouseenter", function() {
        state.hoveredBuilding = null;
      });
      on(domQuery(".esri-popup__main-container"), "mouseenter", function() {
        state.hoveredBuilding = null;
      });

      // add events for disclaimer window
      on(dom.byId("impressumLink"), "click", function() {
        dom.byId("impressumContainer").style.display = "inline";
      });
      on(dom.byId("close"), "click", function() {
        dom.byId("impressumContainer").style.display = "none";
      });

    }
  });

  function generateDefinitionExpression(filter) {
    return "HEIGHTROOF > " + filter[0] + " AND " +
      "HEIGHTROOF < " + filter[1] + " AND " +
      "CNSTRCT_YR >= 1900 AND CNSTRCT_YR <= 2024";
  }

  function error(err) {
    console.log(err);
  }

  // convert all property names of an object to lower case
  function toLowerCase(feature) {
    var key, keys = Object.keys(feature.attributes);
    var n = keys.length;
    var newobj = {};
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = feature.attributes[key];
    }
    feature.attributes = newobj;
  }

});
