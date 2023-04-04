export type PermissionResolveEntity = {
  id: number;
  resolve_question_id: number;
  subject_user_id: number;
  resource_id: number;
  resolve_entity_id: number | null;
  resolve_entity_wildcard: string;
};
