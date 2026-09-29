import SolarSystem from "@/components/universe/SolarSystem";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <SolarSystem />

      <section className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-blue-300">
            Welcome to my universe
          </p>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Kiki
          </h1>

          <p className="mt-6 text-lg text-white/60 sm:text-xl">
            Software Engineer building digital systems across the universe.
          </p>
        </div>
      </section>
    </main>
  );
}