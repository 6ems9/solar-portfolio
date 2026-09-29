"use client";

import GlassPanel from "./GlassPanel";

const navigationItems = [
  {
    label: "About",
    target: "about",
  },
  {
    label: "Projects",
    target: "projects",
  },
  {
    label: "Experience",
    target: "experience",
  },
  {
    label: "Contact",
    target: "contact",
  },
];

export default function Navigation() {
  const handleNavigation = (target: string) => {
    const element = document.getElementById(target);

    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="pointer-events-none fixed left-0 right-0 top-0 z-20 px-6 py-6">
      <GlassPanel className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        {/* Logo */}
        <button
          type="button"
          className="pointer-events-auto text-sm font-semibold tracking-[0.25em] text-white"
          onClick={() => window.scrollTo({
            top: 0,
            behavior: "smooth",
          })}
        >
          KIKI.DEV
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <button
              key={item.target}
              type="button"
              onClick={() =>
                handleNavigation(item.target)
              }
              className="
                pointer-events-auto
                text-sm
                text-white/60
                transition-colors
                duration-300
                hover:text-white
              "
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile indicator */}
        <div className="flex items-center gap-2 md:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
          <span className="text-xs text-white/50">
            MENU
          </span>
        </div>
      </GlassPanel>
    </header>
  );
}