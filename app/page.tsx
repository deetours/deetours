import { Hero } from "@/components/hero";
import { StoryBlock } from "@/components/story-block";
import { Categories } from "@/components/categories";
import { FeaturedTrips } from "@/components/featured-trips";
import { Testimonials } from "@/components/testimonials";
import { Transformation } from "@/components/transformation";
import { CTA } from "@/components/cta";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* ACT 1 */}
      <Hero />

      {/* ACT 2 & 3: The Connected Narrative */}
      <StoryBlock />

      {/* ACT 4 */}
      <Categories />

      {/* ACT 5 */}
      <FeaturedTrips />

      {/* ACT 6 */}
      <Testimonials />

      {/* ACT 7 */}
      <Transformation />

      {/* ACT 8 */}
      <CTA />

      <Footer />
    </main>
  );
}
