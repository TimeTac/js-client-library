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
