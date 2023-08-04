import{go as N,cL as S,by as G,gp as O,gd as q,bD as A,gq as B,gr as R,gs as j}from"./index-9e6e60fd.js";import{c as g,z as L,m as Y,f as _,d as k,g as U,x as Z,F as H,D as J,S as K,M as Q}from"./utils-1d12355e.js";import"./generateRendererUtils-b7429cc6.js";let v=null;function W(e,a,l){return e.x<0?e.x+=a:e.x>l&&(e.x-=a),e}function X(e,a,l,o){const n=N(l)?S(l):null,s=n?Math.round((n.valid[1]-n.valid[0])/a.scale[0]):null;return e.map(t=>{const i=new G(t.geometry);return O(a,i,i,i.hasZ,i.hasM),t.geometry=n?W(i,s??0,o[0]):i,t})}function aa(e,a=18,l,o,n,s){const t=new Float64Array(n*s);a=Math.round(B(a));let i=Number.POSITIVE_INFINITY,r=Number.NEGATIVE_INFINITY,m=0,f=0,d=0,c=0;const z=R(o,l);for(const{geometry:T,attributes:y}of e){const{x:p,y:u}=T,x=Math.max(0,p-a),F=Math.max(0,u-a),D=Math.min(s,u+a),E=Math.min(n,p+a),b=+z(y);for(let $=F;$<D;$++)for(let h=x;h<E;h++){const M=$*n+h,P=j(h-p,$-u,a),C=t[M];m=t[M]+=P*b;const V=m-C;f+=V,d+=V*V,m<i&&(i=m),m>r&&(r=m),c++}}if(!c)return{mean:0,stddev:0,min:0,max:0,mid:0,count:0};const I=(r-i)/2;return{mean:f/c,stdDev:Math.sqrt((d-f*f/c)/c),min:i,max:r,mid:I,count:c}}async function w(e,a){if(!a)return[];const{field:l,field2:o,field3:n,fieldDelimiter:s}=e,t=e.valueExpression,i=e.normalizationType,r=e.normalizationField,m=e.normalizationTotal,f=[],d=e.viewInfoParams;let c=null,z=null;if(t){if(!v){const{arcadeUtils:y}=await q();v=y}v.hasGeometryOperations(t)&&await v.enableGeometryOperations(),c=v.createFunction(t),z=d&&v.getViewInfo({viewingMode:d.viewingMode,scale:d.scale,spatialReference:new A(d.spatialReference)})}const I=e.fieldInfos,T=!(a[0]&&"declaredClass"in a[0]&&a[0].declaredClass==="esri.Graphic")&&I?{fields:I}:null;return a.forEach(y=>{const p=y.attributes;let u;if(t){const x=T?{...y,layer:T}:y,F=v.createExecContext(x,z);u=v.executeFunction(c,F)}else p&&(u=p[l],o&&(u=`${g(u)}${s}${g(p[o])}`,n&&(u=`${u}${s}${g(p[n])}`)));if(i&&typeof u=="number"&&isFinite(u)){const x=p&&parseFloat(p[r]);u=L(u,i,x,m)}f.push(u)}),f}async function ta(e){const{attribute:a,features:l}=e,{normalizationType:o,normalizationField:n,minValue:s,maxValue:t,fieldType:i}=a,r=await w({field:a.field,valueExpression:a.valueExpression,normalizationType:o,normalizationField:n,normalizationTotal:a.normalizationTotal,viewInfoParams:a.viewInfoParams,fieldInfos:a.fieldInfos},l),m=Y({normalizationType:o,normalizationField:n,minValue:s,maxValue:t}),f={value:.5,fieldType:i},d=i==="esriFieldTypeString"?_({values:r,supportsNullCount:m,percentileParams:f}):k({values:r,minValue:s,maxValue:t,useSampleStdDev:!o,supportsNullCount:m,percentileParams:f});return U(d,i==="esriFieldTypeDate")}async function oa(e){const{attribute:a,features:l}=e,o=await w({field:a.field,field2:a.field2,field3:a.field3,fieldDelimiter:a.fieldDelimiter,valueExpression:a.valueExpression,viewInfoParams:a.viewInfoParams,fieldInfos:a.fieldInfos},l),n=Z(o);return H(n,a.domains,a.returnAllCodedValues,a.fieldDelimiter)}async function la(e){const{attribute:a,features:l}=e,{field:o,normalizationType:n,normalizationField:s,normalizationTotal:t,classificationMethod:i}=a,r=await w({field:o,valueExpression:a.valueExpression,normalizationType:n,normalizationField:s,normalizationTotal:t,viewInfoParams:a.viewInfoParams,fieldInfos:a.fieldInfos},l),m=J(r,{field:o,normalizationType:n,normalizationField:s,normalizationTotal:t,classificationMethod:i,standardDeviationInterval:a.standardDeviationInterval,numClasses:a.numClasses,minValue:a.minValue,maxValue:a.maxValue});return K(m,i)}async function sa(e){const{attribute:a,features:l}=e,{field:o,normalizationType:n,normalizationField:s,normalizationTotal:t,classificationMethod:i}=a,r=await w({field:o,valueExpression:a.valueExpression,normalizationType:n,normalizationField:s,normalizationTotal:t,viewInfoParams:a.viewInfoParams,fieldInfos:a.fieldInfos},l);return Q(r,{field:o,normalizationType:n,normalizationField:s,normalizationTotal:t,classificationMethod:i,standardDeviationInterval:a.standardDeviationInterval,numBins:a.numBins,minValue:a.minValue,maxValue:a.maxValue})}async function ra(e){const{attribute:a,features:l}=e,{field:o,radius:n,fieldOffset:s,transform:t,spatialReference:i}=a,r=a.size??[0,0],m=X(l??[],t,i,r),{count:f,min:d,max:c,mean:z,stdDev:I}=aa(m,n??void 0,s,o,r[0],r[1]);return{count:f,min:d,max:c,avg:z,stddev:I}}export{la as classBreaks,ra as heatmapStatistics,sa as histogram,ta as summaryStatistics,oa as uniqueValues};
