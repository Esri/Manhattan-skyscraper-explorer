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

/***********************************
 * This module generates the labels
 * of neighbourhoods in the map from
 * a GeoJSON file of points.
 **********************************/

define([
  "esri/request",

  "esri/geometry/Point",
  "esri/layers/FeatureLayer",
  "esri/layers/support/LabelClass",
  "esri/symbols/LabelSymbol3D",
  "esri/symbols/TextSymbol3DLayer",
  "esri/renderers/SimpleRenderer",
  "esri/symbols/PointSymbol3D",
  "esri/symbols/IconSymbol3DLayer"
], function(request,
  Point, FeatureLayer, LabelClass, LabelSymbol3D, TextSymbol3DLayer, SimpleRenderer, PointSymbol3D, IconSymbol3DLayer) {

    return {
      initialize: function(url, field, settings, map) {

        request(url, {
          responseType: "json"
        }).then(function(response) {

          var featureCollection = [];

          for (var i = 0; i < response.data.features.length; i++) {

            var feat = response.data.features[i];

            featureCollection.push({
              geometry: new Point({
                x: feat.geometry.coordinates[0],
                y: feat.geometry.coordinates[1],
                z: 0
              }),
              attributes: {
                "OBJECTID": feat.properties.FID,
                "Name": feat.properties.Name
              }
            });
          }

          var labelsLayer = new FeatureLayer({
            fields: [{
              name: "OBJECTID",
              alias: "objectId",
              type: "oid"
            }, {
              name: "Name",
              alias: "Name",
              type: "string"
            }],
            objectIdField: "OBJECTID",
            geometryType: "point",
            spatialReference: {
              wkid: "4326"
            },
            source: featureCollection,
            labelsVisible: true,
            labelingInfo: [new LabelClass({
              labelExpressionInfo: {
                value: "{Name}"
              },
              symbol: new LabelSymbol3D({
                symbolLayers: [
                  new TextSymbol3DLayer({
                    color: settings.color || "white",
                    backgroundColor: "white", // not working
                    text: feat.properties.Name,
                    font: {
                      family: "sans-serif",
                      weight: "bold"
                    },
                    size: settings.size || 12,
                    halo: {
                      color: [50, 50, 50, 0.8],
                      size: 1
                    }
                  })
                ],
                verticalOffset: {
                  screenLength: 100,
                  maxWorldLength: 100
                },
                callout: {
                  type: "line",
                  size: 2,
                  color: [150, 150, 150],
                  border: {
                    color: [255, 255, 255]
                  }
                }
              })
            })],
            renderer: new SimpleRenderer({
              symbol: new PointSymbol3D({
                symbolLayers: [new IconSymbol3DLayer({
                  resource: {
                    primitive: "circle"
                  },
                  size: 1,
                  material: {
                    color: [255, 255, 255]
                  }
                })]
              })
            })
          });
          map.add(labelsLayer);
        });
      }
    };
  });
