import{es as p,eu as b,dv as v,dw as u,h8 as c,h9 as f,dx as m,br as g,ha as L,aU as d,hb as _,eJ as w,hc as O,ai as t,aj as a,cH as M,aZ as $,b4 as x,aV as y,al as V,bx as C,aw as T}from"./index-112c244d.js";import{a as j}from"./lazyLayerLoader-8f831dc7.js";const H=Symbol("WebScene");let s=class extends p(b(v(u(c(f(m(C))))))){constructor(e){super(e),this.allLayers=new g({getCollections:()=>[this.layers],getChildrenFunction:i=>"layers"in i?i.layers:null}),this.allTables=L(this),this.fullExtent=void 0,this.operationalLayerType="GroupLayer",this.spatialReference=void 0,this.type="group"}initialize(){this._enforceVisibility(this.visibilityMode,this.visible),this.addHandles([d(()=>{let e=this.parent;for(;e&&"parent"in e&&e.parent;)e=e.parent;return e&&H in e},e=>{const i="prevent-adding-tables";this.removeHandles(i),e&&(this.tables.removeAll(),this.addHandles(x(()=>this.tables,"before-add",r=>{r.preventDefault(),T.getLogger(this).errorOnce("tables","Tables are not yet supported in a WebScene so they can't be added.")}),i))},$),d(()=>this.visible,this._onVisibilityChange.bind(this),y)])}destroy(){this.allLayers.destroy(),this.allTables.destroy()}_writeLayers(e,i,r,l){const o=[];if(!e)return o;e.forEach(h=>{const n=_(h,l.webmap?l.webmap.getLayerJSONFromResourceInfo(h):null,l);n!=null&&n.layerType&&o.push(n)}),i.layers=o}set portalItem(e){this._set("portalItem",e)}set visibilityMode(e){const i=this._get("visibilityMode")!==e;this._set("visibilityMode",e),i&&this._enforceVisibility(e,this.visible)}load(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection","Scene Service"],layerModuleTypeMap:j},e)),Promise.resolve(this)}async loadAll(){return w(this,e=>{e(this.layers,this.tables)})}layerAdded(e){e.visible&&this.visibilityMode==="exclusive"?this._turnOffOtherLayers(e):this.visibilityMode==="inherited"&&(e.visible=this.visible),this.hasHandles(e.uid)?console.error(`Layer readded to Grouplayer: uid=${e.uid}`):this.addHandles(d(()=>e.visible,i=>this._onChildVisibilityChange(e,i),y),e.uid)}layerRemoved(e){this.removeHandles(e.uid),this._enforceVisibility(this.visibilityMode,this.visible)}_turnOffOtherLayers(e){this.layers.forEach(i=>{i!==e&&(i.visible=!1)})}_enforceVisibility(e,i){if(!O(this).initialized)return;const r=this.layers;let l=r.find(o=>o.visible);switch(e){case"exclusive":r.length&&!l&&(l=r.at(0),l.visible=!0),this._turnOffOtherLayers(l);break;case"inherited":r.forEach(o=>{o.visible=i})}}_onVisibilityChange(e){this.visibilityMode==="inherited"&&this.layers.forEach(i=>{i.visible=e})}_onChildVisibilityChange(e,i){switch(this.visibilityMode){case"exclusive":i?this._turnOffOtherLayers(e):this._isAnyLayerVisible()||(e.visible=!0);break;case"inherited":e.visible=this.visible}}_isAnyLayerVisible(){return this.layers.some(e=>e.visible)}};t([a({readOnly:!0,dependsOn:[]})],s.prototype,"allLayers",void 0),t([a({readOnly:!0})],s.prototype,"allTables",void 0),t([a()],s.prototype,"fullExtent",void 0),t([a({json:{read:!0,write:!0}})],s.prototype,"blendMode",void 0),t([a({json:{read:!1,write:{ignoreOrigin:!0}}})],s.prototype,"layers",void 0),t([M("layers")],s.prototype,"_writeLayers",null),t([a({type:["GroupLayer"]})],s.prototype,"operationalLayerType",void 0),t([a({json:{origins:{"web-document":{read:!1,write:!1}}}})],s.prototype,"portalItem",null),t([a()],s.prototype,"spatialReference",void 0),t([a({json:{read:!1},readOnly:!0,value:"group"})],s.prototype,"type",void 0),t([a({type:["independent","inherited","exclusive"],value:"independent",json:{write:!0,origins:{"web-map":{type:["independent","exclusive"],write:(e,i,r)=>{e!=="inherited"&&(i[r]=e)}}}}})],s.prototype,"visibilityMode",null),s=t([V("esri.layers.GroupLayer")],s);const A=s;export{A as default};
