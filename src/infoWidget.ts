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
 * Flickr API is used to retrieve images of the buildings under Creative Commons license.
 * See https://www.flickr.com/services/api/tos/ for licensing information.
 * For the image gallery Galleria.io is used: https://galleria.io/.
 ************************************************************************/

import Swiper from "swiper";
import { Navigation } from "swiper/modules";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Point } from "@arcgis/core/geometry";
import request from "@arcgis/core/request";
import SceneView from "@arcgis/core/views/SceneView";

import settings from "./settings";
import ActionButton from "@arcgis/core/support/actions/ActionButton";

export async function setContent(position: Point, attributes: HashMap<any>, view: SceneView) {
  // Clear the popup content before closing so that, when watching popup visibility in other parts of the
  // app, we can distinguish between the user closing the popup and the popup being closed from this function.
  view.popup.content = "";
  view.closePopup();

  // set the building name, height and construction year from the building attributes
  const name = attributes.name.trim() ? attributes.name : "Building";
  let content = `
<p class='info'>
  <img src="./height.png"> ${Math.round(
    attributes.heightroof
  )} feet
  <img src='./construction.png'> ${attributes.cnstrct_yr
    }
</p>`;

  let articleUrl = undefined;
  if (name !== "Building") {
    const wikiResult = await getWikiContent();
    content += wikiResult.extract ?? "";
    articleUrl = wikiResult.articleUrl;
  }

  const { gallery, photoCount } = await getFlickrPhotoContent();
  content += gallery ?? "";

  const contentEl = document.createElement("div");
  contentEl.innerHTML = content;
  await view.openPopup({
    title: name,
    content: contentEl,
    location: position
  });

  setupActions({ articleUrl, photoCount });
  setupGallery(contentEl);

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
      ggscoord: `${position.latitude}|${position.longitude}`,
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

  // Flickr API is used to retrieve images that are under Creative Commons license
  // Please see the Flickr API Terms of Use here: https://www.flickr.com/services/api/tos/
  async function getFlickrPhotoContent(): Promise<{ gallery?: string; photoCount: number }> {
    const url = new URL("https://api.flickr.com/services/rest/");
    url.search = new URLSearchParams({
      method: "flickr.photos.search",
      api_key: "099473f4030cba02455eb7db33704767",
      tags: "building",
      accuracy: "16",
      has_geo: "true",
      license: "2,3,4,5,6,7",
      lat: position.latitude.toString(),
      lon: position.longitude.toString(),
      radius: "0.1"
    }).toString();

    const response = await request(url, { responseType: "xml" });
    const photos: Element[] = response.data.getElementsByTagName("photo");
    const photoCount = photos.length;
    if (photoCount == 0) {
      return { photoCount };
    }
    const gallery = createGalleryContent(Array.from(photos).slice(0, settings.maxPhotoCount));
    return { gallery, photoCount };
  }

  function setupActions({ articleUrl, photoCount }: { articleUrl?: string; photoCount: number }) {
    const wikiActionId = "wiki-action";
    const flickrActionId = "flickr-action";

    view.popup.actions.removeAll();
    if (articleUrl) {
      view.popup.actions.push(
        new ActionButton({
          title: "Wikipedia",
          id: wikiActionId,
          icon: "article"
        })
      );
    }
    if (photoCount > 0) {
      view.popup.actions.push(
        new ActionButton({
          title: "Photos",
          id: flickrActionId,
          icon: "images"
        })
      );
    }
    const handleGroupKey = "info-widget-actions";
    const handle = view.popup.on("trigger-action", (event) => {
      switch (event.action.id) {
        case wikiActionId: {
          window.open(articleUrl, "_blank");
          break;
        }
        case flickrActionId: {
          const queryUrl = new URL("https://www.flickr.com/search/");
          queryUrl.search = new URLSearchParams({
            tags: "building",
            accuracy: "16",
            has_geo: "true",
            lat: position.latitude.toString(),
            lon: position.longitude.toString(),
            radius: "0.1"
          }).toString();
          window.open(queryUrl.toString(), "_blank");
          break;
        }
      }
      view.popup.removeHandles(handleGroupKey);
      view.popup.addHandles(handle, handleGroupKey);
    });
  }
}

function createGalleryContent(photos: Element[]) {
  const slideEls = photos.map((photo) => {
    const url = `https://farm${photo.getAttribute("farm")}.staticflickr.com/${photo.getAttribute(
      "server"
    )}/${photo.getAttribute("id")}_${photo.getAttribute("secret")}.jpg`;
    const link = `https://www.flickr.com/photos/${photo.getAttribute("owner")}/${photo.getAttribute("id")}/`;
    let attributionTitle = photo.getAttribute("title")!;
    if (attributionTitle.length > settings.maxAttributionLength) {
      attributionTitle = attributionTitle?.slice(0, settings.maxAttributionLength - 3) + "...";
    }
    return `<div class="swiper-slide">
<div class="image" style="background-image: url('${url}')"></div>
<a class="attribution" href="${link}" target = "_blank"><b>${attributionTitle}</b> courtesy of Flickr</a>
</div>`;
  });

  return `
<div class="swiper">
  <div class="swiper-wrapper">
    ${slideEls.join("\n")}
  </div>
  <div class="swiper-pagination"></div>
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
</div>`;
}

function setupGallery(popupContentEl: HTMLElement) {
  const swiperEl = popupContentEl.getElementsByClassName("swiper")[0] as HTMLElement;
  const prevEl = popupContentEl.getElementsByClassName("swiper-button-prev")[0] as HTMLElement;
  const nextEl = popupContentEl.getElementsByClassName("swiper-button-next")[0] as HTMLElement;
  new Swiper(swiperEl, {
    loop: true,
    modules: [Navigation],
    navigation: {
      prevEl,
      nextEl
    }
  });
}
