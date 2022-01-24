export type PermissionResolveUser = {
  id: number;
  resolve_question_id: number;
  subject_user_id: number;
  resolve_user_id: number;
  resolve_user_wildcard: string;
  inherited_user_ids: string;
};
