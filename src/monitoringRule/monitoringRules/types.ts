export enum MonitoringRulesFrequency {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR',
  Minute = 'MINUTE',
  Hour = 'HOUR',
}

export type MonitoringRulesRead = {
  default_template_id?: number; //check
  active: boolean;
  title: string;
  description: string;
  handler_class?: string; //check
  cron_freq_interval: number;
  cron_freq: MonitoringRulesFrequency;
  cron_time: string;
  cron_last_run: string;
  notification_channels: string;
  spam_protection_unit: string;
  config: string;
  updated_at: string;
};

export type MonitotingRulesUpdate = {
  id: number;
  active: boolean;
};
