"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

/*
 * Hero 3D centrepiece: an iridescent glass bubble. The surface wobbles with
 * simplex noise, leans toward the cursor, and shows a thin-film rainbow at the
 * edges. It gets more restless, smaller and fainter as the hero scrolls away.
 */

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

const PALETTE = {
  dark: { core: "#0d1208", rim: "#bbf451", film: 1 },
  light: { core: "#ffffff", rim: "#4a6b14", film: 0.75 },
};

const AMP = 0.14;

function Bubble({ isDark, animate, detail }) {
  const mesh = useRef(null);
  const mat = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uAmp: { value: AMP },
    uFreq: { value: 0.75 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
    uCore: { value: new THREE.Color() },
    uRim: { value: new THREE.Color() },
    uFilm: { value: 1 },
    uFade: { value: 1 },
  }));

  useEffect(() => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    const p = isDark ? PALETTE.dark : PALETTE.light;
    u.uCore.value.set(p.core);
    u.uRim.value.set(p.rim);
    u.uFilm.value = p.film;
  }, [isDark]);

  useEffect(() => {
    if (!animate) return;
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [animate]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += dt;

    // ease the cursor so the bubble follows lazily
    const m = mouse.current;
    m.x += (target.current.x - m.x) * 0.05;
    m.y += (target.current.y - m.y) * 0.05;
    u.uMouse.value.set(m.x, m.y, 0.9);

    // scroll: more restless, smaller and fainter as the hero leaves
    const s = Math.min(window.scrollY / (window.innerHeight || 1), 1);
    u.uAmp.value = AMP + s * 0.15;
    u.uFade.value = 1 - s * 0.85;

    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.12;
      mesh.current.rotation.x += (m.y * 0.35 - mesh.current.rotation.x) * 0.05;
      mesh.current.rotation.z += (-m.x * 0.2 - mesh.current.rotation.z) * 0.05;
      mesh.current.scale.setScalar(1 - s * 0.2);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        ref={mat}
        vertexShader={displacedVertex}
        fragmentShader={glassFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function GlassBlob() {
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
  // Low-end devices (few cores / little memory) get a lighter mesh and 1x DPR.
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
        dpr={lowEnd ? 1 : isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{ antialias: !lowEnd, alpha: true, powerPreference: "low-power" }}
        frameloop={!animate ? "demand" : visible ? "always" : "never"}
        onCreated={() => setReady(true)}
        style={{ pointerEvents: "none" }}
      >
        <Bubble
          isDark={isDark}
          animate={animate}
          detail={lowEnd ? 20 : isMobile ? 32 : 64}
        />
      </Canvas>
    </div>
  );
}
