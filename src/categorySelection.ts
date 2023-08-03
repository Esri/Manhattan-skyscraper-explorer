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

import { State } from "./State";
import settings from "./settings";

export function initialize(container: string, state: State) {
  for (let i = 0; i < settings.categories.length; i++) {
    const className = settings.initCategory === settings.categories[i].value ? "selected" : "";
    const button = document.createElement("button");
    button.id = "category-" + settings.categories[i].value;
    button.value = settings.categories[i].value;
    button.innerHTML = settings.categories[i].text;
    button.className = className;
    button.addEventListener("click", (e) => togglePeriod(e));
    document.getElementById(container)!.appendChild(button);
  }
  function togglePeriod(evt: MouseEvent) {
    const target = evt.target as HTMLButtonElement;
    document.getElementById("category-" + state.selectedCategory)!.classList.remove("selected");
    document.getElementById("category-" + target.value)!.classList.add("selected");
    state.selectedCategory = target.value;
  }
}
