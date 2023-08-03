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

import Color from "@arcgis/core/Color";

/**
 * General application settings like colors and initial settings
 */

export default {
  ageClasses: [
    { minValue: 1900, maxValue: 1924, color: new Color([153, 167, 204]) },
    { minValue: 1925, maxValue: 1949, color: new Color([149, 184, 214]) },
    { minValue: 1950, maxValue: 1974, color: new Color([153, 204, 203]) },
    { minValue: 1975, maxValue: 1999, color: new Color([153, 204, 179]) },
    { minValue: 2000, maxValue: 2024, color: new Color([175, 206, 152]) }
  ],
  defaultColor: new Color([230, 230, 230]),
  highlightOptions: {
    color: new Color([255, 255, 0]),
    fillOpacity: 0.4
  },
  buildingOptions: {
    minHeight: 0,
    maxHeight: 1500,
    minCnstrctYear: 1900,
    maxCnstrctYear: 2024
  },
  initPeriod: [true, true, true, true, true],
  categories: [
    {
      value: "all",
      text: "Show all buildings"
    },
    {
      value: "info",
      text: "Only annotated buildings"
    },
    {
      value: "top",
      text: "Top 20 buildings"
    }
  ],
  initCategory: "all",
  infoPointsUrl:
    "https://services2.arcgis.com/cFEFS0EWrhfDeVw9/ArcGIS/rest/services/Centroids_Manhattan_Information/FeatureServer/0",
  buildingsUrl: "https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Manhattan/SceneServer",
  maxPhotoCount: 10,
  maxAttributionLength: 50
};
