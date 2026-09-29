"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import CameraController from "./CameraController";
import * as THREE from "three";

function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={sunRef}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshBasicMaterial color="#ffb347" />
    </mesh>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (!earthRef.current) return;

    const elapsed = clock.getElapsedTime();
    const radius = 4;
    const speed = 0.35;

    earthRef.current.position.x =
      Math.cos(elapsed * speed) * radius;

    earthRef.current.position.z =
      Math.sin(elapsed * speed) * radius;

    earthRef.current.rotation.y += delta * 0.6;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[0.55, 48, 48]} />

      <meshStandardMaterial
        color="#3b82f6"
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

function EarthOrbit() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[3.98, 4.01, 128]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Universe() {
  return (
    <>
      <color attach="background" args={["#020617"]} />

      <ambientLight intensity={0.15} />

      <pointLight
        position={[0, 0, 0]}
        intensity={80}
        distance={15}
        color="#fff1c1"
      />

      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={3}
        saturation={0}
        fade
        speed={0.3}
      />

      <Sun />
      <Earth />
      <EarthOrbit />
    </>
  );
}

export default function SolarSystem() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 3, 10],
          fov: 45,
        }}
        dpr={[1, 1.5]}
      >
        <CameraController />
        <Universe />
      </Canvas>
    </div>
  );
}