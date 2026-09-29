"use client";

import GlassPanel from "../ui/GlassPanel";
import GlassButton from "../ui/GlassButton";

export default function Hero() {
  const handleProjectsClick = () => {
    document
      .getElementById("projects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-screen
        items-center
        px-6
        pt-28
        pb-16
      "
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-cyan-300/80">
            Software Engineer
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
            Building digital
            <br />
            systems beyond
            <br />
            the ordinary.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
            I design and build reliable software systems,
            scalable APIs, and digital products with a
            focus on performance and simplicity.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <GlassButton
              onClick={handleProjectsClick}
            >
              Explore Projects
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </GlassButton>

            <GlassButton
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="border-white/10 bg-transparent text-white/70"
            >
              Contact Me
            </GlassButton>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-white/35">
            <span className="h-px w-8 bg-white/20" />
            <span>Explore the universe</span>
          </div>
        </div>
      </div>
    </section>
  );
}