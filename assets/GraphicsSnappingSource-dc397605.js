import{cx as f,ao as v,ag as h,aU as S,b4 as w,f6 as b,b_ as d,a_ as k,f7 as E,ak as C,f8 as u,aQ as F,dd as A,dV as R,bQ as G,f9 as P,ai as a,aj as l,al as I,f5 as x,fa as O}from"./index-112c244d.js";import{a as $}from"./normalizeUtilsSync-a418a23d.js";import{m as Z}from"./FeatureStore-9e22cc1d.js";import{e as z}from"./QueryEngine-9560ee9b.js";import{m as H}from"./elevationInfoUtils-92bce67b.js";import{u as L,b as M}from"./DimensionAnalysisView3D-c04330bf.js";import{i as W,o as j}from"./queryEngineUtils-18b1eaf4.js";import{i as y,r as q,n as g}from"./symbologySnappingCandidates-654b9f37.js";import"./normalizeUtilsCommon-448ddeb2.js";import"./BoundsStore-8a888707.js";import"./PooledRBush-f65c099f.js";import"./quickselect-89073317.js";import"./optimizedFeatureQueryEngineAdapter-a3b2ad14.js";import"./centroid-3dcadaf5.js";import"./normalizeUtils-ca47990d.js";import"./WhereClause-fb3d85c4.js";import"./executionError-e8d36121.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./utils-86593ea2.js";import"./generateRendererUtils-455ff246.js";import"./LineVisualElement-ba997fc6.js";import"./LengthDimension-49a4cbc2.js";import"./Segment-67ac1711.js";import"./unitFormatUtils-7dfe0559.js";import"./analysisViewUtils-ee698129.js";import"./ImageMaterial-f381f1e6.js";import"./Factory-ce49f342.js";import"./RightAngleQuadVisualElement-fb8e074d.js";import"./VisualElementResources-37c38039.js";import"./PointVisualElement-04ad3e7c.js";import"./EditGeometryOperations-304f923b.js";import"./dehydratedFeatureComparison-9908f9d9.js";import"./VertexSnappingCandidate-a3aaf901.js";const m="graphics-collections";let r=class extends f(v){get updating(){return this.updatingHandles.updating}get _hasZ(){const e=this.view;return e!=null&&e.type==="3d"&&this.layerSource.layer.type!=="map-notes"}get _snappingElevationAligner(){const{view:e}=this,{layer:t}=this.layerSource,i=e!=null&&e.type==="3d";if(!i||t.type==="map-notes")return y();const s=async(n,o)=>(await x(e.whenLayerView(t),o)).elevationAlignPointsInFeatures(n,o);return y(i,{elevationInfo:t.elevationInfo,alignPointsInFeatures:s,spatialReference:e.spatialReference})}get _snappingElevationFilter(){const{view:e}=this,t=e!=null&&e.type==="3d"&&this.layerSource.layer.type!=="map-notes";return q(t)}get _symbologySnappingFetcher(){const{view:e}=this,{layer:t}=this.layerSource,i=e!=null&&e.type==="3d",s=this._extrudedPolygonSymbolsCount>0;return i&&t.type!=="map-notes"&&s?g(s,async(n,o)=>{const p=await e.whenLayerView(t);return d(o),p.queryForSymbologySnapping({candidates:n,spatialReference:e.spatialReference},o)}):g()}constructor(e){super(e),this.availability=1,this._sources={multipoint:null,point:null,polygon:null,polyline:null},this._loadedWkids=new Set,this._loadedWkts=new Set,this._pendingAdds=[],this._extrudedPolygonSymbolsCount=0}destroy(){for(const e of this._pendingAdds)e.task.abort();this._pendingAdds.length=0,this._mapSources(e=>this._destroySource(e))}initialize(){this.updatingHandles.add(()=>this.getGraphicsLayers(),i=>{this.updatingHandles.removeHandles(m);for(const s of i)this._addMany(s.graphics.toArray()),this.handles.add([s.on("graphic-update",n=>this._onGraphicUpdate(n)),this.updatingHandles.addOnCollectionChange(()=>s.graphics,n=>this._onGraphicsChanged(n))],m)},h);const{view:e}=this,{layer:t}=this.layerSource;e!=null&&e.type==="3d"&&t.type!=="map-notes"&&this.addHandles([e.elevationProvider.on("elevation-change",({context:i})=>{H(i,t.elevationInfo)&&this._snappingElevationAligner.notifyElevationSourceChange()}),S(()=>t.elevationInfo,()=>this._snappingElevationAligner.notifyElevationSourceChange(),h),w(()=>t,["edits","apply-edits","graphic-update"],()=>this._symbologySnappingFetcher.notifySymbologyChange())])}async fetchCandidates(e,t){const{point:i}=e,s=await b(this._mapSources(p=>this._fetchCandidatesForSource(p,e,t)));d(t);const n=this._getGroundElevation,o=s.flat().map(p=>W(p,n));return L(i,o),o}get _getGroundElevation(){return j(this.view)}async _fetchCandidatesForSource(e,t,i){const s=M(t,this.view?.type??"2d"),n=await e.queryEngine.executeQueryForSnapping(s,i);d(i);const o=await this._snappingElevationAligner.alignCandidates(n.candidates,i);d(i);const p=await this._symbologySnappingFetcher.fetch(o,i);d(i);const _=p.length===0?o:[...o,...p];return this._snappingElevationFilter.filter(s,_)}refresh(){}_onGraphicUpdate(e){if(this.getGraphicsLayers().some(t=>t.graphics.includes(e.graphic)))switch(e.property){case"geometry":case"visible":this._remove(e.graphic),this._addMany([e.graphic])}}_onGraphicsChanged(e){for(const t of e.removed)this._remove(t);this._addMany(e.added)}_addMany(e){const t=[],i=new Map;for(const s of e)s.geometry!=null&&(this._needsInitializeProjection(s.geometry.spatialReference)?(t.push(s.geometry.spatialReference),i.set(s.uid,s)):this._add(s));this._createPendingAdd(t,i)}_createPendingAdd(e,t){if(!e.length)return;const i=k(async o=>{await E(e.map(p=>({source:p,dest:this.spatialReference})),{signal:o}),this._markLoadedSpatialReferences(e);for(const[,p]of t)this._add(p)});this.updatingHandles.addPromise(i.promise);const s={task:i,graphics:t},n=()=>O(this._pendingAdds,s);i.promise.then(n,n),this._pendingAdds.push(s)}_markLoadedSpatialReferences(e){for(const t of e)t.wkid!=null&&this._loadedWkids.add(t.wkid),t.wkt!=null&&this._loadedWkts.add(t.wkt)}_add(e){if(e.geometry==null||!e.visible)return;let t=e.geometry;if(t.type==="mesh")return;t.type==="extent"&&(t=C.fromExtent(t));const i=this._ensureSource(t.type);if(i==null)return;const s=this._createOptimizedFeature(e.uid,t);s!=null&&(i.featureStore.add(s),u(e.symbol)&&this._extrudedPolygonSymbolsCount++)}_needsInitializeProjection(e){return(e.wkid==null||!this._loadedWkids.has(e.wkid))&&(e.wkt==null||!this._loadedWkts.has(e.wkt))&&!F(e,this.spatialReference)}_createOptimizedFeature(e,t){const i=A($(t),this.spatialReference);if(!i)return null;const s=this._ensureGeometryHasZ(i),n=R(s,this._hasZ,!1);return new G(n,{[c]:e},null,e)}_ensureGeometryHasZ(e){if(!this._hasZ)return e;const t=s=>{for(;s.length<3;)s.push(0)},i=e.clone();switch(i.hasZ=!0,i.type){case"point":i.z=i.z??0;break;case"multipoint":i.points.forEach(t);break;case"polyline":i.paths.forEach(s=>s.forEach(t));break;case"polygon":i.rings.forEach(s=>s.forEach(t))}return i}_ensureSource(e){const t=this._sources[e];if(t!=null)return t;const i=this._createSource(e);return this._sources[e]=i,i}_createSource(e){const t=P.toJSON(e),i=this._hasZ,s=new Z({geometryType:t,hasZ:i,hasM:!1});return{featureStore:s,queryEngine:new z({featureStore:s,fields:[{name:c,type:"esriFieldTypeOID",alias:c}],geometryType:t,hasM:!1,hasZ:i,objectIdField:c,spatialReference:this.spatialReference,scheduler:this.view!=null&&this.view.type==="3d"?this.view.resourceController.scheduler:null}),type:e}}_remove(e){this._mapSources(t=>this._removeFromSource(t,e));for(const t of this._pendingAdds)t.graphics.delete(e.uid),t.graphics.size===0&&t.task.abort()}_removeFromSource(e,t){const i=t.uid;e.featureStore.has(i)&&(e.featureStore.removeById(t.uid),u(t.symbol)&&this._extrudedPolygonSymbolsCount--)}_destroySource(e){e.queryEngine.destroy(),this._sources[e.type]=null}_mapSources(e){const{point:t,polygon:i,polyline:s,multipoint:n}=this._sources,o=[];return t!=null&&o.push(e(t)),i!=null&&o.push(e(i)),s!=null&&o.push(e(s)),n!=null&&o.push(e(n)),o}};a([l()],r.prototype,"getGraphicsLayers",void 0),a([l({constructOnly:!0})],r.prototype,"layerSource",void 0),a([l({constructOnly:!0})],r.prototype,"spatialReference",void 0),a([l({constructOnly:!0})],r.prototype,"view",void 0),a([l({readOnly:!0})],r.prototype,"updating",null),a([l({readOnly:!0})],r.prototype,"availability",void 0),a([l()],r.prototype,"_hasZ",null),a([l()],r.prototype,"_snappingElevationAligner",null),a([l()],r.prototype,"_snappingElevationFilter",null),a([l()],r.prototype,"_symbologySnappingFetcher",null),a([l()],r.prototype,"_extrudedPolygonSymbolsCount",void 0),a([l()],r.prototype,"_getGroundElevation",null),r=a([I("esri.views.interactive.snapping.featureSources.GraphicsSnappingSource")],r);const c="OBJECTID";export{r as GraphicsSnappingSource};
