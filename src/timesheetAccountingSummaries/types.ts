export type TimesheetAccountingSummaries = {
  user: {
    id: number;
  };
  translations: {
    CLAM_HOLIDAY: string;
    HOLIDAY_OVERTIME_CLAIM: string;
    HOLIDAY_OVERTIME_ALLOWANCE: string;
    HOLIDAY_OVERTIME_HEADER: string;
  };
  current_period: {
    header_from_to_text: string;
    expiration_tooltip: string;
    period_tooltip: string;
    next_period_tooltip: string;
    claim_from_last_period: number;
    claim_period: number;
    consumption_period: number;
    claim_holiday: number;
    holiday_requested: number;
    holiday_granted: number;
    holiday_available: number;
    period_from: string;
    period_to: string;
  };
  next_period: {
    show_period: boolean;
    header_from_to_text: string;
    claim_from_last_period: number;
    expiration_tooltip: string;
    claim_period: number;
    consumption_period: number;
    claim_holiday: number;
    holiday_requested: number;
    holiday_granted: number;
    holiday_available: number;
    period_from: string;
  };
  overtime: {
    overtime_header: string;
    overtime_saldo: number;
    overtime_requested: number;
    overtime_granted: number;
    overtime_available: number;
    overtime_hours: string;
  };
};

export type TimesheetAccountingSummariesRead = {
  user_id: number;
};
