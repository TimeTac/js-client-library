export type GeneralSetting = {
  id: number;
  setting_type: string;
  group_const?: string;
  setting_value: string;
  description?: string;
  value_range?: string;
  text?: string;
  type?: number;
  data_changed: string;
};

export type GeneralSettingUpdate = Pick<GeneralSetting, 'id' | 'setting_value'>;
