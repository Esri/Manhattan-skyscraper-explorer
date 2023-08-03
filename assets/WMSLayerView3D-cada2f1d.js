import{ai as a,aj as h,cU as f,al as c,ah as w,at as m,ci as x}from"./index-112c244d.js";import{z as g}from"./DynamicLayerView3D-6d83bbe6.js";import{l as P}from"./ExportWMSImageParameters-4631554c.js";import"./LayerView3D-10a2ef73.js";import"./projectExtentUtils-4e67eae2.js";import"./ImageMaterial-f381f1e6.js";import"./LayerView-ec7266a0.js";import"./RefreshableLayerView-a3a03c2d.js";const v=s=>{let e=class extends s{initialize(){this.exportImageParameters=new P({layer:this.layer})}destroy(){this.exportImageParameters=w(this.exportImageParameters)}get exportImageVersion(){return this.exportImageParameters?.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}fetchPopupFeatures(r){const{layer:t}=this;if(!r)return Promise.reject(new m("wmslayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:t}));const{popupEnabled:o}=t;if(!o)return Promise.reject(new m("wmslayerview:fetchPopupFeatures","popupEnabled should be true",{popupEnabled:o}));const n=this.createFetchPopupFeaturesQuery(r);if(!n)return Promise.resolve([]);const{extent:p,width:i,height:u,x:d,y}=n;if(!(p&&i&&u))throw new m("wmslayerview:fetchPopupFeatures","WMSLayer does not support fetching features.",{extent:p,width:i,height:u});return t.fetchFeatureInfo(p,i,u,d,y)}};return a([h()],e.prototype,"exportImageParameters",void 0),a([h({readOnly:!0})],e.prototype,"exportImageVersion",null),a([h()],e.prototype,"layer",void 0),a([h(f)],e.prototype,"timeExtent",void 0),e=a([c("esri.layers.mixins.WMSLayerView")],e),e};let l=class extends v(g){constructor(){super(...arguments),this.type="wms-3d"}initialize(){this.layer.serviceSupportsSpatialReference(this.view.spatialReference)||this.addResolvingPromise(Promise.reject(new m("layerview:spatial-reference-incompatible","The spatial references supported by this WMS layer are incompatible with the spatial reference of the view"))),this.updatingHandles.add(()=>this.exportImageParameters?.version,()=>{this.updatingHandles.addPromise(this.refreshDebounced())})}createFetchPopupFeaturesQuery(s){const e=this.findExtentInfoAt(s),r=e.extent,t=new x(r[0],r[1],r[2],r[3],this._spatialReference),o=e.imageSize,n=o.width,p=o.height,i=t.width/n;return{extent:t,width:n,height:p,x:Math.round((s.x-t.xmin)/i),y:Math.round((t.ymax-s.y)/i)}}getFetchOptions(){return{timeExtent:this.timeExtent}}};l=a([c("esri.views.3d.layers.WMSLayerView3D")],l);const z=l;export{z as default};
