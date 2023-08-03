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

import request from "@arcgis/core/request";
import Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import LabelClass from "@arcgis/core/layers/support/LabelClass";
import LabelSymbol3D from "@arcgis/core/symbols/LabelSymbol3D";
import TextSymbol3DLayer from "@arcgis/core/symbols/TextSymbol3DLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import PointSymbol3D from "@arcgis/core/symbols/PointSymbol3D";
import IconSymbol3DLayer from "@arcgis/core/symbols/IconSymbol3DLayer";
import Map from "@arcgis/core/Map";
import { SpatialReference } from "@arcgis/core/geometry";

export function initialize(url: string, map: Map) {
  request(url, {
    responseType: "json"
  }).then(function (response) {
    const featureCollection = [];

    for (let i = 0; i < response.data.features.length; i++) {
      var feat = response.data.features[i];

      featureCollection.push({
        geometry: new Point({
          x: feat.geometry.coordinates[0],
          y: feat.geometry.coordinates[1],
          z: 0
        }),
        attributes: {
          OBJECTID: feat.properties.FID,
          Name: feat.properties.Name
        }
      });
    }

    const labelsLayer = new FeatureLayer({
      fields: [
        {
          name: "OBJECTID",
          alias: "objectId",
          type: "oid"
        },
        {
          name: "Name",
          alias: "Name",
          type: "string"
        }
      ],
      objectIdField: "OBJECTID",
      geometryType: "point",
      spatialReference: new SpatialReference({ wkid: 4326 }),
      source: featureCollection,
      labelsVisible: true,
      labelingInfo: [
        new LabelClass({
          labelExpressionInfo: {
            expression: "$feature.Name"
          },
          symbol: new LabelSymbol3D({
            symbolLayers: [
              new TextSymbol3DLayer({
                material: {
                  color: "white"
                },
                text: feat.properties.Name,
                font: {
                  family: "sans-serif",
                  weight: "bold"
                },
                size: 12,
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
        })
      ],
      renderer: new SimpleRenderer({
        symbol: new PointSymbol3D({
          symbolLayers: [
            new IconSymbol3DLayer({
              resource: {
                primitive: "circle"
              },
              size: 1,
              material: {
                color: [255, 255, 255]
              }
            })
          ]
        })
      })
    });
    map.add(labelsLayer);
  });
}
