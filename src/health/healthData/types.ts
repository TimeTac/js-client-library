export type HealthData = {
  id: number;
  user_id: number;
  date: string;
  rule_id: number;
  check_needed: boolean;
  check_status_valid_to: string;
  check_status: 'invalid' | 'valid';
};
