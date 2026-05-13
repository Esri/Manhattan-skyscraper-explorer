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

/************************************************************************
 * This class creates a popup and fills it with information about buildings.
 * Wikipedia API is used to retrieve an abstract of the building. All retrieved
 * articles are under the Creative Commons Attribution-ShareAlike License.
 * See https://wikimediafoundation.org/wiki/Terms_of_Use for details.
 ************************************************************************/


import "@esri/calcite-components/components/calcite-carousel";
import "@esri/calcite-components/components/calcite-carousel-item";

import Point from "@arcgis/core/geometry/Point";
import request from "@arcgis/core/request";
import SceneView from "@arcgis/core/views/SceneView";

import ActionButton from "@arcgis/core/support/actions/ActionButton";
import { ArcgisPopup } from "@arcgis/map-components/components/arcgis-popup";

export async function setContent(position: Point, attributes: Record<string, any>, view: SceneView) {
  if (!view.popup) {
    return;
  }
  const popupElement = document.querySelector<ArcgisPopup>("arcgis-popup")!;
  const latitude = position.latitude ?? 0;
  const longitude = position.longitude ?? 0;

  // Clear the popup content before closing so that, when watching popup visibility in other parts of the
  // app, we can distinguish between the user closing the popup and the popup being closed from this function.
  popupElement.content = "";
  view.closePopup();

  // set the building name, height and construction year from the building attributes
  const name = attributes.name.trim() ? attributes.name : "Building";
  let content = `
    <p class='info'>
      <img src="./height.png" width="25" height="25"> ${Math.round(
        attributes.heightroof
      )} feet
          <img src='./construction.png' width="25" height="25"> ${attributes.cnstrct_yr
        }
    </p>`;

  let articleUrl = undefined;
  if (name !== "Building") {
    const wikiResult = await getWikiContent();
    content += wikiResult.extract ?? "";
    articleUrl = wikiResult.articleUrl;
  }


  const contentEl = document.createElement("div");
  contentEl.innerHTML = content;
  await view.openPopup({
    title: name,
    content: contentEl,
    location: position
  });

  setupActions({ articleUrl });

  // Wikipedia API is used to retrieve an abstract of the building. All retrieved
  // articles are under the Creative Commons Attribution-ShareAlike License.
  // See https://wikimediafoundation.org/wiki/Terms_of_Use for details.
  async function getWikiContent(): Promise<{ extract?: string; articleUrl?: string }> {
    const url = new URL("https://en.wikipedia.org/w/api.php");
    url.search = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: attributes.name,
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
    const pages = response.data.query.pages;
    const search = response.data.query.search;
    let article = null,
      i = 0;
    while (!article && i < search.length) {
      for (const prop in pages) {
        if (pages.hasOwnProperty(prop) && search[i].title === pages[prop].title) {
          article = pages[prop];
          break;
        }
      }
      i++;
    }
    if (!article) {
      return {};
    }
    const extract =
      article.extract.length > 200
        ? article.extract.substring(0, article.extract.indexOf(".", 200) + 1)
        : article.extract;
    const articleUrl = `http://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`;
    return { extract, articleUrl };
  }

  function setupActions({ articleUrl }: { articleUrl?: string }) {
    const wikiActionId = "wiki-action";

    if (articleUrl) {
      popupElement.actions.push(
        new ActionButton({
          title: "Wikipedia",
          id: wikiActionId,
          icon: "article"
        })
      );
    }

    const onTriggerAction = (event: Event) => {
      const customEvent = event as CustomEvent<{ action?: { id?: string } }>;
      switch (customEvent.detail?.action?.id) {
        case wikiActionId: {
          window.open(articleUrl, "_blank");
          break;
        }
      }
    };

    popupElement.addEventListener("arcgisTriggerAction", onTriggerAction);
  }
}

