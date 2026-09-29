"use client";

import { Html } from "@react-three/drei";

interface PlanetLabelProps {
  visible: boolean;
  label: string;
}

export default function PlanetLabel({
  visible,
  label,
}: PlanetLabelProps) {
  if (!visible) {
    return null;
  }

  return (
    <Html
      position={[0, 0.95, 0]}
      center
      distanceFactor={6}
      style={{
        pointerEvents: "none",
      }}
    >
      <div
        className="
          whitespace-nowrap
          rounded-full
          border
          border-white/15
          bg-black/30
          px-4
          py-2
          backdrop-blur-xl
          shadow-lg
          shadow-cyan-500/10
        "
      >
        <div className="flex items-center gap-2">
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-cyan-300
              shadow-[0_0_10px_rgba(103,232,249,0.8)]
            "
          />

          <span
            className="
              text-[10px]
              font-medium
              tracking-[0.35em]
              text-white/80
            "
          >
            {label}
          </span>
        </div>
      </div>
    </Html>
  );
}