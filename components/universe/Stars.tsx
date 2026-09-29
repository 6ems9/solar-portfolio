"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createStarField(
  count: number,
  radius: number,
  spread: number
) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    const distance =
      radius + Math.random() * spread;

    positions[i3] =
      distance * Math.sin(phi) * Math.cos(theta);

    positions[i3 + 1] =
      distance * Math.sin(phi) * Math.sin(theta);

    positions[i3 + 2] =
      distance * Math.cos(phi);
  }

  return positions;
}

export default function Stars() {
  const nearStarsRef =
    useRef<THREE.Points>(null);

  const nearMaterialRef =
    useRef<THREE.PointsMaterial>(null);

  const deepStars = useMemo(
    () => createStarField(3500, 45, 50),
    []
  );

  const nearStars = useMemo(
    () => createStarField(500, 12, 25),
    []
  );

  useFrame(({ clock }, delta) => {
    if (!nearStarsRef.current) return;

    const time = clock.getElapsedTime();

    nearStarsRef.current.rotation.y +=
      delta * 0.003;

    nearStarsRef.current.rotation.x +=
      delta * 0.001;

    if (nearMaterialRef.current) {
      const pulse =
        0.72 +
        Math.sin(time * 2.1) * 0.08 +
        Math.sin(time * 4.7) * 0.04;

      nearMaterialRef.current.opacity = pulse;
    }
  });

  return (
    <>
      {/* Deep Space */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[deepStars, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          size={0.035}
          color="#ffffff"
          transparent
          opacity={0.65}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Near Space */}
      <points ref={nearStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nearStars, 3]}
          />
        </bufferGeometry>

        <pointsMaterial
          ref={nearMaterialRef}
          size={0.07}
          color="#dbeafe"
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}