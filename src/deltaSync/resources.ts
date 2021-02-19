import {
  Absence,
  AbsenceDay,
  AbsenceType,
  Department,
  GeneralSetting,
  Project,
  Task,
  Team,
  TimesheetAccounting,
  TimeTracking,
  User,
  UserStatusOverview,
} from '..';

export type Resources = {
  // absenceBans: AbsenceBan;
  absenceDays: AbsenceDay;
  // absenceReplacements: AbsenceReplacement;
  absences: Absence;
  absenceTypes: AbsenceType;
  // changeTimeTrackingRequests: ChangeTimeTrackingRequest;
  // checkpoints: Checkpoint;
  // checkpointTrackings: CheckpointTracking;
  // checkpointTranslations: CheckpointTranslation;
  // clients: Client;
  department: Department;
  generalSettings: GeneralSetting;
  // holidayRequests: HolidayRequest;
  // messages: Message;
  // multiuserToTasks: MultiuserToTask;
  // nfcTransponder: NfcTransponder;
  // nodesToUsers: NodesToUser;
  // notifications: Notification;
  // notificationsTypeHtml: NotificationsTypeHtml;
  // notificationUrls: NotificationUrl;
  // permissionResolveAbsenceTypesAndUsers: PermissionResolveAbsenceTypesAndUser;
  // permissionResolveDepartments: PermissionResolveDepartment;
  // permissionResolveHolidayRequests: PermissionResolveHolidayRequest;
  // permissionResolveQuestions: PermissionResolveQuestion;
  // permissionResolveTeams: PermissionResolveTeam;
  // permissionResolveUsers: PermissionResolveUser;
  // permissions: Permission;
  projects: Project;
  // serverEvents: ServerEvent;
  // serverTime: ServerTime;
  // skills: Skill;
  // surveys: Survey;
  tasks: Task;
  teams: Team;
  // timePlannings: TimePlanning;
  timesheetAccountings: TimesheetAccounting;
  // timesheetAccountingSummaries: TimesheetAccountingSummary;
  // timesheetActionLogs: TimesheetActionLog;
  // timetrackingChangelogs: TimetrackingChangelog;
  timeTrackings: TimeTracking;
  // translations: Translation;
  users: User;
  userStatusOverview: UserStatusOverview;
};

type Resource = keyof Resources & string;
type Entity<R extends Resource> = Resources[R];
