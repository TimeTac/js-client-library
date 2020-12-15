export interface RecentTask {
  id: number;
  user_id: number;
  node_id: number;
  last_started: string;
}

export interface RecentTaskCreate extends Omit<RecentTask, 'id' | 'last_started'> {}
