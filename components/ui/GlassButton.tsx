"use client";

import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function GlassButton({
  children,
  onClick,
  className = "",
  type = "button",
}: GlassButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        pointer-events-auto
        group
        inline-flex
        items-center
        justify-center
        rounded-full
        border
        border-white/15
        bg-white/[0.06]
        px-6
        py-3
        text-sm
        font-medium
        text-white
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-white/30
        hover:bg-white/[0.12]
        hover:shadow-lg
        hover:shadow-cyan-500/10
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}