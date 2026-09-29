"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();

  const targetPosition = useRef(
    new THREE.Vector3(0, 3, 10)
  );

  useFrame((state) => {
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    targetPosition.current.x = mouseX * 1.2;
    targetPosition.current.y = 3 + mouseY * 0.8;

    camera.position.lerp(
      targetPosition.current,
      0.05
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}