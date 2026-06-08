/* Copyright 2026 Esri

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

/********************************************
 * This class helps creating and updating
 * the timeline buttons under the heightGraph
 *******************************************/

export default class Timeline {
  constructor(container: string, state: State, onPeriodChange?: (newPeriod: boolean[]) => void) {
    for (let i = 0; i < settings.initPeriod.length; i++) {
      const buttonIndex = i;
      const button = document.createElement("button");
      button.id = "period-" + i;
      button.innerHTML = settings.ageClasses[i].minValue + " - " + settings.ageClasses[i].maxValue;
      document.getElementById(container)!.appendChild(button);
      button.addEventListener("click", () => {
        const newPeriod = [];
        for (let j = 0; j < settings.initPeriod.length; j++) {
          newPeriod[j] = j !== buttonIndex ? state.selectedPeriod[j] : !state.selectedPeriod[j];
        }
        state.selectedPeriod = newPeriod;
        this.updateButtons(newPeriod);
        onPeriodChange?.(newPeriod);
      });
    }

    this.updateButtons(state.selectedPeriod);
  }

  update(newPeriod: boolean[]) {
    this.updateButtons(newPeriod);
  }

  private updateButtons(period: boolean[]) {
    for (let i = 0; i < period.length; i++) {
      const buttonStyle = document.getElementById("period-" + i)!.style;
      buttonStyle.backgroundColor = period[i] ? settings.ageClasses[i].color.toCss() : settings.defaultColor.toCss();
      buttonStyle.color = period[i] ? "#fff" : "#777";
    }
  }
}
