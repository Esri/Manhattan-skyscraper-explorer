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

/******************************************
 * This module instantiates the search widget
 * that will use the info points feature layer
 * as the search source.
 ******************************************/

import Search from "@arcgis/core/widgets/Search";
import SceneView from "@arcgis/core/views/SceneView";
import Layer from "@arcgis/core/layers/Layer";
import LayerSearchSource from "@arcgis/core/widgets/Search/LayerSearchSource";

import { attributesToLowerCase } from "./utils";
import { State } from "./State";

export function initialize(view: SceneView, layer: Layer, field: string, state: State) {
  const search = new Search({
    view: view,
    sources: [
      new LayerSearchSource({
        layer: layer,
        outFields: ["*"],
        autoNavigate: true,
        searchFields: [field],
        displayField: field,
        exactMatch: false,
        placeholder: "Ex: Empire State Building",
        popupEnabled: false
      })
    ],
    maxResults: 10,
    resultGraphicEnabled: false,
    includeDefaultSources: false
  });

  search.on("select-result", function (event) {
    const feature = event.result.feature;
    attributesToLowerCase(feature);
    state.selectedBuilding = feature;
  });

  view.ui.add(search, {
    position: "top-right"
  });
}

export function show() {
  element().style.display = "inline";
}

export function hide() {
  element().style.display = "none";
}

function element(): HTMLElement {
  return document.querySelector(".esri-component.esri-search.esri-widget") as HTMLElement;
}
