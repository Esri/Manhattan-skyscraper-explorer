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

import Accessor from "@arcgis/core/core/Accessor";
import { property, subclass } from "@arcgis/core/core/accessorSupport/decorators";
import Graphic from "@arcgis/core/Graphic";

import settings from "./settings";

@subclass("skyscraper-explorer.State")
export class State extends Accessor {
  @property()
  selectedPeriod: boolean[] = settings.initPeriod;

  @property()
  selectedBuilding: Graphic | null = null;

  @property()
  filteredBuildings: number[] | null = null;

  @property()
  selectedCategory: string = settings.initCategory;
}
