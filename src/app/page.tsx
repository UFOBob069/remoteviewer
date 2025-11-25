import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedViewers } from "@/components/FeaturedViewers";
import { TrustStrip } from "@/components/TrustStrip";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <HowItWorks />
      <FeaturedViewers />
      <TrustStrip />
      <Footer />
    </main>
  );
}
