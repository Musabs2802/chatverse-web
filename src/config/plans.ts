export type SubsriptionPlanType = {
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
  checkout_id: string;
};

export type Plan =
  | "one-time"
  | "monthly-basic"
  | "monthly-pro"
  | "yearly-basic"
  | "yearly-pro";

export const SubscriptionPlans: SubsriptionPlanType[] = [
  {
    id: "one-time",
    name: "One Time",
    description:
      "Perfect for trying out the platform without commitment. A simple one-off purchase to explore models and tokens.",
    unit_price: 5,
    total_price: 5,
    currency_name: "USD",
    currency_symbol: "$",
    period: "one-time",
    period_milliseconds: 90 * 24 * 60 * 60 * 1000,
    tokens_limit: 300000,
    feature_texts: ["Access up to 6 models", "300,000 tokens"],
    popular: false,
    variant_id: "1002201",
    checkout_id: "1310cb96-24f3-4872-8969-c3867d6216d9",
  },
  {
    id: "monthly-basic",
    name: "Basic",
    description:
      "Great for individuals who need steady monthly access to premium models with generous token limits.",
    unit_price: 19,
    total_price: 19,
    currency_name: "USD",
    currency_symbol: "$",
    period: "monthly",
    period_milliseconds: 30 * 24 * 60 * 60 * 1000,
    tokens_limit: 1140000,
    feature_texts: ["Access all premium models", "1,140,000 tokens"],
    popular: false,
    variant_id: "1002189",
    checkout_id: "5e536a1b-1bd0-4175-861c-e78cf62d08ac",
  },
  {
    id: "monthly-pro",
    name: "Pro",
    description:
      "Best for professionals and power users who need higher token limits and flexibility every month.",
    unit_price: 39,
    total_price: 39,
    currency_name: "USD",
    currency_symbol: "$",
    period: "monthly",
    period_milliseconds: 30 * 24 * 60 * 60 * 1000,
    tokens_limit: 2340000,
    feature_texts: ["Access all premium models", "2,340,000 tokens"],
    popular: true,
    variant_id: "1002192",
    checkout_id: "433c63a7-e26b-41e8-abbe-1be91534f287",
  },
  {
    id: "yearly-basic",
    name: "Basic",
    description:
      "Save more with yearly billing. A cost-effective choice for regular users who want consistent access throughout the year.",
    unit_price: 14.99,
    total_price: 179.88,
    currency_name: "USD",
    currency_symbol: "$",
    period: "yearly",
    period_milliseconds: 365 * 24 * 60 * 60 * 1000,
    tokens_limit: 13680000,
    feature_texts: ["Access all premium models", "13,680,000 tokens"],
    popular: false,
    variant_id: "1002194",
    checkout_id: "7eb82605-ab92-427c-b79f-057e81c1db9a",
  },
  {
    id: "yearly-pro",
    name: "Pro",
    description:
      "The ultimate value plan. Designed for heavy users who want the highest token allowance at the best yearly rate.",
    unit_price: 24.99,
    total_price: 299.98,
    currency_name: "USD",
    currency_symbol: "$",
    period: "yearly",
    period_milliseconds: 365 * 24 * 60 * 60 * 1000,
    tokens_limit: 28080000,
    feature_texts: ["Access all premium models", "28,080,000 tokens"],
    popular: false,
    variant_id: "1002195",
    checkout_id: "bf2fc020-d1e6-4249-b4e4-bcd60708ca04",
  },
];
