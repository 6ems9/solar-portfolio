import SolarSystem from "@/components/universe/SolarSystem";
import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/portfolio/Hero";
import PortfolioSections from "@/components/portfolio/PortfolioSections";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-transparent text-white">
      {/* 3D Universe */}
      <SolarSystem />

      {/* Navigation */}
      <Navigation />

      {/* Portfolio */}
      <div className="pointer-events-none relative z-10">
        <Hero />
        <PortfolioSections />
      </div>
    </main>
  );
}