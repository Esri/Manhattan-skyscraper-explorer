import{cT as k,cU as C,cV as A,cW as I}from"./index-9e6e60fd.js";import{a as V,b as x,d as O}from"./PointCloudUniqueValueRenderer-b2d9c6a5.js";function U(n,o,f,i){const{rendererJSON:d,isRGBRenderer:p}=n;let t=null,s=null;if(o&&p)t=o;else if(o&&d?.type==="pointCloudUniqueValueRenderer"){s=V.fromJSON(d);const e=s.colorUniqueValueInfos;t=new Uint8Array(3*i);const a=m(s.fieldTransformType);for(let r=0;r<i;r++){const c=(a?a(o[r]):o[r])+"";for(let l=0;l<e.length;l++)if(e[l].values.includes(c)){t[3*r]=e[l].color.r,t[3*r+1]=e[l].color.g,t[3*r+2]=e[l].color.b;break}}}else if(o&&d?.type==="pointCloudStretchRenderer"){s=x.fromJSON(d);const e=s.stops;t=new Uint8Array(3*i);const a=m(s.fieldTransformType);for(let r=0;r<i;r++){const c=a?a(o[r]):o[r],l=e.length-1;if(c<e[0].value)t[3*r]=e[0].color.r,t[3*r+1]=e[0].color.g,t[3*r+2]=e[0].color.b;else if(c>=e[l].value)t[3*r]=e[l].color.r,t[3*r+1]=e[l].color.g,t[3*r+2]=e[l].color.b;else for(let u=1;u<e.length;u++)if(c<e[u].value){const b=(c-e[u-1].value)/(e[u].value-e[u-1].value);t[3*r]=e[u].color.r*b+e[u-1].color.r*(1-b),t[3*r+1]=e[u].color.g*b+e[u-1].color.g*(1-b),t[3*r+2]=e[u].color.b*b+e[u-1].color.b*(1-b);break}}}else if(o&&d?.type==="pointCloudClassBreaksRenderer"){s=O.fromJSON(d);const e=s.colorClassBreakInfos;t=new Uint8Array(3*i);const a=m(s.fieldTransformType);for(let r=0;r<i;r++){const c=a?a(o[r]):o[r];for(let l=0;l<e.length;l++)if(c>=e[l].minValue&&c<=e[l].maxValue){t[3*r]=e[l].color.r,t[3*r+1]=e[l].color.g,t[3*r+2]=e[l].color.b;break}}}else t=new Uint8Array(3*i).fill(255);if(f&&s&&s.colorModulation){const e=s.colorModulation.minValue,a=s.colorModulation.maxValue,r=.3;for(let c=0;c<i;c++){const l=f[c],u=l>=a?1:l<=e?r:r+(1-r)*(l-e)/(a-e);t[3*c]=u*t[3*c],t[3*c+1]=u*t[3*c+1],t[3*c+2]=u*t[3*c+2]}}return t}function B(n,o){if(n.encoding==null||n.encoding===""){const f=k(o,n);if(f.vertexAttributes.position==null)return;const i=C(o,f.vertexAttributes.position),d=f.header.fields,p=[d.offsetX,d.offsetY,d.offsetZ],t=[d.scaleX,d.scaleY,d.scaleZ],s=i.length/3,e=new Float64Array(3*s);for(let a=0;a<s;a++)e[3*a]=i[3*a]*t[0]+p[0],e[3*a+1]=i[3*a+1]*t[1]+p[1],e[3*a+2]=i[3*a+2]*t[2]+p[2];return e}if(n.encoding==="lepcc-xyz")return A(o).result}function M(n,o,f){return n!=null&&n.attributeInfo.useElevation?o?R(o,f):null:n!=null&&n.attributeInfo.storageInfo?I(n.attributeInfo.storageInfo,n.buffer,f):null}function R(n,o){const f=new Float64Array(o);for(let i=0;i<o;i++)f[i]=n[3*i+2];return f}function F(n,o,f,i,d){const p=n.length/3;let t=0;for(let s=0;s<p;s++){let e=!0;for(let a=0;a<i.length&&e;a++){const{filterJSON:r}=i[a],c=d[a].values[s];switch(r.type){case"pointCloudValueFilter":{const l=r.mode==="exclude";r.values.includes(c)===l&&(e=!1);break}case"pointCloudBitfieldFilter":{const l=v(r.requiredSetBits),u=v(r.requiredClearBits);(c&l)===l&&!(c&u)||(e=!1);break}case"pointCloudReturnFilter":{const l=15&c,u=c>>>4&15,b=u>1,w=l===1,y=l===u;let h=!1;for(const g of r.includedReturns)if(g==="last"&&y||g==="firstOfMany"&&w&&b||g==="lastOfMany"&&y&&b||g==="single"&&!b){h=!0;break}h||(e=!1);break}}}e&&(f[t]=s,n[3*t]=n[3*s],n[3*t+1]=n[3*s+1],n[3*t+2]=n[3*s+2],o[3*t]=o[3*s],o[3*t+1]=o[3*s+1],o[3*t+2]=o[3*s+2],t++)}return t}function m(n){switch(n){default:case null:case"none":return o=>o;case"low-four-bit":return o=>15&o;case"high-four-bit":return o=>(240&o)>>4;case"absolute-value":return o=>Math.abs(o);case"modulo-ten":return o=>o%10}}function v(n){let o=0;for(const f of n||[])o|=1<<f;return o}export{R as a,M as c,F as f,U as i,B as u};
