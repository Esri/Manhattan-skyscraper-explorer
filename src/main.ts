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
import Collection from "@arcgis/core/core/Collection";
import type { ResourceHandle } from "@arcgis/core/core/Handles";
import { watch, when, whenOnce } from "@arcgis/core/core/reactiveUtils";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import Query from "@arcgis/core/rest/support/Query";
import SceneView from "@arcgis/core/views/SceneView";
import SceneLayerView from "@arcgis/core/views/layers/SceneLayerView";
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
import "@arcgis/map-components/components/arcgis-compass";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-navigation-toggle";
import "@arcgis/map-components/components/arcgis-popup";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-zoom";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-segmented-control";
import "@esri/calcite-components/components/calcite-segmented-control-item";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";

import HeightGraph from "./HeightGraph";
import RendererGenerator from "./RendererGenerator";
import { State } from "./State";
import Timeline from "./Timeline";
import * as infoWidget from "./infoWidget";
import * as labels from "./labels";
import settings from "./settings";
import { attributesToLowerCase } from "./utils";

const state = new State();
let buildings: Graphic[];
let heightGraph: HeightGraph;
let timeline: Timeline;
let selectHighlight: ResourceHandle | null = null;
let sceneLayerView: SceneLayerView | null = null;

const viewElement = document.querySelector<HTMLArcgisSceneElement>("arcgis-scene#viewElement")!;
await viewElement.viewOnReady();
viewElement.environment.lighting = {
   type: "sun",
   directShadowsEnabled: true,
};

const view = viewElement.view as SceneView;
view.highlights = [{ name: "default", color: [255, 255, 0], fillOpacity: 0.4 }];

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

view.map!.addMany([sceneLayer, infoPoints]);

// add labels to display Manhattan boroughs
labels.initialize("./data/manhattan-boroughs.json", view.map!);

// set up Search Component
const searchElement = document.querySelector<HTMLArcgisSearchElement>("arcgis-search")!;
searchElement.sources = new Collection([
  new LayerSearchSource({
    layer: infoPoints,
    outFields: ["*"],
    searchFields: ["NAME"],
    displayField: "NAME",
    exactMatch: false,
    placeholder: "Ex: Empire State Building"
  })
]);

searchElement.addEventListener("arcgisSelectResult", (event) => {
  const selectResultEvent = event as CustomEvent<{ result: { feature: Graphic } }>;
  const feature = selectResultEvent.detail.result.feature;
  attributesToLowerCase(feature);
  state.selectedBuilding = feature;
});

// set up category filter
const categoryControl = document.querySelector<HTMLCalciteSegmentedControlElement>("calcite-segmented-control")!;
categoryControl.addEventListener("calciteSegmentedControlChange", () => {
    state.selectedCategory = categoryControl.value;
});

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
  heightGraph = new HeightGraph("heightDiv", buildings, state);
  timeline = new Timeline("timeDiv", state);
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
    sceneLayerView = layerView;
    // let selectAbortController: AbortController;
    watch(
      () => state.selectedBuilding,
      (feature) => {
        // selectAbortController?.abort();
        // selectAbortController = new AbortController();
        // const { signal } = selectAbortController;
 console.log("updated state", feature)
 selectFeature(feature, layerView)

        // ignoreAbortErrors(selectFeature(feature, layerView, signal));
      }
    );
  })
  .catch(console.error);

async function selectFeature(feature: Graphic | null, layerView: SceneLayerView): Promise<void> {
  // remove highlight for selection in height graph and on the map
 
  if (selectHighlight) {
    heightGraph.deselect();
    selectHighlight.remove();
    selectHighlight = null;
  }
  if (feature) {
    // display information about the building in the popup
    infoWidget.setContent(feature.geometry as Point, feature.attributes, view);

    // highlight in the height graph
    heightGraph.select(feature);
    // highlight feature on the map
    selectHighlight = layerView.highlight([feature.attributes.objectid]);
    // zoom to the building in the map
    if (feature.geometry) {
      await view.goTo(feature.geometry, { duration: 1000 });
    }

    // wait for layer data to load
    await whenOnce(() => !layerView.updating);
    // frame the 3D building
    const query = new Query();
    query.outFields = ["*"];
    query.objectIds = [feature.attributes.objectid];
    const result = await layerView.queryExtent(query);
    // the queryChain function will be run until the queryExtent function returns the 3D extent of the building
    const queryChain = (result: { count: number; extent: Extent | null }) => {
      const loadingEl = document.getElementById("loading")!;
      if (result.extent !== null) {
        loadingEl.style.display = "none";
        view.goTo({ target: result.extent.expand(3), tilt: 60 }, { duration: 1000 });
      } else {
        loadingEl.style.display = "inline";
        layerView.queryExtent(query).then((result) => {
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
    if (graphic && graphic.layer && graphic.layer.title === "Buildings Manhattan wiki") {
      const feature = findFeature(graphic);
      if (feature) {
        state.selectedBuilding = feature;
        if (sceneLayerView) {
          void selectFeature(feature, sceneLayerView);
        }
      }
    }
  });
});

// clear the selected building when the popup is closed
watch(
  () => view.popup?.visible,
  (newValue) => {
    // if content is defined, then the popup was closed by the user rather than hidden by the app
    const wasPopupClosedByUser = !!view.popup?.content;
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
