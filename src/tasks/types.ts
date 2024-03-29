export type Task = {
  id: number;
  mother_id: number;
  name: string;
  node_path: string;
  view_id: string;
  jira_id: number | null;
  sort_order: number;
  ultimate_mother_id: number;
  /**
   * @deprecated Use `status` instead.
   */
  is_done?: boolean;
  status?: number;
  view_order: number;
  icon_name: string;
  custom_icon_name: string;
  initial_duration: number;
  target_duration: number;
  begin: string | null;
  deadline: string | null;
  object_type: 'task';
  notes: string;
  client_id: number;
  t_iv_1: string | null;
  t_iv_2: string | null;
  t_iv_3: string | null;
  t_iv_4: string | null;
  t_iv_5: string | null;
  t_iv_6: string | null;
  approve_by_project_leader: boolean;
  duration: number;
  is_startable: boolean;
  is_paid_non_working: boolean;
  internal_cost_per_hour: number;
  revenue_per_hour: number;
  skill_id: number;
  priority: number;
  is_restricted: boolean;
  is_todo: boolean;
  last_started: string | null;
  is_favourite: boolean | null;
  target_duration_sum_up_by_task: boolean;
  has_children: boolean;
  translate_task_name: number;
  allow_task_project_edit: boolean;
  allow_task_project_delete: boolean;
  external_id: string;
  is_billable: boolean;
  is_nonworking: boolean;
  name_path: string;
};

export type TaskUpdate = {
  id: number;
  mother_id?: number;
  sort_order?: number;
  name?: string;
  /**
   * @deprecated Use `status` instead.
   */
  is_done?: boolean;
  status?: number;
  target_duration?: number;
  begin?: string;
  deadline?: string;
  notes?: string;
  client_id?: number;
  t_iv_1?: string;
  t_iv_2?: string;
  t_iv_3?: string;
  t_iv_4?: string;
  t_iv_5?: string;
  t_iv_6?: string;
  approve_by_project_leader?: boolean;
  is_blocked?: boolean;
  is_hidden?: boolean;
  restrict_tracking_from_to?: boolean;
  is_startable?: boolean;
  is_billable?: boolean;
  is_nonworking?: boolean;
  is_paid_non_working?: boolean;
  internal_cost_per_hour?: number;
  revenue_per_hour?: number;
  skill_id?: number;
  priority?: number;
  is_favourite?: boolean;
};

export type TaskCreate = Omit<
  Partial<Task>,
  'id' | 'node_path' | 'view_id' | 'ultimate_mother_id' | 'view_order' | 'icon_name' | 'object_type'
> & { mother_id: number; name: string };
