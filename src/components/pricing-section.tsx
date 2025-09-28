import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Badge } from "./ui/badge";

const individualSubscriptions = [
  { name: "ChatGPT 5", price: 20 },
  { name: "Google Gemini 2.5 Pro", price: 20 },
  { name: "Perplexity Sonar Pro", price: 20 },
  { name: "Claude Sonnet 4", price: 20 },
  { name: "Grok 4", price: 30 },
];

const problems = [
  "Multiple subscriptions to manage - expensive",
  "Constant tab switching",
  "No comparison features",
];

const ourFeatures = [
  "All premium AI models included",
  "Side-by-side comparison",
  "400,000 tokens/month",
  "Instant prompt enhancement",
  "Image generation & Audio transcription",
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 text-primary bg-primary/10"
          >
            🔥 Limited time: Save 90% compared to individual subscriptions
          </Badge>
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            <span className="text-primary">All Premium</span> AI Models for a
            Fraction of the Cost
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Stop juggling multiple subscriptions and tabs — one platform covers
            all your AI needs.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Individual Subscriptions */}
          <Card className="flex-1 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl">
                Individual AI Subscriptions
              </CardTitle>
              <div className="text-4xl font-bold text-gray-900 mt-2">
                $110<span className="text-sm text-gray-500">+/month</span>
              </div>
              <CardDescription className="mt-1 text-gray-500">
                What you&apos;re paying now
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="divide-y divide-gray-200">
                {individualSubscriptions.map((sub, index) => (
                  <li
                    key={index}
                    className="flex justify-between py-2 text-gray-700"
                  >
                    {sub.name}
                    <span className="font-semibold">${sub.price}/mo</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 space-y-2">
                {problems.map((problem, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-500"
                  >
                    <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    {problem}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chatverse */}
          <Card className="flex-1 border border-primary/20 relative overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium rounded-bl-md">
              BEST VALUE
            </div>
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl">Chatverse</CardTitle>
              <div className="mt-2 space-y-2">
                <div className="text-4xl font-bold text-primary">
                  $5<span className="text-sm text-gray-500">/month</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  $100<span className="text-sm text-gray-500">/year</span>
                </div>
                <CardDescription className="text-gray-500">
                  Save 17% with yearly billing
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 mt-2">
                {ourFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 transition-colors"
                  size="lg"
                  asChild
                >
                  <Link
                    href={`${process.env.NEXT_PUBLIC_CHATVERSE_APP_URL}/signup`}
                  >
                    Get Started Now
                  </Link>
                </Button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  🔒 Payments processed securely via Stripe
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
