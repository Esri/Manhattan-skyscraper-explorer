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

define([
  "dojo/_base/declare",
  "esri/request",
  "esri/config"
], function(declare, esriRequest, esriConfig) {

  return declare(null, {

    constructor: function(view, state) {

      this.view = view;

      view.popup.watch("visible", function(newValue) {
        if (!newValue) {
          state.selectedBuilding = null;
        }
      });

      esriConfig.request.corsEnabledServers.push("https://en.wikipedia.org/", "https://api.flickr.com/");
    },

    setContent: function(position, attributes) {

      var view = this.view;

      // set the building name, height and construction year from the building attributes
      var name = (attributes.name === " ") ? "Building" : attributes.name;
      view.popup.content = "<h3>" + name  + "</h3>"
      + "<p class='info'> <img src='./img/height.png'> " + Math.round(attributes.heightroof) + " feet"
      + "<img src='./img/construction.png'> " + attributes.cnstrct_yr + "</p>";

      view.popup.open();

      if (name !== "Building") {
        getWikiInfo().then(getFlickrPhotos);
      }
      else {
        getFlickrPhotos();
      }

      // Wikipedia API is used to retrieve an abstract of the building. All retrieved
      // articles are under the Creative Commons Attribution-ShareAlike License.
      // See https://wikimediafoundation.org/wiki/Terms_of_Use for details.
      function getWikiInfo() {
        var url = "https://en.wikipedia.org/w/api.php?action=query" +
        "&list=search&srsearch=" + attributes.name + "&srwhat=text&prop=extracts|pageimages|imageinfo|pageterms|info&exintro=1&explaintext=1&exlimit=20&pilimit=20&piprop=original" +
        "&generator=geosearch&ggscoord=" + position.latitude + "%7C" + position.longitude + "&ggsradius=200&ggslimit=20&origin=*&format=json";
        return esriRequest(url, {
          responseType: "json"
        }).then(function(response) {
          var pages = response.data.query.pages;
          var search = response.data.query.search;
          var article = null, i = 0;
          while ((!article) && (i < search.length)) {
            for (var prop in pages) {
              if ((pages.hasOwnProperty(prop)) && (search[i].title === pages[prop].title)) {
                article = pages[prop];
                break;
              }
            }
            i++;
          }
          if (article) {
            var extract = article.extract.length > 200 ? article.extract.substring(0, article.extract.indexOf(".", 200) + 1) : article.extract;
            view.popup.content += "<p>" + extract +
            " <a href='http://en.wikipedia.org/wiki/" + article.title.replace(" ", "_") + "' target='_blank'> Read the entire article on Wikipedia</a></p>";
          }
        });
      }

      // Flickr API is used to retrieve images that are under Creative Commons license
      // Please see the Flickr API Terms of Use here: https://www.flickr.com/services/api/tos/

      function getFlickrPhotos() {
        var url = "https://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&api_key=099473f4030cba02455eb7db33704767&tags=building&accuracy=16&license=2,3,4,5,6,7" +
        "&has_geo=true&lat=" + position.latitude + "&lon=" + position.longitude + "&radius=0.1";
        esriRequest(url, { responseType: "xml"})
          .then(function(response) {
            var photos = response.data.getElementsByTagName("photo");
            var noPhotos = 10;
            if (photos.length < noPhotos) {
              noPhotos = photos.length;
            }
            if (noPhotos > 0) {
              var gallery = "<div class='galleria'>";
              for (var i = 0; i < noPhotos; i++) {
                var photo = photos[i];
                var url = "https://farm" + photo.getAttribute("farm") + ".staticflickr.com/" + photo.getAttribute("server") + "/" + photo.getAttribute("id") + "_" + photo.getAttribute("secret") + ".jpg";
                var link = "&apos;https://www.flickr.com/photos/" + photo.getAttribute("owner") + "/" + photo.getAttribute("id") + "/&apos;"
                var titleText = "'<a href=" + link + " target = &apos;_blank&apos;> Image: <b>" + photo.getAttribute("title") + "</b> courtesy of Flickr</a>'";
                var image = "<a target='_blank' href='" + url + "'><img data-title =" + titleText + " src='" + url + "'></a>";
                gallery += image;
              }
              view.popup.content += gallery + "</div>" +
              "<a id='link-flickr' href='https://www.flickr.com/search/?tags=building&accuracy=16" +
              "&has_geo=true&lat=" + position.latitude + "&lon=" + position.longitude + "&radius=0.1" +
              "' target = '_blank'>See more images on Flickr</a>";
              Galleria.loadTheme(location.pathname.replace(/\/[^/]+$/, "") + "/lib/galleria/themes/classic/galleria.classic.js");
              Galleria.run(".galleria");
            }
          }).otherwise(function(err) {
            console.log(err);
          });
      }
    }
  });
});
