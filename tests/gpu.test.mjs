import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createGPUData, writeRotation, KnotScene, VERTEX_SHADER, FRAGMENT_SHADER } from '../lib/gpu-scene.js';
import { rotatePoint } from '../scene.js';

test('GPU mesh has reusable typed buffers and valid triangle indices',()=>{
  const mesh=createGPUData();
  assert.ok(mesh.vertices instanceof Float32Array);
  assert.ok(mesh.indices instanceof Uint16Array);
  assert.equal(mesh.vertices.length,128*20*6);
  assert.equal(mesh.indices.length,128*20*6);
  const count=mesh.vertices.length/6;
  assert.ok([...mesh.indices].every(index=>index<count));
  for(let i=0;i<mesh.vertices.length;i+=6)assert.ok(Math.abs(Math.hypot(mesh.vertices[i+3],mesh.vertices[i+4],mesh.vertices[i+5])-1)<1e-6);
});

test('GPU rotation matches the independent CPU rotation in column major order',()=>{
  const matrix=new Float32Array(9);
  for(const angles of [[0,0,0],[.5,.25,-.26],[.9,2.1,-.7]]){
    assert.equal(writeRotation(matrix,...angles),matrix);
    for(const point of [[1,0,0],[.5,-1,2],[-.9,.7,0]]){
      const gpu=[0,1,2].map(i=>matrix[i]*point[0]+matrix[i+3]*point[1]+matrix[i+6]*point[2]);
      const cpu=rotatePoint(point,...angles);
      gpu.forEach((v,i)=>assert.ok(Math.abs(v-cpu[i])<1e-6));
    }
  }
});

test('Each rendered frame submits one draw call without uploading geometry again',()=>{
  const calls={draw:0,upload:0};
  const noop=()=>{};
  const gl={clear:noop,useProgram:noop,bindVertexArray:noop,uniformMatrix3fv:noop,uniform2f:noop,drawElements(){calls.draw++;},bufferData(){calls.upload++;},COLOR_BUFFER_BIT:1,DEPTH_BUFFER_BIT:2,TRIANGLES:4,UNSIGNED_SHORT:5123};
  const scene=Object.create(KnotScene.prototype);
  Object.assign(scene,{gl,rotation:new Float32Array(9),pointerX:0,pointerY:0,time:0,width:600,height:520,indexCount:15360,lost:false});
  const allocation=scene.rotation;
  for(let i=0;i<120;i++){scene.time=i/60;scene.draw();}
  assert.equal(calls.draw,120);
  assert.equal(calls.upload,0);
  assert.equal(scene.rotation,allocation);
  scene.lost=true;scene.draw();assert.equal(calls.draw,120);
});

test('Shader sources use WebGL2, interpolate normals and apply real depth projection',()=>{
  assert.ok(VERTEX_SHADER.startsWith('#version 300 es'));
  assert.ok(FRAGMENT_SHADER.startsWith('#version 300 es'));
  assert.ok(VERTEX_SHADER.includes('vNormal = uRotation * aNormal'));
  assert.ok(VERTEX_SHADER.includes('float w = 6.0 - p.z'));
  assert.ok(FRAGMENT_SHADER.includes('normalize(vNormal)'));
});

