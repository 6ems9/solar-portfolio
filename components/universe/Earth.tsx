"use client";

import {
  ThreeEvent,
  useFrame,
} from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

import { useCameraNavigation } from "./CameraNavigation";
import PlanetLabel from "./PlanetLabel";

export default function Earth() {
  const earthSystemRef =
    useRef<THREE.Group>(null);

  const earthRef =
    useRef<THREE.Mesh>(null);

  const cloudsRef =
    useRef<THREE.Mesh>(null);

  const atmosphereRef =
    useRef<THREE.Mesh>(null);

  const earthMaterialRef =
    useRef<THREE.ShaderMaterial>(null);

  const [hovered, setHovered] =
    useState(false);

  const [focused, setFocused] =
    useState(false);

  const { focusOn } =
    useCameraNavigation();

  const [
    earthTexture,
    cloudTexture,
    nightTexture,
  ] = useTexture([
    "/textures/earth/2k_earth_daymap.jpg",
    "/textures/earth/2k_earth_clouds.jpg",
    "/textures/earth/2k_earth_nightmap.jpg",
  ]);

  earthTexture.colorSpace =
    THREE.SRGBColorSpace;

  cloudTexture.colorSpace =
    THREE.SRGBColorSpace;

  nightTexture.colorSpace =
    THREE.SRGBColorSpace;

  useFrame(({ clock }, delta) => {
    if (!earthSystemRef.current) {
      return;
    }

    const elapsed =
      clock.getElapsedTime();

    /*
     * EARTH ORBIT
     */

    const radius = 4;
    const orbitSpeed = 0.35;

    earthSystemRef.current.position.x =
      Math.cos(
        elapsed * orbitSpeed
      ) * radius;

    earthSystemRef.current.position.z =
      Math.sin(
        elapsed * orbitSpeed
      ) * radius;

    /*
     * EARTH ROTATION
     */

    if (earthRef.current) {
      earthRef.current.rotation.y +=
        delta * 0.6;

      const targetScale =
        hovered ? 1.12 : 1;

      const currentScale =
        earthRef.current.scale.x;

      const nextScale =
        THREE.MathUtils.lerp(
          currentScale,
          targetScale,
          0.08
        );

      earthRef.current.scale.setScalar(
        nextScale
      );
    }

    /*
     * CLOUD ROTATION
     */

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y +=
        delta * 0.66;

      const targetScale =
        hovered ? 1.12 : 1;

      const currentScale =
        cloudsRef.current.scale.x;

      const nextScale =
        THREE.MathUtils.lerp(
          currentScale,
          targetScale,
          0.08
        );

      cloudsRef.current.scale.setScalar(
        nextScale
      );
    }

    /*
     * ATMOSPHERE
     */

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y +=
        delta * 0.12;

      const targetScale =
        hovered ? 1.12 : 1;

      const currentScale =
        atmosphereRef.current.scale.x;

      const nextScale =
        THREE.MathUtils.lerp(
          currentScale,
          targetScale,
          0.08
        );

      atmosphereRef.current.scale.setScalar(
        nextScale
      );

      const material =
        atmosphereRef.current
          .material as THREE.MeshBasicMaterial;

      material.opacity =
        THREE.MathUtils.lerp(
          material.opacity,
          hovered ? 0.22 : 0.12,
          0.08
        );
    }

    /*
     * DAY / NIGHT LIGHTING
     */

    if (earthMaterialRef.current) {
      const earthWorldPosition =
        new THREE.Vector3();

      earthRef.current?.getWorldPosition(
        earthWorldPosition
      );

      const sunDirection =
        new THREE.Vector3()
          .subVectors(
            new THREE.Vector3(
              0,
              0,
              0
            ),
            earthWorldPosition
          )
          .normalize();

      earthMaterialRef.current.uniforms.sunDirection.value.copy(
        sunDirection
      );
    }
  });

  /*
   * HOVER
   */

  const handlePointerOver = (
    event: ThreeEvent<PointerEvent>
  ) => {
    event.stopPropagation();

    setHovered(true);

    document.body.style.cursor =
      "pointer";
  };

  /*
   * POINTER OUT
   */

  const handlePointerOut = (
    event: ThreeEvent<PointerEvent>
  ) => {
    event.stopPropagation();

    setHovered(false);

    document.body.style.cursor =
      "default";
  };

  /*
   * CLICK
   */

  const handleClick = (
    event: ThreeEvent<MouseEvent>
  ) => {
    event.stopPropagation();

    setFocused(true);

    if (earthRef.current) {
      focusOn(earthRef.current);
    }

    document
      .getElementById("projects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <group ref={earthSystemRef}>

      <PlanetLabel
        visible={hovered || focused}
        label="PROJECTS"
      />
      {/* EARTH */}

      <mesh
        ref={earthRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry
          args={[0.55, 64, 64]}
        />

        <shaderMaterial
          ref={earthMaterialRef}
          uniforms={{
            dayTexture: {
              value: earthTexture,
            },

            nightTexture: {
              value: nightTexture,
            },

            sunDirection: {
              value:
                new THREE.Vector3(
                  0,
                  0,
                  1
                ),
            },
          }}
          vertexShader={`
            varying vec2 vUv;
            varying vec3 vWorldNormal;

            void main() {
              vUv = uv;

              vWorldNormal =
                normalize(
                  mat3(modelMatrix) * normal
                );

              vec4 worldPosition =
                modelMatrix *
                vec4(position, 1.0);

              gl_Position =
                projectionMatrix *
                viewMatrix *
                worldPosition;
            }
          `}
          fragmentShader={`
            uniform sampler2D dayTexture;
            uniform sampler2D nightTexture;
            uniform vec3 sunDirection;

            varying vec2 vUv;
            varying vec3 vWorldNormal;

            void main() {
              vec3 dayColor =
                texture2D(
                  dayTexture,
                  vUv
                ).rgb;

              vec3 nightColor =
                texture2D(
                  nightTexture,
                  vUv
                ).rgb;

              float light =
                dot(
                  normalize(vWorldNormal),
                  normalize(sunDirection)
                );

              float nightFactor =
                smoothstep(
                  0.12,
                  -0.18,
                  light
                );

              nightColor *= 1.15;

              vec3 finalColor =
                mix(
                  dayColor,
                  nightColor,
                  nightFactor
                );

              gl_FragColor =
                vec4(
                  finalColor,
                  1.0
                );
            }
          `}
          toneMapped={false}
        />
      </mesh>

      {/* CLOUDS */}

      <mesh ref={cloudsRef}>
        <sphereGeometry
          args={[0.565, 64, 64]}
        />

        <meshBasicMaterial
          map={cloudTexture}
          alphaMap={cloudTexture}
          color="#ffffff"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={
            THREE.NormalBlending
          }
        />
      </mesh>

      {/* ATMOSPHERE */}

      <mesh ref={atmosphereRef}>
        <sphereGeometry
          args={[0.60, 64, 64]}
        />

        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={
            hovered ? 0.22 : 0.12
          }
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}