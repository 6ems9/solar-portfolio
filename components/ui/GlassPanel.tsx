"use client";

import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({
  children,
  className = "",
}: GlassPanelProps) {
  return (
    <div
      className={`
        rounded-2xl
        border border-white/10
        bg-white/[0.05]
        backdrop-blur-xl
        shadow-2xl
        shadow-black/20
        ${className}
      `}
    >
      {children}
    </div>
  );
}