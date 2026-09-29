"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.15;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.001) * 0.025;

      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.25, 64, 64]} />

        <meshBasicMaterial
          color="#FFF7D6"
        />
      </mesh>

      {/* Sun glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.65, 64, 64]} />

        <meshBasicMaterial
          color="#FFD166"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}