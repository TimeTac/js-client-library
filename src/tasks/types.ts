import { TaskStatus } from '../enums';

export type Task = {
  id: number;
  mother_id: number;
  name: string;
  node_path: string;
  view_id: string;
  jira_id: number | null;
  sort_order: number;
  ultimate_mother_id: number;
  is_done: boolean;
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
  color: string;
  has_children: boolean;
  translate_task_name: number;
  allow_task_project_edit: boolean;
  allow_task_project_delete: boolean;
  status: TaskStatus;
  external_id: string;
  is_billable: boolean;
  is_nonworking: boolean;
  name_path: string;
};

export type TaskUpdate = Omit<
  Partial<Task>,
  | 'node_path'
  | 'view_id'
  | 'jira_id'
  | 'ultimate_mother_id'
  | 'view_order'
  | 'icon_name'
  | 'custom_icon_name'
  | 'initial_duration'
  | 'object_type'
  | 'duration'
  | 'is_restricted'
  | 'is_todo'
  | 'last_started'
  | 'target_duration_sum_up_by_task'
  | 'color'
  | 'has_children'
  | 'translate_task_name'
  | 'allow_task_project_edit'
  | 'allow_task_project_delete'
  | 'status'
  | 'external_id'
  | 'is_billable'
  | 'is_nonworking'
  | 'name_path'
> & {
  is_blocked?: boolean;
};

export type TaskCreate = Omit<
  Partial<Task>,
  'id' | 'node_path' | 'view_id' | 'ultimate_mother_id' | 'view_order' | 'icon_name' | 'object_type'
> & { mother_id: number; name: string };
