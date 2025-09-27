import { FeaturesSection } from "../components/features-section";
import { PricingSection } from "../components/pricing-section";
import { ModelsSection } from "../components/models-section";
import { ComparisonDemo } from "../components/comparison-demo";
import { FAQSection } from "../components/faq-section";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ModelsSection />
        <ComparisonDemo />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
