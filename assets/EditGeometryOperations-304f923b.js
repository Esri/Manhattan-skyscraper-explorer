import{np as f,nq as z,c7 as w,no as ge,pz as oe,sQ as fe,pF as me,bp as P,bq as c,sR as xe,c8 as I,mQ as ye,gA as he,ix as ve,f2 as $,qe as q,mj as Ve,jg as X,sS as Ee,sT as Te,jh as De,sU as we,cX as Pe,hF as Me,cz as ae,bX as $e,ak as Ae,bZ as S,pn as Ze,lq as E,mL as Re,mP as Ce,sV as B,mE as ce,sW as ze,mN as Ie,nZ as J,sX as K,sY as Se,nB as U,n$ as ee,bn as G,bo as R,gB as M,o$ as Le,qL as C,lr as be,lp as Xe,sZ as te,s_ as N,s$ as Ue,qM as Y,mF as Ge,t0 as Ne,nn as Ye,t1 as ie}from"./index-112c244d.js";var l;(function(n){n[n.Z=0]="Z",n[n.M=1]="M"})(l||(l={}));let Oe=class{constructor(e){this.spatialReference=e}createVector(){return this._tag(f())}pointToVector(e){return this._tag(z(e.x,e.y))}arrayToVector(e){return this._tag(z(e[0],e[1]))}vectorToArray(e){return[e[0],e[1]]}pointToArray(e){return[e.x,e.y]}vectorToPoint(e,t=new w){return t.x=e[0],t.y=e[1],t.z=void 0,t.m=void 0,t.spatialReference=this.spatialReference,t}arrayToPoint(e,t=new w){return t.x=e[0],t.y=e[1],t.z=void 0,t.m=void 0,t.spatialReference=this.spatialReference,t}vectorToDehydratedPoint(e,t={x:void 0,y:void 0,z:void 0,m:void 0,hasZ:void 0,hasM:void 0,spatialReference:void 0,type:"point"}){return t.x=e[0],t.y=e[1],t.z=void 0,t.m=void 0,t.hasZ=!1,t.hasM=!1,t.spatialReference=this.spatialReference,t}lerp(e,t,i,s){return ge(s,e,t,i)}addDelta(e,t,i){e[0]+=t,e[1]+=i}distance(e,t){return oe(e,t)}getZ(e,t=void 0){return t}hasZ(){return!1}getM(e,t=void 0){return t}hasM(){return!1}clone(e){return this._tag(fe(e))}copy(e,t){return me(t,e)}fromXYZ(e){return this._tag(z(e[0],e[1]))}toXYZ(e,t=c()){return P(t,e[0],e[1],0)}pointToXYZ(e,t=c()){return P(t,e.x,e.y,0)}equals(e,t){return xe(e,t)}_tag(e){return e}},se=class{constructor(e,t){this._valueType=e,this.spatialReference=t}createVector(){return this._tag(c())}pointToVector(e){return this._tag(I(e.x,e.y,this._valueType===l.Z?e.z:e.m))}arrayToVector(e){return this._tag(I(e[0],e[1],e[2]||0))}vectorToArray(e){return[e[0],e[1],e[2]]}pointToArray(e){return this._valueType===l.Z?[e.x,e.y,e.z]:[e.x,e.y,e.m]}vectorToPoint(e,t=new w){return t.x=e[0],t.y=e[1],t.z=this._valueType===l.Z?e[2]:void 0,t.m=this._valueType===l.M?e[2]:void 0,t.spatialReference=this.spatialReference,t}arrayToPoint(e,t=new w){return t.x=e[0],t.y=e[1],t.z=this._valueType===l.Z?e[2]:void 0,t.m=this._valueType===l.M?e[2]:void 0,t.spatialReference=this.spatialReference,t}vectorToDehydratedPoint(e,t={x:void 0,y:void 0,z:void 0,m:void 0,hasZ:void 0,hasM:void 0,spatialReference:void 0,type:"point"}){const i=this._valueType===l.Z,s=this._valueType===l.M;return t.x=e[0],t.y=e[1],t.z=i?e[2]:void 0,t.m=s?e[2]:void 0,t.hasZ=i,t.hasM=s,t.spatialReference=this.spatialReference,t}lerp(e,t,i,s){return ye(s,e,t,i)}addDelta(e,t,i,s){e[0]+=t,e[1]+=i,this._valueType===l.Z&&(e[2]+=s)}distance(e,t){return this._valueType===l.Z?he(e,t):oe(e,t)}getZ(e,t=void 0){return this._valueType===l.Z?e[2]:t}hasZ(){return this._valueType===l.Z}getM(e,t=void 0){return this._valueType===l.M?e[2]:t}hasM(){return this._valueType===l.M}clone(e){return this._tag(ve(e))}copy(e,t){return $(t,e)}fromXYZ(e,t=0,i=0){return this._tag(I(e[0],e[1],this._valueType===l.Z?e.length>2?e[2]:t:i))}toXYZ(e,t=c()){return P(t,e[0],e[1],this._valueType===l.Z?e[2]:0)}pointToXYZ(e,t=c()){return P(t,e.x,e.y,this._valueType===l.Z?e.z??0:0)}equals(e,t){return q(e,t)}_tag(e){return e}};class ke{constructor(e){this.spatialReference=e}createVector(){return this._tag(Ve())}pointToVector(e){return this._tag(X(e.x,e.y,e.z,e.m))}arrayToVector(e){return this._tag(X(e[0],e[1],e[2]||0,e[3]||0))}vectorToArray(e){return[e[0],e[1],e[2],e[3]]}pointToArray(e){return[e.x,e.y,e.z,e.m]}vectorToPoint(e,t=new w){return t.x=e[0],t.y=e[1],t.z=e[2],t.m=e[3],t.spatialReference=this.spatialReference,t}arrayToPoint(e,t=new w){return t.x=e[0],t.y=e[1],t.z=e[2],t.m=e[3],t.spatialReference=this.spatialReference,t}vectorToDehydratedPoint(e,t={x:void 0,y:void 0,z:void 0,m:void 0,hasZ:void 0,hasM:void 0,spatialReference:void 0,type:"point"}){return t.x=e[0],t.y=e[1],t.z=e[2],t.m=e[3],t.hasZ=!0,t.hasM=!0,t.spatialReference=this.spatialReference,t}lerp(e,t,i,s){return Ee(s,e,t,i)}addDelta(e,t,i,s){e[0]+=t,e[1]+=i,e[2]+=s}distance(e,t){return he(e,t)}getZ(e){return e[2]}hasZ(){return!0}getM(e){return e[3]}hasM(){return!0}clone(e){return this._tag(Te(e))}copy(e,t){return De(t,e)}fromXYZ(e,t=0,i=0){return this._tag(X(e[0],e[1],e.length>2?e[2]:t,i))}toXYZ(e,t=c()){return P(t,e[0],e[1],e[2])}pointToXYZ(e,t=c()){return P(t,e.x,e.y,e.z??0)}equals(e,t){return we(e,t)}_tag(e){return e}}function qe(n,e,t){return n&&e?new ke(t):e?new se(l.M,t):n?new se(l.Z,t):new Oe(t)}function Be(n,e){if(!e.supported)return;let t=1/0,i=-1/0;const s=e.upperBoundX-e.lowerBoundX;n.forEach(o=>{let h=o.pos[0];for(;h<e.lowerBoundX;)h+=s;for(;h>e.upperBoundX;)h-=s;t=Math.min(t,h),i=Math.max(i,h),o.pos[0]=h});const r=i-t;s-r<r&&n.forEach(o=>{o.pos[0]<0&&(o.pos[0]+=s)})}function He(n,e){const t=Pe(n);return e===Me.Global&&t?{supported:!0,lowerBoundX:t.valid[0],upperBoundX:t.valid[1]}:{supported:!1,lowerBoundX:null,upperBoundX:null}}let A=class{constructor(e){this.component=e,this.leftEdge=null,this.rightEdge=null,this.type="vertex",this.index=null}get pos(){return this._pos}set pos(e){this._pos=e,this.component.unnormalizeVertexPositions()}},V=class{constructor(e,t,i){this.component=e,this.leftVertex=t,this.rightVertex=i,this.type="edge",t.rightEdge=this,i.leftEdge=this}};class O{constructor(e,t){this._spatialReference=e,this._viewingMode=t,this.vertices=[],this.edges=[],this.index=null}unnormalizeVertexPositions(){this.vertices.length<=1||Be(this.vertices,He(this._spatialReference,this._viewingMode))}updateVertexIndex(e,t){if(this.vertices.length===0)return;const i=this.vertices[0];let s=null,r=e,o=t;do s=r,s.index=o++,r=s.rightEdge?s.rightEdge.rightVertex:null;while(r!=null&&r!==i);s.leftEdge&&s!==this.vertices[this.vertices.length-1]&&this.swapVertices(this.vertices.indexOf(s),this.vertices.length-1)}getFirstVertex(){return this.vertices.length===0?null:this.vertices[0]}getLastVertex(){return this.vertices.length===0?null:this.vertices[this.vertices.length-1]}isClosed(){return this.vertices.length>2&&this.vertices[0].leftEdge!==null}swapVertices(e,t){const i=this.vertices[e];this.vertices[e]=this.vertices[t],this.vertices[t]=i}iterateVertices(e){if(this.vertices.length===0)return;const t=this.vertices[0];let i=t;do e(i,i.index),i=i.rightEdge!=null?i.rightEdge.rightVertex:null;while(i!==t&&i!=null)}}class j extends ae{constructor(e,t){super(),this.type=e,this.coordinateHelper=t,this._geometry=null,this._dirty=!0,this.components=[]}get geometry(){if(this._dirty){switch(this.type){case"point":this._geometry=this._toPoint();break;case"polyline":this._geometry=this._toPolyline();break;case"polygon":this._geometry=this._toPolygon()}this._dirty=!1}return this._geometry}get spatialReference(){return this.coordinateHelper.spatialReference}notifyChanges(e){this._dirty=!0,this.emit("change",e)}_toPoint(){return this.components.length===0||this.components[0].vertices.length===0?null:this.coordinateHelper.vectorToPoint(this.components[0].vertices[0].pos)}_toPolyline(){const e=[],t=this.coordinateHelper.vectorToArray;for(const i of this.components){if(i.vertices.length<1)continue;const s=[];let r=i.vertices.find(h=>h.leftEdge==null);const o=r;do s.push(t(r.pos)),r=r.rightEdge?r.rightEdge.rightVertex:null;while(r&&r!==o);e.push(s)}return new $e({paths:e,spatialReference:this.spatialReference,hasZ:this.coordinateHelper.hasZ(),hasM:this.coordinateHelper.hasM()})}_toPolygon(){const e=[],t=this.coordinateHelper.vectorToArray;for(const i of this.components){if(i.vertices.length<1)continue;const s=[],r=i.vertices[0];let o=r;const h=o;do s.push(t(o.pos)),o=o.rightEdge!=null?o.rightEdge.rightVertex:null;while(o&&o!==h);i.isClosed()&&s.push(t(r.pos)),e.push(s)}return new Ae({rings:e,spatialReference:this.spatialReference,hasZ:this.coordinateHelper.hasZ(),hasM:this.coordinateHelper.hasM()})}static fromGeometry(e,t){const i=e.spatialReference,s=qe(e.hasZ,e.hasM,i),r=new j(e.type,s);switch(e.type){case"polygon":{const o=e.rings;for(let h=0;h<o.length;++h){const u=o[h],a=new O(i,t);a.index=h;const _=u.length>2&&S(u[0],u[u.length-1]),m=_?u.length-1:u.length;for(let d=0;d<m;++d){const g=s.arrayToVector(u[d]),y=new A(a);a.vertices.push(y),y.pos=g,y.index=d}const p=a.vertices.length-1;for(let d=0;d<p;++d){const g=a.vertices[d],y=a.vertices[d+1],_e=new V(a,g,y);a.edges.push(_e)}if(_){const d=new V(a,a.vertices[a.vertices.length-1],a.vertices[0]);a.edges.push(d)}r.components.push(a)}break}case"polyline":{const o=e.paths;for(let h=0;h<o.length;++h){const u=o[h],a=new O(i,t);a.index=h;const _=u.length;for(let p=0;p<_;++p){const d=s.arrayToVector(u[p]),g=new A(a);a.vertices.push(g),g.pos=d,g.index=p}const m=a.vertices.length-1;for(let p=0;p<m;++p){const d=a.vertices[p],g=a.vertices[p+1],y=new V(a,d,g);a.edges.push(y)}r.components.push(a)}break}case"point":{const o=new O(i,t);o.index=0;const h=new A(o);h.index=0,h.pos=s.pointToVector(e),o.vertices.push(h),r.components.push(o);break}}return r}}var v;(function(n){n[n.NEW_STEP=0]="NEW_STEP",n[n.ACCUMULATE_STEPS=1]="ACCUMULATE_STEPS"})(v||(v={}));let Fe=class{constructor(e,t,i){this._editGeometry=e,this._component=t,this._pos=i,this._addedVertex=null,this._originalEdge=null,this._left=null,this._right=null}apply(){let e="redo";this._addedVertex==null&&(e="apply",this._addedVertex=new A(this._component));const t=this._component.getLastVertex();if(t==null)this._component.vertices.push(this._addedVertex),this._addedVertex.pos=this._pos,this._addedVertex.index=0;else{let i=null;t.rightEdge&&(this._originalEdge=t.rightEdge,i=this._originalEdge.rightVertex,this._component.edges.splice(this._component.edges.indexOf(this._originalEdge),1)),this._component.vertices.push(this._addedVertex),this._addedVertex.pos=this._pos,this._left==null&&(this._left=new V(this._component,t,this._addedVertex)),this._component.edges.push(this._left),t.rightEdge=this._left,this._originalEdge!=null&&i!=null&&(this._right==null&&(this._right=new V(this._component,this._addedVertex,i)),this._component.edges.push(this._right),i.leftEdge=this._right),this._component.updateVertexIndex(this._addedVertex,t.index+1)}this._editGeometry.notifyChanges({operation:e,addedVertices:[this._addedVertex]})}undo(){this._addedVertex!=null&&(this._component.vertices.splice(this._component.vertices.indexOf(this._addedVertex),1),this._left!=null&&(this._component.edges.splice(this._component.edges.indexOf(this._left),1),this._left.leftVertex.rightEdge=null),this._right!=null&&(this._component.edges.splice(this._component.edges.indexOf(this._right),1),this._right.rightVertex.leftEdge=null),this._originalEdge!=null&&(this._component.edges.push(this._originalEdge),this._originalEdge.leftVertex.rightEdge=this._originalEdge,this._originalEdge.rightVertex.leftEdge=this._originalEdge),this._left!=null?this._component.updateVertexIndex(this._left.leftVertex,this._left.leftVertex.index):this._component.updateVertexIndex(this._addedVertex,0),this._editGeometry.notifyChanges({operation:"undo",removedVertices:[this._addedVertex]}))}accumulate(){return!1}},je=class le{constructor(e,t,i){this._editGeometry=e,this._vertices=t,this.operation=i,this._undone=!1}apply(){this._vertices.forEach(e=>this.operation.apply(e)),this._editGeometry.components.forEach(e=>e.unnormalizeVertexPositions()),this._editGeometry.notifyChanges({operation:this._undone?"redo":"apply",updatedVertices:this._vertices})}undo(){this._vertices.forEach(e=>this.operation.undo(e)),this._editGeometry.notifyChanges({operation:"undo",updatedVertices:this._vertices}),this._undone=!0}canAccumulate(e){if(this._undone||e._vertices.length!==this._vertices.length)return!1;for(let t=0;t<e._vertices.length;++t)if(e._vertices[t]!==this._vertices[t])return!1;return this.operation.canAccumulate(e.operation)}accumulate(e){return!!(e instanceof le&&this.canAccumulate(e))&&(this._vertices.forEach(t=>this.operation.accumulate(t,e.operation)),this.operation.accumulateParams(e.operation),this._editGeometry.components.forEach(t=>t.unnormalizeVertexPositions()),this._editGeometry.notifyChanges({operation:"apply",updatedVertices:this._vertices}),!0)}};var x;(function(n){n[n.CUMULATIVE=0]="CUMULATIVE",n[n.REPLACE=1]="REPLACE"})(x||(x={}));let We=class{constructor(e,t,i=0){this._editGeometry=e,this._vertices=t,this._minNumberOfVertices=i,this.removedVertices=null}apply(){let e="redo";if(this.removedVertices==null){const t=this.removedVertices=[];this._vertices.forEach(i=>{const s=this._removeVertex(i);s!=null&&t.push(s)}),e="apply"}else this.removedVertices.forEach(t=>{this._removeVertex(t.removedVertex)});this._editGeometry.notifyChanges({operation:e,removedVertices:this._vertices})}undo(){this.removedVertices?.forEach(e=>{this._undoRemoveVertex(e)}),this._editGeometry.notifyChanges({operation:"undo",addedVertices:this._vertices})}accumulate(){return!1}_removeVertex(e){const t=e.component;if(t.vertices.length<=this._minNumberOfVertices)return null;const i={removedVertex:e,createdEdge:null},s=e.leftEdge,r=e.rightEdge;return t.vertices.splice(t.vertices.indexOf(e),1),s&&(t.edges.splice(t.edges.indexOf(s),1),s.leftVertex.rightEdge=null),r&&(t.edges.splice(t.edges.indexOf(r),1),r.rightVertex.leftEdge=null),e.index===0&&r&&this._vertices.length>0&&t.swapVertices(t.vertices.indexOf(r.rightVertex),0),s&&r&&(i.createdEdge=new V(t,s.leftVertex,r.rightVertex),t.edges.push(i.createdEdge)),r&&t.updateVertexIndex(r.rightVertex,r.rightVertex.index-1),i}_undoRemoveVertex(e){const t=e.removedVertex,i=e.removedVertex.component,s=t.leftEdge,r=t.rightEdge;e.createdEdge&&i.edges.splice(i.edges.indexOf(e.createdEdge),1),i.vertices.push(t),s&&(i.edges.push(s),s.leftVertex.rightEdge=s),r&&(i.edges.push(r),r.rightVertex.leftEdge=r),i.updateVertexIndex(t,t.index)}};class Qe{constructor(e,t,i){this._editGeometry=e,this._edge=t,this._t=i,this.createdVertex=null,this._left=null,this._right=null}apply(){let e="redo";const t=this._edge,i=t.component,s=t.leftVertex,r=t.rightVertex;i.edges.splice(i.edges.indexOf(t),1),this.createdVertex==null&&(e="apply",this.createdVertex=new A(t.component)),i.vertices.push(this.createdVertex),this.createdVertex.pos=this._editGeometry.coordinateHelper.lerp(t.leftVertex.pos,t.rightVertex.pos,this._t,this._editGeometry.coordinateHelper.createVector()),this._left==null&&(this._left=new V(i,s,this.createdVertex)),this._left.leftVertex.leftEdge?i.edges.push(this._left):i.edges.unshift(this._left),s.rightEdge=this._left,this._right==null&&(this._right=new V(i,this.createdVertex,r)),i.edges.push(this._right),r.leftEdge=this._right,i.updateVertexIndex(this.createdVertex,s.index+1),this._editGeometry.notifyChanges({operation:e,addedVertices:[this.createdVertex]})}undo(){if(this.createdVertex==null||this._left==null||this._right==null)return null;const e=this._edge,t=e.component,i=this.createdVertex.leftEdge,s=this.createdVertex.rightEdge,r=i?.leftVertex,o=s?.rightVertex;t.vertices.splice(t.vertices.indexOf(this.createdVertex),1),t.edges.splice(t.edges.indexOf(this._left),1),t.edges.splice(t.edges.indexOf(this._right),1),this._edge.leftVertex.leftEdge?t.edges.push(this._edge):t.edges.unshift(this._edge),r&&(r.rightEdge=e),o&&(o.leftEdge=e),r&&t.updateVertexIndex(r,r.index),this._editGeometry.notifyChanges({operation:"undo",removedVertices:[this.createdVertex]})}accumulate(){return!1}}let Je=class de{constructor(e,t,i){this._editGeometry=e,this._vertex=t,this._pos=i}apply(){const e=this._originalPosition==null;e&&(this._originalPosition=this._vertex.pos),this._apply(e?"apply":"redo")}undo(){this._vertex.pos=this._originalPosition,this._editGeometry.notifyChanges({operation:"undo",updatedVertices:[this._vertex]})}accumulate(e){return e instanceof de&&e._vertex===this._vertex&&(this._pos=e._pos,this._apply("apply"),!0)}_apply(e){this._vertex.pos=this._pos,this._editGeometry.components.forEach(t=>t.unnormalizeVertexPositions()),this._editGeometry.notifyChanges({operation:e,updatedVertices:[this._vertex]})}};class Ke{constructor(e,t){this._editGeometry=e,this._component=t,this._createdEdge=null}apply(){let e="redo";if(this._createdEdge==null){e="apply";const t=this._component.getFirstVertex(),i=this._component.getLastVertex();if(this._component.isClosed()||this._component.vertices.length<3||t==null||i==null)return;this._createdEdge=new V(this._component,i,t)}this._createdEdge.leftVertex.rightEdge=this._createdEdge,this._createdEdge.rightVertex.leftEdge=this._createdEdge,this._component.edges.push(this._createdEdge),this._editGeometry.notifyChanges({operation:e})}undo(){this._createdEdge!=null&&(Ze(this._component.edges,this._createdEdge),this._createdEdge.leftVertex.rightEdge=null,this._createdEdge.rightVertex.leftEdge=null,this._editGeometry.notifyChanges({operation:"undo"}))}accumulate(){return!1}}let et=class ue{constructor(e,t,i,s){this._helper=e,this.dx=t,this.dy=i,this.dz=s}_move(e,t,i,s){this._helper.addDelta(e.pos,t,i,s)}apply(e){this._move(e,this.dx,this.dy,this.dz)}undo(e){this._move(e,-this.dx,-this.dy,-this.dz)}canAccumulate(e){return e instanceof ue}accumulate(e,t){this._move(e,t.dx,t.dy,t.dz)}accumulateParams(e){this.dx+=e.dx,this.dy+=e.dy,this.dz+=e.dz}};function k(n,e){return n[0]*e[1]-n[1]*e[0]}function tt(n,e,t){const i=ce(t,e)/ze(t);return Ie(n,t,i)}function pt(n,e,t,i,s=t){return E(D,i,t),E(H,e,s),tt(L,H,D),Re(n,s,L)}function _t(n,e,t,i){E(D,e,t);const s=i/Ce(D);return B(n,t,D,s)}function it(n,e){const t=n.start,i=n.end,s=e.start,r=e.end,o=E(D,i,t),h=E(rt,r,s),u=k(o,h);if(Math.abs(u)<=st)return[];const a=E(H,t,s),_=k(h,a)/u,m=k(o,a)/u;if(_>=0){if(m>=0||e.type===T.LINE)return[B(L,t,o,_)]}else if(n.type===T.LINE&&(m>=0||e.type===T.LINE))return[B(L,t,o,_)];return[]}var T;(function(n){n[n.RAY=0]="RAY",n[n.LINE=1]="LINE"})(T||(T={}));const st=1e-6,D=f(),rt=f(),H=f(),L=f();class b{get plane(){return this._plane}get requiresSplitEdgeLeft(){return!this._left.isOriginalDirection}get requiresSplitEdgeRight(){return!this._right.isOriginalDirection}get edgeDirection(){return this._edgeDirection}constructor(e,t,i,s=0,r=Z.IMMEDIATE){this._helper=e,this._planeType=t,this._edge=i,this.distance=s,this._plane=J(),this._offsetPlane=J(),this._minDistance=-1/0,this._maxDistance=1/0,this._selectedArrow=1,r===Z.IMMEDIATE&&this._initialize()}_initialize(){this._initializeNeighbors(),this._initializePlane(),this._initializeDistanceConstraints()}_initializeNeighbors(){const e=this._toXYZ(this._edge.leftVertex.pos),t=this._toXYZ(this._edge.leftVertex.leftEdge?.leftVertex?.pos),i=this._toXYZ(this._edge.rightVertex.pos),s=this._toXYZ(this._edge.rightVertex.rightEdge?.rightVertex?.pos);this._edgeDirection=K(c(),e,i),this._left=this._computeNeighbor(e,t,this._edgeDirection),this._right=this._computeNeighbor(i,s,this._edgeDirection)}_toXYZ(e){return e!=null?this._helper.toXYZ(e):null}_pointToXYZ(e){return this._toXYZ(this._helper.pointToVector(e))}_computeNeighbor(e,t,i){if(t==null)return{start:e,end:t,direction:I(-i[1],i[0],0),isOriginalDirection:!0};const s=K(c(),e,t),r=!this._passesBisectingAngleThreshold(s,i);return{start:e,end:t,direction:r?this._bisectVectorsPerpendicular(i,s):s,isOriginalDirection:!r}}_passesBisectingAngleThreshold(e,t){const i=Math.abs(Se(t,e));return i>=re&&i<=Math.PI-re}_bisectVectorsPerpendicular(e,t){const i=U(e,t)<0?e:ee(c(),e),s=Math.abs(U(i,t));if(!(s<ne||s>1-ne))return this._bisectDirection(i,t);const r=G(c(),i,[0,0,1]);return R(r,r)}_bisectDirection(e,t){const i=M(c(),e,t);return R(i,i)}_initializePlane(){const e=this._computeNormalDirection(this._left),t=this._computeNormalDirection(this._right);U(e,t)<0&&ee(t,t),Le(this._left.start,this._bisectDirection(e,t),this._plane)}_computeNormalDirection(e){const t=G(c(),e.direction,this._edgeDirection);R(t,t);const i=G(c(),this._edgeDirection,t);return this._planeType===F.XY&&(i[2]=0),R(i,i)}_initializeDistanceConstraints(){this._left.end==null||this.requiresSplitEdgeLeft||this._updateDistanceConstraint(C(this._plane,this._left.end)),this._right.end==null||this.requiresSplitEdgeRight||this._updateDistanceConstraint(C(this._plane,this._right.end)),this._updateIntersectDistanceConstraint(this._plane)}_updateDistanceConstraint(e){e<=0&&(this._minDistance=Math.max(this._minDistance,e)),e>=0&&(this._maxDistance=Math.min(this._maxDistance,e))}_updateIntersectDistanceConstraint(e){const t=Y(e),i=this._edgeDirection,s=M(c(),this._left.start,this._left.direction),r=M(c(),this._right.start,this._right.direction),o=this._pointInBasis2D(f(),t,i,this._left.start),h=this._pointInBasis2D(f(),t,i,s),u=this._pointInBasis2D(f(),t,i,this._right.start),a=this._pointInBasis2D(f(),t,i,r),[_]=it({start:h,end:o,type:T.LINE},{start:a,end:u,type:T.LINE});if(!_)return;const m=E(f(),o,h);be(m,m);const p=E(f(),_,h),d=ce(m,p),g=M(c(),s,Xe(c(),this._left.direction,-d)),y=C(e,g);this._updateDistanceConstraint(y)}_pointInBasis2D(e,t,i,s){return e[0]=te(t,s),e[1]=te(i,s),e}_offset(e,t){Number.isFinite(this._minDistance)&&(t=Math.max(this._minDistance,t)),Number.isFinite(this._maxDistance)&&(t=Math.min(this._maxDistance,t)),N(this._offsetPlane,this._plane),this._offsetPlane[3]-=t;const i=(r,o,h)=>o!=null&&Ne(this._offsetPlane,r,M(c(),r,o),h),s=c();(e===this._edge.leftVertex?i(this._left.start,this._left.direction,s):i(this._right.start,this._right.direction,s))&&this._helper.copy(this._helper.fromXYZ(s,void 0,this._helper.getM(e.pos)),e.pos)}selectArrowFromStartPoint(e){this._selectedArrow=Ue(this.plane,this._pointToXYZ(e))?1:-1}get selectedArrow(){return this._selectedArrow}signedDistanceToPoint(e){return C(this.plane,this._pointToXYZ(e))}apply(e){this._offset(e,this.distance)}undo(e){this._offset(e,0)}canAccumulate(e){return e instanceof b&&this._edge.leftVertex.index===e._edge.leftVertex.index&&this._edge.rightVertex.index===e._edge.rightVertex.index&&this._edge.component===e._edge.component&&this._maybeEqualsVec3(this._left.direction,e._left.direction)&&this._maybeEqualsVec3(this._right.direction,e._right.direction)&&q(Y(this._plane),Y(e._plane))}accumulate(e,t){const i=this._plane[3]-t._plane[3]+t.distance;this._offset(e,i)}accumulateParams(e){const t=e.distance-e._plane[3];this.distance=t+this._plane[3]}clone(){const e=new b(this._helper,this._planeType,this._edge,this.distance,Z.DEFERRED);return N(e._plane,this._plane),N(e._offsetPlane,this._offsetPlane),e._maxDistance=this._maxDistance,e._minDistance=this._minDistance,e._left=this._cloneNeighbor(this._left),e._right=this._cloneNeighbor(this._right),e._edgeDirection=$(c(),this._edgeDirection),e}_maybeEqualsVec3(e,t){return e==null&&t==null||e!=null&&t!=null&&q(e,t)}_cloneNeighbor({start:e,end:t,direction:i,isOriginalDirection:s}){return{start:$(c(),e),end:t!=null?$(c(),t):null,direction:$(c(),i),isOriginalDirection:s}}}const re=Ge(15),ne=.001;var F,Z;(function(n){n[n.XYZ=0]="XYZ",n[n.XY=1]="XY"})(F||(F={})),function(n){n[n.IMMEDIATE=0]="IMMEDIATE",n[n.DEFERRED=1]="DEFERRED"}(Z||(Z={}));class W{constructor(e,t,i=x.CUMULATIVE){this.origin=e,this.angle=t,this._accumulationType=i}_rotate(e,t){Ye(e.pos,e.pos,this.origin,t)}apply(e){this._rotate(e,this.angle)}undo(e){this._rotate(e,-this.angle)}canAccumulate(e){return e instanceof W&&S(this.origin,e.origin)}accumulate(e,t){const i=t._accumulationType===x.REPLACE;this._rotate(e,i?t.angle-this.angle:t.angle)}accumulateParams(e){const t=e._accumulationType===x.REPLACE;this.angle=t?e.angle:this.angle+e.angle}}class Q{constructor(e,t,i,s,r=x.CUMULATIVE){this.origin=e,this.axis1=t,this.factor1=i,this.factor2=s,this._accumulationType=r,this.axis2=z(t[1],-t[0])}_scale(e,t,i){ie(e.pos,e.pos,this.origin,this.axis1,t),ie(e.pos,e.pos,this.origin,this.axis2,i)}apply(e){this._scale(e,this.factor1,this.factor2)}undo(e){this._scale(e,1/this.factor1,1/this.factor2)}canAccumulate(e){return e instanceof Q&&S(this.origin,e.origin)&&S(this.axis1,e.axis1)}accumulate(e,t){t._accumulationType===x.REPLACE?this._scale(e,t.factor1/this.factor1,t.factor2/this.factor2):this._scale(e,t.factor1,t.factor2)}accumulateParams(e){const t=e._accumulationType===x.REPLACE;this.factor1=t?e.factor1:this.factor1*e.factor1,this.factor2=t?e.factor2:this.factor2*e.factor2}}class nt{constructor(){this._operations=[],this._closed=!1}close(){this._closed=!0}apply(){for(const e of this._operations)e.apply()}undo(){for(let e=this._operations.length-1;e>=0;e--)this._operations[e].undo()}accumulate(e){if(this._closed)return!1;const t=this._operations.length?this._operations[this._operations.length-1]:null;return t&&t.accumulate(e)||(this._operations.push(e),e.apply()),!0}}class pe extends ae{constructor(e){super(),this.data=e,this._undoStack=[],this._redoStack=[],this._listener=this.data.on("change",t=>{t.addedVertices&&this.emit("vertex-add",{type:"vertex-add",vertices:t.addedVertices,operation:t.operation}),t.removedVertices&&this.emit("vertex-remove",{type:"vertex-remove",vertices:t.removedVertices,operation:t.operation}),t.updatedVertices&&this.emit("vertex-update",{type:"vertex-update",vertices:t.updatedVertices,operation:t.operation})})}destroy(){this._listener.remove()}splitEdge(e,t){return this._apply(new Qe(this.data,e,t))}updateVertices(e,t,i=v.ACCUMULATE_STEPS){return this._apply(new je(this.data,e,t),i)}moveVertices(e,t,i,s,r=v.ACCUMULATE_STEPS){return this.updateVertices(e,new et(this.data.coordinateHelper,t,i,s),r)}scaleVertices(e,t,i,s,r,o=v.ACCUMULATE_STEPS,h=x.CUMULATIVE){return this.updateVertices(e,new Q(t,i,s,r,h),o)}rotateVertices(e,t,i,s=v.ACCUMULATE_STEPS,r=x.CUMULATIVE){return this.updateVertices(e,new W(t,i,r),s)}removeVertices(e){return this._apply(new We(this.data,e,this._minNumVerticesPerType))}appendVertex(e){return this.data.components.length===0?null:this._apply(new Fe(this.data,this.data.components[0],e))}setVertexPosition(e,t){return this._apply(new Je(this.data,e,t))}offsetEdge(e,t,i,s=v.ACCUMULATE_STEPS){return this.updateVertices([t.leftVertex,t.rightVertex],new b(this.data.coordinateHelper,e,t,i),s)}closeComponent(e){return this.data.components.includes(e)?this._apply(new Ke(this.data,e)):null}canRemoveVertex(){return this.data.components[0].vertices.length>this._minNumVerticesPerType}createUndoGroup(){const e=new nt;return this._apply(e),{remove:()=>e.close()}}undo(){if(this._undoStack.length>0){const e=this._undoStack.pop();return e.undo(),this._redoStack.push(e),e}return null}redo(){if(this._redoStack.length>0){const e=this._redoStack.pop();return e.apply(),this._undoStack.push(e),e}return null}get canUndo(){return this._undoStack.length>0}get canRedo(){return this._redoStack.length>0}get lastOperation(){return this._undoStack.length>0?this._undoStack[this._undoStack.length-1]:null}get _minNumVerticesPerType(){switch(this.data.type){case"point":return 1;case"polyline":return 2;case"polygon":return 3;default:return 0}}_apply(e,t=v.ACCUMULATE_STEPS){return t!==v.NEW_STEP&&this.lastOperation!=null&&this.lastOperation.accumulate(e)||(e.apply(),this._undoStack.push(e),this._redoStack=[]),e}static fromGeometry(e,t){return new pe(j.fromGeometry(e,t))}}export{pt as L,pe as _,O as l,_t as m,j as p,T as v,qe as w};
