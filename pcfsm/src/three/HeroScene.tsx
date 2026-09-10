"use client";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";

/* ---------------------------------- textures ---------------------------------- */

function makeRadialTexture(rgb: string, alpha: number) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(${rgb},${alpha})`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/* --------------------------------- sculpture ---------------------------------- */

const BODY_PROFILE: [number, number][] = [
  [0.001, -1.05],
  [0.34, -1.05],
  [0.42, -1.0],
  [0.44, -0.9],
  [0.44, 0.52],
  [0.40, 0.72],
  [0.28, 0.86],
  [0.16, 0.94],
  [0.115, 0.97],
  [0.11, 1.02],
];

function Extinguisher({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const profile = useMemo(
    () => BODY_PROFILE.map(([x, y]) => new THREE.Vector2(x, y)),
    []
  );

  const hose = useMemo(
    () =>
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(0.15, 1.0, 0),
          new THREE.Vector3(0.52, 0.86, 0.06),
          new THREE.Vector3(0.6, 0.2, 0.12),
          new THREE.Vector3(0.5, -0.62, 0.2),
        ]),
        24,
        0.035,
        8,
        false
      ),
    []
  );

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    if (still) {
      group.current.rotation.y = -0.35;
      group.current.rotation.x = 0.02;
      group.current.position.y = 0.12;
      if (rings.current) rings.current.rotation.y = 0.6;
      return;
    }
    const targetY = t * 0.16 + mouse.current.x * 0.5;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3, dt);
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      mouse.current.y * 0.13,
      3,
      dt
    );
    group.current.position.y = 0.12 + Math.sin(t * 0.6) * 0.045;
    if (rings.current) {
      rings.current.rotation.y = t * 0.32;
      rings.current.rotation.z = Math.sin(t * 0.2) * 0.26;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* gyro rings — the sculpture frame */}
      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.4, 0, 0.3]}>
          <torusGeometry args={[1.18, 0.012, 12, 128]} />
          <meshStandardMaterial color="#8b909a" metalness={1} roughness={0.32} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, 0.4, -0.2]}>
          <torusGeometry args={[1.38, 0.008, 12, 128]} />
          <meshStandardMaterial color="#5c616b" metalness={1} roughness={0.4} />
        </mesh>
      </group>

      <group ref={group}>
        {/* body */}
        <mesh castShadow>
          <latheGeometry args={[profile, 56]} />
          <meshStandardMaterial color="#17171b" metalness={0.92} roughness={0.26} />
        </mesh>
        {/* orange band */}
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.452, 0.452, 0.34, 56, 1, true]} />
          <meshStandardMaterial
            color="#ff5a1f"
            emissive="#ff5a1f"
            emissiveIntensity={0.5}
            metalness={0.35}
            roughness={0.42}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* base + shoulder rings */}
        <mesh position={[0, -1.05, 0]}>
          <torusGeometry args={[0.36, 0.022, 10, 48]} />
          <meshStandardMaterial color="#0d0d10" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <torusGeometry args={[0.43, 0.016, 10, 48]} />
          <meshStandardMaterial color="#0d0d10" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* collar + valve */}
        <mesh position={[0, 1.06, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.13, 0.12, 24]} />
          <meshStandardMaterial color="#c9cdd4" metalness={1} roughness={0.22} />
        </mesh>
        <mesh position={[0, 1.16, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.1, 16]} />
          <meshStandardMaterial color="#c9cdd4" metalness={1} roughness={0.22} />
        </mesh>
        {/* lever handles */}
        <mesh position={[0.17, 1.24, 0]} rotation={[0, 0, -0.12]} castShadow>
          <boxGeometry args={[0.34, 0.02, 0.07]} />
          <meshStandardMaterial color="#b31212" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[-0.17, 1.2, 0]} rotation={[0, 0, 0.12]} castShadow>
          <boxGeometry args={[0.34, 0.02, 0.07]} />
          <meshStandardMaterial color="#22222a" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* hose */}
        <mesh geometry={hose} castShadow>
          <meshStandardMaterial color="#101013" roughness={0.9} metalness={0} />
        </mesh>
        {/* nozzle */}
        <mesh position={[0.5, -0.68, 0.21]} rotation={[0.5, 0, -0.35]} castShadow>
          <coneGeometry args={[0.05, 0.16, 16]} />
          <meshStandardMaterial color="#c9cdd4" metalness={1} roughness={0.25} />
        </mesh>
      </group>

      {/* pedestal */}
      <mesh position={[0, -1.32, 0]} receiveShadow>
        <cylinderGeometry args={[0.85, 0.95, 0.14, 48]} />
        <meshStandardMaterial color="#101014" metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0, -1.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.85, 0.008, 8, 96]} />
        <meshStandardMaterial
          color="#ff5a1f"
          emissive="#ff5a1f"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ---------------------------------- atmosphere ---------------------------------- */

function Smoke() {
  const tex = useMemo(() => makeRadialTexture("190,190,196", 0.28), []);
  const sprites = useMemo(
    () =>
      [
        { pos: [-1.6, 0.4, -2.2], scale: 5 },
        { pos: [1.8, 1.2, -3.0], scale: 6.5 },
        { pos: [0.2, -0.4, -2.6], scale: 4 },
      ] as const,
    []
  );
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.rotation.z = t * 0.03 * (i + 1);
      child.position.y = sprites[i].pos[1] + Math.sin(t * 0.1 + i) * 0.18;
    });
  });
  return (
    <group ref={group}>
      {sprites.map((s, i) => (
        <sprite key={i} position={s.pos as unknown as [number, number, number]} scale={s.scale}>
          <spriteMaterial map={tex} transparent opacity={0.16} depthWrite={false} />
        </sprite>
      ))}
    </group>
  );
}

function Bokeh() {
  const tex = useMemo(() => makeRadialTexture("255,110,50", 0.9), []);
  const dots = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        pos: [-3 + (i % 4) * 1.9, -1.2 + ((i * 7) % 5) * 0.8, -4 - (i % 3) * 1.4] as [number, number, number],
        scale: 0.14 + (i % 3) * 0.1,
        opacity: 0.16 + (i % 4) * 0.07,
      })),
    []
  );
  return (
    <group>
      {dots.map((d, i) => (
        <sprite key={i} position={d.pos} scale={d.scale}>
          <spriteMaterial
            map={tex}
            transparent
            opacity={d.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
      ))}
    </group>
  );
}

/* ----------------------------------- camera ----------------------------------- */

function CameraDrift({ still }: { still: boolean }) {
  const target = useRef(new THREE.Vector3(0, 0.1, 0));
  useFrame(({ camera }, dt) => {
    if (still) return;
    const p = Math.min(1, window.scrollY / window.innerHeight);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(p * Math.PI) * 0.7, 2.2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.15 + p * 1.2, 2.2, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 5.4 - p * 0.9, 2.2, dt);
    target.current.x = THREE.MathUtils.damp(target.current.x, Math.sin(p * Math.PI) * -0.25, 2.2, dt);
    target.current.y = THREE.MathUtils.damp(target.current.y, 0.1 + p * 0.55, 2.2, dt);
    camera.lookAt(target.current);
  });
  return null;
}

/* ------------------------------------ scene ------------------------------------ */

export default function HeroScene({
  still = false,
  simple = false,
  active = true,
}: {
  still?: boolean;
  simple?: boolean;
  active?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={simple ? [1, 1.5] : [1, 1.8]}
      camera={{ position: [0, 0.15, 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <fog attach="fog" args={["#08080a", 7, 14]} />

      <ambientLight intensity={0.18} />
      <spotLight
        position={[4, 6, 4]}
        angle={0.5}
        penumbra={1}
        intensity={simple ? 60 : 90}
        color="#fff3e8"
        castShadow={!simple}
      />
      <pointLight position={[-3.2, 1.4, -2.4]} intensity={26} distance={9} color="#ff5a1f" />
      <pointLight position={[3.4, -0.6, 2.2]} intensity={8} distance={8} color="#5d7093" />

      <Environment resolution={64} frames={1}>
        <color attach="background" args={["#050507"]} />
        <Lightformer intensity={1.6} position={[0, 4, 2]} scale={[8, 4, 1]} color="#ffffff" />
        <Lightformer
          intensity={3.4}
          position={[-4, 1, -2]}
          rotation-y={Math.PI / 2}
          scale={[6, 2, 1]}
          color="#ff5a1f"
        />
        <Lightformer
          intensity={0.9}
          position={[4, 0, 1]}
          rotation-y={-Math.PI / 2}
          scale={[5, 2, 1]}
          color="#7d8ba8"
        />
      </Environment>

      <Extinguisher still={still} />
      <Bokeh />
      {!simple && <Smoke />}

      <Sparkles
        count={simple ? 60 : 150}
        scale={[5.5, 4.5, 5.5]}
        position={[0, 0.5, -0.5]}
        size={2.2}
        speed={still ? 0 : 0.32}
        opacity={0.65}
        color="#ff8a50"
      />
      <Sparkles
        count={simple ? 25 : 60}
        scale={[7, 5, 7]}
        position={[0, 0.5, -1]}
        size={1.4}
        speed={still ? 0 : 0.14}
        opacity={0.3}
        color="#9aa4b5"
      />

      <ContactShadows
        position={[0, -1.42, 0]}
        opacity={0.62}
        scale={7}
        blur={2.6}
        far={3.2}
        color="#000000"
      />
      <CameraDrift still={still} />
    </Canvas>
  );
}
