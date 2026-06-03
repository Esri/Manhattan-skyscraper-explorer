/* Copyright 2026 Esri

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
import Extent from "@arcgis/core/geometry/Extent";
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
  generateDefinitionExpression,
  getName,
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
   date: new Date("December 21, 2021 05:30:00 GMT-05:00")
};
const view = viewElement.view as SceneView;
view.highlights = [{ name: "default", color: [255, 255, 0], fillOpacity: 0.4 }];


// --- LAYERS SETTINGS ---
// set up labels to display Manhattan boroughs
await labels.initialize("./data/manhattan-boroughs.json", view.map!);

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
const sceneLayerView = await view.whenLayerView(sceneLayer);
await reactiveUtils.whenOnce(() => !sceneLayerView.updating);
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

// set up popup template for the SceneLayer
const articleUrlByObjectId = new Map<string, string>();
const buildingPopupTemplate = new PopupTemplate({
  title: "{NAME}",
  content: async (feature) => {
    const graphic = feature.graphic as Graphic;
    const geometry = graphic.geometry;
    const position =
      geometry?.type === "point"
        ? (geometry as Point)
        : ((geometry?.extent?.center ?? undefined) as Point | undefined);
    const attributes = graphic.attributes ?? {};
    const name = getName(graphic);
    let content = `
      <p class="info">
        <img src="${new URL("height.png", document.baseURI).toString()}" width="25" height="25"> ${Math.floor(attributes.HEIGHTROOF)} feet
        <img src="${new URL("construction.png", document.baseURI).toString()}" width="25" height="25"> ${attributes.CNSTRCT_YR}
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
    const selectedFeature = (popupElement.selectedFeature ?? undefined) as Graphic | undefined;
    const attributes = selectedFeature?.attributes ?? {};
    const name = getName(selectedFeature);
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
    outFields: ["OBJECTID", "NAME", "HEIGHTROOF", "CNSTRCT_YR"],
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
  const { minCnstrctYear, maxCnstrctYear } = settings.buildingOptions;
  const query = sceneLayer.createQuery();
  // Only buildings higher that 200 ft are plotted
  query.where = `HEIGHTROOF >= 200 AND CNSTRCT_YR >= ${minCnstrctYear} AND CNSTRCT_YR <= ${maxCnstrctYear}`;
  query.outFields = ["OBJECTID", "NAME", "HEIGHTROOF", "CNSTRCT_YR"];
  query.returnGeometry = true;
  const results = await sceneLayer.queryFeatures(query);
  buildings = results.features;

  heightGraph = new HeightGraph(
    "heightDiv",
    buildings,
    state,
    (newFilter) => {
      sceneLayer.definitionExpression = generateDefinitionExpression(newFilter);
      heightGraph.updateFilter(newFilter);
    },
    async (feature) => {
      heightGraph.deselect();
      heightGraph.select(feature);
      popupElement.features = [feature];
      popupElement.open = true;
      await frameBuilding(feature.attributes.OBJECTID);
    }
  );
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

const categoryCheckbox = document.querySelector<HTMLCalciteCheckboxElement>("#categoryCheckbox")!;
categoryCheckbox.addEventListener("calciteCheckboxChange", () => {
  state.showOnlyAnnotated = categoryCheckbox.checked;
  rendererGen.applyCategory(state.showOnlyAnnotated);
  heightGraph.applyCategory(state.showOnlyAnnotated);
});

// A SceneLayer feature query only returns the flat 2D footprint so we need to build 3D extent
const FEET_TO_METERS = 0.3048;
async function frameBuilding(objectId: number) {
  const footprintQuery = sceneLayer.createQuery();
  footprintQuery.objectIds = [objectId];
  footprintQuery.outFields = ["GROUNDELEV", "HEIGHTROOF"];
  footprintQuery.returnGeometry = true;
  footprintQuery.outSpatialReference = view.spatialReference;
  const { features } = await sceneLayer.queryFeatures(footprintQuery);
  const feature = features[0];
  const footprint = feature?.geometry?.extent;
  if (!footprint) {
    return;
  }

  const ground = (feature.attributes.GROUNDELEV ?? 0) * FEET_TO_METERS;
  const roof = (feature.attributes.HEIGHTROOF ?? 0) * FEET_TO_METERS;

  const center = footprint.center;
  const footprintRadius = Math.max(footprint.width, footprint.height) / 2;
  const radius = Math.max(footprintRadius * 3, roof * 0.9);
  const target = new Extent({
    xmin: center.x - radius,
    xmax: center.x + radius,
    ymin: center.y - radius,
    ymax: center.y + radius,
    zmin: ground,
    zmax: ground + roof,
    spatialReference: view.spatialReference
  });

  await view.goTo(target, { duration: 1000 });
}