export enum MonitoringRulesFrequency {
  Day = 'DAY',
  Hour = 'HOUR',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR',
  Minute = 'MINUTE',
}

export enum MonitoringRuleNotificationOption {
  Notification = 'N',
  Mail = 'M',
  NotificationAndMail = 'NM',
  Csv = 'C',
  CsvAndMail = 'CM',
  CsvAndNotificationAndMail = 'CNM',
}

export type MonitoringRulesRead = {
  id: number;
  default_template_id: string | null;
  active: number;
  title: string;
  description: string;
  handler_class?: string;
  cron_freq_interval: number;
  cron_freq: MonitoringRulesFrequency;
  cron_time: string;
  cron_last_run: string;
  notification_channels: MonitoringRuleNotificationOption;
  spam_protection_unit: string;
  config: string;
  updated_at: string;
};

export type MonitoringRulesCreate = Required<
  Pick<
    MonitoringRulesRead,
    | 'default_template_id'
    | 'active'
    | 'title'
    | 'description'
    | 'cron_freq_interval'
    | 'cron_freq'
    | 'cron_time'
    | 'cron_last_run'
    | 'notification_channels'
  >
> &
  Partial<Pick<MonitoringRulesRead, 'id' | 'handler_class' | 'spam_protection_unit' | 'config'>>;

export type MonitoringRulesUpdate = Required<Pick<MonitoringRulesRead, 'id'>> &
  Partial<
    Pick<
      MonitoringRulesRead,
      | 'default_template_id'
      | 'active'
      | 'title'
      | 'description'
      | 'handler_class'
      | 'cron_freq'
      | 'cron_freq_interval'
      | 'cron_time'
      | 'cron_last_run'
      | 'notification_channels'
      | 'spam_protection_unit'
      | 'config'
    >
  >;
