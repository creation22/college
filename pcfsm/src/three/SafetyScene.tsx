"use client";

import * as THREE from "three";
import { Suspense, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import Motes from "@/three/Motes";
import { CHAPTERS } from "@/lib/data";

const STATION_Z = [-4, -12, -20, -28, -36];
const CHAPTER_IMAGES = CHAPTERS.map((c) => c.image);

const PANEL_W = 2.3;
const PANEL_H = 1.44;
const PANEL_BASE_Y = 1.5;

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* --------------------------------- environment --------------------------------- */

function Pipes({ simple }: { simple: boolean }) {
  const pipes = useMemo(() => {
    const rand = seeded(42);
    const count = simple ? 14 : 26;
    return Array.from({ length: count }, (_, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      return {
        x: side * (2.15 + rand() * 1.5),
        z: 2.5 - rand() * 42,
        h: 4.4 + rand() * 1.4,
        r: 0.05 + rand() * 0.09,
        ring1: 1 + rand() * 2,
      };
    });
  }, [simple]);

  return (
    <group>
      {pipes.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, p.h / 2, 0]}>
            <cylinderGeometry args={[p.r, p.r, p.h, 12]} />
            <meshStandardMaterial color="#202026" metalness={0.85} roughness={0.4} />
          </mesh>
          <mesh position={[0, p.ring1, 0]}>
            <torusGeometry args={[p.r + 0.02, 0.02, 8, 20]} />
            <meshStandardMaterial color="#3a3a42" metalness={0.9} roughness={0.35} />
          </mesh>
        </group>
      ))}
      {/* overhead beams */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={`beam-${i}`} position={[0, 3.7, -1 - i * 4.6]}>
          <boxGeometry args={[7.4, 0.16, 0.2]} />
          <meshStandardMaterial color="#1a1a1f" metalness={0.8} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------- chapter panels ------------------------------- */

function Station({ z, texture }: { z: number; texture: THREE.Texture }) {
  const x = -0.8;
  const panel = useRef<THREE.Group>(null);

  // sRGB + cover-fit onto the uniform panel ratio — work on a local clone
  const map = useMemo(() => {
    const t = texture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    const img = t.image as { width: number; height: number };
    const planeAspect = PANEL_W / PANEL_H;
    const texAspect = img.width / img.height;
    if (texAspect > planeAspect) {
      const r = planeAspect / texAspect;
      t.repeat.set(r, 1);
      t.offset.set((1 - r) / 2, 0);
    } else {
      const r = texAspect / planeAspect;
      t.repeat.set(1, r);
      t.offset.set(0, (1 - r) / 2);
    }
    return t;
  }, [texture]);

  const worldTarget = useRef(new THREE.Vector3());

  useFrame(({ camera, clock }) => {
    if (!panel.current) return;
    const t = clock.elapsedTime;
    // gentle float — the image feels physically present, not a flat texture
    panel.current.position.y = PANEL_BASE_Y + Math.sin(t * 0.5 + z * 0.3) * 0.045;
    // billboard: every panel faces the camera, whatever its position on the path
    panel.current.getWorldPosition(worldTarget.current);
    panel.current.lookAt(camera.position);
    // subtle sway layered on top of the billboard orientation
    panel.current.rotation.y += Math.sin(t * 0.3 + z) * 0.02;
    panel.current.rotation.z += Math.sin(t * 0.4 + z * 0.7) * 0.008;
  });

  return (
    <group position={[x, 0, z]}>
      {/* floor plate */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[2.6, 0.04, 2.6]} />
        <meshStandardMaterial color="#101014" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* glow ring */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.015, 8, 72]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#ff5a1f"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* volumetric beam */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.3, 0.55, 3.6, 20, 1, true]} />
        <meshBasicMaterial
          color="#ff7a3d"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <pointLight position={[0, 1.6, 0.4]} intensity={14} distance={6.5} color="#ff5a1f" />

      {/* floating 3D image panel */}
      <group ref={panel} position={[0, PANEL_BASE_Y, 0]}>
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[PANEL_W + 0.14, PANEL_H + 0.14]} />
          <meshBasicMaterial color="#ff5a1f" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, -0.015]}>
          <planeGeometry args={[PANEL_W + 0.08, PANEL_H + 0.08]} />
          <meshBasicMaterial color="#101014" toneMapped={false} />
        </mesh>
        <mesh>
          <planeGeometry args={[PANEL_W, PANEL_H]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function ChapterPanels() {
  const textures = useLoader(THREE.TextureLoader, CHAPTER_IMAGES);

  return (
    <>
      {STATION_Z.map((z, i) => (
        <Station key={z} z={z} texture={textures[i]} />
      ))}
    </>
  );
}

/* ------------------------------------ camera ------------------------------------ */

function CameraRig({ progress, simple }: { progress: RefObject<number>; simple: boolean }) {
  const { camCurve, lookCurve } = useMemo(() => {
    const camPts = [
      new THREE.Vector3(1.7, 1.25, 3.2),
      ...STATION_Z.map((z) => new THREE.Vector3(1.7, 1.35, z + 2.3)),
      new THREE.Vector3(1.5, 1.3, -38.5),
    ];
    const lookPts = [
      new THREE.Vector3(-0.8, 1.25, -4),
      ...STATION_Z.map((z) => new THREE.Vector3(-0.8, 1.3, z)),
    ];
    return {
      camCurve: new THREE.CatmullRomCurve3(camPts, false, "catmullrom", 0.4),
      lookCurve: new THREE.CatmullRomCurve3(lookPts, false, "catmullrom", 0.4),
    };
  }, []);

  const camPos = useRef(new THREE.Vector3(1.7, 1.25, 3.2));
  const lookAt = useRef(new THREE.Vector3(-0.8, 1, -4));

  useFrame(({ camera }, dt) => {
    const p = THREE.MathUtils.clamp(progress.current ?? 0, 0, 1);
    camCurve.getPoint(p, camPos.current);
    lookCurve.getPoint(p, lookAt.current);
    // gentle handheld sway — cinematic, not gimmicky
    const t = performance.now() / 1000;
    const sway = simple ? 0.015 : 0.03;
    camPos.current.x += Math.sin(t * 0.5) * sway;
    camPos.current.y += Math.cos(t * 0.35) * sway * 0.6;
    camera.position.lerp(camPos.current, 1 - Math.exp(-6 * dt));
    const target = new THREE.Vector3().lerpVectors(camera.userData.lookAt ?? lookAt.current, lookAt.current, 1 - Math.exp(-6 * dt));
    camera.userData.lookAt = target;
    camera.lookAt(target);
  });

  return null;
}

/* ------------------------------------ scene ------------------------------------ */

export default function SafetyScene({
  progress,
  simple = false,
  active = true,
}: {
  progress: RefObject<number>;
  simple?: boolean;
  active?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={simple ? [1, 1.4] : [1, 1.75]}
      camera={{ position: [1.7, 1.25, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.setClearColor("#f4f3ee");
      }}
    >
      <fog attach="fog" args={["#f4f3ee", 4.5, 26]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[3, 2.6, 2]} intensity={24} distance={12} color="#fff0e2" />
      <pointLight position={[3.4, 2.2, -14]} intensity={10} distance={16} color="#3f3f95" />

      <Grid
        position={[0, 0, -16]}
        args={[70, 70]}
        cellSize={0.85}
        cellThickness={0.5}
        cellColor="#d8d6d0"
        sectionSize={4.25}
        sectionThickness={1}
        sectionColor="#ff5a1f"
        fadeDistance={30}
        fadeStrength={1.4}
        infiniteGrid
      />

      <Pipes simple={simple} />
      <Suspense fallback={null}>
        <ChapterPanels />
      </Suspense>

      <Motes
        count={simple ? 35 : 80}
        color="#908fd4"
        size={0.045}
        riseSpeed={0.04}
        sway={0.12}
        opacity={0.35}
        area={[6, 3.4, 40]}
        position={[0, 1.8, -16]}
      />
      <Motes
        count={simple ? 20 : 45}
        color="#ff5a1f"
        size={0.05}
        riseSpeed={0.12}
        sway={0.2}
        opacity={0.4}
        area={[3.5, 2.4, 38]}
        position={[-0.8, 1.1, -16]}
      />

      <CameraRig progress={progress} simple={simple} />
    </Canvas>
  );
}
