export type MonitoringRuleTemplatesRead = {
  id: number;
  name: string;
  tooltip: string;
  title: string;
  message: string;
  parameters: string;
  allowed_recipients: string;
  allowed_intervals: string;
  allowed_frequencies: string;
  throttle_notifications: boolean;
  default_values: string;
  updated_at: string;
  sencha_only: boolean;
};
