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

import Graphic from "@arcgis/core/Graphic";
import Map from "@arcgis/core/Map";
import { watch, when, whenOnce } from "@arcgis/core/core/reactiveUtils";
import { Extent, Point, SpatialReference } from "@arcgis/core/geometry";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import Query from "@arcgis/core/rest/support/Query";
import SceneView from "@arcgis/core/views/SceneView";
import SceneLayerView from "@arcgis/core/views/layers/SceneLayerView";

import HeightGraph from "./HeightGraph";
import RendererGenerator from "./RendererGenerator";
import { State } from "./State";
import Timeline from "./Timeline";
import * as categorySelection from "./categorySelection";
import * as infoWidget from "./infoWidget";
import * as labels from "./labels";
import * as searchWidget from "./searchWidget";
import settings from "./settings";
import { attributesToLowerCase, ignoreAbortErrors } from "./utils";

const containers = { view: "viewDiv", timeline: "timeDiv", heightGraph: "heightDiv", categories: "categoryDiv" };

const state = new State();

let buildings: Graphic[];
let heightGraph: HeightGraph;
let timeline: Timeline;
let selectHighlight: IHandle | null = null;

// create map
const map = new Map({
  basemap: "gray",
  ground: "world-elevation"
});

// create view
const view = new SceneView({
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
      spatialReference: new SpatialReference({ wkid: 3857 })
    },
    heading: 59,
    tilt: 49
  },
  constraints: {
    tilt: {
      max: 90,
      mode: "manual"
    }
  },
  highlightOptions: settings.highlightOptions,
  popup: {
    dockEnabled: true,
    dockOptions: {
      buttonEnabled: false,
      breakpoint: false
    },
    actions: [],
    autoOpenEnabled: false
  },
  environment: {
    lighting: {
      ambientOcclusionEnabled: true,
      directShadowsEnabled: false
    }
  }
});

// remove navigation widgets from upper left corner
view.ui.empty("top-left");

// we set an initial filter to display only buildings whose height is between minHeight and maxHeight
const filter = [settings.buildingOptions.minHeight, settings.buildingOptions.maxHeight];
const definitionExpression = generateDefinitionExpression(filter);

// scene layer with the buildings
const sceneLayer = new SceneLayer({
  url: settings.buildingsUrl,
  popupEnabled: false,
  outFields: ["*"],
  definitionExpression: definitionExpression
});

const rendererGen = new RendererGenerator(sceneLayer, "CNSTRCT_YR");

// feature layer with centroids of buildings - displayed on top of buildings to show which buildings contain information from wikipedia
const infoPoints = new FeatureLayer({
  url: settings.infoPointsUrl,
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
  renderer: rendererGen.createUniqueValueRenderer("WIKI", { value: 1, image: "./wiki.png" }),
  visible: false
});

map.addMany([sceneLayer, infoPoints]);

// add labels to display Manhattan boroughs
labels.initialize("./data/manhattan-boroughs.json", map);

// initialize search widget
searchWidget.initialize(view, infoPoints, "NAME", state);

// create a query on the infoPoints layer to get all the buildings that will be displayed in the height graph
const query = infoPoints.createQuery();
query.outFields = ["OBJECTID", "NAME", "HEIGHTROOF", "CNSTRCT_YR", "WIKI", "TOP20"];
query.returnGeometry = true;
infoPoints.queryFeatures(query).then(initGraphics).catch(console.error);

// initGraphics method takes the results of the query and stores them in the buildings array
function initGraphics(results: FeatureSet) {
  // turning all upper case fields to lower case to be able to use properties in lower case
  for (let i = 0; i < results.features.length; i++) {
    attributesToLowerCase(results.features[i]);
  }
  buildings = results.features;
  categorySelection.initialize(containers.categories, state);
  heightGraph = new HeightGraph(containers.heightGraph, buildings, state);
  timeline = new Timeline(containers.timeline, state);
  watch(
    () => state.selectedPeriod,
    (newPeriod) => {
      // update building symbology
      rendererGen.applyClassBreaksRenderer(newPeriod, state);
      // update height graph
      heightGraph.updatePeriod(newPeriod);
      // update timeline
      timeline.update(newPeriod);
    },
    { initial: true }
  );
}

view
  .whenLayerView(sceneLayer)
  .then((layerView) => {
    let selectAbortController: AbortController;
    watch(
      () => state.selectedBuilding,
      (feature) => {
        selectAbortController?.abort();
        selectAbortController = new AbortController();
        const { signal } = selectAbortController;
        ignoreAbortErrors(selectFeature(feature, layerView, signal));
      }
    );
  })
  .catch(console.error);

async function selectFeature(feature: Graphic | null, layerView: SceneLayerView, signal: AbortSignal): Promise<void> {
  // remove highlight for selection in height graph and on the map
  if (selectHighlight) {
    heightGraph.deselect();
    selectHighlight.remove();
    selectHighlight = null;
    searchWidget.show();
  }
  if (feature) {
    // hide the search widget to show the popup
    searchWidget.hide();
    // display information about the building in the popup
    infoWidget.setContent(feature.geometry as Point, feature.attributes, view);

    // highlight in the height graph
    heightGraph.select(feature);
    // highlight feature on the map
    selectHighlight = layerView.highlight([feature.attributes.objectid]);
    // zoom to the building in the map
    await view.goTo(feature.geometry, { duration: 1000, easing: "out-expo", signal });

    // wait for layer data to load
    await whenOnce(() => !layerView.updating, signal);
    // frame the 3D building
    const query = new Query();
    query.outFields = ["*"];
    query.objectIds = [feature.attributes.objectid];
    const result = await layerView.queryExtent(query, { signal });
    // the queryChain function will be run until the queryExtent function returns the 3D extent of the building
    const queryChain = (result: { extent: Extent }) => {
      if (signal.aborted) {
        return;
      }
      const loadingEl = document.getElementById("loading")!;
      if (result.extent !== null) {
        loadingEl.style.display = "none";
        view.goTo({ target: result.extent.expand(3), tilt: 60 }, { duration: 1000, easing: "out-expo", signal });
      } else {
        loadingEl.style.display = "inline";
        layerView.queryExtent(query, { signal }).then((result) => {
          window.setTimeout(() => queryChain(result), 1000);
        });
      }
    };
    queryChain(result);
  }
}

when(
  () => state.filteredBuildings,
  function (newFilter) {
    // generate a new definition expression based an the new filter
    const defExp = generateDefinitionExpression(newFilter);
    // set the definitionExpression on the buildings and points layers
    sceneLayer.definitionExpression = defExp;
    infoPoints.definitionExpression = defExp;
    // update the height graph based on the new min and max building heights
    heightGraph.updateFilter(newFilter);
  }
);

// categories help users visualize the most important buildings
watch(
  () => state.selectedCategory,
  (newCategory) => {
    rendererGen.applyCategory(newCategory);
    heightGraph.applyCategory(newCategory);
    // make info points visible when category "Only annotated buildings" is selected
    if (newCategory === "info") {
      infoPoints.visible = true;
    } else {
      infoPoints.visible = false;
    }
  }
);

// when user clicks on a building, set it as the selected building in the state
view.on("click", function (event) {
  view.hitTest(event).then(function (response) {
    if (response.results.length === 0) {
      return;
    }
    const result = response.results[0];
    const graphic = result.type === "graphic" ? result.graphic : null;
    if (graphic && graphic.layer.title === "Buildings Manhattan wiki") {
      const feature = findFeature(graphic);
      if (feature) {
        state.selectedBuilding = feature;
      }
    }
  });
});

// clear the selected building when the popup is closed
watch(
  () => view.popup?.visible,
  (newValue) => {
    // if content is defined, then the popup was closed by the user rather than hidden by the app
    const wasPopupClosedByUser = !!view.popup.content;
    if (!newValue && wasPopupClosedByUser) {
      state.selectedBuilding = null;
    }
  }
);

function findFeature(graphic: Graphic): Graphic {
  const feature = buildings.filter(function (b) {
    return b.attributes.objectid === graphic.attributes.OBJECTID;
  })[0];
  return feature;
}

// add events for disclaimer window
document.getElementById("impressumLink")!.addEventListener("click", function () {
  document.getElementById("impressumContainer")!.style.display = "inline";
});
document.getElementById("close")!.addEventListener("click", function () {
  document.getElementById("impressumContainer")!.style.display = "none";
});

function generateDefinitionExpression(filter: number[]) {
  return (
    "HEIGHTROOF > " +
    filter[0] +
    " AND " +
    "HEIGHTROOF < " +
    filter[1] +
    " AND " +
    "CNSTRCT_YR >= 1900 AND CNSTRCT_YR <= 2024"
  );
}
