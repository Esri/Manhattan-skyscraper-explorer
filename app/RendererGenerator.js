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

define([
  "dojo/_base/declare",

  "esri/symbols/MeshSymbol3D",
  "esri/symbols/FillSymbol3DLayer",
  "esri/renderers/ClassBreaksRenderer",
  "esri/renderers/UniqueValueRenderer",
  "esri/symbols/PointSymbol3D",
  "esri/symbols/IconSymbol3DLayer"
], function(declare,
  MeshSymbol3D, FillSymbol3DLayer, ClassBreaksRenderer, UniqueValueRenderer,
  PointSymbol3D, IconSymbol3DLayer) {

  return declare(null, {

    constructor: function(settings, layer, field, state) {
      this.defaultColor = settings.defaultColor;
      this.ageClasses = settings.ageClasses;
      this.layer = layer;
      this.field = field;
      this.state = state;
    },

    createClassBreakInfos: function(selectedPeriod) {
      return this.ageClasses.map(function(e, i) {
        var color = selectedPeriod[i] ? e.color : this.defaultColor;
        return {
          minValue: e.minValue,
          maxValue: e.maxValue,
          symbol: new MeshSymbol3D({
            symbolLayers: [ new FillSymbol3DLayer({
              material: {
                color: color
              }
            })]
          })
        };
      }.bind(this));
    },

    applyClassBreaksRenderer: function(selectedPeriod) {

      var symbol = new MeshSymbol3D({
        symbolLayers: [ new FillSymbol3DLayer({
          material: { color: this.defaultColor}
        })]
      });

      this.layer.renderer = new ClassBreaksRenderer({
        field: this.field,
        defaultSymbol: symbol,
        classBreakInfos: this.createClassBreakInfos(selectedPeriod)
      });

      this.applyCategory(this.state.selectedCategory);
    },

    applyCategory: function(category) {
      var field, renderer = this.layer.renderer.clone();
      if (category === "all") {
        renderer.visualVariables = null;
      }
      else {
        if (category === "info") {
          field = "WIKI";
        }
        else {
          field = "TOP20";
        }
        renderer.visualVariables = [{
          type: "opacity",
          field: field,
          stops: [{
            value: 0,
            opacity: 0.2
          }, {
            value: 1,
            opacity: 1
          }]
        }];
      }
      this.layer.renderer = renderer;
    },

    createUniqueValueRenderer: function(field, uniqueValues) {

      return new UniqueValueRenderer({
        field: field,
        uniqueValueInfos: [{
          value: uniqueValues.value,
          symbol: new PointSymbol3D({
            symbolLayers: [new IconSymbol3DLayer({
              size: 18,  // points
              resource: {
                href: uniqueValues.image
               }
            })],
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
        }]
      });
    }

  });
});
