import { Hero } from "@/components/hero";
import { StoryBlock } from "@/components/story-block";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedTrips } from "@/components/featured-trips";
import { Testimonials } from "@/components/testimonials";
import { TrustMetrics } from "@/components/trust-metrics";
import { RealTestimonials } from "@/components/real-testimonials";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-500">
      <Navigation />

      {/* The Origin: Split Narrative Hero */}
      <Hero />

      {/* The Argument: Asymmetrical Friction List */}
      <StoryBlock />

      {/* The Process: How It Works */}
      <HowItWorks />

      {/* The Evidence: Archival Collection Bento */}
      <FeaturedTrips />

      {/* The Anchor: Founder Trust Scape */}
      <Testimonials />

      {/* Trust Metrics Strip */}
      <TrustMetrics />

      {/* Real Customer Social Proof */}
      <RealTestimonials />

      <Footer />
    </main>
  );
}

