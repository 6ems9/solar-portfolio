"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useCameraNavigation } from "./CameraNavigation";

export default function CameraController() {
  const { camera } = useThree();

  const { focusedObject } =
    useCameraNavigation();

  const targetCameraPosition = useRef(
    new THREE.Vector3(0, 3, 10)
  );

  const targetLookAt = useRef(
    new THREE.Vector3(0, 0, 0)
  );

  const objectWorldPosition = useRef(
    new THREE.Vector3()
  );

  const currentLookAt = useRef(
    new THREE.Vector3(0, 0, 0)
  );

  const transitionStartPosition = useRef(
    new THREE.Vector3()
  );

  const transitionStartLookAt = useRef(
    new THREE.Vector3()
  );

  const transitionProgress =
    useRef(0);

  const previousFocusedObject =
    useRef<THREE.Object3D | null>(null);

  // Durasi transisi kamera dalam detik
  const TRANSITION_DURATION = 1;

  useFrame((state, delta) => {
    /*
     * NORMAL CAMERA
     */

    if (!focusedObject) {
      const mouseX = state.pointer.x;
      const mouseY = state.pointer.y;

      targetCameraPosition.current.x =
        mouseX * 1.2;

      targetCameraPosition.current.y =
        3 + mouseY * 0.8;

      targetCameraPosition.current.z = 10;

      const smoothness =
        1 -
        Math.pow(0.001, delta);

      camera.position.lerp(
        targetCameraPosition.current,
        smoothness
      );

      targetLookAt.current.set(
        0,
        0,
        0
      );

      currentLookAt.current.lerp(
        targetLookAt.current,
        smoothness
      );

      camera.lookAt(
        currentLookAt.current
      );

      previousFocusedObject.current =
        null;

      return;
    }

    /*
     * NEW FOCUS TARGET
     */

    if (
      previousFocusedObject.current !==
      focusedObject
    ) {
      transitionStartPosition.current.copy(
        camera.position
      );

      currentLookAt.current.set(
        0,
        0,
        0
      );

      transitionStartLookAt.current.copy(
        currentLookAt.current
      );

      transitionProgress.current = 0;

      previousFocusedObject.current =
        focusedObject;
    }

    /*
     * GET OBJECT WORLD POSITION
     */

    focusedObject.getWorldPosition(
      objectWorldPosition.current
    );

    /*
     * CAMERA TARGET
     */

    targetCameraPosition.current.set(
      objectWorldPosition.current.x,
      objectWorldPosition.current.y + 1.0,
      objectWorldPosition.current.z + 3.5
    );

    targetLookAt.current.copy(
      objectWorldPosition.current
    );

    /*
     * CAMERA TRANSITION
     */

    transitionProgress.current +=
      delta / TRANSITION_DURATION;

    const rawProgress = Math.min(
      transitionProgress.current,
      1
    );

    /*
     * CINEMATIC EASING
     *
     * Slow start
     * Fast middle
     * Slow finish
     */

    const easedProgress =
      rawProgress < 0.5
        ? 4 *
          rawProgress *
          rawProgress *
          rawProgress
        : 1 -
          Math.pow(
            -2 * rawProgress + 2,
            3
          ) /
            2;

    /*
     * CAMERA POSITION
     */

    camera.position.lerpVectors(
      transitionStartPosition.current,
      targetCameraPosition.current,
      easedProgress
    );

    /*
     * CAMERA ROTATION
     */

    currentLookAt.current.lerpVectors(
      transitionStartLookAt.current,
      targetLookAt.current,
      easedProgress
    );

    camera.lookAt(
      currentLookAt.current
    );
  });

  return null;
}