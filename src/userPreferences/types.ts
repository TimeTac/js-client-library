// backend only supports a single preference at the moment
export type UserPreferenceName = 'appearance' | 'dismissed_onboarding_card' | 'dismissed_mobile_app_promotion';

export type UserPreferenceRead = {
  id: number;
  user_id: number;
  oauth_client_id: number;
  name: UserPreferenceName;
  value: string;
  description?: string;
};

export type UserPreferenceSet = Omit<UserPreferenceRead, 'id' | 'user_id' | 'oauth_client_id' | 'description'>;

export type UserPreferenceUpdate = UserPreferenceSet;
