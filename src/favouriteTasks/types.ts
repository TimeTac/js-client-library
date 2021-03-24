export interface FavouriteTask {
  id: number;
  user_id: number;
  node_id: number;
  _assign_to_child_nodes: boolean;
}

export type FavouriteTaskCreate = Partial<FavouriteTask> & Pick<FavouriteTask, 'user_id' | 'node_id'>;
