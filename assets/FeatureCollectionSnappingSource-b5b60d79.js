import{ao as f,aU as u,ag as c,b4 as b,b_ as s,ai as r,aj as a,al as E,f5 as F}from"./index-112c244d.js";import{m as V}from"./elevationInfoUtils-92bce67b.js";import{E as C,b as D}from"./DimensionAnalysisView3D-c04330bf.js";import{i as $,o as A}from"./queryEngineUtils-18b1eaf4.js";import{i as h,r as I,n as m}from"./symbologySnappingCandidates-654b9f37.js";import"./LineVisualElement-ba997fc6.js";import"./LengthDimension-49a4cbc2.js";import"./Segment-67ac1711.js";import"./unitFormatUtils-7dfe0559.js";import"./analysisViewUtils-ee698129.js";import"./ImageMaterial-f381f1e6.js";import"./Factory-ce49f342.js";import"./RightAngleQuadVisualElement-fb8e074d.js";import"./VisualElementResources-37c38039.js";import"./PointVisualElement-04ad3e7c.js";import"./EditGeometryOperations-304f923b.js";import"./dehydratedFeatureComparison-9908f9d9.js";import"./VertexSnappingCandidate-a3aaf901.js";let n=class extends f{get availability(){return 1}get updating(){return this.layerSource.updating}get _snappingElevationAligner(){const{view:e}=this,{layer:t}=this.layerSource,i=e!=null&&e.type==="3d";if(!i||t.type==="subtype-group")return h();const o=async(p,l)=>(await F(e.whenLayerView(t),l)).elevationAlignPointsInFeatures(p,l);return h(i,{elevationInfo:t.elevationInfo,alignPointsInFeatures:o,spatialReference:e.spatialReference})}get _snappingElevationFilter(){const{view:e}=this,t=e!=null&&e.type==="3d"&&this.layerSource.layer.type!=="subtype-group";return I(t)}get _symbologySnappingFetcher(){const{view:e}=this,{layer:t}=this.layerSource;return e!=null&&e.type==="3d"&&t.type!=="subtype-group"?m(this._symbologySnappingSupported,async(i,o)=>{const p=await e.whenLayerView(t);return s(o),p.queryForSymbologySnapping({candidates:i,spatialReference:e.spatialReference},o)}):m()}get _symbologySnappingSupported(){return this._layerView3D!=null&&this._layerView3D.symbologySnappingSupported}initialize(){const{view:e}=this,{layer:t}=this.layerSource;e!=null&&e.type==="3d"&&t.type!=="subtype-group"&&(e.whenLayerView(t).then(i=>this._layerView3D=i),this.addHandles([e.elevationProvider.on("elevation-change",({context:i})=>{const{elevationInfo:o}=t;V(i,o)&&this._snappingElevationAligner.notifyElevationSourceChange()}),u(()=>t.elevationInfo,()=>this._snappingElevationAligner.notifyElevationSourceChange(),c),u(()=>this._layerView3D!=null?this._layerView3D.processor?.renderer:null,()=>this._symbologySnappingFetcher.notifySymbologyChange(),c),b(()=>this._layerView3D?.layer,["edits","apply-edits","graphic-update"],()=>this._symbologySnappingFetcher.notifySymbologyChange())]))}constructor(e){super(e),this.view=null,this._layerView3D=null}refresh(){}async fetchCandidates(e,t){const{layer:i}=this.layerSource,o=i.source;if(!o?.querySnapping)return[];const p=C(i),l=D(e,this.view?.type??"2d",p),v=await o.querySnapping(l,{signal:t});s(t);const y=await this._snappingElevationAligner.alignCandidates(v.candidates,t);s(t);const g=await this._symbologySnappingFetcher.fetch(y,t);s(t);const d=g.length===0?y:[...y,...g],S=this._snappingElevationFilter.filter(l,d),w=this._getGroundElevation;return S.map(_=>$(_,w))}get _getGroundElevation(){return A(this.view)}};r([a({constructOnly:!0})],n.prototype,"layerSource",void 0),r([a({constructOnly:!0})],n.prototype,"view",void 0),r([a()],n.prototype,"_snappingElevationAligner",null),r([a()],n.prototype,"_snappingElevationFilter",null),r([a()],n.prototype,"_symbologySnappingFetcher",null),r([a()],n.prototype,"_layerView3D",void 0),r([a()],n.prototype,"_symbologySnappingSupported",null),r([a()],n.prototype,"_getGroundElevation",null),n=r([E("esri.views.interactive.snapping.featureSources.FeatureCollectionSnappingSource")],n);export{n as FeatureCollectionSnappingSource};
