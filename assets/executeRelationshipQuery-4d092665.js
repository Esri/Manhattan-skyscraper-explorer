import{b$ as p,gT as l,c5 as f,c4 as m}from"./index-112c244d.js";import{t as j}from"./query-f938b96a.js";import"./normalizeUtils-ca47990d.js";import"./normalizeUtilsCommon-448ddeb2.js";import"./pbfQueryUtils-4859e776.js";import"./pbf-482f6762.js";function R(r,t){const e=r.toJSON();return e.objectIds&&(e.objectIds=e.objectIds.join(",")),e.orderByFields&&(e.orderByFields=e.orderByFields.join(",")),e.outFields&&!t?.returnCountOnly?e.outFields.includes("*")?e.outFields="*":e.outFields=e.outFields.join(","):delete e.outFields,e.outSpatialReference&&(e.outSR=e.outSR.wkid||JSON.stringify(e.outSR.toJSON()),delete e.outSpatialReference),e.dynamicDataSource&&(e.layer=JSON.stringify({source:e.dynamicDataSource}),delete e.dynamicDataSource),e}async function S(r,t,e){const n=await y(r,t,e),o=n.data,s=o.geometryType,a=o.spatialReference,c={};for(const d of o.relatedRecordGroups){const u={fields:void 0,objectIdFieldName:void 0,geometryType:s,spatialReference:a,hasZ:!!o.hasZ,hasM:!!o.hasM,features:d.relatedRecords};if(d.objectId!=null)c[d.objectId]=u;else for(const i of Object.keys(d))i!=="relatedRecords"&&(c[d[i]]=u)}return{...n,data:c}}async function b(r,t,e){const n=await y(r,t,e,{returnCountOnly:!0}),o=n.data,s={};for(const a of o.relatedRecordGroups)a.objectId!=null&&(s[a.objectId]=a.count);return{...n,data:s}}async function y(r,t,e={},n){const o=j({...r.query,f:"json",...n,...R(t,n)});return p(r.path+"/queryRelatedRecords",{...e,query:{...e.query,...o}})}async function J(r,t,e){t=l.from(t);const n=f(r);return S(n,t,e).then(o=>{const s=o.data,a={};return Object.keys(s).forEach(c=>a[c]=m.fromJSON(s[c])),a})}async function $(r,t,e){t=l.from(t);const n=f(r);return b(n,t,{...e}).then(o=>o.data)}export{J as executeRelationshipQuery,$ as executeRelationshipQueryForCount};
