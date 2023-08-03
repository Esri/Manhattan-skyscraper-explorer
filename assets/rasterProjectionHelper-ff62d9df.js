import{db as Q,dc as Mn,ci as B,dd as v,cA as W,de as Rn,ak as un,c7 as N,aQ as bn,at as Pn,df as G,dg as E,dh as tn,di as Sn,dj as Nn,bl as En,dk as en}from"./index-112c244d.js";var H;function xn(n,e,i){return!bn(n,e,i)}function O(n,e,i){const s=xn(n,e,i);if(s&&!Q())throw new Pn("rasterprojectionhelper-project","projection engine is not loaded");return s}(function(n){n[n.None=0]="None",n[n.North=1]="North",n[n.South=2]="South",n[n.Both=3]="Both"})(H||(H={}));const on=(n,e,i,s=0)=>{if(i[0]===1)return[0,0];let r=1,t=-1,o=1,f=-1;for(let u=0;u<n.length;u+=2)isNaN(n[u])||(r=r>n[u]?n[u]:r,t=t>n[u]?t:n[u],o=o>n[u+1]?n[u+1]:o,f=f>n[u+1]?f:n[u+1]);const{cols:c,rows:a}=e,l=(t-r)/c/i[0],w=(f-o)/a/i[1],y=2*s;let x=0,m=!1,h=[0,0];for(let u=0;u<c-3;u++){for(let M=0;M<a-3;M++){const p=u*a*2+2*M,g=(n[p]+n[p+4]+n[p+4*a]+n[p+4*a+4])/4,d=(n[p+1]+n[p+5]+n[p+4*a+1]+n[p+4*a+5])/4,R=Math.abs((g-n[p+2*a+2])/l),b=Math.abs((d-n[p+2*a+3])/w);if(R+b>x&&(x=R+b,h=[R,b]),y&&x>y){m=!0;break}}if(m)break}return h},Gn={3395:20037508342789244e-9,3410:17334193943686873e-9,3857:20037508342788905e-9,3975:17367530445161372e-9,4087:20037508342789244e-9,4088:20015108787169147e-9,6933:17367530445161372e-9,32662:20037508342789244e-9,53001:2001508679602057e-8,53002:1000754339801029e-8,53003:2001508679602057e-8,53004:2001508679602057e-8,53016:14152803599503474e-9,53017:17333573624304302e-9,53034:2001508679602057e-8,53079:20015114352186374e-9,53080:20015114352186374e-9,54001:20037508342789244e-9,54002:10018754171394624e-9,54003:20037508342789244e-9,54004:20037508342789244e-9,54016:14168658027268292e-9,54017:1736753044516137e-8,54034:20037508342789244e-9,54079:20037508342789244e-9,54080:20037508342789244e-9,54100:20037508342789244e-9,54101:20037508342789244e-9},L=32,j=4,q=j,J=new Map,X=new Map,A=500;async function Ln(){Q()||await Mn()}function jn(n,e,i){return O(n.spatialReference,e),i?en(e,n.spatialReference,n):en(n.spatialReference,e,n)}function An(n,e,i,s=null){const r=n.spatialReference;if(r.equals(e))return n;O(r,e,s);const t=i.center,o=new B({xmin:t.x-n.x/2,xmax:t.x+n.x/2,ymin:t.y-n.y/2,ymax:t.y+n.y/2,spatialReference:r}),f=v(o,e,s),c=k(e);let a;if(f==null||c!=null&&f.width>=c){const l=W(r)/W(e);a={x:n.x*l,y:n.y*l}}else a={x:f.width,y:f.height};return a}function S(n,e=.01){return W(n)?e/W(n):0}function sn(n,e,i=null,s=!0){const r=n.spatialReference;if(r.equals(e))return n;O(r,e,i);const t=v(n,e,i);return s&&t&&mn([n],[t],r,e),t}function mn(n,e,i,s){const r=I(i,!0),t=I(s,!0),o=S(i,A),f=S(s,A);if(o&&r!=null&&t!=null)for(let c=0;c<n.length;c++){const a=e[c];if(!a)continue;const{x:l}=n[c],{x:w}=a;w>=t[1]-f&&Math.abs(l-r[0])<o?a.x-=t[1]-t[0]:w<=t[0]+f&&Math.abs(l-r[1])<o&&(a.x+=t[1]-t[0])}}function kn(n){const{inSR:e,outSR:i,datumTransformation:s,preferPE:r}=n;if(e.equals(i)){const{points:t}=U(n,null);return t}return e.isWebMercator&&i.isWGS84||e.isWGS84&&i.isWebMercator?Tn(n):O(e,i,s)&&r&&(e.isGeographic||_(e)!=null)?rn(n):Cn(n)}function Cn(n){const{points:e}=U(n,null),{inSR:i,outSR:s,datumTransformation:r}=n,t=e.map(f=>new N(f[0],f[1],i)),o=v(t,s,r);return r&&mn(t,o,i,s),o.map(f=>f?[f.x,f.y]:[NaN,NaN])}function rn(n){const{inSR:e,outSR:i,datumTransformation:s}=n,r=_(e),{points:t,mask:o}=U(n,r);if(!e.isGeographic){const c=e.wkid?G.coordsys(e.wkid):G.fromString(e.isGeographic?E.PE_TYPE_GEOGCS:E.PE_TYPE_PROJCS,e.wkt);tn.projToGeog(c,t.length,t)}if(s!=null&&s.steps.length){let c;if(i.isGeographic&&(c=t.map(([l])=>l>179.9955?1:l<-179.9955?-1:0)),s.steps.forEach(l=>{const w=l.wkid?G.geogtran(l.wkid):G.fromString(E.PE_TYPE_GEOGTRAN,l.wkt);Sn.geogToGeog(w,t.length,t,null,l.isInverse?E.PE_TRANSFORM_2_TO_1:E.PE_TRANSFORM_1_TO_2)}),c)for(let l=0;l<t.length;l++){const w=c[l],y=t[l][0],x=y>179.9955?1:y<-179.9955?-1:0;w&&x&&w!==x&&(t[l][0]=w>0?y+360:y-360)}}if(!i.isGeographic){const c=_(i,!0),a=c!=null&&c.isEnvelope?[c.bbox[1],c.bbox[3]]:[-90,90];_n(t,a);const l=i.wkid?G.coordsys(i.wkid):G.fromString(i.isGeographic?E.PE_TYPE_GEOGCS:E.PE_TYPE_PROJCS,i.wkt);tn.geogToProj(l,t.length,t)}let f=t;if(o&&t.length!==o.length){f=[];for(let c=0,a=0;c<o.length;c++)o[c]?f.push(t[a++]):f.push([NaN,NaN])}return f}function Tn(n){const{cols:e,rows:i,xres:s,yres:r,usePixelCenter:t,inSR:o,outSR:f}=n;let{xmin:c,ymax:a}=n;t&&(c+=s/2,a-=r/2);const l=[],w=[],y=Math.max(e,i);for(let m=0;m<y;m++){const h=c+s*Math.min(e,m),u=a-r*Math.min(i,m),M=v(new N({x:h,y:u,spatialReference:o}),f);m<=e&&l.push(M.x),m<=i&&w.push(M.y)}const x=[];for(let m=0;m<e;m++)for(let h=0;h<i;h++)x.push([l[m],w[h]]);return x}function _(n,e=!1){let i=n.wkid||n.wkt;if(!i||n.isGeographic)return null;if(i=String(i),J.has(i)){const o=J.get(i);return e?o?.gcs:o?.pcs}const s=n.wkid?G.coordsys(n.wkid):G.fromString(n.isGeographic?E.PE_TYPE_GEOGCS:E.PE_TYPE_PROJCS,n.wkt),r=an(s,S(n,1e-4)),t=an(s,0,!0);return J.set(i,{pcs:r,gcs:t}),e?t:r}function an(n,e=0,i=!1){const s=Nn.generate(n),r=i?n.horizonGcsGenerate():n.horizonPcsGenerate();if(!s||!r?.length)return null;let t=!1,o=r.find(u=>u.getInclusive()===1&&u.getKind()===1);if(!o){if(o=r.find(u=>u.getInclusive()===1&&u.getKind()===0),!o)return null;t=!0}const f=i?0:(s.getNorthPoleLocation()===2?1:0)|(s.getSouthPoleLocation()===2?2:0),c=s.isPannableRectangle(),a=o.getCoord();if(t)return{isEnvelope:t,isPannable:c,vertices:a,coef:null,bbox:[a[0][0]-e,a[0][1]-e,a[1][0]+e,a[1][1]+e],poleLocation:f};let l=0;const w=[];let[y,x]=a[0],[m,h]=a[0];for(let u=0,M=a.length;u<M;u++){l++,l===M&&(l=0);const[p,g]=a[u],[d,R]=a[l];if(R===g)w.push([p,d,g,R,2]);else{const b=(d-p)/(R-g||1e-4),C=p-b*g;g<R?w.push([b,C,g,R,0]):w.push([b,C,R,g,1])}y=y<p?y:p,x=x<g?x:g,m=m>p?m:p,h=h>g?h:g}return{isEnvelope:!1,isPannable:c,vertices:a,coef:w,bbox:[y,x,m,h],poleLocation:f}}function U(n,e){const i=[],{cols:s,rows:r,xres:t,yres:o,usePixelCenter:f}=n;let{xmin:c,ymax:a}=n;if(f&&(c+=t/2,a-=o/2),e==null){for(let x=0;x<s;x++)for(let m=0;m<r;m++)i.push([c+t*x,a-o*m]);return{points:i}}const l=new Uint8Array(s*r);if(e.isEnvelope){const{bbox:[x,m,h,u]}=e;for(let M=0,p=0;M<s;M++){const g=c+t*M,d=e.isPannable||g>=x&&g<=h;for(let R=0;R<r;R++,p++){const b=a-o*R;d&&b>=m&&b<=u&&(i.push([g,b]),l[p]=1)}}return{points:i,mask:l}}const w=e.coef,y=[];for(let x=0;x<r;x++){const m=a-o*x,h=[],u=[];for(let p=0;p<w.length;p++){const[g,d,R,b,C]=w[p];if(m===R&&R===b)h.push(g),h.push(d),u.push(2),u.push(2);else if(m>=R&&m<=b){const z=g*m+d;h.push(z),u.push(C)}}let M=h;if(h.length>2){let p=u[0]===2?0:u[0],g=h[0];M=[];for(let d=1;d<u.length;d++)u[d]===2&&d!==u.length-1||(u[d]!==p&&(M.push(p===0?Math.min(g,h[d-1]):Math.max(g,h[d-1])),p=u[d],g=h[d]),d===u.length-1&&M.push(u[d]===0?Math.min(g,h[d]):Math.max(g,h[d])));M.sort((d,R)=>d-R)}else h[0]>h[1]&&(M=[h[1],h[0]]);y.push(M)}for(let x=0,m=0;x<s;x++){const h=c+t*x;for(let u=0;u<r;u++,m++){const M=a-o*u,p=y[u];if(p.length===2)h>=p[0]&&h<=p[1]&&(i.push([h,M]),l[m]=1);else if(p.length>2){let g=!1;for(let d=0;d<p.length;d+=2)if(h>=p[d]&&h<=p[d+1]){g=!0;break}g&&(i.push([h,M]),l[m]=1)}}}return{points:i,mask:l}}function _n(n,e){const[i,s]=e;for(let r=0;r<n.length;r++){const t=n[r][1];(t<i||t>s)&&(n[r]=[NaN,NaN])}}function hn(n){const e=k(n[0].spatialReference);if(n.length<2||e==null)return n[0];const i=S(n[0].spatialReference);if((n=n.filter(f=>f.width>i)).length===1)return n[0];let{xmin:s,xmax:r,ymin:t,ymax:o}=n[0];for(let f=1;f<n.length;f++){const c=n[f];r=c.xmax+e*f,t=Math.min(t,c.ymin),o=Math.max(o,c.ymax)}return new B({xmin:s,xmax:r,ymin:t,ymax:o,spatialReference:n[0].spatialReference})}function vn(n,e,i=null,s=!0){const r=n.spatialReference;if(r.equals(e))return n;const t=$n(n),o=k(r,!0),f=k(e);if(t===0||o==null||f==null){const a=ln(n,e,i,s);if(o==null&&f!=null&&Math.abs(a.width-f)<S(e)&&Q()){const l=_(r);if(l!=null&&l.poleLocation===H.None&&n.width<(l.bbox[2]-l.bbox[0])/2)return On(n,e)||a}return a}const c=n.clone().normalize();if(c.length===1&&n.xmax<o&&n.xmax-o/2>S(r)){const{xmin:a,xmax:l}=n;for(let w=0;w<=t;w++){const y=w===0?a:-o/2,x=w===t?l-o*w:o/2;c[w]=new B({xmin:y,xmax:x,ymin:n.ymin,ymax:n.ymax,spatialReference:r})}}return hn(c.map(a=>ln(a,e,i,s)).filter(Rn))}function In(n,e,i){if(n.type==="extent"){const{xmin:s,ymin:r,xmax:t,ymax:o,spatialReference:f}=n;n=new un({rings:[[[s,o],[t,o],[t,r],[s,r],[s,o]]],spatialReference:f})}return n.spatialReference.equals(e)?n:(O(n.spatialReference,e,i),v(n,e,i))}function On(n,e){const i=k(e);if(i==null)return null;let{xmin:s,ymin:r,xmax:t,ymax:o}=n;const f=n.spatialReference,c=new un({spatialReference:f,rings:[[[s,r],[t,r],[t,o],[s,o],[s,r]]]}),a=v(c,e);if(a.rings.length!==2||!a.rings[0].length||!a.rings[1].length)return null;const{rings:l}=a,w=S(f),y=new B({spatialReference:e});for(let x=0;x<2;x++){s=t=l[x][0][0],r=o=l[x][0][1];for(let m=0;m<l[x].length;m++)s=s>l[x][m][0]?l[x][m][0]:s,t=t<l[x][m][0]?l[x][m][0]:t,r=r>l[x][m][1]?l[x][m][1]:r,o=o<l[x][m][1]?l[x][m][1]:o;if(x===0)y.ymin=r,y.ymax=o,y.xmin=s,y.xmax=t;else if(y.ymin=Math.min(y.ymin,r),y.ymax=Math.max(y.ymax,o),Math.abs(t-i/2)<w)y.xmin=s,y.xmax=y.xmax+i;else{if(!(Math.abs(s+i/2)<w))return null;y.xmax=t+i}}return y}function ln(n,e,i=null,s=!0,r=!0){const t=n.spatialReference;if(t.equals(e)||!e)return n;O(t,e,i);const o=v(n,e,i);if(r&&e.isWebMercator&&o&&(o.ymax=Math.min(20037508342787e-6,o.ymax),o.ymin=Math.max(-20037508342787e-6,o.ymin),o.ymin>=o.ymax))return null;if(!s||!o)return o;const f=I(t,!0),c=I(e,!0);if(f==null||c==null)return o;const a=S(t,.001),l=S(t,A),w=S(e,.001);if(Math.abs(o.xmin-c[0])<w&&Math.abs(o.xmax-c[1])<w){const y=Math.abs(n.xmin-f[0]),x=Math.abs(f[1]-n.xmax);if(y<a&&x>l){o.xmin=c[0];const m=[];m.push(new N(n.xmax,n.ymin,t)),m.push(new N(n.xmax,(n.ymin+n.ymax)/2,t)),m.push(new N(n.xmax,n.ymax,t));const h=m.map(u=>sn(u,e,i)).filter(u=>!isNaN(u?.x)).map(u=>u.x);o.xmax=Math.max.apply(null,h)}if(x<a&&y>l){o.xmax=c[1];const m=[];m.push(new N(n.xmin,n.ymin,t)),m.push(new N(n.xmin,(n.ymin+n.ymax)/2,t)),m.push(new N(n.xmin,n.ymax,t));const h=m.map(u=>sn(u,e,i)).filter(u=>!isNaN(u?.x)).map(u=>u.x);o.xmin=Math.min.apply(null,h)}}else{const y=S(e,.001);Math.abs(o.xmin-c[0])<y&&(o.xmin=c[0]),Math.abs(o.xmax-c[1])<y&&(o.xmax=c[1])}return o}function k(n,e=!1){if(!n)return null;const i=e?20037508342787e-6:20037508342788905e-9;return n.isWebMercator?2*i:n.wkid&&n.isGeographic?360:2*Gn[n.wkid]||null}function I(n,e=!1){if(n.isGeographic)return[-180,180];const i=k(n,e);return i!=null?[-i/2,i/2]:null}function cn(n,e,i,s){let r=(n-e)/i;return r-Math.floor(r)!=0?r=Math.floor(r):s&&(r-=1),r}function $n(n,e=!1){const i=k(n.spatialReference);if(i==null)return 0;const s=e?0:-(i/2),r=S(n.spatialReference),t=!e&&Math.abs(n.xmax-i/2)<r?i/2:n.xmax,o=!e&&Math.abs(n.xmin+i/2)<r?-i/2:n.xmin;return cn(t,s,i,!0)-cn(o,s,i,!1)}function Bn(n){const e=n.storageInfo.origin.x,i=k(n.spatialReference,!0);if(i==null)return{originX:e,halfWorldWidth:null,pyramidsInfo:null};const s=i/2,{nativePixelSize:r,storageInfo:t,extent:o}=n,{maximumPyramidLevel:f,blockWidth:c,pyramidScalingFactor:a}=t;let l=r.x;const w=[],y=n.transform!=null&&n.transform.type==="gcs-shift",x=e+(y?0:s),m=y?i-e:s-e;for(let h=0;h<=f;h++){const u=(o.xmax-e)/l/c,M=u-Math.floor(u)==0?u:Math.ceil(u),p=m/l/c,g=p-Math.floor(p)==0?p:Math.ceil(p),d=Math.floor(x/l/c),R=Math.round(x/l)%c,b=(c-Math.round(m/l)%c)%c;w.push({resolutionX:l,blockWidth:c,datsetColumnCount:M,worldColumnCountFromOrigin:g,leftMargin:R,rightPadding:b,originColumnOffset:d}),l*=a}return{originX:e,halfWorldWidth:s,pyramidsInfo:w,hasGCSSShiftTransform:y}}function Wn(n){if(!n||n.isGeographic)return n;const e=String(n.wkid||n.wkt);let i;return X.has(e)?i=X.get(e):(i=(n.wkid?G.coordsys(n.wkid):G.fromString(E.PE_TYPE_PROJCS,n.wkt)).getGeogcs().getCode(),X.set(e,i)),new En({wkid:i})}function Yn(n){const e=n.isAdaptive&&n.spacing==null;let i=n.spacing||[L,L],s=K(n),r={cols:s.size[0]+1,rows:s.size[1]+1};const t=s.outofBoundPointCount>0&&s.outofBoundPointCount<s.offsets.length/2;let o=s.outofBoundPointCount===s.offsets.length/2||e&&t?[0,0]:on(s.offsets,r,i,q);const f=(o[0]+o[1])/2,c=n.projectedExtent.spatialReference,a=n.srcBufferExtent.spatialReference;if(e&&(t||f>q)&&(xn(c,a,n.datumTransformation)&&(c.isGeographic||_(c)),i=[j,j],s=K({...n,spacing:i}),r={cols:s.size[0]+1,rows:s.size[1]+1},o=on(s.offsets,r,i,q)),s.error=o,i[0]>1&&(s.coefficients=fn(s.offsets,r,t)),n.includeGCSGrid&&!c.isGeographic&&!c.isWebMercator)if(a.isGeographic)s.gcsGrid={offsets:s.offsets,coefficients:s.coefficients,spacing:i};else{const l=_(c);if(l!=null&&!l.isEnvelope){const w=Wn(c),y=vn(n.projectedExtent,w),{offsets:x}=K({...n,srcBufferExtent:y,spacing:i}),m=fn(x,r,t);s.gcsGrid={offsets:x,coefficients:m,spacing:i}}}return s}function K(n){const{projectedExtent:e,srcBufferExtent:i,pixelSize:s,datumTransformation:r,rasterTransform:t}=n,o=e.spatialReference,f=i.spatialReference,c=O(o,f),{xmin:a,ymin:l,xmax:w,ymax:y}=e,x=k(f),m=x!=null&&(n.hasWrapAround||t?.type==="gcs-shift"),h=n.spacing||[L,L],u=h[0]*s.x,M=h[1]*s.y,p=h[0]===1,g=Math.ceil((w-a)/u-.1/h[0])+(p?0:1),d=Math.ceil((y-l)/M-.1/h[1])+(p?0:1),R=kn({cols:g,rows:d,xmin:a,ymax:y,xres:u,yres:M,inSR:o,outSR:f,datumTransformation:r,preferPE:h[0]<=j,usePixelCenter:p}),b=[];let C,z=0;const D=p?-1:NaN,{xmin:V,xmax:Y,ymax:pn,width:gn,height:yn}=i,dn=S(f,A),wn=x!=null&&V>0&&Y>x/2;let Z=!1;if(c){const T=_(o);Z=T!=null&&T.poleLocation>0}for(let T=0;T<g;T++){const F=[];for(let $=0;$<d;$++){let P=R[T*d+$];if(m&&P[0]>Y&&P[0]>x/2-dn?P[0]-=x:m&&T===0&&P[0]<0&&wn&&!t&&(P[0]+=x),!P||isNaN(P[0])||isNaN(P[1]))b.push(D),b.push(D),F.push(null),z++;else{if(t){const nn=t.inverseTransform(new N({x:P[0],y:P[1],spatialReference:f}));P=[nn.x,nn.y]}F.push(P),T>0&&m&&C[$]&&P[0]<C[$][0]&&(P[0]+=x,Z&&P[0]>Y&&P[0]>x&&(P[0]-=x)),b.push((P[0]-V)/gn),b.push((pn-P[1])/yn)}}C=F}return{offsets:b,error:null,coefficients:null,outofBoundPointCount:z,spacing:h,size:p?[g,d]:[g-1,d-1]}}function fn(n,e,i){const{cols:s,rows:r}=e,t=new Float32Array((s-1)*(r-1)*2*6),o=new Float32Array([-0,-1,1,-1,1,-0,1,-0,-0]),f=new Float32Array([-1,1,0,0,-1,1,1,0,0]);for(let c=0;c<s-1;c++){for(let a=0;a<r-1;a++){let l=c*r*2+2*a;const w=n[l],y=n[l+1],x=n[l+2],m=n[l+3];l+=2*r;const h=n[l],u=n[l+1],M=n[l+2],p=n[l+3];let g=0,d=12*(a*(s-1)+c);for(let R=0;R<3;R++)t[d++]=o[g++]*w+o[g++]*x+o[g++]*M;g=0;for(let R=0;R<3;R++)t[d++]=o[g++]*y+o[g++]*m+o[g++]*p;g=0;for(let R=0;R<3;R++)t[d++]=f[g++]*w+f[g++]*h+f[g++]*M;g=0;for(let R=0;R<3;R++)t[d++]=f[g++]*y+f[g++]*u+f[g++]*p}if(i)for(let a=0;a<t.length;a++)isNaN(t[a])&&(t[a]=-1)}return t}function Fn(n){const e=n.clone().normalize();return e.length===1?e[0]:hn(e)}function qn(n,e,i){const{storageInfo:s,pixelSize:r}=e;let t=0,o=!1;const{pyramidResolutions:f}=s,c=s.tileInfo.format?.toLowerCase()==="mixed"?Math.max(1,Math.min(3,s.tileInfo.dpi/96)):1,a=(n.x+n.y)/2/c;if(f!=null&&f.length){const m=f[f.length-1],h=(m.x+m.y)/2,u=(r.x+r.y)/2;if(a<=u)t=0;else if(a>=h)t=f.length,o=a/h>8;else{let p,g=u;for(let d=1;d<=f.length;d++){if(p=(f[d-1].x+f[d-1].y)/2,a<=p){a===p?t=d:i==="down"?(t=d-1,o=a/g>8):t=i==="up"||a-g>p-a||a/g>2?d:d-1;break}g=p}}const M=t===0?r:f[t-1];return o&&Math.min(M.x,M.y)*W(e.spatialReference)>19567&&(o=!1),{pyramidLevel:t,pyramidResolution:new N({x:M.x,y:M.y,spatialReference:e.spatialReference}),excessiveReading:o}}const l=Math.log(n.x/r.x)/Math.LN2,w=Math.log(n.y/r.y)/Math.LN2,y=e.storageInfo.maximumPyramidLevel||0;t=i==="down"?Math.floor(Math.min(l,w)):i==="up"?Math.ceil(Math.max(l,w)):Math.round((l+w)/2),t<0?t=0:t>y&&(o=t>y+3,t=y);const x=2**t;return{pyramidLevel:t,pyramidResolution:new N({x:x*e.nativePixelSize.x,y:x*e.nativePixelSize.y,spatialReference:e.spatialReference}),excessiveReading:o}}export{Yn as $,An as C,In as J,k as K,$n as Q,jn as T,Bn as V,sn as _,xn as d,qn as i,Ln as k,Fn as n,vn as q};
