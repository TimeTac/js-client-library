export type UserDefinedFieldDefinitionOptions = {
  id: number;
  field_id: string;
  field_option_id: number;
  field_option_value: string;
  /**
   * When active is set to 0, the option disabled in the combo.
   */
  active: boolean | null;
  /**
   * Sort order of user defined field if combobox.
   */
  sort_order: number;
};
