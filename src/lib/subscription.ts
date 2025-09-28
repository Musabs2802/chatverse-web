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
}
