export type Department = {
  id: number;
  department_name: string;
  active: boolean;
  supervisor_id: number;
  supervisor_assistant_id: number;
  mother_id: number;
  view_order: number;
  sort_order: number;
  node_path: string;
  data_changed?: string;
};

export type DepartmentCreate = Omit<
  Department,
  'id' | 'active' | 'view_order' | 'sort_order' | 'node_path' | 'supervisor_id' | 'supervisor_assistant_id' | 'data_changed'
>;

export type DepartmentUpdate = Partial<Omit<Department, 'data_changed'>> & {
  id: number;
};
