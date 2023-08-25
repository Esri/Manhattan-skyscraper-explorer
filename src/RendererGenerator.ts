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

/*****************************************
 * This class is helps generating renderers
 * for the building scene layer depending
 * on the user choices
 **************************************/

import SceneLayer from "@arcgis/core/layers/SceneLayer";
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";

import OpacityVariable from "@arcgis/core/renderers/visualVariables/OpacityVariable";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D";
import { State } from "./State";
import settings from "./settings";

export default class RendererGenerator {
  constructor(public layer: SceneLayer, public field: string) {
    this.layer = layer;
    this.field = field;
  }

  createClassBreakInfos(selectedPeriod: boolean[]) {
    return settings.ageClasses.map((e, i) => {
      const color = selectedPeriod[i] ? e.color : settings.defaultColor;
      return {
        minValue: e.minValue,
        maxValue: e.maxValue,
        symbol: new MeshSymbol3D({
          symbolLayers: [
            new FillSymbol3DLayer({
              material: {
                color: color
              },
              edges: new SolidEdges3D({
                size: 1.2,
                color: [50, 50, 50, 0.2]
              })
            })
          ]
        })
      };
    });
  }

  applyClassBreaksRenderer(selectedPeriod: boolean[], state: State) {
    const symbol = new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: { color: settings.defaultColor }
        })
      ]
    });

    this.layer.renderer = new ClassBreaksRenderer({
      field: this.field,
      defaultSymbol: symbol,
      classBreakInfos: this.createClassBreakInfos(selectedPeriod)
    });

    this.applyCategory(state.selectedCategory);
  }

  applyCategory(category: string) {
    const renderer = (this.layer.renderer as ClassBreaksRenderer).clone();
    if (category === "all") {
      renderer.visualVariables = [];
    } else {
      const field = category === "info" ? "WIKI" : "TOP20";
      renderer.visualVariables = [
        new OpacityVariable({
          field: field,
          stops: [
            {
              value: 0,
              opacity: 0.0
            },
            {
              value: 1,
              opacity: 1
            }
          ]
        })
      ];
    }
    this.layer.renderer = renderer;
  }

  createUniqueValueRenderer(field: string, uniqueValueInfo: { value: number; image: string }) {
    return new UniqueValueRenderer({
      field: field,
      uniqueValueInfos: [
        {
          value: uniqueValueInfo.value,
          symbol: new PointSymbol3D({
            symbolLayers: [
              new IconSymbol3DLayer({
                size: 18, // points
                resource: {
                  href: uniqueValueInfo.image
                }
              })
            ],
            verticalOffset: {
              screenLength: 80,
              maxWorldLength: 100
            },
            callout: {
              type: "line",
              size: 1,
              color: [50, 50, 50],
              border: {
                color: [255, 255, 255]
              }
            }
          })
        }
      ]
    });
  }
}
