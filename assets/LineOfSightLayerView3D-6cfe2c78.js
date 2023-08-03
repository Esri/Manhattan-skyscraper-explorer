import{aU as h,aZ as w,at as y,a_ as d,ah as _,a$ as V,b0 as c,b1 as u,ai as e,aj as n,al as p}from"./index-112c244d.js";import{n as A}from"./LayerView3D-10a2ef73.js";import{d as f}from"./LayerView-ec7266a0.js";const o="analysis-view-handles";let i=class extends A(f){constructor(s){super(s),this.type="line-of-sight-3d",this._analysisModule=null}initialize(){this.handles.add(h(()=>this.layer.analysis,s=>{this._destroyAnalysisView(),s!=null&&this._createAnalysisView(s)},w),o)}destroy(){this.handles.remove(o),this._destroyAnalysisView()}async whenAnalysisView(){if(this.analysisView!=null)return this.analysisView;if(this._createAnalysisViewTask!=null)return this._createAnalysisViewTask.promise;throw new y("layerview:no-analysisview-for-analysis","The analysis has not been set on the LineOfSightLayer of this layer view")}isUpdating(){return this._createAnalysisViewTask!=null||this.analysisView!=null&&this.analysisView.updating}_createAnalysisView(s){const t=d(async a=>(this.analysisView=await this._createAnalysisViewPromise(s,a),this._createAnalysisViewTask===t&&(this._createAnalysisViewTask=null),this.analysisView));this._createAnalysisViewTask=t}_destroyAnalysisView(){this.analysisView=_(this.analysisView),this._createAnalysisViewTask=V(this._createAnalysisViewTask)}async _createAnalysisViewPromise(s,t){let a=this._analysisModule;if(a==null){const r=await this._loadAnalysisModule();this._analysisModule=r,a=r}const l=new a.default({analysis:s,view:this.view,parent:this});if(await l.when(),c(t))throw l.destroy(),new y("layerview:no-analysisview-for-analysis","The analysis has not been added to the LineOfSightLayer of this layer view",{analysis:s});return l}_loadAnalysisModule(){return u(()=>import("./LineOfSightAnalysisView3D-ad94c8ee.js"),["./LineOfSightAnalysisView3D-ad94c8ee.js","./index-112c244d.js","./index-a616bda8.css","./LineVisualElement-ba997fc6.js","./LineOfSightAnalysisTarget-19f41b15.js","./elevationInfoUtils-92bce67b.js","./analysisViewUtils-ee698129.js","./ImageMaterial-f381f1e6.js","./PointVisualElement-04ad3e7c.js","./VisualElementResources-37c38039.js"],import.meta.url)}};e([n()],i.prototype,"type",void 0),e([n()],i.prototype,"layer",void 0),e([n()],i.prototype,"analysisView",void 0),e([n()],i.prototype,"_createAnalysisViewTask",void 0),i=e([p("esri.views.3d.layers.LineOfSightLayerView3D")],i);const k=i;export{k as default};
