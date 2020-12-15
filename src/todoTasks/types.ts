export interface TodoTask {
  id: number;
  user_id: number;
  node_id: number;
  _assign_to_child_nodes?: boolean;
}

export interface TodoTaskCreate extends Omit<TodoTask, 'id'> {}
