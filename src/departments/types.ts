export type Department = {
  id?: number;
  department_name?: string;
  active?: boolean;
  supervisor_id?: number;
  supervisor_assistant_id?: number;
  mother_id?: number;
  view_order?: number;
  node_path?: string;
};
