import{cN as f}from"./index-112c244d.js";function a(t){return t?Z:y}function v(t,e){return e!=null&&e.mode?e.mode:a(t).mode}function d(t,e){return e??a(t)}function g(t,e){return v(t!=null&&t.hasZ,e)}function P(t,e){return d(t!=null&&!!t.hasZ,e)}function p(t){const e=h(t),n=g(t.geometry,e);return{mode:n,offset:e!=null&&n!=="on-the-ground"?(e.offset??0)*f(e.unit??"meters"):0}}function h(t){return t.layer&&"elevationInfo"in t.layer?t.layer.elevationInfo:null}function w(t,e,n,o=null){return c(t,e.x,e.y,e.hasZ?e.z:0,e.spatialReference,n,o)}function x(t,e,n,o,u=null){return c(t,e[0],e[1],e.length>2?e[2]:0,n,o,u)}function c(t,e,n,o,u,i,l=null){if(i==null)return;const r=l!=null?l.mode:"absolute-height";if(r==="on-the-ground")return 0;const{absoluteZ:s}=m(e,n,o,u,t,i);return b(s,e,n,o,u,t,l,r)}function m(t,e,n,o,u,i){const l=i.offset!=null?i.offset:0;switch(i.mode){case"absolute-height":return{absoluteZ:n+l,elevation:0};case"on-the-ground":{const r=u.elevationProvider.getElevation(t,e,0,o,"ground")??0;return{absoluteZ:r,elevation:r}}case"relative-to-ground":{const r=u.elevationProvider.getElevation(t,e,n,o,"ground")??0;return{absoluteZ:n+r+l,elevation:r}}case"relative-to-scene":{const r=u.elevationProvider.getElevation(t,e,n,o,"scene")??0;return{absoluteZ:n+r+l,elevation:r}}}}function b(t,e,n,o,u,i,l,r){const s=l!=null&&l.offset!=null?l.offset:0;switch(r){case"absolute-height":return t-s;case"relative-to-ground":return t-((i.elevationProvider.getElevation(e,n,o,u,"ground")??0)+s);case"relative-to-scene":return t-((i.elevationProvider.getElevation(e,n,o,u,"scene")??0)+s)}}function I(t,e){if(e==null)return!1;const{mode:n}=e;return n!=null&&(t==="scene"&&n==="relative-to-scene"||t==="ground"&&n!=="absolute-height")}const Z={mode:"absolute-height",offset:0},y={mode:"on-the-ground",offset:null};export{Z as b,w as c,m as g,I as m,y as p,g as r,p as s,P as u,x as v};
