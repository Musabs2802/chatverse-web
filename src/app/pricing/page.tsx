import { Metadata } from "next";
import SubscriptionBanner from "@/src/components/pricing/subscriptions-banner";
import { Header } from "@/src/components/header";

export const metadata: Metadata = {
  title: "Pricing | AI Platform",
  description:
    "Choose the perfect AI subscription plan for your needs. Compare responses from multiple AI models with flexible pricing options.",
  keywords: [
    "AI subscription",
    "ChatGPT",
    "Claude",
    "Gemini",
    "AI models",
    "pricing",
  ],
};

export default function PricingPage() {
  return (
    <>
      <Header />
      {/* Main Content */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SubscriptionBanner />
        </div>
      </main>
    </>
  );
}
