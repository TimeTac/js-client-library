export type UserDefinedFieldDefinitionsIds =
  | 't_iv_1'
  | 't_iv_2'
  | 't_iv_3'
  | 't_iv_4'
  | 't_iv_5'
  | 't_iv_6'
  | 'u_iv_1'
  | 'u_iv_2'
  | 'u_iv_3'
  | 'u_iv_4'
  | 'u_iv_5'
  | 'u_iv_6'
  | 'is_billable';

export type UserDefinedFieldDefinitions = {
  id: UserDefinedFieldDefinitionsIds;
  entity: string;
  fieldname: string;
  fieldtype: string;
  aggregation_type: string;
};
