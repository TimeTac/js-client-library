export type PermissionResolveDepartment = {
  id: number;
  resolve_question_id: number;
  subject_user_id: number;
  resolve_department_id: number | null;
  resolve_department_wildcard: string;
};
