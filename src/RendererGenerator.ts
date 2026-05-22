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
import FillSymbol3DLayer from "@arcgis/core/symbols/FillSymbol3DLayer";
import MeshSymbol3D from "@arcgis/core/symbols/MeshSymbol3D";

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

    this.applyCategory(state.showOnlyAnnotated);
  }

  applyCategory(showOnlyAnnotated: boolean) {
    const renderer = (this.layer.renderer as ClassBreaksRenderer).clone();
    if (!showOnlyAnnotated) {
      renderer.visualVariables = [];
    } else if (showOnlyAnnotated) {
      renderer.visualVariables = [
        new OpacityVariable({
          field: "WIKI",
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
}
