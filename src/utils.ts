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
import Point from "@arcgis/core/geometry/Point";
import request from "@arcgis/core/request";

// convert all property names of an object to lower case
export function attributesToLowerCase(feature: Graphic) {
  const result: (typeof feature)["attributes"] = {};
  for (const key of Object.keys(feature.attributes)) {
    result[key.toLowerCase()] = feature.attributes[key];
  }
  feature.attributes = result;
}

export async function getWikiContent(
  name: string,
  position: Point | null | undefined
): Promise<{ extract?: string; articleUrl?: string }> {
  if (!name || !name.trim()) {
    return {};
  }

  const latitude = position?.latitude ?? 0;
  const longitude = position?.longitude ?? 0;
  const url = new URL("https://en.wikipedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: name.trim(),
    srwhat: "text",
    prop: "extracts|pageimages|imageinfo|pageterms|info",
    exintro: "1",
    explaintext: "1",
    exlimit: "20",
    pilimit: "20",
    piprop: "original",
    generator: "geosearch",
    ggscoord: `${latitude}|${longitude}`,
    ggsradius: "200",
    ggslimit: "20",
    origin: "*",
    format: "json"
  }).toString();

  const response = await request(url, {
    responseType: "json"
  });
  const pages = response.data.query?.pages;
  const search = response.data.query?.search;

  if (pages && search) {
    let article: any = null;
    let i = 0;
    while (!article && i < search.length) {
      for (const prop in pages) {
        if (Object.prototype.hasOwnProperty.call(pages, prop) && search[i].title === pages[prop].title) {
          article = pages[prop];
          break;
        }
      }
      i++;
    }

    if (article?.extract) {
      const extract =
        article.extract.length > 200
          ? article.extract.substring(0, article.extract.indexOf(".", 200) + 1)
          : article.extract;
      const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`;
      return { extract, articleUrl };
    }
  }

  const fallbackTitle = search?.[0]?.title ?? name.trim();
  const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(fallbackTitle)}`;
  const summaryResponse = await request(summaryUrl, {
    responseType: "json"
  });
  const extract = summaryResponse.data?.extract;
  const articleUrl = summaryResponse.data?.content_urls?.desktop?.page;

  if (!extract && !articleUrl) {
    return {};
  }

  return { extract, articleUrl };
}
