import{ku as z,kv as y,eZ as x}from"./index-112c244d.js";import{c as R}from"./observers-a5016529.js";/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */const E=new WeakMap,N=new WeakMap;function se(e){N.set(e,new Promise(t=>E.set(e,t)))}function ne(e){E.get(e)()}function re(e){return N.get(e)}/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */function ae(e){return e==="Enter"||e===" "}const I=["0","1","2","3","4","5","6","7","8","9"];/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */const T=new RegExp("\\.(0+)?$"),D=new RegExp("0+$");class a{constructor(t){if(t instanceof a)return t;const[s,n]=U(t).split(".").concat("");this.value=BigInt(s+n.padEnd(a.DECIMALS,"0").slice(0,a.DECIMALS))+BigInt(a.ROUNDED&&n[a.DECIMALS]>="5"),this.isNegative=t.charAt(0)==="-"}getIntegersAndDecimals(){const t=this.value.toString().replace("-","").padStart(a.DECIMALS+1,"0"),s=t.slice(0,-a.DECIMALS),n=t.slice(-a.DECIMALS).replace(D,"");return{integers:s,decimals:n}}toString(){const{integers:t,decimals:s}=this.getIntegersAndDecimals();return`${this.isNegative?"-":""}${t}${s.length?"."+s:""}`}formatToParts(t){const{integers:s,decimals:n}=this.getIntegersAndDecimals(),r=t.numberFormatter.formatToParts(BigInt(s));return this.isNegative&&r.unshift({type:"minusSign",value:t.minusSign}),n.length&&(r.push({type:"decimal",value:t.decimal}),n.split("").forEach(i=>r.push({type:"fraction",value:i}))),r}format(t){const{integers:s,decimals:n}=this.getIntegersAndDecimals(),r=`${this.isNegative?t.minusSign:""}${t.numberFormatter.format(BigInt(s))}`,i=n.length?`${t.decimal}${n.split("").map(l=>t.numberFormatter.format(Number(l))).join("")}`:"";return`${r}${i}`}add(t){return a.fromBigInt(this.value+new a(t).value)}subtract(t){return a.fromBigInt(this.value-new a(t).value)}multiply(t){return a._divRound(this.value*new a(t).value,a.SHIFT)}divide(t){return a._divRound(this.value*a.SHIFT,new a(t).value)}}a.DECIMALS=100;a.ROUNDED=!0;a.SHIFT=BigInt("1"+"0".repeat(a.DECIMALS));a._divRound=(e,t)=>a.fromBigInt(e/t+(a.ROUNDED?e*BigInt(2)/t%BigInt(2):BigInt(0)));a.fromBigInt=e=>Object.assign(Object.create(a.prototype),{value:e,isNegative:e<BigInt(0)});function b(e){return!(!e||isNaN(Number(e)))}function ie(e){return!e||!G(e)?"":h(e,t=>{let s=!1;const n=t.split("").filter((r,i)=>r.match(/\./g)&&!s?(s=!0,!0):r.match(/\-/g)&&i===0?!0:I.includes(r)).reduce((r,i)=>r+i);return b(n)?new a(n).toString():""})}const F=/^([-0])0+(?=\d)/,j=/(?!^\.)\.$/,P=/(?!^-)-/g,H=/^-\b0\b\.?0*$/,oe=e=>h(e,t=>{const s=t.replace(P,"").replace(j,"").replace(F,"$1");return b(s)?H.test(s)?s:new a(s).toString():t});function h(e,t){if(!e)return e;const s=e.toLowerCase().indexOf("e")+1;return s?e.replace(/[eE]*$/g,"").substring(0,s).concat(e.slice(s).replace(/[eE]/g,"")).split(/[eE]/).map((n,r)=>t(r===1?n.replace(/\./g,""):n)).join("e").replace(/^e/,"1e"):t(e)}function U(e){const t=e.split(/[eE]/);if(t.length===1)return e;const s=+e;if(Number.isSafeInteger(s))return`${s}`;const n=e.charAt(0)==="-",r=+t[1],i=t[0].split("."),l=(n?i[0].substring(1):i[0])||"",$=i[1]||"",_=(o,u)=>{const g=Math.abs(u)-o.length,f=g>0?`${"0".repeat(g)}${o}`:o;return`${f.slice(0,u)}.${f.slice(u)}`},k=(o,u)=>{const g=u>o.length?`${o}${"0".repeat(u-o.length)}`:o;return`${g.slice(0,u)}.${g.slice(u)}`},w=r>0?`${l}${k($,r)}`:`${_(l,r)}${$}`;return`${n?"-":""}${w.charAt(0)==="."?"0":""}${w.replace(T,"").replace(F,"")}`}function G(e){return I.some(t=>e.includes(t))}const c="en",Z=["ar","bg","bs","ca","cs","da","de","el",c,"es","et","fi","fr","he","hr","hu","id","it","ja","ko","lt","lv","no","nl","pl","pt-BR","pt-PT","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-CN","zh-HK","zh-TW"],B=["ar","bg","bs","ca","cs","da","de","de-AT","de-CH","el",c,"en-AU","en-CA","en-GB","es","es-MX","et","fi","fr","fr-CH","he","hi","hr","hu","id","it","it-CH","ja","ko","lt","lv","mk","no","nl","pl","pt","pt-PT","ro","ru","sk","sl","sr","sv","th","tr","uk","vi","zh-CN","zh-HK","zh-TW"],K=["arab","arabext","bali","beng","deva","fullwide","gujr","guru","hanidec","khmr","knda","laoo","latn","limb","mlym","mong","mymr","orya","tamldec","telu","thai","tibt"],O=e=>K.includes(e),p=new Intl.NumberFormat().resolvedOptions().numberingSystem,L=p==="arab"||!O(p)?"latn":p,W=e=>O(e)?e:L;function M(e,t="cldr"){const s=t==="cldr"?B:Z;return e?s.includes(e)?e:(e=e.toLowerCase(),e==="nb"?"no":t==="t9n"&&e==="pt"?"pt-BR":(e.includes("-")&&(e=e.replace(/(\w+)-(\w+)/,(n,r,i)=>`${r}-${i.toUpperCase()}`),s.includes(e)||(e=e.split("-")[0])),e==="zh"?"zh-CN":s.includes(e)?e:(console.warn(`Translations for the "${e}" locale are not available and will fall back to the default, English (en).`),c))):c}const m=new Set;function ue(e){J(e),m.size===0&&C?.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"],subtree:!0}),m.add(e)}function J(e){e.effectiveLocale=V(e)}function ce(e){m.delete(e),m.size===0&&C.disconnect()}const C=R("mutation",e=>{e.forEach(t=>{const s=t.target;m.forEach(n=>{if(!z(s,n.el))return;const i=y(n.el,"[lang]");if(!i){n.effectiveLocale=c;return}const l=i.lang;n.effectiveLocale=i.hasAttribute("lang")&&l===""?c:l})})});function V(e){return e.el.lang||y(e.el,"[lang]")?.lang||document.documentElement.lang||c}class X{constructor(){this.delocalize=t=>this._numberFormatOptions?h(t,s=>s.replace(new RegExp(`[${this._minusSign}]`,"g"),"-").replace(new RegExp(`[${this._group}]`,"g"),"").replace(new RegExp(`[${this._decimal}]`,"g"),".").replace(new RegExp(`[${this._digits.join("")}]`,"g"),this._getDigitIndex)):t,this.localize=t=>this._numberFormatOptions?h(t,s=>b(s.trim())?new a(s.trim()).format(this).replace(new RegExp(`[${this._actualGroup}]`,"g"),this._group):s):t}get group(){return this._group}get decimal(){return this._decimal}get minusSign(){return this._minusSign}get digits(){return this._digits}get numberFormatter(){return this._numberFormatter}get numberFormatOptions(){return this._numberFormatOptions}set numberFormatOptions(t){if(t.locale=M(t?.locale),t.numberingSystem=W(t?.numberingSystem),!this._numberFormatOptions&&t.locale===c&&t.numberingSystem===L&&Object.keys(t).length===2||JSON.stringify(this._numberFormatOptions)===JSON.stringify(t))return;this._numberFormatOptions=t,this._numberFormatter=new Intl.NumberFormat(this._numberFormatOptions.locale,this._numberFormatOptions),this._digits=[...new Intl.NumberFormat(this._numberFormatOptions.locale,{useGrouping:!1,numberingSystem:this._numberFormatOptions.numberingSystem}).format(9876543210)].reverse();const s=new Map(this._digits.map((r,i)=>[r,i])),n=new Intl.NumberFormat(this._numberFormatOptions.locale,{numberingSystem:this._numberFormatOptions.numberingSystem}).formatToParts(-123456789e-1);this._actualGroup=n.find(r=>r.type==="group").value,this._group=this._actualGroup.trim().length===0?" ":this._actualGroup,this._decimal=n.find(r=>r.type==="decimal").value,this._minusSign=n.find(r=>r.type==="minusSign").value,this._getDigitIndex=r=>s.get(r)}}const le=new X;/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */const d={};async function q(e,t){const s=`${t}_${e}`;return d[s]||(d[s]=fetch(x(`./assets/${t}/t9n/messages_${e}.json`)).then(n=>(n.ok||S(),n.json())).catch(()=>S())),d[s]}function S(){throw new Error("could not fetch component message bundle")}function v(e){e.messages={...e.defaultMessages,...e.messageOverrides}}async function ge(e){e.defaultMessages=await A(e,e.effectiveLocale),v(e)}async function A(e,t){const{el:s}=e,r=s.tagName.toLowerCase().replace("calcite-","");return q(M(t,"t9n"),r)}async function me(e,t){e.defaultMessages=await A(e,t),v(e)}function de(e){e.onMessagesChange=Q}function he(e){e.onMessagesChange=void 0}function Q(){v(this)}export{a as B,de as a,ge as b,ue as c,ne as d,ce as e,he as f,re as g,b as h,ae as i,oe as j,L as k,I as l,le as n,ie as p,se as s,me as u};
