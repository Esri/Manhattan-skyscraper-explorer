import{as as g,ff as I,jx as K,ew as A,b$ as J,cO as L,jy as k,jz as S,jA as w,jB as D,bl as O,cz as V,er as W,b4 as M,aV as c,aU as E,ct as _,ci as F,jC as H,ax as G,ai as i,aj as a,jD as U,dD as j,al as C,fm as B,es as q,et as Q,eu as X,dv as Y,dw as Z,dx as ee,br as te,dt as se,dA as re,cH as ie,dF as oe,bx as le}from"./index-112c244d.js";const ae={esriGeometryPoint:"points",esriGeometryPolyline:"polylines",esriGeometryPolygon:"polygons"};function R(e){const t=e.folders||[],r=t.slice(),s=new Map,l=new Map,p=new Map,v=new Map,m=new Map,f={esriGeometryPoint:l,esriGeometryPolyline:p,esriGeometryPolygon:v};(e.featureCollection&&e.featureCollection.layers||[]).forEach(o=>{const h=g(o);h.featureSet.features=[];const y=o.featureSet.geometryType;s.set(y,h);const x=o.layerDefinition.objectIdField;y==="esriGeometryPoint"?$(l,x,o.featureSet.features):y==="esriGeometryPolyline"?$(p,x,o.featureSet.features):y==="esriGeometryPolygon"&&$(v,x,o.featureSet.features)}),e.groundOverlays&&e.groundOverlays.forEach(o=>{m.set(o.id,o)}),t.forEach(o=>{o.networkLinkIds.forEach(h=>{const y=ue(h,o.id,e.networkLinks);y&&r.push(y)})}),r.forEach(o=>{if(o.featureInfos){o.points=g(s.get("esriGeometryPoint")),o.polylines=g(s.get("esriGeometryPolyline")),o.polygons=g(s.get("esriGeometryPolygon")),o.mapImages=[];for(const h of o.featureInfos)switch(h.type){case"esriGeometryPoint":case"esriGeometryPolyline":case"esriGeometryPolygon":{const y=f[h.type].get(h.id);y&&o[ae[h.type]]?.featureSet.features.push(y);break}case"GroundOverlay":{const y=m.get(h.id);y&&o.mapImages.push(y);break}}o.fullExtent=P([o])}});const d=P(r);return{folders:t,sublayers:r,extent:d}}function T(e,t,r,s){const l=I&&I.findCredential(e);e=K(e,{token:l&&l.token});const p=A.kmlServiceUrl;return J(p,{query:{url:e,model:"simple",folders:"",refresh:r!==0||void 0,outSR:JSON.stringify(t)},responseType:"json",signal:s})}function z(e,t,r=null,s=[]){const l=[],p={},v=t.sublayers,m=t.folders.map(f=>f.id);return v.forEach(f=>{const d=new e;if(r?d.read(f,r):d.read(f),s.length&&m.includes(d.id)&&(d.visible=s.includes(d.id)),p[f.id]=d,f.parentFolderId!=null&&f.parentFolderId!==-1){const o=p[f.parentFolderId];o.sublayers||(o.sublayers=[]),o.sublayers?.unshift(d)}else l.unshift(d)}),l}function $(e,t,r){r.forEach(s=>{e.set(s.attributes[t],s)})}function ne(e,t){let r;return t.some(s=>s.id===e&&(r=s,!0)),r}function ue(e,t,r){const s=ne(e,r);return s&&(s.parentFolderId=t,s.networkLink=s),s}function P(e){const t=L(k),r=L(k);for(const s of e){if(s.polygons&&s.polygons.featureSet&&s.polygons.featureSet.features)for(const l of s.polygons.featureSet.features)S(t,l.geometry),w(r,t);if(s.polylines&&s.polylines.featureSet&&s.polylines.featureSet.features)for(const l of s.polylines.featureSet.features)S(t,l.geometry),w(r,t);if(s.points&&s.points.featureSet&&s.points.featureSet.features)for(const l of s.points.featureSet.features)S(t,l.geometry),w(r,t);if(s.mapImages)for(const l of s.mapImages)S(t,l.extent),w(r,t)}return D(r,k)?void 0:{xmin:r[0],ymin:r[1],zmin:r[2],xmax:r[3],ymax:r[4],zmax:r[5],spatialReference:O.WGS84}}var b;let u=b=class extends V.EventedMixin(W(B)){constructor(...e){super(...e),this.description=null,this.fullExtent=null,this.id=null,this.networkLink=null,this.parent=null,this.sublayers=null,this.title=null,this.sourceJSON=null,this.layer=null,this.addHandles([M(()=>this.sublayers,"after-add",({item:t})=>{t.parent=this,t.layer=this.layer},c),M(()=>this.sublayers,"after-remove",({item:t})=>{t.layer=t.parent=null},c),E(()=>this.sublayers,(t,r)=>{if(r)for(const s of r)s.layer=s.parent=null;if(t)for(const s of t)s.parent=this,s.layer=this.layer},c),E(()=>this.layer,t=>{if(this.sublayers)for(const r of this.sublayers)r.layer=t},c)])}initialize(){_(()=>this.networkLink).then(()=>_(()=>this.visible===!0)).then(()=>this.load())}load(e){if(!this.networkLink||this.networkLink.viewFormat)return;const t=e!=null?e.signal:null,r=this._fetchService(this._get("networkLink")?.href??"",t).then(s=>{const l=P(s.sublayers);this.fullExtent=F.fromJSON(l),this.sourceJSON=s;const p=H(G.ofType(b),z(b,s));this.sublayers?this.sublayers.addMany(p):this.sublayers=p,this.layer?.emit("sublayer-update"),this.layer&&this.layer.notifyChange("visibleSublayers")});return this.addResolvingPromise(r),Promise.resolve(this)}get visible(){return this._get("visible")}set visible(e){this._get("visible")!==e&&(this._set("visible",e),this.layer&&this.layer.notifyChange("visibleSublayers"))}readVisible(e,t){return!!t.visibility}_fetchService(e,t){return T(e,this.layer.outSpatialReference,this.layer.refreshInterval,t).then(r=>R(r.data))}};i([a()],u.prototype,"description",void 0),i([a({type:F})],u.prototype,"fullExtent",void 0),i([a()],u.prototype,"id",void 0),i([a({readOnly:!0,value:null})],u.prototype,"networkLink",void 0),i([a({json:{write:{allowNull:!0}}})],u.prototype,"parent",void 0),i([a({type:G.ofType(b),json:{write:{allowNull:!0}}})],u.prototype,"sublayers",void 0),i([a({value:null,json:{read:{source:"name",reader:e=>U(e)}}})],u.prototype,"title",void 0),i([a({value:!0})],u.prototype,"visible",null),i([j("visible",["visibility"])],u.prototype,"readVisible",null),i([a()],u.prototype,"sourceJSON",void 0),i([a()],u.prototype,"layer",void 0),u=b=i([C("esri.layers.support.KMLSublayer")],u);const N=u,ye=["kml","xml"];let n=class extends q(Q(X(Y(Z(ee(le)))))){constructor(...e){super(...e),this._visibleFolders=[],this.allSublayers=new te({getCollections:()=>[this.sublayers],getChildrenFunction:t=>t.sublayers}),this.outSpatialReference=O.WGS84,this.path=null,this.legendEnabled=!1,this.operationalLayerType="KML",this.sublayers=null,this.type="kml",this.url=null}initialize(){this.addHandles([E(()=>this.sublayers,(e,t)=>{t&&t.forEach(r=>{r.parent=null,r.layer=null}),e&&e.forEach(r=>{r.parent=this,r.layer=this})},c),this.on("sublayer-update",()=>this.notifyChange("fullExtent"))])}normalizeCtorArgs(e,t){return typeof e=="string"?{url:e,...t}:e}readSublayersFromItemOrWebMap(e,t){this._visibleFolders=t.visibleFolders}readSublayers(e,t,r){return z(N,t,r,this._visibleFolders)}writeSublayers(e,t){const r=[],s=e.toArray();for(;s.length;){const l=s[0];l.networkLink||(l.visible&&r.push(l.id),l.sublayers&&s.push(...l.sublayers.toArray())),s.shift()}t.visibleFolders=r}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?se(this.url,ye)||"KML":e||""}set title(e){this._set("title",e)}get visibleSublayers(){const e=this.sublayers,t=[],r=s=>{s.visible&&(t.push(s),s.sublayers&&s.sublayers.forEach(r))};return e&&e.forEach(r),t}get fullExtent(){return this._recomputeFullExtent()}load(e){const t=e!=null?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["KML"],supportsData:!1},e).catch(re).then(()=>this._fetchService(t))),Promise.resolve(this)}destroy(){super.destroy(),this.allSublayers.destroy()}async _fetchService(e){const t=await Promise.resolve().then(()=>this.resourceInfo?{ssl:!1,data:this.resourceInfo}:T(this.url??"",this.outSpatialReference,this.refreshInterval,e)),r=R(t.data);r&&this.read(r,{origin:"service"})}_recomputeFullExtent(){let e=null;this.extent!=null&&(e=this.extent.clone());const t=r=>{if(r.sublayers)for(const s of r.sublayers.items)t(s),s.visible&&s.fullExtent&&(e!=null?e.union(s.fullExtent):e=s.fullExtent.clone())};return t(this),e}};i([a({readOnly:!0})],n.prototype,"allSublayers",void 0),i([a({type:O})],n.prototype,"outSpatialReference",void 0),i([a({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],n.prototype,"path",void 0),i([a({readOnly:!0,json:{read:!1,write:!1}})],n.prototype,"legendEnabled",void 0),i([a({type:["show","hide","hide-children"]})],n.prototype,"listMode",void 0),i([a({type:["KML"]})],n.prototype,"operationalLayerType",void 0),i([a({})],n.prototype,"resourceInfo",void 0),i([a({type:G.ofType(N),json:{write:{ignoreOrigin:!0}}})],n.prototype,"sublayers",void 0),i([j(["web-map","portal-item"],"sublayers",["visibleFolders"])],n.prototype,"readSublayersFromItemOrWebMap",null),i([j("service","sublayers",["sublayers"])],n.prototype,"readSublayers",null),i([ie("sublayers")],n.prototype,"writeSublayers",null),i([a({readOnly:!0,json:{read:!1}})],n.prototype,"type",void 0),i([a({json:{origins:{"web-map":{read:{source:"title"}}},write:{ignoreOrigin:!0}}})],n.prototype,"title",null),i([a(oe)],n.prototype,"url",void 0),i([a({readOnly:!0})],n.prototype,"visibleSublayers",null),i([a({type:F})],n.prototype,"extent",void 0),i([a()],n.prototype,"fullExtent",null),n=i([C("esri.layers.KMLLayer")],n);const fe=n;export{fe as default};
