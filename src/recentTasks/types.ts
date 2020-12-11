export interface RecentTask {
  id: number;
  user_id: number;
  node_id: number;
  _assign_to_child_nodes?: boolean;
}

export interface RecentTaskCreate extends Omit<RecentTask, 'id'> {}
