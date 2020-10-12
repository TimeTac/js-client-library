export type Team = {
  id?: number;
  name?: string;
  team_leader_id?: number;
  /**
   * Foreign key to map pm_task_subprojects relations
   */
  project_id?: number;
  data_changed?: string;
  /**
   * Concanated string of all the members
   */
  current_team_members?: string;
  /**
   * TTW-2805: do not change manually - column changes automatically to 1 if there are entries in  pm_user_with_teamplaner_access
   */
  use_pm_user_with_teamplaner_access_table?: boolean;
  /**
   * TTW-2805: do not change manually - column changes automatically to 1 if there are entries in  pm_user_with_teamplaner_access
   */
  current_user_with_teamplaner_access?: string;
};
