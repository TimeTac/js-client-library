export enum AbsenceDayType {
  Holiday = 'holiday',
  OvertimeReduction = 'overtime_reduction',
  OtherPaidLeave = 'other_paid_leave',
  SickLeave = 'sick_leave',
  PublicHoliday = 'public_holiday',
}

export enum AbsenceStatus {
  Open,
  Granted,
  Declined,
  Cancelled,
  OpenWaitingForReplacement = 5,
}

export enum OnboardingStepsId {
  Signup = 1,
  Role = 2,
  Country = 3,
  Company = 4,
  InviteTeamMembers = 5,
  WorkSchedule = 6,
  Dismiss = 7,
}

export enum AbsenceDurationUnit {
  Days = 'd',
  Hours = 'hs',
}

export enum AbsenceTypeRequestType {
  Workflow = 'WORKFLOW',
  User = 'USER',
  HRManager = 'HR_MANAGER',
  Manager = 'MANAGER',
}

export enum UserStatusOverviewStatus {
  Offline,
  Working,
  Break,
  Leave,
  CoreTimeViolation = 5,
}

export enum TimeTrackingStatus {
  Running = 1,
  Stopped = 2,
}

export enum ChangeTimetrackingRequestsStatus {
  Pending = 'PENDING',
  Granted = 'GRANTED',
  Declined = 'DECLINED',
}

export enum ChangeTimetrackingRequestsType {
  Add = 'ADD',
  Change = 'CHANGE',
}

export enum TaskStatus {
  InProgress = 1,
  Finished = 2,
}

export enum ProjectStatus {
  Planning = 1,
  Active = 2,
  Inactive = 3,
  Closed = 4,
}
