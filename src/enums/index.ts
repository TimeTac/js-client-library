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

export enum OnboardingStepsSlugs {
  Signup = 'buyer_step_signup',
  EmployeeSignup = 'user_step_signup',
  Name = 'buyer_step_name',
  EmployeeName = 'user_step_name',
  Role = 'buyer_step_role',
  Country = 'buyer_step_country',
  Company = 'buyer_step_company_size',
  InviteTeamMembers = 'buyer_step_invite_team',
  WorkSchedule = 'buyer_step_assign_work_schedules',
  Dismiss = 'buyer_step_dismiss_onboarding',
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
  Cancelled = 'CANCELED',
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
