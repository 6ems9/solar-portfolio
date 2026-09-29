"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

import * as THREE from "three";

interface CameraNavigationContextValue {
  focusedObject: THREE.Object3D | null;
  focusOn: (object: THREE.Object3D) => void;
  resetCamera: () => void;
}

const CameraNavigationContext =
  createContext<CameraNavigationContextValue | null>(
    null
  );

export function CameraNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [focusedObject, setFocusedObject] =
    useState<THREE.Object3D | null>(null);

  const focusOn = (object: THREE.Object3D) => {
    setFocusedObject(object);
  };

  const resetCamera = () => {
    setFocusedObject(null);
  };

  return (
    <CameraNavigationContext.Provider
      value={{
        focusedObject,
        focusOn,
        resetCamera,
      }}
    >
      {children}
    </CameraNavigationContext.Provider>
  );
}

export function useCameraNavigation() {
  const context = useContext(
    CameraNavigationContext
  );

  if (!context) {
    throw new Error(
      "useCameraNavigation must be used inside CameraNavigationProvider"
    );
  }

  return context;
}