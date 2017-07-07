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

define([
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/dom-class",
  "dojo/on"
], function(dom, domCtr, domClass, on) {

  return {

    initialize: function(container, settings, state) {

      for (var i = 0; i < settings.categories.length; i++) {
        var className = (settings.initCategory === settings.categories[i].value) ? "selected" : "";
        var button = domCtr.create("button",
          {
            id: "category-" + settings.categories[i].value,
            value: settings.categories[i].value,
            innerHTML: settings.categories[i].text,
            class: className
          },
          dom.byId(container));
        on(button, "click", togglePeriod);
      }
      function togglePeriod(evt) {
        domClass.remove("category-" + state.selectedCategory, "selected");
        domClass.add("category-" + evt.target.value, "selected");
        state.selectedCategory = evt.target.value;
      }
    }
  };
});

