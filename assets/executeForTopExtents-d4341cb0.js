import{c5 as e,eo as p,ci as i}from"./index-112c244d.js";import{p as n}from"./queryTopFeatures-f17a3597.js";import"./normalizeUtils-ca47990d.js";import"./normalizeUtilsCommon-448ddeb2.js";import"./query-f938b96a.js";import"./pbfQueryUtils-4859e776.js";import"./pbf-482f6762.js";async function $(o,r,a){const m=e(o),t=await n(m,p.from(r),{...a});return{count:t.data.count,extent:i.fromJSON(t.data.extent)}}export{$ as executeForTopExtents};
