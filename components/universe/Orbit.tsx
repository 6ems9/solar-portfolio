"use client";

import * as THREE from "three";

export default function Orbit() {
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