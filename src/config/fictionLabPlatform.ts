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
      backstory: null,
      greeting: null,
      customInstructions: null,
    },
  },

  PLUS: {
    label: "Plus",
    story: {
      backstory: null,
      greeting: null,
      customInstructions: null,
    },
  },

  ULTRA: {
    label: "Ultra",
    story: {
      backstory: null,
      greeting: null,
      customInstructions: null,
    },
  },
};