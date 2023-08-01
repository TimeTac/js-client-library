export type JobQueue = {
  id: number;
  state: number;
  tries: number;
  task: string;
  claimed_by: string;
  created_at: string;
  scheduled_at?: string;
  completed_at?: string;
  run_at?: string;
};

export type JobQueueParam = {
  name: string;
  value_text: string;
};

export type JobQueueCreate = {
  task: number;
  run_at?: string;
  scheduled_at?: string;
  params: {
    jobParams: JobQueueParam[];
  };
};
