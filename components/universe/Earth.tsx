"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

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

    if (atmosphereRef.current) {
      atmosphereRef.current.position.copy(
        earthRef.current.position
      );

      atmosphereRef.current.rotation.copy(
        earthRef.current.rotation
      );
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[0.55, 64, 64]} />

        <meshStandardMaterial
          color="#2f6fdb"
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      {/* Atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[0.59, 64, 64]} />

        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}