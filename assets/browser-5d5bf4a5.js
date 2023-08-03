/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */function e(t){return t.map(r=>{let n="";for(let a=0;a<r;a++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n}).join("-")}const o=()=>e([2,1,1,1,3]);/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */function g(){return navigator.userAgentData}function s(){const t=g();return t?.brands?t.brands.map(({brand:r,version:n})=>`${r}/${n}`).join(" "):navigator.userAgent}export{s as a,g as b,o as g};
