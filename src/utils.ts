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

import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import request from "@arcgis/core/request";

export function getName(graphic: Graphic | undefined) {
  const name = graphic?.attributes?.NAME;
  return typeof name === "string" ? name.trim() : "";
}

export function hasName(graphic: Graphic | undefined) {
  return getName(graphic).length > 0;
}

export function generateDefinitionExpression(filter: number[]) {
  return `HEIGHTROOF > ${filter[0]} AND HEIGHTROOF < ${filter[1]} AND CNSTRCT_YR >= 1900 AND CNSTRCT_YR <= 2024`;
}

export async function getWikiContent(
  name: string,
  position: Point | undefined
): Promise<{ extract?: string; articleUrl?: string }> {
  const trimmedName = name?.trim();
  if (!trimmedName) {
    return {};
  }

  const latitude = position?.latitude;
  const longitude = position?.longitude;
  const hasValidPosition = Number.isFinite(latitude) && Number.isFinite(longitude);

  const url = new URL("https://en.wikipedia.org/w/api.php");
  const params = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: trimmedName,
    srwhat: "text",
    prop: "extracts|pageimages|imageinfo|pageterms|info",
    exintro: "1",
    explaintext: "1",
    exlimit: "20",
    pilimit: "20",
    piprop: "original",
    origin: "*",
    format: "json"
  });

  if (hasValidPosition) {
    params.set("generator", "geosearch");
    params.set("ggscoord", `${latitude}|${longitude}`);
    params.set("ggsradius", "200");
    params.set("ggslimit", "20");
  }

  url.search = params.toString();

  const response = await request(url, {
    responseType: "json"
  });
  const data = response.data as {
    query?: {
      pages?: Record<string, { title: string; extract?: string }>;
      search?: { title: string }[];
    };
  };
  const pages = data.query?.pages;
  const search = data.query?.search;

  if (!pages) {
    return {};
  }

  const pageList = Object.values(pages);
  let article: (typeof pageList)[number] | undefined;

  if (search?.length) {
    let i = 0;
    while (!article && i < search.length) {
      for (const page of pageList) {
        if (search[i].title === page.title && page.extract) {
          article = page;
          break;
        }
      }
      i++;
    }
  }

  if (!article) {
    article = pageList.find((page) => page.extract);
  }

  if (!article?.extract) {
    return {};
  }

  const extract =
    article.extract.length > 200
      ? article.extract.substring(0, article.extract.indexOf(".", 200) + 1)
      : article.extract;
  const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`;
  return { extract, articleUrl };
}
