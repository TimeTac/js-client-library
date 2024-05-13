export type OnboardingStep = {
  id: number;
  group: string | null;
  internal_name: string;
  slug: string;
  show_in_flow: boolean;
  is_skippable: boolean;
  sort_order: number;
  weight: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};
