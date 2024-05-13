export type OnboardingStepToUser = {
  onboarding_step_id: number;
  user_id: number;
  skipped: boolean;
  skipped_at: string | null;
  completed: boolean;
  completed_at: string | null;
};

export type OnboardingStepToUserUpdate = Omit<Partial<OnboardingStepToUser>, 'skipped_at' | 'completed_at'> & {
  skipped?: boolean;
};
