"use client";

import GlassPanel from "../ui/GlassPanel";

export default function PortfolioSections() {
  return (
    <>
      {/* About */}
      <section
        id="about"
        className="relative min-h-screen px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <GlassPanel className="max-w-3xl p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">
              About
            </p>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              A developer exploring
              digital space.
            </h2>

            <p className="mt-6 leading-8 text-white/55">
              I build software with a focus on clean
              architecture, reliable systems, and
              thoughtful user experiences.
            </p>
          </GlassPanel>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative min-h-screen px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-6xl">
            Selected Work
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              "Project Alpha",
              "Project Beta",
              "Project Gamma",
            ].map((project) => (
              <GlassPanel
                key={project}
                className="min-h-48 p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/35">
                  Project
                </p>

                <h3 className="mt-3 text-2xl font-medium text-white">
                  {project}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Portfolio project description will
                  eventually come from the CMS.
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="relative min-h-screen px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <GlassPanel className="max-w-3xl p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">
              Experience
            </p>

            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Building systems,
              learning constantly.
            </h2>
          </GlassPanel>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative min-h-screen px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <GlassPanel className="max-w-3xl p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/70">
              Contact
            </p>

            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Let&apos;s build something.
            </h2>

            <p className="mt-6 text-white/50">
              Contact information will eventually
              be managed through the CMS.
            </p>
          </GlassPanel>
        </div>
      </section>
    </>
  );
}