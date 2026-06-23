import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ComponentsSection from "@/components/sections/ComponentsSection";
import EmbeddableIsolation from "@/components/sections/EmbeddableIsolation";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import BentoGrid from "@/components/sections/BentoGrid";
import ProblemSection from "@/components/sections/ProblemSection";
import MetricsBand from "@/components/sections/MetricsBand";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import TokenArchitecture from "@/components/sections/TokenArchitecture";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col relative">
        <Hero />
        <LogoMarquee />
        <TokenArchitecture />
        <ComponentsSection />
        <EmbeddableIsolation />
        <DeveloperExperience />
        <BentoGrid />
        <ProblemSection />
        <MetricsBand />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
