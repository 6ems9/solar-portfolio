"use client";

import { Canvas } from "@react-three/fiber";

import CameraController from "./CameraController";
import { CameraNavigationProvider } from "./CameraNavigation";
import Earth from "./Earth";
import Orbit from "./Orbit";
import Stars from "./Stars";
import Sun from "./Sun";

function Universe() {
  return (
    <>
      <ambientLight intensity={0.15} />

      <pointLight
        position={[0, 0, 0]}
        intensity={80}
        distance={15}
        color="#fff4c2"
      />

      <Stars />
      <Sun />
      <Earth />
      <Orbit />
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
        <CameraNavigationProvider>
          <CameraController />
          <Universe />
        </CameraNavigationProvider>
      </Canvas>
    </div>
  );
}