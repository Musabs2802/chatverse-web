import { User } from "@supabase/supabase-js";
import { createClient } from "./supabase/client";
import { Plan, SubscriptionPlans } from "../config/plans";

export interface UserSubscription {
  id: string;
  userId: string;
  plan: Plan | "none";
  status: "active" | "canceled" | "expired";
  tokensUsed: number;
  tokensLimit: number;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  // features: PremiumFeatures;
}

export interface PremiumFeatures {
  allPremiumModels: boolean;
  sideBySideComparison: boolean;
  monthlyTokens: number;
  promptEnhancement: boolean;
  imageGeneration: boolean;
  audioTranscription: boolean;
  customProjects: boolean;
  prioritySupport: boolean;
}

export class SubscriptionManager {
  private supabase = createClient();

  async getUserSubscription(user: User): Promise<UserSubscription> {
    try {
      const { data: subscription } = await this.supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (!subscription) {
        return this.getDefaultSubscription(user.id);
      }

      return {
        id: subscription.id,
        userId: user.id,
        plan: subscription.variant_name,
        status: subscription.status,
        tokensUsed: subscription.tokens_used,
        tokensLimit: subscription.tokens_limit,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        // features: planConfig.features,
      };
    } catch (error) {
      console.error("Error in getUserSubscription:", error);
      return this.getDefaultSubscription(user.id);
    }
  }

  private getDefaultSubscription(userId: string): UserSubscription {
    return {
      id: userId,
      userId,
      plan: "none",
      status: "active",
      tokensUsed: 0,
      tokensLimit: 0,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      // features: SUBSCRIPTION_PLANS.free.features,
    };
  }

  async registerSubscription(
    user: User,
    provider_subscription_id: string,
    plan: Plan
  ): Promise<void> {
    const subscription = SubscriptionPlans.filter((s) => s.id == plan)[0];
    const { error } = await this.supabase.from("subscriptions").insert({
      user_id: user.id,
      provider_subscription_id,
      plan,
      status: "active",
      tokens_limit: subscription.tokens_limit,
      current_period_start: new Date(),
      current_period_end: new Date(
        Date.now() + subscription.period_milliseconds
      ),
    });

    if (error) {
      console.error("Error recording subscription history:", error);
    }
  }

  async cancelSubscription(user: User): Promise<void> {
    const { error } = await this.supabase
      .from("profiles")
      .update({
        subscription_status: "canceled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error canceling subscription:", error);
      throw new Error("Failed to cancel subscription");
    }
  }

  async updateTokenUsage(user: User, tokensUsed: number): Promise<void> {
    const { error } = await this.supabase
      .from("profiles")
      .update({
        tokens_used: tokensUsed,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating token usage:", error);
      throw new Error("Failed to update token usage");
    }
  }

  async resetMonthlyTokens(user: User): Promise<void> {
    const { error } = await this.supabase
      .from("profiles")
      .update({
        tokens_used: 0,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error resetting monthly tokens:", error);
      throw new Error("Failed to reset monthly tokens");
    }
  }

  async getSubscriptionHistory(user: User): Promise<any[]> {
    const { data, error } = await this.supabase
      .from("subscription_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching subscription history:", error);
      return [];
    }

    return data || [];
  }
}

export function canUseModel(
  subscription: UserSubscription,
  modelId: string
): boolean {
  return true;
}

export function getRemainingTokens(subscription: UserSubscription): number {
  return Math.max(0, subscription.tokensLimit - subscription.tokensUsed);
}

export function getTokenUsagePercentage(
  subscription: UserSubscription
): number {
  return Math.min(
    100,
    (subscription.tokensUsed / subscription.tokensLimit) * 100
  );
}

export function canMakeRequest(
  subscription: UserSubscription,
  estimatedTokens = 100
): boolean {
  return getRemainingTokens(subscription) >= estimatedTokens;
}
