export type OnboardingStepToUsers = {
  id: number;
  onboarding_step_id: number;
  user_id: number;
  skipped: boolean;
  skipped_at: string | null;
  completed: boolean;
  completed_at: string | null;
};

export type OnboardingStepToUsersUpdate = Omit<Partial<OnboardingStepToUsers>, 'id' | 'user_id' | 'skipped_at' | 'completed_at'> & {
  skipped?: boolean;
};
