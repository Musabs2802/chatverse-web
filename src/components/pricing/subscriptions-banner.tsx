"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { SubscriptionPlans } from "@/src/config/plans";
import { useAuth } from "@/src/hooks/use-auth";
import { useSubscription } from "@/src/hooks/use-subscription";

// Types
export interface SubsriptionPlanType {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  total_price: number;
  currency_name: string;
  currency_symbol: string;
  period: "one-time" | "monthly" | "yearly";
  period_milliseconds: number;
  tokens_limit: number;
  feature_texts: string[];
  popular: boolean;
  variant_id: string;
}

// Utility functions
const formatTokens = (tokens: number): string =>
  tokens >= 1000000
    ? `${(tokens / 1000000).toFixed(1)}M tokens`
    : `${(tokens / 1000).toFixed(0)}K tokens`;

const getSavings = (yearlyPlan: SubsriptionPlanType) => {
  const monthlyEquivalent = SubscriptionPlans.find(
    (plan) => plan.name === yearlyPlan.name && plan.period === "monthly"
  );
  if (!monthlyEquivalent) return null;

  const monthlyCost = monthlyEquivalent.unit_price * 12;
  const yearlyCost = yearlyPlan.total_price;
  const savings = monthlyCost - yearlyCost;
  const percentSavings = Math.round((savings / monthlyCost) * 100);
  return { amount: savings, percent: percentSavings };
};

export default function SubscriptionBanner() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const router = useRouter();

  const oneTimePlan = SubscriptionPlans.find((p) => p.period === "one-time");
  const currentPlans = SubscriptionPlans.filter(
    (p) => p.period === billingPeriod
  );

  const handlePlanSelect = (checkoutId: string) => {
    if (user?.aud == "authenticated") {
      if (subscription && subscription.tokensUsed < subscription.tokensLimit) {
        alert(
          "You already have a subscription plan. Please use all the tokens before purchasing a new plan."
        );
        return;
      }
      window.location.href = `https://chatverse.lemonsqueezy.com/checkout/buy/${checkoutId}`;
    } else {
      router.push(`/login?variantCheckoutId=${checkoutId}`);
    }
  };

  const maxSavings = Math.max(
    ...SubscriptionPlans.filter((p) => p.period === "yearly").map(
      (p) => getSavings(p)?.percent || 0
    )
  );

  return (
    <div className="relative py-24">
      {/* Background Gradient & Shapes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-3xl animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Plans & Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Massive token credits when you pay yearly. Flexible plans for every
            AI enthusiast.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="flex bg-gray-100 rounded-full p-1 shadow-sm">
              {["monthly", "yearly"].map((period) => (
                <button
                  key={period}
                  onClick={() =>
                    setBillingPeriod(period as "monthly" | "yearly")
                  }
                  className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-300 ${
                    billingPeriod === period
                      ? "bg-white shadow-md text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {period === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </div>
            {maxSavings > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1">
                Save {maxSavings}%
              </Badge>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* One-Time Plan */}
          {oneTimePlan && (
            <Card className="relative rounded-xl border shadow-lg hover:shadow-2xl transition-shadow border-gray-200 bg-white">
              <CardHeader className="pb-6 text-center">
                <CardTitle className="text-xl font-semibold flex items-center justify-center text-gray-900">
                  <Sparkles className="w-5 h-5 text-yellow-500 mr-2 animate-pulse" />
                  {oneTimePlan.name}
                </CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {oneTimePlan.currency_symbol}
                    {oneTimePlan.unit_price}
                  </span>
                  <span className="text-gray-500 ml-1 text-sm">one-time</span>
                </div>
                <p className="text-sm text-gray-500">Billed One Time</p>
                <CardDescription className="text-sm text-gray-600 mt-2">
                  {oneTimePlan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {oneTimePlan.feature_texts.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start space-x-3">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      {formatTokens(oneTimePlan.tokens_limit)} total
                    </span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-primary/95 hover:bg-primary text-white transition-transform hover:scale-105"
                  onClick={() => handlePlanSelect(oneTimePlan.checkout_id)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Recurring Plans */}
          {currentPlans.map((plan) => {
            const savings =
              billingPeriod === "yearly" ? getSavings(plan) : null;

            return (
              <Card
                key={plan.id}
                className={`relative rounded-xl border shadow-lg hover:shadow-2xl transition-shadow ${
                  plan.popular
                    ? "border-indigo-200 bg-gradient-to-tl from-indigo-50 to-white ring-1 ring-indigo-100"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-6 bg-indigo-600 text-white px-3 py-1">
                    Popular
                  </Badge>
                )}
                {savings && savings.percent > 0 && (
                  <Badge className="absolute -top-3 right-6 bg-black text-white px-3 py-1">
                    Save {savings.percent}%
                  </Badge>
                )}

                <CardHeader className="pb-6 text-center">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4 mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {plan.currency_symbol}
                      {plan.unit_price}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{billingPeriod === "yearly" ? "month" : plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Billed {billingPeriod === "yearly" ? "Annually" : "Monthly"}
                  </p>
                  <CardDescription className="text-sm text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.feature_texts.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                    <li className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        {formatTokens(plan.tokens_limit)} per{" "}
                        {billingPeriod === "yearly" ? "year" : "month"}
                      </span>
                    </li>
                  </ul>
                  <Button
                    className={`w-full transition-transform hover:scale-105 ${
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                    onClick={() => handlePlanSelect(plan.checkout_id)}
                  >
                    Choose {plan.name}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <Card className="rounded-xl border border-gray-200 shadow-lg bg-white">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Why Choose Our AI Platform?
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Access the most advanced AI models with flexible pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                  {
                    title: "Multiple AI Models",
                    description:
                      "Access ChatGPT, Claude, Gemini, and more premium models",
                    icon: "🤖",
                  },
                  {
                    title: "Flexible Token System",
                    description:
                      "Use tokens across any model with generous monthly limits",
                    icon: "🎯",
                  },
                  {
                    title: "Best Value",
                    description:
                      "Significant savings with yearly plans and transparent pricing",
                    icon: "💰",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center space-y-3 p-6 rounded-xl bg-gray-50 shadow hover:shadow-lg transition"
                  >
                    <div className="text-4xl animate-bounce">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
