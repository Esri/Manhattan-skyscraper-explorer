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

import Graphic from "@arcgis/core/Graphic";
import { isAbortError } from "@arcgis/core/core/promiseUtils";

// convert all property names of an object to lower case
export function attributesToLowerCase(feature: Graphic) {
  const result: (typeof feature)["attributes"] = {};
  for (const key of Object.keys(feature.attributes)) {
    result[key.toLowerCase()] = feature.attributes[key];
  }
  feature.attributes = result;
}

export async function ignoreAbortErrors<T>(promise: Promise<T>): Promise<T | undefined> {
  try {
    return await promise;
  } catch (error: any) {
    if (!isAbortError(error)) {
      throw error;
    }
    return undefined;
  }
}
