"use client";

import * as THREE from "three";
import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Sparkles } from "@react-three/drei";

const STATION_Z = [-4, -12, -20, -28, -36];

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

function Crates({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#15151a" metalness={0.4} roughness={0.7} />
      </mesh>
      <mesh position={[0.66, 0.22, 0.15]} rotation={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.44, 0.44, 0.44]} />
        <meshStandardMaterial color="#121217" metalness={0.4} roughness={0.7} />
      </mesh>
    </group>
  );
}

function MiniExtinguisher({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.16, 0.55, 6, 16]} />
        <meshStandardMaterial color="#17171b" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.165, 0.165, 0.16, 20, 1, true]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#ff5a1f"
          emissiveIntensity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.82, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.1, 12]} />
        <meshStandardMaterial color="#c9cdd4" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Helmet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.34, 0]} scale={[1, 0.72, 1]} castShadow>
        <sphereGeometry args={[0.32, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c2341f" metalness={0.25} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0.32, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.33, 0.045, 10, 32]} />
        <meshStandardMaterial color="#a62a18" metalness={0.25} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, 0.28]}>
        <boxGeometry args={[0.3, 0.12, 0.03]} />
        <meshStandardMaterial
          color="#ffb38a"
          emissive="#ff8a50"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function WarningSign({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 1.6, 8]} />
        <meshStandardMaterial color="#2a2a30" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.62, 0.62, 0.04]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#ff5a1f"
          emissiveIntensity={0.9}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 1.5, 0.026]}>
        <boxGeometry args={[0.46, 0.46, 0.01]} />
        <meshStandardMaterial color="#0a0a0c" emissive="#3d1205" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

function Station({ z, kind }: { z: number; kind: number }) {
  const x = -0.8;
  return (
    <group position={[x, 0, z]}>
      {/* floor plate */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
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
          color="#ff5a1f"
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <pointLight position={[0, 1.6, 0.4]} intensity={14} distance={6.5} color="#ff5a1f" />
      {kind === 0 && <MiniExtinguisher position={[0, 0.04, 0.1]} />}
      {kind === 1 && <Crates position={[0.2, 0.04, 0]} />}
      {kind === 2 && <Helmet position={[-0.15, 0.04, 0]} />}
      {kind === 3 && <WarningSign position={[0.1, 0.04, 0]} />}
      {kind === 4 && (
        <group>
          {[-0.7, 0, 0.7].map((px) => (
            <mesh key={px} position={[px, 1, 0]}>
              <boxGeometry args={[0.08, 2, 0.08]} />
              <meshStandardMaterial color="#232329" metalness={0.85} roughness={0.4} />
            </mesh>
          ))}
          <mesh position={[0, 2.05, 0]}>
            <boxGeometry args={[1.7, 0.1, 0.12]} />
            <meshStandardMaterial color="#1c1c22" metalness={0.85} roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ------------------------------------ camera ------------------------------------ */

function CameraRig({ progress, simple }: { progress: RefObject<number>; simple: boolean }) {
  const { camCurve, lookCurve } = useMemo(() => {
    const camPts = [
      new THREE.Vector3(1.7, 1.25, 3.2),
      ...STATION_Z.map((z) => new THREE.Vector3(1.7, 1.1, z + 2.3)),
      new THREE.Vector3(1.5, 1.15, -38.5),
    ];
    const lookPts = [
      new THREE.Vector3(-0.8, 1.0, -4),
      ...STATION_Z.map((z) => new THREE.Vector3(-0.8, 0.95, z)),
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
        gl.setClearColor("#08080a");
      }}
    >
      <fog attach="fog" args={["#08080a", 4.5, 26]} />
      <ambientLight intensity={0.22} />
      <pointLight position={[3, 2.6, 2]} intensity={30} distance={12} color="#fff0e2" />

      <Grid
        position={[0, 0, -16]}
        args={[70, 70]}
        cellSize={0.85}
        cellThickness={0.5}
        cellColor="#191920"
        sectionSize={4.25}
        sectionThickness={1}
        sectionColor="#b33c14"
        fadeDistance={30}
        fadeStrength={1.4}
        infiniteGrid
      />

      <Pipes simple={simple} />
      {STATION_Z.map((z, i) => (
        <Station key={z} z={z} kind={i} />
      ))}

      <Sparkles
        count={simple ? 40 : 90}
        scale={[6, 3.6, 42]}
        position={[0, 1.8, -16]}
        size={1.6}
        speed={0.18}
        opacity={0.35}
        color="#c7ccd6"
      />
      <Sparkles
        count={simple ? 26 : 55}
        scale={[4, 2.6, 40]}
        position={[-0.8, 1.2, -16]}
        size={2}
        speed={0.25}
        opacity={0.5}
        color="#ff8a50"
      />

      <CameraRig progress={progress} simple={simple} />
    </Canvas>
  );
}
