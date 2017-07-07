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

define([
  "esri/widgets/Search"
], function(Search) {

  return {

    initialize: function(view, layer, field, state) {
      this.view = view;
      this.search = new Search({
        view: view,
        sources: [{
          featureLayer: layer,
          outFields: ["*"],
          autoNavigate: true,
          searchFields: [field],
          displayField: field,
          exactMatch: false,
          placeholder: "Ex: Empire State Building",
          popup: null,
          popupOpenOnSelect: false
        }],
        maxResults: 10,
        popupOpenOnSelect: false,
        resultGraphicEnabled: false,
        popUpEnabled: false
      });

      this.search.on("select-result", function(event) {
        var feature = event.result.feature;
        var key, keys = Object.keys(feature.attributes);
        var n = keys.length;
        var newobj = {};
        while (n--) {
          key = keys[n];
          newobj[key.toLowerCase()] = feature.attributes[key];
        }
        feature.attributes = newobj;
        state.selectedBuilding = feature;
      });

      view.ui.add(this.search, {
        position: "top-right"
      });
    }
  };
});
