import{b1 as Gt,eY as Qt,eV as I,eS as Zt,eT as Jt,e$ as Z,eW as Kt,eX as te,kw as ee,kx as ne,ky as ie}from"./index-112c244d.js";import{a as oe,b as se,g as re}from"./browser-5d5bf4a5.js";import{d as ae}from"./debounce-9700caea.js";function H(t){return t.split("-")[1]}function dt(t){return t==="y"?"height":"width"}function D(t){return t.split("-")[0]}function G(t){return["top","bottom"].includes(D(t))?"x":"y"}function gt(t,e,n){let{reference:i,floating:o}=t;const s=i.x+i.width/2-o.width/2,r=i.y+i.height/2-o.height/2,a=G(e),c=dt(a),l=i[c]/2-o[c]/2,h=D(e),u=a==="x";let f;switch(h){case"top":f={x:s,y:i.y-o.height};break;case"bottom":f={x:s,y:i.y+i.height};break;case"right":f={x:i.x+i.width,y:r};break;case"left":f={x:i.x-o.width,y:r};break;default:f={x:i.x,y:i.y}}switch(H(e)){case"start":f[a]-=l*(n&&u?-1:1);break;case"end":f[a]+=l*(n&&u?-1:1);break}return f}const ce=async(t,e,n)=>{const{placement:i="bottom",strategy:o="absolute",middleware:s=[],platform:r}=n,a=s.filter(Boolean),c=await(r.isRTL==null?void 0:r.isRTL(e));let l=await r.getElementRects({reference:t,floating:e,strategy:o}),{x:h,y:u}=gt(l,i,c),f=i,m={},d=0;for(let g=0;g<a.length;g++){const{name:p,fn:w}=a[g],{x:v,y:x,data:T,reset:y}=await w({x:h,y:u,initialPlacement:i,placement:f,strategy:o,middlewareData:m,rects:l,platform:r,elements:{reference:t,floating:e}});if(h=v??h,u=x??u,m={...m,[p]:{...m[p],...T}},y&&d<=50){d++,typeof y=="object"&&(y.placement&&(f=y.placement),y.rects&&(l=y.rects===!0?await r.getElementRects({reference:t,floating:e,strategy:o}):y.rects),{x:h,y:u}=gt(l,f,c)),g=-1;continue}}return{x:h,y:u,placement:f,strategy:o,middlewareData:m}};function U(t,e){return typeof t=="function"?t(e):t}function le(t){return{top:0,right:0,bottom:0,left:0,...t}}function _t(t){return typeof t!="number"?le(t):{top:t,right:t,bottom:t,left:t}}function tt(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function X(t,e){var n;e===void 0&&(e={});const{x:i,y:o,platform:s,rects:r,elements:a,strategy:c}=t,{boundary:l="clippingAncestors",rootBoundary:h="viewport",elementContext:u="floating",altBoundary:f=!1,padding:m=0}=U(e,t),d=_t(m),p=a[f?u==="floating"?"reference":"floating":u],w=tt(await s.getClippingRect({element:(n=await(s.isElement==null?void 0:s.isElement(p)))==null||n?p:p.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(a.floating)),boundary:l,rootBoundary:h,strategy:c})),v=u==="floating"?{...r.floating,x:i,y:o}:r.reference,x=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a.floating)),T=await(s.isElement==null?void 0:s.isElement(x))?await(s.getScale==null?void 0:s.getScale(x))||{x:1,y:1}:{x:1,y:1},y=tt(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({rect:v,offsetParent:x,strategy:c}):v);return{top:(w.top-y.top+d.top)/T.y,bottom:(y.bottom-w.bottom+d.bottom)/T.y,left:(w.left-y.left+d.left)/T.x,right:(y.right-w.right+d.right)/T.x}}const ct=Math.min,fe=Math.max;function lt(t,e,n){return fe(t,ct(e,n))}const ue=t=>({name:"arrow",options:t,async fn(e){const{x:n,y:i,placement:o,rects:s,platform:r,elements:a}=e,{element:c,padding:l=0}=U(t,e)||{};if(c==null)return{};const h=_t(l),u={x:n,y:i},f=G(o),m=dt(f),d=await r.getDimensions(c),g=f==="y",p=g?"top":"left",w=g?"bottom":"right",v=g?"clientHeight":"clientWidth",x=s.reference[m]+s.reference[f]-u[f]-s.floating[m],T=u[f]-s.reference[f],y=await(r.getOffsetParent==null?void 0:r.getOffsetParent(c));let E=y?y[v]:0;(!E||!await(r.isElement==null?void 0:r.isElement(y)))&&(E=a.floating[v]||s.floating[m]);const O=x/2-T/2,P=E/2-d[m]/2-1,M=ct(h[p],P),B=ct(h[w],P),b=M,R=E-d[m]-B,C=E/2-d[m]/2+O,A=lt(b,C,R),$=H(o)!=null&&C!=A&&s.reference[m]/2-(C<b?M:B)-d[m]/2<0?C<b?b-C:R-C:0;return{[f]:u[f]-$,data:{[f]:A,centerOffset:C-A+$}}}}),Mt=["top","right","bottom","left"],vt=Mt.reduce((t,e)=>t.concat(e,e+"-start",e+"-end"),[]),de={left:"right",right:"left",bottom:"top",top:"bottom"};function et(t){return t.replace(/left|right|bottom|top/g,e=>de[e])}function Bt(t,e,n){n===void 0&&(n=!1);const i=H(t),o=G(t),s=dt(o);let r=o==="x"?i===(n?"end":"start")?"right":"left":i==="start"?"bottom":"top";return e.reference[s]>e.floating[s]&&(r=et(r)),{main:r,cross:et(r)}}const me={start:"end",end:"start"};function nt(t){return t.replace(/start|end/g,e=>me[e])}function he(t,e,n){return(t?[...n.filter(o=>H(o)===t),...n.filter(o=>H(o)!==t)]:n.filter(o=>D(o)===o)).filter(o=>t?H(o)===t||(e?nt(o)!==o:!1):!0)}const pe=function(t){return t===void 0&&(t={}),{name:"autoPlacement",options:t,async fn(e){var n,i,o;const{rects:s,middlewareData:r,placement:a,platform:c,elements:l}=e,{crossAxis:h=!1,alignment:u,allowedPlacements:f=vt,autoAlignment:m=!0,...d}=U(t,e),g=u!==void 0||f===vt?he(u||null,m,f):f,p=await X(e,d),w=((n=r.autoPlacement)==null?void 0:n.index)||0,v=g[w];if(v==null)return{};const{main:x,cross:T}=Bt(v,s,await(c.isRTL==null?void 0:c.isRTL(l.floating)));if(a!==v)return{reset:{placement:g[0]}};const y=[p[D(v)],p[x],p[T]],E=[...((i=r.autoPlacement)==null?void 0:i.overflows)||[],{placement:v,overflows:y}],O=g[w+1];if(O)return{data:{index:w+1,overflows:E},reset:{placement:O}};const P=E.map(b=>{const R=H(b.placement);return[b.placement,R&&h?b.overflows.slice(0,2).reduce((C,A)=>C+A,0):b.overflows[0],b.overflows]}).sort((b,R)=>b[1]-R[1]),B=((o=P.filter(b=>b[2].slice(0,H(b[0])?2:3).every(R=>R<=0))[0])==null?void 0:o[0])||P[0][0];return B!==a?{data:{index:w+1,overflows:E},reset:{placement:B}}:{}}}};function ge(t){const e=et(t);return[nt(t),e,nt(e)]}function ve(t,e,n){const i=["left","right"],o=["right","left"],s=["top","bottom"],r=["bottom","top"];switch(t){case"top":case"bottom":return n?e?o:i:e?i:o;case"left":case"right":return e?s:r;default:return[]}}function we(t,e,n,i){const o=H(t);let s=ve(D(t),n==="start",i);return o&&(s=s.map(r=>r+"-"+o),e&&(s=s.concat(s.map(nt)))),s}const wt=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var n;const{placement:i,middlewareData:o,rects:s,initialPlacement:r,platform:a,elements:c}=e,{mainAxis:l=!0,crossAxis:h=!0,fallbackPlacements:u,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:m="none",flipAlignment:d=!0,...g}=U(t,e),p=D(i),w=D(r)===r,v=await(a.isRTL==null?void 0:a.isRTL(c.floating)),x=u||(w||!d?[et(r)]:ge(r));!u&&m!=="none"&&x.push(...we(r,d,m,v));const T=[r,...x],y=await X(e,g),E=[];let O=((n=o.flip)==null?void 0:n.overflows)||[];if(l&&E.push(y[p]),h){const{main:b,cross:R}=Bt(i,s,v);E.push(y[b],y[R])}if(O=[...O,{placement:i,overflows:E}],!E.every(b=>b<=0)){var P,M;const b=(((P=o.flip)==null?void 0:P.index)||0)+1,R=T[b];if(R)return{data:{index:b,overflows:O},reset:{placement:R}};let C=(M=O.filter(A=>A.overflows[0]<=0).sort((A,W)=>A.overflows[1]-W.overflows[1])[0])==null?void 0:M.placement;if(!C)switch(f){case"bestFit":{var B;const A=(B=O.map(W=>[W.placement,W.overflows.filter($=>$>0).reduce(($,Xt)=>$+Xt,0)]).sort((W,$)=>W[1]-$[1])[0])==null?void 0:B[0];A&&(C=A);break}case"initialPlacement":C=r;break}if(i!==C)return{reset:{placement:C}}}return{}}}};function yt(t,e){return{top:t.top-e.height,right:t.right-e.width,bottom:t.bottom-e.height,left:t.left-e.width}}function xt(t){return Mt.some(e=>t[e]>=0)}const ye=function(t){return t===void 0&&(t={}),{name:"hide",options:t,async fn(e){const{rects:n}=e,{strategy:i="referenceHidden",...o}=U(t,e);switch(i){case"referenceHidden":{const s=await X(e,{...o,elementContext:"reference"}),r=yt(s,n.reference);return{data:{referenceHiddenOffsets:r,referenceHidden:xt(r)}}}case"escaped":{const s=await X(e,{...o,altBoundary:!0}),r=yt(s,n.floating);return{data:{escapedOffsets:r,escaped:xt(r)}}}default:return{}}}}};async function xe(t,e){const{placement:n,platform:i,elements:o}=t,s=await(i.isRTL==null?void 0:i.isRTL(o.floating)),r=D(n),a=H(n),c=G(n)==="x",l=["left","top"].includes(r)?-1:1,h=s&&c?-1:1,u=U(e,t);let{mainAxis:f,crossAxis:m,alignmentAxis:d}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...u};return a&&typeof d=="number"&&(m=a==="end"?d*-1:d),c?{x:m*h,y:f*l}:{x:f*l,y:m*h}}const be=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:n,y:i}=e,o=await xe(e,t);return{x:n+o.x,y:i+o.y,data:o}}}};function Te(t){return t==="x"?"y":"x"}const Ee=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:n,y:i,placement:o}=e,{mainAxis:s=!0,crossAxis:r=!1,limiter:a={fn:p=>{let{x:w,y:v}=p;return{x:w,y:v}}},...c}=U(t,e),l={x:n,y:i},h=await X(e,c),u=G(D(o)),f=Te(u);let m=l[u],d=l[f];if(s){const p=u==="y"?"top":"left",w=u==="y"?"bottom":"right",v=m+h[p],x=m-h[w];m=lt(v,m,x)}if(r){const p=f==="y"?"top":"left",w=f==="y"?"bottom":"right",v=d+h[p],x=d-h[w];d=lt(v,d,x)}const g=a.fn({...e,[u]:m,[f]:d});return{...g,data:{x:g.x-n,y:g.y-i}}}}};function L(t){var e;return((e=t.ownerDocument)==null?void 0:e.defaultView)||window}function S(t){return L(t).getComputedStyle(t)}function $t(t){return t instanceof L(t).Node}function N(t){return $t(t)?(t.nodeName||"").toLowerCase():"#document"}function k(t){return t instanceof L(t).HTMLElement}function F(t){return t instanceof L(t).Element}function bt(t){return typeof ShadowRoot>"u"?!1:t instanceof L(t).ShadowRoot||t instanceof ShadowRoot}function Q(t){const{overflow:e,overflowX:n,overflowY:i,display:o}=S(t);return/auto|scroll|overlay|hidden|clip/.test(e+i+n)&&!["inline","contents"].includes(o)}function Ce(t){return["table","td","th"].includes(N(t))}function mt(t){const e=ht(),n=S(t);return n.transform!=="none"||n.perspective!=="none"||!e&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!e&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(i=>(n.willChange||"").includes(i))||["paint","layout","strict","content"].some(i=>(n.contain||"").includes(i))}function ht(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function rt(t){return["html","body","#document"].includes(N(t))}const Tt=Math.min,q=Math.max,it=Math.round,J=Math.floor,z=t=>({x:t,y:t});function It(t){const e=S(t);let n=parseFloat(e.width)||0,i=parseFloat(e.height)||0;const o=k(t),s=o?t.offsetWidth:n,r=o?t.offsetHeight:i,a=it(n)!==s||it(i)!==r;return a&&(n=s,i=r),{width:n,height:i,$:a}}function pt(t){return F(t)?t:t.contextElement}function Y(t){const e=pt(t);if(!k(e))return z(1);const n=e.getBoundingClientRect(),{width:i,height:o,$:s}=It(e);let r=(s?it(n.width):n.width)/i,a=(s?it(n.height):n.height)/o;return(!r||!Number.isFinite(r))&&(r=1),(!a||!Number.isFinite(a))&&(a=1),{x:r,y:a}}const Et=z(0);function Nt(t,e,n){var i,o;if(e===void 0&&(e=!0),!ht())return Et;const s=t?L(t):window;return!n||e&&n!==s?Et:{x:((i=s.visualViewport)==null?void 0:i.offsetLeft)||0,y:((o=s.visualViewport)==null?void 0:o.offsetTop)||0}}function V(t,e,n,i){e===void 0&&(e=!1),n===void 0&&(n=!1);const o=t.getBoundingClientRect(),s=pt(t);let r=z(1);e&&(i?F(i)&&(r=Y(i)):r=Y(t));const a=Nt(s,n,i);let c=(o.left+a.x)/r.x,l=(o.top+a.y)/r.y,h=o.width/r.x,u=o.height/r.y;if(s){const f=L(s),m=i&&F(i)?L(i):i;let d=f.frameElement;for(;d&&i&&m!==f;){const g=Y(d),p=d.getBoundingClientRect(),w=getComputedStyle(d),v=p.left+(d.clientLeft+parseFloat(w.paddingLeft))*g.x,x=p.top+(d.clientTop+parseFloat(w.paddingTop))*g.y;c*=g.x,l*=g.y,h*=g.x,u*=g.y,c+=v,l+=x,d=L(d).frameElement}}return tt({width:h,height:u,x:c,y:l})}function _(t){return(($t(t)?t.ownerDocument:t.document)||window.document).documentElement}function at(t){return F(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function Oe(t){let{rect:e,offsetParent:n,strategy:i}=t;const o=k(n),s=_(n);if(n===s)return e;let r={scrollLeft:0,scrollTop:0},a=z(1);const c=z(0);if((o||!o&&i!=="fixed")&&((N(n)!=="body"||Q(s))&&(r=at(n)),k(n))){const l=V(n);a=Y(n),c.x=l.x+n.clientLeft,c.y=l.y+n.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-r.scrollLeft*a.x+c.x,y:e.y*a.y-r.scrollTop*a.y+c.y}}function Wt(t){return V(_(t)).left+at(t).scrollLeft}function Re(t){const e=_(t),n=at(t),i=t.ownerDocument.body,o=q(e.scrollWidth,e.clientWidth,i.scrollWidth,i.clientWidth),s=q(e.scrollHeight,e.clientHeight,i.scrollHeight,i.clientHeight);let r=-n.scrollLeft+Wt(t);const a=-n.scrollTop;return S(i).direction==="rtl"&&(r+=q(e.clientWidth,i.clientWidth)-o),{width:o,height:s,x:r,y:a}}function j(t){if(N(t)==="html")return t;const e=t.assignedSlot||t.parentNode||bt(t)&&t.host||_(t);return bt(e)?e.host:e}function zt(t){const e=j(t);return rt(e)?t.ownerDocument?t.ownerDocument.body:t.body:k(e)&&Q(e)?e:zt(e)}function ot(t,e){var n;e===void 0&&(e=[]);const i=zt(t),o=i===((n=t.ownerDocument)==null?void 0:n.body),s=L(i);return o?e.concat(s,s.visualViewport||[],Q(i)?i:[]):e.concat(i,ot(i))}function Ae(t,e){const n=L(t),i=_(t),o=n.visualViewport;let s=i.clientWidth,r=i.clientHeight,a=0,c=0;if(o){s=o.width,r=o.height;const l=ht();(!l||l&&e==="fixed")&&(a=o.offsetLeft,c=o.offsetTop)}return{width:s,height:r,x:a,y:c}}function Le(t,e){const n=V(t,!0,e==="fixed"),i=n.top+t.clientTop,o=n.left+t.clientLeft,s=k(t)?Y(t):z(1),r=t.clientWidth*s.x,a=t.clientHeight*s.y,c=o*s.x,l=i*s.y;return{width:r,height:a,x:c,y:l}}function Ct(t,e,n){let i;if(e==="viewport")i=Ae(t,n);else if(e==="document")i=Re(_(t));else if(F(e))i=Le(e,n);else{const o=Nt(t);i={...e,x:e.x-o.x,y:e.y-o.y}}return tt(i)}function Vt(t,e){const n=j(t);return n===e||!F(n)||rt(n)?!1:S(n).position==="fixed"||Vt(n,e)}function Se(t,e){const n=e.get(t);if(n)return n;let i=ot(t).filter(a=>F(a)&&N(a)!=="body"),o=null;const s=S(t).position==="fixed";let r=s?j(t):t;for(;F(r)&&!rt(r);){const a=S(r),c=mt(r);!c&&a.position==="fixed"&&(o=null),(s?!c&&!o:!c&&a.position==="static"&&!!o&&["absolute","fixed"].includes(o.position)||Q(r)&&!c&&Vt(t,r))?i=i.filter(h=>h!==r):o=a,r=j(r)}return e.set(t,i),i}function ke(t){let{element:e,boundary:n,rootBoundary:i,strategy:o}=t;const r=[...n==="clippingAncestors"?Se(e,this._c):[].concat(n),i],a=r[0],c=r.reduce((l,h)=>{const u=Ct(e,h,o);return l.top=q(u.top,l.top),l.right=Tt(u.right,l.right),l.bottom=Tt(u.bottom,l.bottom),l.left=q(u.left,l.left),l},Ct(e,a,o));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Pe(t){return It(t)}function Ot(t,e){return!k(t)||S(t).position==="fixed"?null:e?e(t):t.offsetParent}function He(t){let e=j(t);for(;k(e)&&!rt(e);){if(mt(e))return e;e=j(e)}return null}function Rt(t,e){const n=L(t);if(!k(t))return n;let i=Ot(t,e);for(;i&&Ce(i)&&S(i).position==="static";)i=Ot(i,e);return i&&(N(i)==="html"||N(i)==="body"&&S(i).position==="static"&&!mt(i))?n:i||He(t)||n}function De(t,e,n){const i=k(e),o=_(e),s=n==="fixed",r=V(t,!0,s,e);let a={scrollLeft:0,scrollTop:0};const c=z(0);if(i||!i&&!s)if((N(e)!=="body"||Q(o))&&(a=at(e)),k(e)){const l=V(e,!0,s,e);c.x=l.x+e.clientLeft,c.y=l.y+e.clientTop}else o&&(c.x=Wt(o));return{x:r.left+a.scrollLeft-c.x,y:r.top+a.scrollTop-c.y,width:r.width,height:r.height}}const ft={getClippingRect:ke,convertOffsetParentRelativeRectToViewportRelativeRect:Oe,isElement:F,getDimensions:Pe,getOffsetParent:Rt,getDocumentElement:_,getScale:Y,async getElementRects(t){let{reference:e,floating:n,strategy:i}=t;const o=this.getOffsetParent||Rt,s=this.getDimensions;return{reference:De(e,await o(n),i),floating:{x:0,y:0,...await s(n)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>S(t).direction==="rtl"};function Fe(t,e){let n=null,i;const o=_(t);function s(){clearTimeout(i),n&&n.disconnect(),n=null}function r(a,c){a===void 0&&(a=!1),c===void 0&&(c=1),s();const{left:l,top:h,width:u,height:f}=t.getBoundingClientRect();if(a||e(),!u||!f)return;const m=J(h),d=J(o.clientWidth-(l+u)),g=J(o.clientHeight-(h+f)),p=J(l),w=-m+"px "+-d+"px "+-g+"px "+-p+"px";let v=!0;n=new IntersectionObserver(x=>{const T=x[0].intersectionRatio;if(T!==c){if(!v)return r();T===0?i=setTimeout(()=>{r(!1,1e-7)},100):r(!1,T)}v=!1},{rootMargin:w,threshold:c}),n.observe(t)}return r(!0),s}function _e(t,e,n,i){i===void 0&&(i={});const{ancestorScroll:o=!0,ancestorResize:s=!0,elementResize:r=!0,layoutShift:a=typeof IntersectionObserver=="function",animationFrame:c=!1}=i,l=pt(t),h=o||s?[...l?ot(l):[],...ot(e)]:[];h.forEach(p=>{o&&p.addEventListener("scroll",n,{passive:!0}),s&&p.addEventListener("resize",n)});const u=l&&a?Fe(l,n):null;let f=null;r&&(f=new ResizeObserver(n),l&&!c&&f.observe(l),f.observe(e));let m,d=c?V(t):null;c&&g();function g(){const p=V(t);d&&(p.x!==d.x||p.y!==d.y||p.width!==d.width||p.height!==d.height)&&n(),d=p,m=requestAnimationFrame(g)}return n(),()=>{h.forEach(p=>{o&&p.removeEventListener("scroll",n),s&&p.removeEventListener("resize",n)}),u&&u(),f&&f.disconnect(),f=null,c&&cancelAnimationFrame(m)}}const Me=(t,e,n)=>{const i=new Map,o={platform:ft,...n},s={...o.platform,_c:i};return ce(t,e,{...o,platform:s})},Be=globalThis.calciteComponentsConfig,$e={floatingUINonChromiumPositioningFix:!0,...Be},Ie=We();function Ne(){const t=se();return t?.brands?!!t.brands.find(({brand:e,version:n})=>(e==="Google Chrome"||e==="Chromium")&&Number(n)>=109):!!navigator.userAgent.split(" ").find(e=>{const[n,i]=e.split("/");return n==="Chrome"&&parseInt(i)>=109})}async function We(){if($e.floatingUINonChromiumPositioningFix&&(/firefox|safari/i.test(oe())||Ne())){const{offsetParent:t}=await Gt(()=>import("./composed-offset-position.esm-09633c10.js"),[],import.meta.url),e=ft.getOffsetParent;ft.getOffsetParent=n=>e(n,t)}}const Ut=async(t,{referenceEl:e,floatingEl:n,overlayPositioning:i="absolute",placement:o,flipDisabled:s,flipPlacements:r,offsetDistance:a,offsetSkidding:c,arrowEl:l,type:h})=>{if(!e||!n)return null;await Ie;const{x:u,y:f,placement:m,strategy:d,middlewareData:g}=await Me(e,n,{strategy:i,placement:o==="auto"||o==="auto-start"||o==="auto-end"?void 0:Ue(n,o),middleware:Ve({placement:o,flipDisabled:s,flipPlacements:r,offsetDistance:a,offsetSkidding:c,arrowEl:l,type:h})});if(l&&g.arrow){const{x:T,y}=g.arrow,E=m.split("-")[0],O=T!=null?"left":"top",P=qe[E],M={left:"",top:"",bottom:"",right:""};"floatingLayout"in t&&(t.floatingLayout=E==="left"||E==="right"?"horizontal":"vertical"),Object.assign(l.style,{...M,[O]:`${O=="left"?T:y}px`,[E]:"100%",transform:P})}const w=g.hide?.referenceHidden?"hidden":null,v=w?"none":null;n.setAttribute(ze,m);const x=`translate(${Math.round(u)}px,${Math.round(f)}px)`;Object.assign(n.style,{visibility:w,pointerEvents:v,position:d,top:"0",left:"0",transform:x})},ze="data-placement",At=100,Lt=["top","bottom","right","left","top-start","top-end","bottom-start","bottom-end","right-start","right-end","left-start","left-end"],St={animation:"calcite-floating-ui-anim",animationActive:"calcite-floating-ui-anim--active"};function Ve({placement:t,flipDisabled:e,flipPlacements:n,offsetDistance:i,offsetSkidding:o,arrowEl:s,type:r}){const a=[Ee(),ye()];if(r==="menu")return[...a,wt({fallbackPlacements:n||["top-start","top","top-end","bottom-start","bottom","bottom-end"]})];if(r==="popover"||r==="tooltip"){const c=[...a,be({mainAxis:typeof i=="number"?i:0,crossAxis:typeof o=="number"?o:0})];return t==="auto"||t==="auto-start"||t==="auto-end"?c.push(pe({alignment:t==="auto-start"?"start":t==="auto-end"?"end":null})):e||c.push(wt(n?{fallbackPlacements:n}:{})),s&&c.push(ue({element:s})),c}return[]}function un(t,e){const n=t.filter(i=>Lt.includes(i));return n.length!==t.length&&console.warn(`${e.tagName}: Invalid value found in: flipPlacements. Try any of these: ${Lt.map(i=>`"${i}"`).join(", ").trim()}`,{el:e}),n}function Ue(t,e){const n=["left","right"];return Qt(t)==="rtl"&&n.reverse(),e.replace(/leading/gi,n[0]).replace(/trailing/gi,n[1])}async function Ye(t,e,n=!1){return t.open?(n?je(t):Ut)(t,e):void 0}function je(t){let e=st.get(t);return e||(e=ae(Ut,At,{leading:!0,maxWait:At}),st.set(t,e),e)}const qe={top:"",left:"rotate(-90deg)",bottom:"rotate(180deg)",right:"rotate(90deg)"},ut=new WeakMap,st=new WeakMap;function Xe(t,e,n){if(!n||!e)return;Yt(t,e,n),Object.assign(n.style,{visibility:"hidden",pointerEvents:"none",position:t.overlayPositioning,top:"0",left:"0"});const i=_e;ut.set(t,i(e,n,()=>t.reposition()))}function Yt(t,e,n){!n||!e||(ut.get(t)?.(),ut.delete(t),st.get(t)?.cancel(),st.delete(t))}const kt=4,Ge=Math.ceil(Math.hypot(kt,kt));/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */const K=new WeakMap;function Qe(t){t.propertyName===this.openTransitionProp&&t.target===this.transitionEl&&(this.open?this.onBeforeOpen():this.onBeforeClose())}function Ze(t){t.propertyName===this.openTransitionProp&&t.target===this.transitionEl&&(this.open?this.onOpen():this.onClose())}function Pt(t){if(jt(t),t.transitionEl){const e=Qe.bind(t),n=Ze.bind(t);K.set(t,[t.transitionEl,e,n]),t.transitionEl.addEventListener("transitionstart",e),t.transitionEl.addEventListener("transitionend",n)}}function jt(t){if(!K.has(t))return;const[e,n,i]=K.get(t);e.removeEventListener("transitionstart",n),e.removeEventListener("transitionend",i),K.delete(t)}/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */const Ht={arrow:"calcite-floating-ui-arrow",arrowStroke:"calcite-floating-ui-arrow__stroke"},Je={width:12,height:6,strokeWidth:1},Ke=({floatingLayout:t,key:e,ref:n})=>{const{width:i,height:o,strokeWidth:s}=Je,r=i/2,a=t==="vertical",c=`M0,0 H${i} L${i-r},${o} Q${r},${o} ${r},${o} Z`;return I("svg",{"aria-hidden":"true",class:Ht.arrow,height:i,key:e,ref:n,viewBox:`0 0 ${i} ${i+(a?0:s)}`,width:i+(a?s:0)},s>0&&I("path",{class:Ht.arrowStroke,d:c,fill:"none","stroke-width":s+1}),I("path",{d:c,stroke:"none"}))};/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.4.3
 */const tn={container:"container"},en=300,nn=500,Dt="aria-describedby";function qt(t){const{referenceElement:e}=t;return(typeof e=="string"?ee(t,{id:e}):e)||null}class on{constructor(){this.registeredElements=new WeakMap,this.registeredShadowRootCounts=new WeakMap,this.hoverOpenTimeout=null,this.hoverCloseTimeout=null,this.hoveredTooltip=null,this.clickedTooltip=null,this.activeTooltip=null,this.registeredElementCount=0,this.queryTooltip=e=>{const{registeredElements:n}=this,i=e.find(o=>n.has(o));return n.get(i)},this.keyDownHandler=e=>{if(e.key==="Escape"&&!e.defaultPrevented){const{activeTooltip:n}=this;if(n?.open){this.clearHoverTimeout(),this.closeActiveTooltip();const i=qt(n);i instanceof Element&&i.contains(e.target)&&e.preventDefault()}}},this.pointerMoveHandler=e=>{const n=e.composedPath(),{activeTooltip:i}=this;if(i?.open&&n.includes(i)){this.clearHoverTimeout();return}const s=this.queryTooltip(n);this.hoveredTooltip=s,!this.isClosableClickedTooltip(s)&&(this.clickedTooltip=null,s?this.openHoveredTooltip(s):i&&this.closeHoveredTooltip())},this.pointerDownHandler=e=>{if(!ne(e))return;const n=this.queryTooltip(e.composedPath());this.clickedTooltip=n,n?.closeOnClick&&(this.toggleTooltip(n,!1),this.clearHoverTimeout())},this.focusInHandler=e=>{this.queryFocusedTooltip(e,!0)},this.focusOutHandler=e=>{this.queryFocusedTooltip(e,!1)},this.openHoveredTooltip=e=>{this.hoverOpenTimeout=window.setTimeout(()=>{this.hoverOpenTimeout!==null&&(this.clearHoverCloseTimeout(),this.closeActiveTooltip(),e===this.hoveredTooltip&&this.toggleTooltip(e,!0))},this.activeTooltip?0:en)},this.closeHoveredTooltip=()=>{this.hoverCloseTimeout=window.setTimeout(()=>{this.hoverCloseTimeout!==null&&this.closeActiveTooltip()},nn)}}registerElement(e,n){this.registeredElementCount++,this.registeredElements.set(e,n);const i=this.getReferenceElShadowRootNode(e);i&&this.registerShadowRoot(i),this.registeredElementCount===1&&this.addListeners()}unregisterElement(e){const n=this.getReferenceElShadowRootNode(e);n&&this.unregisterShadowRoot(n),this.registeredElements.delete(e)&&this.registeredElementCount--,this.registeredElementCount===0&&this.removeListeners()}addShadowListeners(e){e.addEventListener("focusin",this.focusInHandler,{capture:!0}),e.addEventListener("focusout",this.focusOutHandler,{capture:!0})}removeShadowListeners(e){e.removeEventListener("focusin",this.focusInHandler,{capture:!0}),e.removeEventListener("focusout",this.focusOutHandler,{capture:!0})}addListeners(){document.addEventListener("keydown",this.keyDownHandler,{capture:!0}),document.addEventListener("pointermove",this.pointerMoveHandler,{capture:!0}),document.addEventListener("pointerdown",this.pointerDownHandler,{capture:!0}),document.addEventListener("focusin",this.focusInHandler,{capture:!0}),document.addEventListener("focusout",this.focusOutHandler,{capture:!0})}removeListeners(){document.removeEventListener("keydown",this.keyDownHandler,{capture:!0}),document.removeEventListener("pointermove",this.pointerMoveHandler,{capture:!0}),document.removeEventListener("pointerdown",this.pointerDownHandler,{capture:!0}),document.removeEventListener("focusin",this.focusInHandler,{capture:!0}),document.removeEventListener("focusout",this.focusOutHandler,{capture:!0})}clearHoverOpenTimeout(){window.clearTimeout(this.hoverOpenTimeout),this.hoverOpenTimeout=null}clearHoverCloseTimeout(){window.clearTimeout(this.hoverCloseTimeout),this.hoverCloseTimeout=null}clearHoverTimeout(){this.clearHoverOpenTimeout(),this.clearHoverCloseTimeout()}closeActiveTooltip(){const{activeTooltip:e}=this;e?.open&&this.toggleTooltip(e,!1)}toggleFocusedTooltip(e,n){this.closeActiveTooltip(),n&&this.clearHoverTimeout(),this.toggleTooltip(e,n)}toggleTooltip(e,n){e.open=n,this.activeTooltip=n?e:null}queryFocusedTooltip(e,n){const i=this.queryTooltip(e.composedPath());!i||this.isClosableClickedTooltip(i)||this.toggleFocusedTooltip(i,n)}isClosableClickedTooltip(e){return e?.closeOnClick&&e===this.clickedTooltip}registerShadowRoot(e){const{registeredShadowRootCounts:n}=this,i=(n.get(e)??0)+1;i===1&&this.addShadowListeners(e),n.set(e,i)}unregisterShadowRoot(e){const{registeredShadowRootCounts:n}=this,i=n.get(e)-1;i===0&&this.removeShadowListeners(e),n.set(e,i)}getReferenceElShadowRootNode(e){return e instanceof Element?ie(e):null}}const sn="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-right{0%{opacity:0;transform:translate3D(-5px, 0, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-left{0%{opacity:0;transform:translate3D(5px, 0, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-right{animation-name:in-right}.calcite-animate__in-left{animation-name:in-left}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:var(--calcite-app-z-index-dropdown)}:host([hidden]){display:none}:host{--calcite-floating-ui-z-index:var(--calcite-tooltip-z-index, 901);display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index)}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-app-z-index);border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{transform:translateY(-5px)}:host([data-placement^=top]) .calcite-floating-ui-anim{transform:translateY(5px)}:host([data-placement^=left]) .calcite-floating-ui-anim{transform:translateX(5px)}:host([data-placement^=right]) .calcite-floating-ui-anim{transform:translateX(-5px)}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-app-z-index) * -1);fill:var(--calcite-ui-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-ui-border-3)}.container{position:relative;overflow:hidden;border-radius:0.25rem;padding-block:0.75rem;padding-inline:1rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);max-inline-size:20rem;max-block-size:20rem;text-align:start}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3);background-color:var(--calcite-ui-foreground-1)}.arrow::before{outline:1px solid var(--calcite-ui-border-3)}",Ft=new on,rn=Zt(class extends Jt{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.calciteTooltipBeforeClose=Z(this,"calciteTooltipBeforeClose",6),this.calciteTooltipClose=Z(this,"calciteTooltipClose",6),this.calciteTooltipBeforeOpen=Z(this,"calciteTooltipBeforeOpen",6),this.calciteTooltipOpen=Z(this,"calciteTooltipOpen",6),this.guid=`calcite-tooltip-${re()}`,this.hasLoaded=!1,this.openTransitionProp="opacity",this.setTransitionEl=t=>{this.transitionEl=t,Pt(this)},this.setUpReferenceElement=(t=!0)=>{this.removeReferences(),this.effectiveReferenceElement=qt(this.el),Xe(this,this.effectiveReferenceElement,this.el);const{el:e,referenceElement:n,effectiveReferenceElement:i}=this;t&&n&&!i&&console.warn(`${e.tagName}: reference-element id "${n}" was not found.`,{el:e}),this.addReferences()},this.getId=()=>this.el.id||this.guid,this.addReferences=()=>{const{effectiveReferenceElement:t}=this;if(!t)return;const e=this.getId();"setAttribute"in t&&t.setAttribute(Dt,e),Ft.registerElement(t,this.el)},this.removeReferences=()=>{const{effectiveReferenceElement:t}=this;t&&("removeAttribute"in t&&t.removeAttribute(Dt),Ft.unregisterElement(t))},this.closeOnClick=!1,this.label=void 0,this.offsetDistance=Ge,this.offsetSkidding=0,this.open=!1,this.overlayPositioning="absolute",this.placement="auto",this.referenceElement=void 0,this.effectiveReferenceElement=void 0,this.floatingLayout="vertical"}offsetDistanceOffsetHandler(){this.reposition(!0)}offsetSkiddingHandler(){this.reposition(!0)}openHandler(t){t&&this.reposition(!0)}overlayPositioningHandler(){this.reposition(!0)}placementHandler(){this.reposition(!0)}referenceElementHandler(){this.setUpReferenceElement()}connectedCallback(){Pt(this),this.setUpReferenceElement(this.hasLoaded)}componentDidLoad(){this.referenceElement&&!this.effectiveReferenceElement&&this.setUpReferenceElement(),this.reposition(!0),this.hasLoaded=!0}disconnectedCallback(){this.removeReferences(),Yt(this,this.effectiveReferenceElement,this.el),jt(this)}async reposition(t=!1){const{el:e,effectiveReferenceElement:n,placement:i,overlayPositioning:o,offsetDistance:s,offsetSkidding:r,arrowEl:a}=this;return Ye(this,{floatingEl:e,referenceEl:n,overlayPositioning:o,placement:i,offsetDistance:s,offsetSkidding:r,arrowEl:a,type:"tooltip"},t)}onBeforeOpen(){this.calciteTooltipBeforeOpen.emit()}onOpen(){this.calciteTooltipOpen.emit()}onBeforeClose(){this.calciteTooltipBeforeClose.emit()}onClose(){this.calciteTooltipClose.emit()}render(){const{effectiveReferenceElement:t,label:e,open:n,floatingLayout:i}=this,o=t&&n,s=!o;return I(te,{"aria-hidden":Kt(s),"aria-label":e,"aria-live":"polite","calcite-hydrated-hidden":s,id:this.getId(),role:"tooltip"},I("div",{class:{[St.animation]:!0,[St.animationActive]:o},ref:this.setTransitionEl},I(Ke,{floatingLayout:i,ref:r=>this.arrowEl=r}),I("div",{class:tn.container},I("slot",null))))}get el(){return this}static get watchers(){return{offsetDistance:["offsetDistanceOffsetHandler"],offsetSkidding:["offsetSkiddingHandler"],open:["openHandler"],overlayPositioning:["overlayPositioningHandler"],placement:["placementHandler"],referenceElement:["referenceElementHandler"]}}static get style(){return sn}},[1,"calcite-tooltip",{closeOnClick:[516,"close-on-click"],label:[1],offsetDistance:[514,"offset-distance"],offsetSkidding:[514,"offset-skidding"],open:[516],overlayPositioning:[513,"overlay-positioning"],placement:[513],referenceElement:[1,"reference-element"],effectiveReferenceElement:[32],floatingLayout:[32],reposition:[64]}]);function an(){if(typeof customElements>"u")return;["calcite-tooltip"].forEach(e=>{switch(e){case"calcite-tooltip":customElements.get(e)||customElements.define(e,rn);break}})}an();export{Ke as F,rn as T,Xe as a,Ge as b,Pt as c,an as d,Yt as e,un as f,jt as g,St as h,Ye as r};
