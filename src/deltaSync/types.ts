import User from '../users/types';
import { Task } from '../tasks/types';
import { Project } from '../projects/types';
import { TimeTracking } from '../timetrackings/types';

export type SyncData = {
  users: User[];
  tasks: Task[];
  projects: Project[];
  timeTrackings: TimeTracking[];
};

export type SyncResource = keyof SyncData;
// Captures all string keys in the model type for the SyncResource R.
// Eg, "tasks" => "id" | "name" | "mother_id"
// Useful for auto-complete when one parameter is SyncResource and another parameter a field of that SyncResource
export type SyncResourceField<R extends SyncResource> = keyof SyncData[R][0] & string;
