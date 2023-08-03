/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */function a(t){return f(t)}function c(t){return i(t,"offsetTop")}function l(t){return i(t,"offsetLeft")}function r(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function u(t){const e=new Set;let n=t.getRootNode();for(;n;)e.add(n),n=n.parentNode?n.parentNode.getRootNode():null;return e}function f(t){for(let e=t;e;e=r(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=r(t);e;e=r(e)){if(!(e instanceof Element))continue;const n=getComputedStyle(e);if(n.display!=="contents"&&(n.position!=="static"||n.filter!=="none"||e.tagName==="BODY"))return e}return null}function i(t,e){let n=t[e],o=f(t);const s=u(t);for(;o&&!s.has(o.getRootNode());)n-=o[e],o=f(o);return n}export{l as offsetLeft,a as offsetParent,c as offsetTop};
