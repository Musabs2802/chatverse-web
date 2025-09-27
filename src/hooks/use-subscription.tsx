"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./use-auth";
import {
  SubscriptionManager,
  type UserSubscription,
} from "@/src/lib/subscription";
import { Plan } from "../config/plans";

type SubscriptionContextType = {
  subscription: UserSubscription | null;
  loading: boolean;
  registerSubscription: (
    provider_subscription_id: string,
    plan: Plan
  ) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updateTokenUsage: (tokensUsed: number) => Promise<void>;
  refreshSubscription: () => Promise<void>;
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const subscriptionManager = new SubscriptionManager();

  const refreshSubscription = async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    try {
      const userSubscription = await subscriptionManager.getUserSubscription(
        user
      );
      setSubscription(userSubscription);
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
      // Set default subscription on error
      setSubscription({
        id: user.id,
        userId: user.id,
        plan: "none",
        status: "active",
        tokensUsed: 0,
        tokensLimit: 0,
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    } finally {
      setLoading(false);
    }
  };

  const registerSubscription = async (
    provider_subscription_id: string,
    plan: Plan
  ) => {
    if (!user) throw new Error("User not authenticated");

    await subscriptionManager.registerSubscription(
      user,
      provider_subscription_id,
      plan
    );
    await refreshSubscription();
  };

  const cancelSubscription = async () => {
    if (!user) throw new Error("User not authenticated");

    await subscriptionManager.cancelSubscription(user);
    await refreshSubscription();
  };

  const updateTokenUsage = async (tokensUsed: number) => {
    if (!user) throw new Error("User not authenticated");

    await subscriptionManager.updateTokenUsage(user, tokensUsed);
    await refreshSubscription();
  };

  useEffect(() => {
    refreshSubscription();
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        registerSubscription,
        cancelSubscription,
        updateTokenUsage,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
