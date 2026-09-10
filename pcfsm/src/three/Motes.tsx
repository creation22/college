"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

let moteTex: THREE.CanvasTexture | null = null;
function getMoteTexture() {
  if (moteTex) return moteTex;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.4, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  moteTex = new THREE.CanvasTexture(c);
  return moteTex;
}

type Props = {
  count?: number;
  color?: string;
  size?: number;
  riseSpeed?: number;
  sway?: number;
  opacity?: number;
  area?: [number, number, number];
  position?: [number, number, number];
};

/** Soft round motes (embers / dust) with normal blending — visible on light backgrounds. */
export default function Motes({
  count = 120,
  color = "#ff5a1f",
  size = 0.05,
  riseSpeed = 0.22,
  sway = 0.35,
  opacity = 0.6,
  area = [5.5, 4.5, 5.5],
  position = [0, 0.4, 0],
}: Props) {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => getMoteTexture(), []);

  const { positions, speeds } = useMemo(() => {
    // deterministic PRNG — stable across renders, lint-pure
    let s = 1234567;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * area[0];
      positions[i * 3 + 1] = (rand() - 0.5) * area[1];
      positions[i * 3 + 2] = (rand() - 0.5) * area[2];
      speeds[i] = 0.5 + rand();
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, dt) => {
    const pts = ref.current;
    if (!pts || riseSpeed === 0) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const top = area[1] / 2;
    const bottom = -area[1] / 2;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * riseSpeed * dt;
      arr[i * 3] += Math.sin(t * sway + i) * 0.0015;
      if (arr[i * 3 + 1] > top) arr[i * 3 + 1] = bottom;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </points>
  );
}
