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
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Point from "@arcgis/core/geometry/Point";
import SceneLayer from "@arcgis/core/layers/SceneLayer";
import ActionButton from "@arcgis/core/support/actions/ActionButton";
import SceneView from "@arcgis/core/views/SceneView";
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";
import "@arcgis/map-components/components/arcgis-compass";
import "@arcgis/map-components/components/arcgis-daylight";
import "@arcgis/map-components/components/arcgis-expand";
import "@arcgis/map-components/components/arcgis-navigation-toggle";
import "@arcgis/map-components/components/arcgis-popup";
import type { ArcgisPopup } from "@arcgis/map-components/components/arcgis-popup";
import "@arcgis/map-components/components/arcgis-scene";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-zoom";
import "@esri/calcite-components/components/calcite-checkbox";
import "@esri/calcite-components/components/calcite-label";
import "@esri/calcite-components/components/calcite-shell";
import "@esri/calcite-components/components/calcite-shell-panel";
import HeightGraph from "./HeightGraph";
import RendererGenerator from "./RendererGenerator";
import { State } from "./State";
import Timeline from "./Timeline";
import * as labels from "./labels";
import settings from "./settings";
import {
  getWikiContent
} from "./utils";

const state = new State();
let buildings: Graphic[];
let heightGraph: HeightGraph;
let timeline: Timeline;


// --- VIEW SETTINGS ---
const viewElement = document.querySelector<HTMLArcgisSceneElement>("arcgis-scene#viewElement")!;
await viewElement.viewOnReady();
viewElement.environment.lighting = {
   type: "sun",
   directShadowsEnabled: true,
   date: new Date("May 21, 2021 03:30:00 GMT-05:00")
};
const view = viewElement.view as SceneView;
view.highlights = [{ name: "default", color: [255, 255, 0], fillOpacity: 0.4 }];


// --- LAYERS SETTINGS ---
// set up labels to display Manhattan boroughs
labels.initialize("./data/manhattan-boroughs.json", view.map!);

// set an initial filter to display only buildings whose height is between minHeight and maxHeight
const filter = [settings.buildingOptions.minHeight, settings.buildingOptions.maxHeight];

// scene layer with the buildings
const sceneLayer = new SceneLayer({
  url: settings.buildingsUrl,
  outFields: ["*"],
  definitionExpression: generateDefinitionExpression(filter)
});
const rendererGen = new RendererGenerator(sceneLayer, "CNSTRCT_YR");

view.map!.add(sceneLayer);
await view.whenLayerView(sceneLayer);
document.getElementById("loading")!.style.display = "none";


// --- POPUP SETTINGS ---
const popupElement = document.querySelector<ArcgisPopup>("arcgis-popup")!;
popupElement.dockEnabled = true;
popupElement.dockOptions = {
  buttonEnabled: false,
  breakpoint: false,
  position: "top-right" as const
};

// sync popup component with selected building state and camera position
reactiveUtils.watch(() => popupElement.selectedFeature, async (graphic) => {
  if (graphic) {
    heightGraph.deselect();
    heightGraph.select(graphic);
    state.selectedBuilding = graphic;
    if (graphic.geometry) {
      await view.goTo(graphic.geometry, { duration: 1000 });
    }
  }
});

reactiveUtils.watch(() => popupElement.open, (isOpen) => {
  if (!isOpen) {
    heightGraph.deselect();
    state.selectedBuilding = null;    
  }
});

// set up popup template for the scene layer
const articleUrlByObjectId = new Map<string, string>();
const buildingPopupTemplate = new PopupTemplate({
  title: "{NAME}",
  content: async (feature) => {
    const graphic = feature.graphic as Graphic;
    const geometry = graphic.geometry as any;
    const position =
      geometry?.type === "point"
        ? (geometry as Point)
        : ((geometry?.extent?.center as Point | null | undefined) ?? null);
    const attributes = graphic.attributes ?? {};
    const name = attributes.NAME.trim();
    let content = `
      <p class='info'>
        <img src="${new URL("height.png", document.baseURI).toString()}" width="25" height="25"> ${Math.floor(attributes.HEIGHTROOF)} feet
        <img src='${new URL("construction.png", document.baseURI).toString()}' width="25" height="25"> ${attributes.CNSTRCT_YR}
      </p>`;

    if (name) {
      const wikiResult = await getWikiContent(name, position);
      content += wikiResult.extract ?? "";
      if (wikiResult.articleUrl) {
        articleUrlByObjectId.set(String(attributes.OBJECTID), wikiResult.articleUrl);
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
  if (event.detail?.action?.id === "wiki-action") {
    const selectedFeature = popupElement.selectedFeature as Graphic | null;
    const attributes = selectedFeature?.attributes ?? {};
    const name = attributes.NAME.trim();
    if (!name) return;
    const articleUrl =
    articleUrlByObjectId.get(String(attributes.OBJECTID)) ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(name)}`;
    window.open(articleUrl, "_blank");
  }
});
sceneLayer.popupTemplate = buildingPopupTemplate;


// --- SEARCH SETTINGS ---
const searchElement = document.querySelector<HTMLArcgisSearchElement>("arcgis-search")!;
searchElement.sources = new Collection([
  new LayerSearchSource({
    layer: sceneLayer,
    outFields: ["NAME"],
    searchFields: ["NAME"],
    displayField: "NAME",
    exactMatch: false,
    placeholder: "Ex: Empire State Building"
  })
]);
searchElement.addEventListener("arcgisSelectResult", async (event) => {
  popupElement.features = [event.detail.result.feature];
  popupElement.open = true;
});


// --- HEIGHT GRAPH SETTINGS ---
try {
  buildings = await queryAllBuildings();
  heightGraph = new HeightGraph("heightDiv", buildings, state, (newFilter) => {
    sceneLayer.definitionExpression = generateDefinitionExpression(newFilter);
    heightGraph.updateFilter(newFilter);
  }, (feature) => {
    heightGraph.deselect();
    heightGraph.select(feature);
    popupElement.features = [feature];
    popupElement.open = true;
  });
  timeline = new Timeline("timeDiv", state, (newPeriod) => {
    rendererGen.applyClassBreaksRenderer(newPeriod, state);
    heightGraph.updatePeriod(newPeriod);
  });
  timeline.update(state.selectedPeriod);
  rendererGen.applyClassBreaksRenderer(state.selectedPeriod, state);
  heightGraph.applyCategory(state.showOnlyAnnotated);
} catch (error) {
  console.error(error);
}

// TODO: delete after cutting some buildings
async function queryAllBuildings() {
  const objectIdQuery = sceneLayer.createQuery();
  const objectIds = await sceneLayer.queryObjectIds(objectIdQuery);
  const batchSize = 1000;
  const buildingFeatures: Graphic[] = [];

  for (let index = 0; index < objectIds.length; index += batchSize) {
    const query = sceneLayer.createQuery();
    query.objectIds = objectIds.slice(index, index + batchSize);
    query.outFields = ["OBJECTID", "NAME", "HEIGHTROOF", "CNSTRCT_YR"];
    query.returnGeometry = true;

    const results = await sceneLayer.queryFeatures(query);
    buildingFeatures.push(...results.features);
  }

  return buildingFeatures;
}

const categoryCheckbox = document.querySelector<HTMLCalciteCheckboxElement>("#categoryCheckbox")!;
categoryCheckbox.addEventListener("calciteCheckboxChange", () => {
  state.showOnlyAnnotated = categoryCheckbox.checked;
  rendererGen.applyCategory(state.showOnlyAnnotated);
  heightGraph.applyCategory(state.showOnlyAnnotated);
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
