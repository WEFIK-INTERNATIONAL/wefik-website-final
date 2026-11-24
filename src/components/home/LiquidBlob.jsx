"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

/*
 * Hero 3D centrepiece. One canvas, several looks ("variants"):
 *   liquid    – dark glassy blob with a lime rim (the original)
 *   glass     – iridescent soap-bubble blob with a shifting rainbow film
 *   particles – a breathing sphere of glowing dots that parts around the cursor
 *   wire      – displaced wireframe shell around a small liquid core
 *   metaballs – raymarched blobs that drift, merge and split; one follows the cursor
 *
 * In development you can preview any of them with ?hero=<variant> in the URL.
 */
export const BLOB_VARIANTS = [
  "liquid",
  "glass",
  "particles",
  "wire",
  "metaballs",
];

// Ashima 3D simplex noise (MIT)
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ---------- shaders: displaced sphere (liquid / glass / wire) ---------- */

const displacedVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform vec3 uMouse;
varying vec3 vNormalV;
varying vec3 vPosV;
varying float vNoise;
${NOISE}

float displace(vec3 p){
  float n = snoise(p * uFreq + vec3(uTime * 0.16, uTime * 0.1, 0.0));
  n += 0.15 * snoise(p * uFreq * 2.4 - vec3(0.0, uTime * 0.22, uTime * 0.1));
  // bulge toward the cursor
  float pull = smoothstep(0.35, 1.0, dot(normalize(p), normalize(uMouse)));
  return n * uAmp + pull * 0.16 * length(uMouse.xy);
}

void main(){
  vec3 p = position;
  vec3 n = normalize(normal);
  vec3 t = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0,1.0,0.0) : vec3(1.0,0.0,0.0)));
  vec3 b = cross(n, t);
  float e = 0.01;
  float d0 = displace(p);
  vec3 p0 = p + n * d0;
  vec3 p1 = (p + t * e) + n * displace(p + t * e);
  vec3 p2 = (p + b * e) + n * displace(p + b * e);
  vec3 dn = normalize(cross(p1 - p0, p2 - p0));
  vNoise = d0;
  vNormalV = normalize(normalMatrix * dn);
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vPosV = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`;

const liquidFragment = /* glsl */ `
uniform vec3 uCore;
uniform vec3 uRim;
uniform vec3 uGlow;
uniform float uCoreAlpha;
uniform float uFade;
varying vec3 vNormalV;
varying vec3 vPosV;
varying float vNoise;

void main(){
  vec3 n = normalize(vNormalV);
  vec3 v = normalize(-vPosV);
  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);

  // soft bands that slide across the surface like oil on water
  float bands = 0.5 + 0.5 * sin(vNoise * 8.0 + fres * 4.0);
  vec3 col = mix(uCore, uGlow, bands * 0.14 + fres * 0.2);
  col = mix(col, uRim, smoothstep(0.25, 1.0, fres));

  vec3 l = normalize(vec3(-0.5, 0.8, 0.7));
  float spec = pow(max(dot(n, normalize(l + v)), 0.0), 70.0);
  col += spec * 0.55;

  float alpha = mix(uCoreAlpha, 1.0, smoothstep(0.1, 0.9, fres)) + spec * 0.4;
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0) * uFade);
}
`;

const glassFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uCore;
uniform vec3 uRim;
uniform float uFilm;
uniform float uFade;
varying vec3 vNormalV;
varying vec3 vPosV;
varying float vNoise;

void main(){
  vec3 n = normalize(vNormalV);
  vec3 v = normalize(-vPosV);
  float ndv = clamp(dot(n, v), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 1.6);

  // thin-film interference: hue drifts with view angle, surface noise and time
  float phase = fres * 1.3 + vNoise * 2.2 + uTime * 0.04;
  vec3 film = 0.5 + 0.5 * cos(6.28318 * (phase + vec3(0.0, 0.33, 0.67)));
  film = mix(film, uRim, 0.3);

  vec3 col = mix(uCore, film, smoothstep(0.0, 0.85, fres) * uFilm);

  // two highlights: a sharp key and a broad soft fill
  vec3 l1 = normalize(vec3(-0.6, 0.7, 0.6));
  vec3 l2 = normalize(vec3(0.7, -0.4, 0.5));
  float s1 = pow(max(dot(n, normalize(l1 + v)), 0.0), 120.0);
  float s2 = pow(max(dot(n, normalize(l2 + v)), 0.0), 18.0) * 0.18;
  col += (s1 + s2);

  float alpha = mix(0.08, 0.9, smoothstep(0.05, 1.0, fres)) + s1 * 0.8 + s2;
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0) * uFade);
}
`;

const wireFragment = /* glsl */ `
uniform vec3 uRim;
uniform float uFade;
varying vec3 vNormalV;
varying vec3 vPosV;
varying float vNoise;

void main(){
  vec3 n = normalize(vNormalV);
  vec3 v = normalize(-vPosV);
  float fres = pow(1.0 - abs(dot(n, v)), 1.4);
  float alpha = 0.04 + 0.3 * fres + 0.22 * smoothstep(0.05, 0.25, vNoise);
  gl_FragColor = vec4(uRim, clamp(alpha, 0.0, 1.0) * uFade);
}
`;

/* ---------- shaders: particles ---------- */

const particleVertex = /* glsl */ `
attribute float aRand;
uniform float uTime;
uniform float uAmp;
uniform float uSize;
uniform float uPR;
uniform vec3 uMouse;
varying float vAlpha;
varying float vNoise;
${NOISE}

void main(){
  vec3 n = normalize(position);
  float d = snoise(n * 1.5 + vec3(uTime * 0.15, uTime * 0.1, 0.0)) * uAmp;
  // a slow ripple that travels pole to pole
  d += sin(n.y * 6.0 - uTime * 1.2 + aRand * 0.6) * 0.025;
  vec3 p = n * (1.0 + d);

  // part around the cursor
  vec3 m = normalize(vec3(uMouse.xy, 0.9));
  float near = smoothstep(0.8, 1.0, dot(normalize(mat3(modelMatrix) * n), m));
  p += n * near * 0.35 * length(uMouse.xy);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.55 + aRand * 0.9) * uPR / -mv.z;

  vec3 nv = normalize(normalMatrix * n);
  vAlpha = 0.25 + 0.75 * smoothstep(-0.4, 0.6, nv.z);
  vNoise = d;
}
`;

const particleFragment = /* glsl */ `
uniform vec3 uRim;
uniform vec3 uGlow;
uniform float uFade;
varying float vAlpha;
varying float vNoise;

void main(){
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.05, r);
  vec3 col = mix(uGlow, uRim, smoothstep(-0.12, 0.2, vNoise));
  gl_FragColor = vec4(col, a * vAlpha * uFade);
}
`;

/* ---------- shaders: raymarched metaballs ---------- */

const quadVertex = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const metaballFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uMouse;
uniform vec3 uCore;
uniform vec3 uRim;
uniform vec3 uGlow;
uniform float uCoreAlpha;
uniform float uFade;
uniform float uScale;
varying vec2 vUv;

#define STEPS __STEPS__

float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p){
  p /= uScale;
  float d = 1e5;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    vec3 c = vec3(
      sin(uTime * 0.37 + fi * 1.7) * 0.55,
      cos(uTime * 0.31 + fi * 2.3) * 0.5,
      sin(uTime * 0.23 + fi * 0.9) * 0.35
    );
    d = smin(d, length(p - c) - (0.3 + 0.07 * sin(fi * 2.1)), 0.42);
  }
  // one blob follows the cursor
  d = smin(d, length(p - vec3(uMouse.xy * 0.75, 0.25)) - 0.2, 0.42);
  return d * uScale;
}

vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main(){
  vec2 uv = vUv * 2.0 - 1.0;
  vec3 ro = vec3(0.0, 0.0, 3.6);
  vec3 rd = normalize(vec3(uv * 0.4142, -1.0));

  float t = 0.0;
  bool hit = false;
  for (int i = 0; i < STEPS; i++){
    float d = map(ro + rd * t);
    if (d < 0.002) { hit = true; break; }
    t += d;
    if (t > 6.0) break;
  }
  if (!hit) discard;

  vec3 p = ro + rd * t;
  vec3 n = calcNormal(p);
  vec3 v = -rd;
  float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.0);

  vec3 l = normalize(vec3(-0.5, 0.8, 0.7));
  float diff = max(dot(n, l), 0.0);
  float spec = pow(max(dot(n, normalize(l + v)), 0.0), 60.0);

  vec3 col = mix(uCore, uGlow, diff * 0.25);
  col = mix(col, uRim, smoothstep(0.2, 1.0, fres));
  col += spec * 0.6;

  float alpha = mix(uCoreAlpha, 1.0, smoothstep(0.1, 0.9, fres)) + spec * 0.4;
  gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0) * uFade);
}
`;

/* ---------- palettes ---------- */

const PALETTE = {
  dark: {
    core: "#0b1106",
    rim: "#bbf451",
    glow: "#4a6b14",
    coreAlpha: 0.55,
    glassCore: "#0d1208",
    film: 1,
    dots: "#6f9a22",
  },
  light: {
    core: "#f4f7ea",
    rim: "#4a6b14",
    glow: "#a3c255",
    coreAlpha: 0.45,
    glassCore: "#ffffff",
    film: 0.75,
    dots: "#8fb33a",
  },
};

/* ---------- shared motion: eased cursor + scroll progress ---------- */

function useMotion(animate) {
  const target = useRef({ x: 0, y: 0 });
  const state = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    if (!animate) return;
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame(() => {
    const s = state.current;
    s.x += (target.current.x - s.x) * 0.05;
    s.y += (target.current.y - s.y) * 0.05;
    s.scroll = Math.min(window.scrollY / (window.innerHeight || 1), 1);
  }, -1);

  return state;
}

function applyPalette(mat, isDark, keys) {
  if (!mat) return;
  const p = isDark ? PALETTE.dark : PALETTE.light;
  const u = mat.uniforms;
  for (const [uniform, key] of Object.entries(keys)) {
    if (!u[uniform]) continue;
    if (u[uniform].value instanceof THREE.Color) u[uniform].value.set(p[key]);
    else u[uniform].value = p[key];
  }
}

/* ---------- variants ---------- */

function DisplacedSphere({
  isDark,
  motion,
  detail,
  fragmentShader,
  paletteKeys,
  amp = 0.2,
  freq = 0.9,
  scale = 1,
  spin = 0.12,
  wireframe = false,
}) {
  const mesh = useRef(null);
  const mat = useRef(null);
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uAmp: { value: amp },
    uFreq: { value: freq },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
    uCore: { value: new THREE.Color() },
    uRim: { value: new THREE.Color() },
    uGlow: { value: new THREE.Color() },
    uCoreAlpha: { value: 0.5 },
    uFilm: { value: 1 },
    uFade: { value: 1 },
  }));

  useEffect(() => {
    applyPalette(mat.current, isDark, paletteKeys);
  }, [isDark, paletteKeys]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!mat.current) return;
    const m = motion.current;
    const u = mat.current.uniforms;
    u.uTime.value += dt;
    u.uMouse.value.set(m.x, m.y, 0.9);
    // scroll: more restless, smaller and fainter as the hero leaves
    u.uAmp.value = amp + m.scroll * 0.15;
    u.uFade.value = 1 - m.scroll * 0.85;

    if (mesh.current) {
      mesh.current.rotation.y += dt * spin;
      mesh.current.rotation.x += (m.y * 0.35 - mesh.current.rotation.x) * 0.05;
      mesh.current.rotation.z += (-m.x * 0.2 - mesh.current.rotation.z) * 0.05;
      mesh.current.scale.setScalar(scale * (1 - m.scroll * 0.2));
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        ref={mat}
        vertexShader={displacedVertex}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        wireframe={wireframe}
      />
    </mesh>
  );
}

const LIQUID_KEYS = {
  uCore: "core",
  uRim: "rim",
  uGlow: "glow",
  uCoreAlpha: "coreAlpha",
};
const GLASS_KEYS = { uCore: "glassCore", uRim: "rim", uFilm: "film" };
const WIRE_KEYS = { uRim: "rim" };
const DOT_KEYS = { uRim: "rim", uGlow: "dots" };

function ParticleSphere({ isDark, motion, count }) {
  const points = useRef(null);
  const mat = useRef(null);

  // Fibonacci sphere: evenly spread points, plus a random size per point
  const [geometry] = useState(() => {
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos[i * 3] = Math.cos(th) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(th) * r;
      rand[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    return g;
  });
  useEffect(() => () => geometry.dispose(), [geometry]);

  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uAmp: { value: 0.16 },
    uSize: { value: 9 },
    uPR: { value: 1 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
    uRim: { value: new THREE.Color() },
    uGlow: { value: new THREE.Color() },
    uFade: { value: 1 },
  }));

  useEffect(() => {
    applyPalette(mat.current, isDark, DOT_KEYS);
  }, [isDark]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!mat.current) return;
    const m = motion.current;
    const u = mat.current.uniforms;
    u.uTime.value += dt;
    u.uPR.value = state.gl.getPixelRatio();
    u.uMouse.value.set(m.x, m.y, 0.9);
    u.uAmp.value = 0.16 + m.scroll * 0.2;
    u.uFade.value = 1 - m.scroll * 0.85;
    if (points.current) {
      points.current.rotation.y += dt * 0.1;
      points.current.rotation.x +=
        (m.y * 0.35 - points.current.rotation.x) * 0.05;
      points.current.scale.setScalar(1 + m.scroll * 0.25);
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={mat}
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function Metaballs({ isDark, motion, steps }) {
  const mat = useRef(null);
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
    uCore: { value: new THREE.Color() },
    uRim: { value: new THREE.Color() },
    uGlow: { value: new THREE.Color() },
    uCoreAlpha: { value: 0.5 },
    uFade: { value: 1 },
    uScale: { value: 1 },
  }));
  const [fragment] = useState(() =>
    metaballFragment.replace("__STEPS__", String(steps))
  );

  useEffect(() => {
    applyPalette(mat.current, isDark, LIQUID_KEYS);
  }, [isDark]);

  useFrame((_, delta) => {
    if (!mat.current) return;
    const m = motion.current;
    const u = mat.current.uniforms;
    u.uTime.value += Math.min(delta, 0.05);
    u.uMouse.value.set(m.x, m.y, 0.9);
    u.uFade.value = 1 - m.scroll * 0.85;
    u.uScale.value = 1 - m.scroll * 0.2;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={quadVertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function Scene({ variant, isDark, animate, lowEnd, light }) {
  const motion = useMotion(animate);
  const detail = lowEnd ? 20 : light ? 32 : 64;

  switch (variant) {
    case "glass":
      return (
        <DisplacedSphere
          isDark={isDark}
          motion={motion}
          detail={detail}
          fragmentShader={glassFragment}
          paletteKeys={GLASS_KEYS}
          amp={0.14}
          freq={0.75}
        />
      );
    case "particles":
      return (
        <ParticleSphere
          isDark={isDark}
          motion={motion}
          count={lowEnd ? 2500 : light ? 4000 : 7000}
        />
      );
    case "wire":
      return (
        <>
          <DisplacedSphere
            isDark={isDark}
            motion={motion}
            detail={lowEnd ? 6 : 9}
            fragmentShader={wireFragment}
            paletteKeys={WIRE_KEYS}
            amp={0.12}
            freq={1.1}
            scale={1.08}
            spin={-0.06}
            wireframe
          />
          <DisplacedSphere
            isDark={isDark}
            motion={motion}
            detail={lowEnd ? 16 : 32}
            fragmentShader={liquidFragment}
            paletteKeys={LIQUID_KEYS}
            amp={0.24}
            freq={1.3}
            scale={0.55}
            spin={0.2}
          />
        </>
      );
    case "metaballs":
      return (
        <Metaballs
          isDark={isDark}
          motion={motion}
          steps={lowEnd ? 32 : 56}
        />
      );
    case "liquid":
    default:
      return (
        <DisplacedSphere
          isDark={isDark}
          motion={motion}
          detail={detail}
          fragmentShader={liquidFragment}
          paletteKeys={LIQUID_KEYS}
        />
      );
  }
}

export default function LiquidBlob({ variant = "liquid" }) {
  const { resolvedTheme } = useTheme();
  const wrapRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  // client-only component (loaded with ssr: false), so window is safe here
  const [reduceMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [isMobile] = useState(
    () => window.matchMedia("(max-width: 767px)").matches
  );
  // Low-end devices (few cores / little memory) get lighter geometry and 1x DPR.
  const [lowEnd] = useState(() => {
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    return cores <= 4 || memory <= 4;
  });
  // If WebGL isn't available, render nothing rather than crash the hero.
  const [webgl] = useState(() => {
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      return false;
    }
  });
  // dev-only preview: ?hero=glass etc.
  const [activeVariant] = useState(() => {
    if (process.env.NODE_ENV === "development") {
      const q = new URLSearchParams(window.location.search).get("hero");
      if (BLOB_VARIANTS.includes(q)) return q;
    }
    return variant;
  });

  // stop rendering when the hero is off screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isDark = resolvedTheme !== "light";
  const animate = !reduceMotion;
  const light = isMobile || lowEnd;
  // raymarching is per-pixel, so keep its resolution lower
  const heavyPixels = activeVariant === "metaballs";

  if (!webgl) return null;

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full"
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "scale(1)" : "scale(0.92)",
        transition:
          "opacity 1.4s ease 0.3s, transform 1.8s cubic-bezier(0.22,1,0.36,1) 0.3s",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        dpr={
          lowEnd ? 1 : heavyPixels ? [1, 1.25] : isMobile ? [1, 1.25] : [1, 1.75]
        }
        gl={{ antialias: !lowEnd, alpha: true, powerPreference: "low-power" }}
        frameloop={!animate ? "demand" : visible ? "always" : "never"}
        onCreated={() => setReady(true)}
        style={{ pointerEvents: "none" }}
      >
        <Scene
          variant={activeVariant}
          isDark={isDark}
          animate={animate}
          lowEnd={lowEnd}
          light={light}
        />
      </Canvas>
    </div>
  );
}
