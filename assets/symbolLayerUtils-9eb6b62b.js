import{ej as d,ai as t,bo as v,aQ as y,ek as u,cB as p,el as b,bx as c}from"./index-9e6e60fd.js";let n=l();function l(){return new d(50)}function g(){n=l()}async function x(e,r){if(e.resource?.href)return w(e.resource.href).then(o=>[o.width,o.height]);if(e.resource?.primitive)return r!=null?[r,r]:[256,256];throw new t("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function w(e){return v(e,{responseType:"image"}).then(r=>r.data)}async function B(e,r=null){if(!e.isPrimitive){const i=e.resource.href;if(!i)throw new t("symbol:invalid-resource","The symbol does not have a valid resource");const s=n.get(i);if(s!==void 0)return s;const{fetch:f}=await y(()=>import("./index-9e6e60fd.js").then(m=>m.wE),["./index-9e6e60fd.js","./index-a616bda8.css"],import.meta.url),h=await f(i,{disableTextures:!0}),a=u(h.referenceBoundingBox,c());return n.put(i,a),a}if(!e.resource?.primitive)throw new t("symbol:invalid-resource","The symbol does not have a valid resource");const o=p(b(e.resource.primitive));if(r!=null)for(let i=0;i<o.length;i++)o[i]*=r;return u(o,c())}export{g as clearBoundingBoxCache,x as computeIconLayerResourceSize,B as computeObjectLayerResourceSize};
