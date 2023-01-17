export type PermissionResolveAbsenceTypesAndUser = {
  id: number;
  inherited_user_ids: string;
  resolve_absence_subtype_id: number;
  resolve_absence_subtype_wildcard: string;
  resolve_absence_type_id: number;
  resolve_absence_type_wildcard: string;
  resolve_question_id: number;
  resolve_user_id?: number;
  resolve_user_wildcard: string;
  subject_user_id: number;
};
