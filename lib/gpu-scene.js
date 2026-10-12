import { buildKnotGeometry } from '../scene.js';

export const VERTEX_SHADER = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
uniform mat3 uRotation;
uniform vec2 uSize;
out vec3 vNormal;
void main() {
  vec3 p = uRotation * aPosition;
  vNormal = uRotation * aNormal;
  float w = 6.0 - p.z;
  float size = min(uSize.x, uSize.y) * 1.35;
  vec2 clip = vec2(0.04 * w, 0.0) + 2.0 * size * p.xy / uSize;
  gl_Position = vec4(clip, 1.01005 * w - 0.201005, w);
}`;

export const FRAGMENT_SHADER = `#version 300 es
precision mediump float;
in vec3 vNormal;
out vec4 outColor;
void main() {
  vec3 n = normalize(vNormal);
  vec3 light = normalize(vec3(-0.45, 0.7, 1.0));
  float diffuse = max(0.0, dot(n, light));
  float gloss = pow(max(0.0, dot(n, normalize(light + vec3(0.0,0.0,1.0)))), 28.0);
  float rim = pow(1.0 - abs(n.z), 2.0);
  vec3 base = vec3(0.686, 0.576, 0.902) + rim * vec3(0.04,0.095,0.0);
  vec3 color = base * (0.30 + diffuse * 0.65) + gloss * vec3(0.588,0.627,0.627) + rim * 0.051;
  outColor = vec4(color, 1.0);
}`;

export function createGPUData(segments = 128, sides = 20) {
  const geometry = buildKnotGeometry(segments, sides);
  if (geometry.vertices.length > 65535) throw new Error('Mesh exceeds its index budget');
  const vertices = new Float32Array(geometry.vertices.length * 6);
  geometry.vertices.forEach((position, i) => {
    vertices.set(position, i * 6);
    vertices.set(geometry.normals[i], i * 6 + 3);
  });
  const indices = new Uint16Array(geometry.faces.length * 6);
  geometry.faces.forEach(({ ids: [a, b, c, d] }, i) => indices.set([a, b, c, a, c, d], i * 6));
  return { vertices, indices };
}

export function writeRotation(out, ax, ay, az) {
  const ca=Math.cos(ax),sa=Math.sin(ax),cb=Math.cos(ay),sb=Math.sin(ay),cc=Math.cos(az),sc=Math.sin(az);
  out[0]=cc*cb; out[1]=sc*cb; out[2]=-sb;
  out[3]=cc*sb*sa-sc*ca; out[4]=sc*sb*sa+cc*ca; out[5]=cb*sa;
  out[6]=cc*sb*ca+sc*sa; out[7]=sc*sb*ca-cc*sa; out[8]=cb*ca;
  return out;
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(info || 'Shader compilation failed');
  }
  return shader;
}

export class KnotScene {
  constructor(canvas, container) {
    this.canvas=canvas; this.container=container;
    this.gl=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'low-power',preserveDrawingBuffer:false});
    if (!this.gl) throw new Error('GPU rendering is unavailable');
    this.rotation=new Float32Array(9);
    this.pointerX=0; this.pointerY=0; this.targetX=0; this.targetY=0;
    this.time=0; this.motion=false; this.visible=true; this.lost=false;
    this.frame=0; this.previous=0; this.averageFrame=16.7; this.frameCount=0;
    this.width=1; this.height=1; this.lastQualityChange=0;
    this.pixelRatio=Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.25 : 1.5);
    this.tick=this.tick.bind(this); this.resize=this.resize.bind(this);
    this.initGPU();
    this.resize();
    this.resizeObserver=new ResizeObserver(this.resize);
    this.resizeObserver.observe(container);
    this.visibilityObserver=new IntersectionObserver(entries=>{
      this.visible=entries[0].isIntersecting;
      this.syncLoop();
    },{threshold:.01});
    this.visibilityObserver.observe(container);
    this.onVisibility=()=>this.syncLoop();
    document.addEventListener('visibilitychange',this.onVisibility);
    container.addEventListener('pointermove',event=>{
      if(event.pointerType==='touch')return;
      const rect=container.getBoundingClientRect();
      this.targetX=Math.max(-.5,Math.min(.5,(event.clientX-rect.left)/rect.width-.5));
      this.targetY=Math.max(-.5,Math.min(.5,(event.clientY-rect.top)/rect.height-.5));
    },{passive:true});
    container.addEventListener('pointerleave',()=>{this.targetX=0;this.targetY=0;});
    canvas.addEventListener('webglcontextlost',event=>{
      event.preventDefault(); this.lost=true;
      container.classList.remove('scene-ready'); this.syncLoop();
    });
    canvas.addEventListener('webglcontextrestored',()=>{
      try{this.initGPU();this.lost=false;this.resize();container.classList.add('scene-ready');this.syncLoop();}
      catch{this.lost=true;container.classList.remove('scene-ready');}
    });
    container.classList.add('scene-ready');
  }

  initGPU() {
    const gl=this.gl;
    const vertex=compile(gl,gl.VERTEX_SHADER,VERTEX_SHADER);
    const fragment=compile(gl,gl.FRAGMENT_SHADER,FRAGMENT_SHADER);
    const program=gl.createProgram();
    gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
    gl.deleteShader(vertex);gl.deleteShader(fragment);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program) || 'Shader link failed');
    this.program=program;
    this.rotationLocation=gl.getUniformLocation(program,'uRotation');
    this.sizeLocation=gl.getUniformLocation(program,'uSize');
    this.vao=gl.createVertexArray();gl.bindVertexArray(this.vao);
    const mesh=createGPUData();
    this.vertexBuffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,mesh.vertices,gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);gl.vertexAttribPointer(0,3,gl.FLOAT,false,24,0);
    gl.enableVertexAttribArray(1);gl.vertexAttribPointer(1,3,gl.FLOAT,false,24,12);
    this.indexBuffer=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,mesh.indices,gl.STATIC_DRAW);
    this.indexCount=mesh.indices.length;
    gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0,0,0,0);
    gl.bindVertexArray(null);
  }

  resize() {
    if(this.lost)return;
    const rect=this.container.getBoundingClientRect();
    this.width=Math.max(1,rect.width);this.height=Math.max(1,rect.height);
    const width=Math.round(this.width*this.pixelRatio),height=Math.round(this.height*this.pixelRatio);
    if(this.canvas.width!==width || this.canvas.height!==height){this.canvas.width=width;this.canvas.height=height;}
    this.gl.viewport(0,0,width,height);
    this.draw();
  }

  setMotion(enabled){this.motion=enabled;this.syncLoop();}

  syncLoop(){
    cancelAnimationFrame(this.frame);this.frame=0;this.previous=0;
    if(this.lost || !this.visible || document.hidden)return;
    if(this.motion)this.frame=requestAnimationFrame(this.tick);
    else this.draw();
  }

  tick(now){
    if(this.lost || !this.motion || !this.visible || document.hidden){this.frame=0;return;}
    const delta=this.previous?Math.min(now-this.previous,100):16.7;
    this.previous=now;this.time+=Math.min(delta,50)/1000;
    const smoothing=1-Math.exp(-delta/110);
    this.pointerX+=(this.targetX-this.pointerX)*smoothing;
    this.pointerY+=(this.targetY-this.pointerY)*smoothing;
    this.averageFrame=this.averageFrame*.95+delta*.05;
    this.frameCount++;
    // Reduce pixel work on struggling devices; do not add artificial frame limits.
    if(this.frameCount>90 && this.averageFrame>27 && now-this.lastQualityChange>2500 && this.pixelRatio>0.8){
      this.pixelRatio=Math.max(.8,this.pixelRatio*.85);this.lastQualityChange=now;this.resize();
    }
    this.draw();
    this.frame=requestAnimationFrame(this.tick);
  }

  draw(){
    if(this.lost)return;
    const gl=this.gl;
    writeRotation(this.rotation,.5+this.pointerY*.55+Math.sin(this.time*.18)*.07,.25+this.time*.16+this.pointerX*.65,-.26+Math.sin(this.time*.13)*.1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.program);gl.bindVertexArray(this.vao);
    gl.uniformMatrix3fv(this.rotationLocation,false,this.rotation);
    gl.uniform2f(this.sizeLocation,this.width,this.height);
    gl.drawElements(gl.TRIANGLES,this.indexCount,gl.UNSIGNED_SHORT,0);
  }

  destroy(){
    cancelAnimationFrame(this.frame);this.resizeObserver.disconnect();this.visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange',this.onVisibility);
    this.gl.deleteBuffer(this.vertexBuffer);this.gl.deleteBuffer(this.indexBuffer);
    this.gl.deleteVertexArray(this.vao);this.gl.deleteProgram(this.program);
  }
}
