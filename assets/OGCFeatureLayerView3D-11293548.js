import{aJ as r,aK as i,aM as o,ai as s}from"./index-0199b717.js";import{_ as m}from"./FeatureLayerViewBase3D-17b907f9.js";import"./FeatureLikeLayerView3D-b1bdacd2.js";import"./dehydratedFeatureComparison-99482a2b.js";import"./queryForSymbologySnapping-06aa6620.js";import"./elevationInfoUtils-5cd9d27e.js";import"./hash-6f442295.js";import"./Graphics3DObjectStates-df225fb7.js";import"./optimizedFeatureQueryEngineAdapter-fb0f5985.js";import"./centroid-3dcadaf5.js";import"./PooledRBush-46c91161.js";import"./quickselect-08f30851.js";import"./floorFilterUtils-73949d2d.js";import"./QueryEngine-25cd666d.js";import"./normalizeUtils-30f603dc.js";import"./normalizeUtilsCommon-d91de345.js";import"./WhereClause-e2c9f470.js";import"./executionError-e8d36121.js";import"./json-48e3ea08.js";import"./QueryEngineCapabilities-42e44ded.js";import"./utils-d7352455.js";import"./generateRendererUtils-9a953fca.js";import"./FeatureStore-03e4c7a5.js";import"./BoundsStore-5abd2f82.js";import"./projectExtentUtils-36315f43.js";import"./LayerView3D-37676199.js";import"./query-226efcbe.js";import"./pbfQueryUtils-dc012b8b.js";import"./pbf-62deeddb.js";import"./EventedSet-3977ef56.js";import"./LayerView-a0977cc5.js";import"./RefreshableLayerView-8347ec95.js";const l=p=>{let e=class extends p{get availableFields(){return this.layer.fieldsIndex.fields.map(a=>a.name)}};return r([i()],e.prototype,"layer",void 0),r([i({readOnly:!0})],e.prototype,"availableFields",null),e=r([o("esri.views.layers.OGCFeatureLayerView")],e),e};let t=class extends l(m){constructor(){super(...arguments),this.type="ogc-feature-3d"}initialize(){this.layer.serviceSupportsSpatialReference(this.view.spatialReference)||this.addResolvingPromise(Promise.reject(new s("layerview:spatial-reference-incompatible","The spatial references supported by this OGC layer are incompatible with the spatial reference of the view",{layer:this.layer})))}};r([i()],t.prototype,"layer",void 0),t=r([o("esri.views.3d.layers.OGCFeatureLayerView3D")],t);const q=t;export{q as default};
