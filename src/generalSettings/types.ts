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
  datatype: 'string';
  allowable_values: string;
  updatable: boolean;
};

export type GeneralSettingUpdate = Pick<GeneralSetting, 'id' | 'setting_value'>;
