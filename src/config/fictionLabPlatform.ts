export type FictionLabPlan = "FREE" | "PLUS" | "ULTRA";

export interface FictionLabStoryLimits {
  backstory: number | null;
  greeting: number | null;
  customInstructions: number | null;
}

export interface FictionLabPlanProfile {
  label: string;
  story: FictionLabStoryLimits;
}

export const FICTION_LAB_PLAN_PROFILES: Record<
  FictionLabPlan,
  FictionLabPlanProfile
> = {
  FREE: {
    label: "Free",
    story: {
      backstory: 3000,
      greeting: 2000,
      customInstructions: 3000,
    },
  },

  PLUS: {
    label: "Plus",
    story: {
      backstory: 10000,
      greeting: 4000,
      customInstructions: 6000,
    },
  },

  ULTRA: {
    label: "Ultra",
    story: {
      backstory: 10000,
      greeting: 4000,
      customInstructions: 6000,
    },
  },
};
