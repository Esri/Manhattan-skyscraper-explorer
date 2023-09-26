import{hT as m,hU as P,hV as v,bf as f,hW as u,hX as y,hY as O,hZ as A,h_ as $,hv as r,h$ as g,i0 as S,i1 as c,i2 as C,aQ as E,i3 as x,i4 as _,aJ as o,i5 as n,i6 as d,i7 as b,i8 as w,i9 as N,ia as D,ib as M,ic as R,id as I,ie as F,ig as L,ih as U,ii as W,ij as B,ik as G,il as j,im as z,io as H,ip as q,hw as p,iq as Q,ir as V,is as k,it as J}from"./index-0199b717.js";function X(a){const e=new m,{vertex:t,fragment:s}=e;return P(t,a),e.include(v,a),e.attributes.add(f.POSITION,"vec3"),e.attributes.add(f.UV0,"vec2"),e.varyings.add("vpos","vec3"),a.hasMultipassTerrain&&e.varyings.add("depth","float"),t.code.add(u`
    void main(void) {
      vpos = position;
      ${a.hasMultipassTerrain?"depth = (view * vec4(vpos, 1.0)).z;":""}
      vTexCoord = uv0;
      gl_Position = transformPosition(proj, view, vpos);
    }
  `),e.include(y,a),e.include(O,a),s.uniforms.add(new A("tex",l=>l.texture),new $("opacity",l=>l.opacity)),e.varyings.add("vTexCoord","vec2"),a.output===r.Alpha?s.code.add(u`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}

      float alpha = texture(tex, vTexCoord).a * opacity;
      if (alpha  < ${u.float(g)}) {
        discard;
      }

      fragColor = vec4(alpha);
    }
    `):(s.include(S),s.code.add(u`
    void main() {
      discardBySlice(vpos);
      ${a.hasMultipassTerrain?"terrainDepthTest(gl_FragCoord, depth);":""}
      fragColor = texture(tex, vTexCoord) * opacity;

      if (fragColor.a < ${u.float(g)}) {
        discard;
      }

      fragColor = highlightSlice(fragColor, vpos);
      ${a.transparencyPassType===c.Color?"fragColor = premultiplyAlpha(fragColor);":""}
    }
    `)),e}const Y=Object.freeze(Object.defineProperty({__proto__:null,build:X},Symbol.toStringTag,{value:"Module"}));class h extends b{initializeProgram(e){return new w(e.rctx,h.shader.get().build(this.configuration),N)}_setPipelineState(e,t){const s=this.configuration,l=e===c.NONE,T=e===c.FrontFace;return D({blending:s.output!==r.Color&&s.output!==r.Alpha||!s.transparent?null:l?Z:M(e),culling:R(s.cullFace),depthTest:{func:I(e)},depthWrite:l?s.writeDepth?F:null:L(e),colorWrite:U,stencilWrite:s.hasOccludees?W:null,stencilTest:s.hasOccludees?t?B:G:null,polygonOffset:l||T?null:j(s.enableOffset)})}initializePipeline(){return this._occludeePipelineState=this._setPipelineState(this.configuration.transparencyPassType,!0),this._setPipelineState(this.configuration.transparencyPassType,!1)}getPipelineState(e,t){return t?this._occludeePipelineState:super.getPipelineState(e,t)}}h.shader=new C(Y,()=>E(()=>import("./ImageMaterial.glsl-8069e8cf.js"),["./ImageMaterial.glsl-8069e8cf.js","./index-0199b717.js","./index-a616bda8.css"],import.meta.url));const Z=x(_.ONE,_.ONE_MINUS_SRC_ALPHA);class i extends z{constructor(){super(...arguments),this.output=r.Color,this.cullFace=d.None,this.hasSlicePlane=!1,this.transparent=!1,this.enableOffset=!0,this.writeDepth=!0,this.hasOccludees=!1,this.transparencyPassType=c.NONE,this.hasMultipassTerrain=!1,this.cullAboveGround=!1}}o([n({count:r.COUNT})],i.prototype,"output",void 0),o([n({count:d.COUNT})],i.prototype,"cullFace",void 0),o([n()],i.prototype,"hasSlicePlane",void 0),o([n()],i.prototype,"transparent",void 0),o([n()],i.prototype,"enableOffset",void 0),o([n()],i.prototype,"writeDepth",void 0),o([n()],i.prototype,"hasOccludees",void 0),o([n({count:c.COUNT})],i.prototype,"transparencyPassType",void 0),o([n()],i.prototype,"hasMultipassTerrain",void 0),o([n()],i.prototype,"cullAboveGround",void 0);class ae extends H{constructor(e){super(e,new ee),this.supportsEdges=!0,this._configuration=new i}getConfiguration(e,t){return this._configuration.output=e,this._configuration.cullFace=this.parameters.cullFace,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.transparent=this.parameters.transparent,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasOccludees=this.parameters.hasOccludees,this._configuration.transparencyPassType=t.transparencyPassType,this._configuration.enableOffset=t.camera.relativeElevation<q,this._configuration.hasMultipassTerrain=t.multipassTerrain.enabled,this._configuration.cullAboveGround=t.multipassTerrain.cullAboveGround,this._configuration}requiresSlot(e,t){return t===r.Color||t===r.Alpha||t===r.Highlight?e===p.DRAPED_MATERIAL?!0:t===r.Highlight?e===p.OPAQUE_MATERIAL:e===(this.parameters.transparent?this.parameters.writeDepth?p.TRANSPARENT_MATERIAL:p.TRANSPARENT_DEPTH_WRITE_DISABLED_MATERIAL:p.OPAQUE_MATERIAL):!1}createGLMaterial(e){return new K(e)}createBufferWriter(){return new Q(V)}}class K extends k{constructor(e){super({...e,...e.material.parameters})}_updateParameters(e){return this.updateTexture(this._material.parameters.textureId),this._material.setParameters(this.textureBindParameters),this.ensureTechnique(h,e)}_updateOccludeeState(e){e.hasOccludees!==this._material.parameters.hasOccludees&&(this._material.setParameters({hasOccludees:e.hasOccludees}),this._updateParameters(e))}beginSlot(e){return this._output!==r.Color&&this._output!==r.Alpha||this._updateOccludeeState(e),this._updateParameters(e)}}class ee extends J{constructor(){super(...arguments),this.transparent=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.cullFace=d.None,this.hasOccludees=!1,this.opacity=1,this.textureId=null,this.initTextureTransparent=!0}}export{ae as c,X as v};
