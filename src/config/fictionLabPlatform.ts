export type FictionLabPlan = "FREE" | "PLUS" | "ULTRA";

export interface FictionLabPlanProfile {
  label: string;
}

export const FICTION_LAB_PLAN_PROFILES: Record<
  FictionLabPlan,
  FictionLabPlanProfile
> = {
  FREE: {
    label: "Free",
  },

  PLUS: {
    label: "Plus",
  },

  ULTRA: {
    label: "Ultra",
  },
};
