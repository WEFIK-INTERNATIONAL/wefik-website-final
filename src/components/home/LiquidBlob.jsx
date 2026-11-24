"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

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

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform vec3 uMouse;
varying vec3 vNormalV;
varying vec3 vPosV;
varying float vNoise;
${NOISE}

float displace(vec3 p){
  float n = snoise(p * 0.9 + vec3(uTime * 0.16, uTime * 0.1, 0.0));
  n += 0.15 * snoise(p * 2.2 - vec3(0.0, uTime * 0.22, uTime * 0.1));
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

const fragmentShader = /* glsl */ `
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

const PALETTE = {
  dark: { core: "#0b1106", rim: "#bbf451", glow: "#4a6b14", coreAlpha: 0.55 },
  light: { core: "#f4f7ea", rim: "#4a6b14", glow: "#a3c255", coreAlpha: 0.45 },
};

function Blob({ isDark, animate, detail }) {
  const mesh = useRef(null);
  const mouse = useRef(new THREE.Vector3(0, 0, 1));
  const target = useRef({ x: 0, y: 0 });

  const mat = useRef(null);
  const [uniforms] = useState(() => ({
    uTime: { value: 0 },
    uAmp: { value: 0.2 },
    uMouse: { value: new THREE.Vector3(0, 0, 1) },
    uCore: { value: new THREE.Color() },
    uRim: { value: new THREE.Color() },
    uGlow: { value: new THREE.Color() },
    uCoreAlpha: { value: 0.5 },
    uFade: { value: 1 },
  }));

  useEffect(() => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    const p = isDark ? PALETTE.dark : PALETTE.light;
    u.uCore.value.set(p.core);
    u.uRim.value.set(p.rim);
    u.uGlow.value.set(p.glow);
    u.uCoreAlpha.value = p.coreAlpha;
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

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += dt;

    // ease the cursor so the blob follows lazily
    mouse.current.x += (target.current.x - mouse.current.x) * 0.05;
    mouse.current.y += (target.current.y - mouse.current.y) * 0.05;
    u.uMouse.value.set(mouse.current.x, mouse.current.y, 0.9);

    // scroll: blob gets more restless, shrinks and fades as the hero leaves
    const vh = window.innerHeight || 1;
    const s = Math.min(window.scrollY / vh, 1);
    u.uAmp.value = 0.2 + s * 0.15;
    u.uFade.value = 1 - s * 0.85;

    if (mesh.current) {
      mesh.current.rotation.y += dt * 0.12;
      mesh.current.rotation.x +=
        (mouse.current.y * 0.35 - mesh.current.rotation.x) * 0.05;
      mesh.current.rotation.z +=
        (-mouse.current.x * 0.2 - mesh.current.rotation.z) * 0.05;
      const scale = 1 - s * 0.2;
      mesh.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, detail]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LiquidBlob() {
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
  const light = isMobile || lowEnd;

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
        <Blob
          isDark={isDark}
          animate={animate}
          detail={lowEnd ? 20 : light ? 32 : 64}
        />
      </Canvas>
    </div>
  );
}
