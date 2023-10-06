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

import * as d3 from "d3";

import Color from "@arcgis/core/Color";
import Graphic from "@arcgis/core/Graphic";

import settings from "./settings";
import { State } from "./State";

/**
 * This class builds the graph that displays
 * the correlation between building height and
 * construction year.
 */

export default class HeightGraph {
  width: number;
  height: number;
  paddingLeft: number;
  paddingTop: number;
  paddingBottom: number;

  circles: d3.Selection<SVGCircleElement, Graphic, SVGSVGElement, unknown>;
  highlightContainer: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;

  constructor(container: string, features: Graphic[], state: State) {
    // general settings for the svg area
    this.width = document.getElementById(container)!.clientWidth;
    this.height = document.getElementById(container)!.clientHeight;
    this.paddingLeft = 90;
    this.paddingTop = 20;
    this.paddingBottom = 15;

    // define svg
    const svg = d3
      .select("#" + container)
      .append("svg")
      .attr("height", this.height)
      .attr("width", this.width + 2);

    // create scales
    const buildingOptions = settings.buildingOptions;
    const xScale = d3
      .scaleLinear()
      .domain([buildingOptions.minCnstrctYear - 1, buildingOptions.maxCnstrctYear])
      .range([this.paddingLeft, this.width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, buildingOptions.maxHeight])
      .range([this.height - this.paddingBottom, this.paddingTop]);

    // create axes
    const yAxis = d3
      .axisLeft(yScale)
      .tickValues([0, 500, 1000, 1500])
      .tickFormat((d) => (d === 1500 ? d + " ft" : d.toString()))
      .tickPadding(10);

    // add helper lines that will show the values on the vertical axis
    function appendHorizontalLine(x1: number, y1: number, x2: number, y2: number) {
      svg
        .append("line")
        .attr("x1", x1)
        .attr("y1", yScale(y1))
        .attr("x2", xScale(x2))
        .attr("y2", yScale(y2))
        .style("stroke-dasharray", "2, 2")
        .style("stroke", "#bbb");
    }
    appendHorizontalLine(this.paddingLeft, 1000, 2025, 1000);
    appendHorizontalLine(this.paddingLeft, 500, 2025, 500);
    appendHorizontalLine(this.paddingLeft, 0, 2025, 0);
    appendHorizontalLine(this.paddingLeft, 1408, 2009, 1408);

    // add image of the building to better understand the vertical height axis
    svg
      .append("image")
      .attr("xlink:href", "./world-trade-center.png")
      .attr("y", 30)
      .attr("x", 10)
      .attr("height", this.height - 43)
      .attr("width", 25);

    // handlers for filtering
    const groupHandlers = svg.append("g");
    groupHandlers
      .append("rect")
      .classed("top", true)
      .attr("x", xScale(2020))
      .attr("y", yScale(buildingOptions.maxHeight) - 9)
      .attr("width", 50)
      .attr("height", 6)
      .attr("rx", 5)
      .attr("ry", 0)
      .attr("cursor", "ns-resize")
      .style("fill", "#bbb");
    groupHandlers
      .append("rect")
      .classed("bottom", true)
      .attr("x", xScale(2020))
      .attr("y", yScale(buildingOptions.minHeight) - 1)
      .attr("width", 50)
      .attr("height", 6)
      .attr("rx", 5)
      .attr("ry", 0)
      .attr("cursor", "ns-resize")
      .style("fill", "#bbb");

    // define vertical axis and append it to the svg container
    const yAxisGroup = svg
      .append("g")
      .attr("transform", "translate(" + this.paddingLeft + ", 0)")
      .call(yAxis);

    // brush added for filtering
    const brush = d3.brushY().extent([
      [0, this.paddingTop],
      [this.width, this.height - this.paddingBottom]
    ]);
    yAxisGroup.call(brush).call(brush.move, [yScale(buildingOptions.maxHeight), yScale(buildingOptions.minHeight)]);
    svg.select(".overlay").attr("display", "none");

    // add building features as circles to the graph
    const circles = svg
      .selectAll("circle")
      .data(features)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("class", function (d) {
        let value;
        settings.ageClasses.forEach(function (e, i) {
          if (e.minValue <= d.attributes.cnstrct_yr && d.attributes.cnstrct_yr <= e.maxValue) {
            value = i;
          }
        });
        return "construct-" + value;
      })
      .classed("circle", true)
      .attr("id", function (d) {
        return "id-" + d.attributes.objectid;
      })
      .attr("fill", function (d) {
        const value = settings.ageClasses.filter(function (e) {
          return e.minValue <= d.attributes.cnstrct_yr && d.attributes.cnstrct_yr <= e.maxValue;
        });
        const color = value[0].color.clone();
        color.a = 0.7;
        return color.toCss();
      })
      .attr("cx", function (d) {
        return xScale(d.attributes.cnstrct_yr);
      })
      .attr("cy", function (d) {
        return yScale(d.attributes.heightroof);
      })
      .on("click", function (_e, d) {
        state.selectedBuilding = d;
      });

    // add text that shows the height of the buildings that are filtered
    svg
      .append("text")
      .attr("x", this.paddingLeft + 2)
      .attr("id", "upper-indicator");

    svg
      .append("text")
      .attr("x", this.paddingLeft + 2)
      .attr("id", "lower-indicator");

    // add event listeners when filters are changed
    brush.on("brush", function (e) {
      groupHandlers.select("rect.top").attr("y", e.selection[0] - 9);
      groupHandlers.select("rect.bottom").attr("y", e.selection[1] - 1);
      svg
        .select("#upper-indicator")
        .attr("y", e.selection[0] - 5)
        .text(Math.round(yScale.invert(e.selection[0])));
      svg
        .select("#lower-indicator")
        .attr("y", e.selection[1] + 15)
        .text(Math.round(yScale.invert(e.selection[1])));
      state.filteredBuildings = [yScale.invert(e.selection[1]), yScale.invert(e.selection[0])];
    });
    brush.on("end", function (e) {
      svg.select("#upper-indicator").text("");
      svg.select("#lower-indicator").text("");
      if (!e.selection) {
        yAxisGroup.call(brush).call(brush.move, [yScale(1500), yScale(0)]);
      }
    });

    // add the circles and the selection
    this.circles = circles;
    this.highlightContainer = svg.append("g");
  }

  // add a circle that will act like a highlight when a circle is clicked on
  highlight(feature: Graphic) {
    const elem = d3.select("#id-" + feature.attributes.objectid);
    const cx = parseInt(elem.attr("cx"), 10);
    const cy = parseInt(elem.attr("cy"), 10);

    this.highlightContainer
      .append("circle")
      .attr("class", "highlightedGraphic")
      .attr("r", 8)
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("stroke-width", 4)
      .attr("stroke", settings.highlightOptions.color.toCss())
      .attr("fill", "none");

    const textBackground = this.highlightContainer
      .append("rect")
      .attr("class", "highlightedGraphic")
      .attr("width", 100)
      .attr("height", 100)
      .attr("x", cx)
      .attr("y", cy - 21)
      .attr("fill", "000");

    const text = this.highlightContainer
      .append("text")
      .attr("class", "tooltip")
      .attr("class", "highlightedGraphic")
      .classed("hover-graphic", true)
      .attr("x", cx)
      .attr("y", cy - 21)
      .attr("text-anchor", "middle")
      .text(() => {
        const attributes = feature.attributes;
        const name = attributes.name.trim() !== "" ? attributes.name : "Building";
        return `${name} built in ${attributes.cnstrct_yr}; height: ${parseInt(attributes.heightroof, 10)} feet`;
      });

    const textBox = text.node()!.getBBox();
    textBackground
      .attr("x", textBox.x - 4)
      .attr("y", textBox.y - 4)
      .attr("width", textBox.width + 8)
      .attr("height", textBox.height + 8)
      .style("fill", "#ddd")
      .style("fill-opacity", ".9");
  }

  // remove circle that acts like a selection highlight
  deselect() {
    this.highlightContainer.selectAll(".highlightedGraphic").remove();
  }

  // color the buildings according to the new selected period
  updatePeriod(newPeriod: boolean[]) {
    for (let i = 0; i < newPeriod.length; i++) {
      let color: Color;
      if (newPeriod[i]) {
        color = settings.ageClasses[i].color.clone();
        color.a = 0.8;
      } else {
        color = settings.defaultColor;
      }
      this.circles.filter(".construct-" + i).attr("fill", color.toCss(true));
    }
  }

  // set display:none to circles when the corresponding buildings are filtered out
  updateFilter(newFilter: number[]) {
    this.circles.attr("display", function (d) {
      if (d.attributes.heightroof < newFilter[0] || d.attributes.heightroof > newFilter[1]) {
        return "none";
      } else {
        return "inline";
      }
    });
  }

  // change the size and opacity of points when a category is selected
  applyCategory(newCategory: string) {
    if (newCategory === "all") {
      this.circles.attr("opacity", 1).attr("r", 4);
    } else {
      const property = newCategory === "info" ? "wiki" : "top20";
      this.circles
        .attr("opacity", function (d) {
          if (d.attributes[property] === 1) {
            return 1;
          } else {
            return 0.2;
          }
        })
        .attr("r", function (d) {
          if (d.attributes[property] === 1) {
            return 4;
          } else {
            return 1;
          }
        });
    }
  }
}
