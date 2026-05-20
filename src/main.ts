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
import PopupTemplate from "@arcgis/core/PopupTemplate";
import Collection from "@arcgis/core/core/Collection";
import Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import SceneView from "@arcgis/core/views/SceneView";
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
import "@arcgis/map-components/components/arcgis-compass";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-navigation-toggle";
import "@arcgis/map-components/components/arcgis-popup";
import type { ArcgisPopup } from "@arcgis/map-components/components/arcgis-popup";
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
import * as labels from "./labels";
import settings from "./settings";
import {
  attributesToLowerCase,
  getWikiContent
} from "./utils";

const state = new State();
let buildings: Graphic[];
let heightGraph: HeightGraph;
let timeline: Timeline;

const viewElement = document.querySelector<HTMLArcgisSceneElement>("arcgis-scene#viewElement")!;
await viewElement.viewOnReady();
viewElement.environment.lighting = {
   type: "sun",
   directShadowsEnabled: true,
};
const view = viewElement.view as SceneView;
view.highlights = [{ name: "default", color: [255, 255, 0], fillOpacity: 0.4 }];

const popupElement = document.querySelector<ArcgisPopup>("arcgis-popup")!;
popupElement.dockEnabled = true;
popupElement.dockOptions = {
  buttonEnabled: false,
  breakpoint: false,
  position: "top-right" as const
};

const articleUrlByObjectId = new Map<string, string>();
const buildingPopupTemplate = new PopupTemplate({
  title: "{name}",
  content: async (feature) => {
    const graphic = feature.graphic as Graphic;
    const attributes = graphic.attributes ?? {};
    const position = graphic.geometry as Point | null;
    const name = attributes.name ?? attributes.NAME ?? "";
    const objectId = String(attributes.objectid ?? attributes.OBJECTID ?? "");
    const height = Math.round(attributes.heightroof ?? attributes.HEIGHTROOF ?? 0);
    const year = attributes.cnstrct_yr ?? attributes.CNSTRCT_YR ?? "-";

    let content = `
      <p class='info'>
        <img src="${new URL("height.png", document.baseURI).toString()}" width="25" height="25"> ${height} feet
            <img src='${new URL("construction.png", document.baseURI).toString()}' width="25" height="25"> ${year}
      </p>`;

    if (typeof name === "string" && name.trim()) {
      const wikiResult = await getWikiContent(name, position);
      content += wikiResult.extract ?? "";
      if (wikiResult.articleUrl) {
        articleUrlByObjectId.set(objectId, wikiResult.articleUrl);
      }
    }

    return content;
  },
  actions: [new ActionButton({
    title: "Wikipedia",
    id: "wiki-action",
    icon: "article"
  })]
});

popupElement.addEventListener("arcgisTriggerAction", (event) => {
  if (event.detail?.action?.id !== "wiki-action") {
    return;
  }

  const selectedFeature = popupElement.selectedFeature as Graphic | null;
  const attributes = selectedFeature?.attributes ?? {};
  const objectId = String(attributes.objectid ?? attributes.OBJECTID ?? "");
  const name = attributes.name ?? attributes.NAME ?? "";
  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (!trimmedName) return;
  const articleUrl =
    articleUrlByObjectId.get(objectId) ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(trimmedName)}`;

  window.open(articleUrl, "_blank");
});

// we set an initial filter to display only buildings whose height is between minHeight and maxHeight
const filter = [settings.buildingOptions.minHeight, settings.buildingOptions.maxHeight];
const definitionExpression = generateDefinitionExpression(filter);

// scene layer with the buildings
const sceneLayer = new SceneLayer({
  url: settings.buildingsUrl,
  popupTemplate: buildingPopupTemplate,
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
const sceneLayerView = await view.whenLayerView(sceneLayer);
document.getElementById("loading")!.style.display = "none";

// add labels to display Manhattan boroughs
labels.initialize("./data/manhattan-boroughs.json", view.map!);

// set up Search Component
const searchElement = document.querySelector<HTMLArcgisSearchElement>("arcgis-search")!;
searchElement.sources = new Collection([
  new LayerSearchSource({
    layer: infoPoints,
    outFields: ["NAME"],
    searchFields: ["NAME"],
    displayField: "NAME",
    exactMatch: false,
    placeholder: "Ex: Empire State Building"
  })
]);
searchElement.addEventListener("arcgisSelectResult", async (event) => {
  const selectResultEvent = event as CustomEvent<{ result: { feature: Graphic } }>;
  const feature = selectResultEvent.detail.result.feature;
  attributesToLowerCase(feature);
  state.selectedBuilding = feature;

  const sceneQuery = sceneLayer.createQuery();
  sceneQuery.objectIds = [Number(feature.attributes.objectid)];
  sceneQuery.returnGeometry = true;
  const sceneResults = await sceneLayerView.queryFeatures(sceneQuery);

  popupElement.features = [sceneResults.features[0]];
  popupElement.open = true;
});

// set up category filter
const categoryControl = document.querySelector<HTMLCalciteSegmentedControlElement>("calcite-segmented-control")!;
categoryControl.addEventListener("calciteSegmentedControlChange", () => {
  const newCategory = categoryControl.value;
  state.selectedCategory = newCategory;
  rendererGen.applyCategory(newCategory);
  heightGraph.applyCategory(newCategory);
  infoPoints.visible = newCategory === "info";
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
  heightGraph = new HeightGraph("heightDiv", buildings, state, (newFilter) => {
    const defExp = generateDefinitionExpression(newFilter);
    sceneLayer.definitionExpression = defExp;
    infoPoints.definitionExpression = defExp;
    heightGraph.updateFilter(newFilter);
  });
  timeline = new Timeline("timeDiv", state, (newPeriod) => {
    rendererGen.applyClassBreaksRenderer(newPeriod, state);
    heightGraph.updatePeriod(newPeriod);
  });
  timeline.update(state.selectedPeriod);
  rendererGen.applyClassBreaksRenderer(state.selectedPeriod, state);

  // Keep selected building state synced with popup component selected feature
  popupElement.addEventListener("arcgisPropertyChange", async (event) => {
    const propertyChangeEvent = event as CustomEvent<{ name?: string }>;
    const changedProperty = propertyChangeEvent.detail?.name;

    if (changedProperty === "open" && !popupElement.open) {
      heightGraph.deselect();
      state.selectedBuilding = null;
      return;
    }

    if (changedProperty !== "selectedFeature") {
      return;
    }

    const selectedFeature = popupElement.selectedFeature as Graphic | null;
    if (!selectedFeature) {
      return;
    }

    const objectid = selectedFeature.attributes.objectid ?? selectedFeature.attributes.OBJECTID;
    const feature =
      objectid == null
        ? null
        : buildings.find((b) => String(b.attributes.objectid) === String(objectid)) ?? null;

    heightGraph.deselect();
    if (feature) {
      heightGraph.select(feature);
      state.selectedBuilding = feature;
    }

    if (selectedFeature.geometry) {
      await view.goTo(selectedFeature.geometry, { duration: 1000 });
    }
  });
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
