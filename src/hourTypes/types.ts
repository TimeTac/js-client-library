export type HourType = {
  id: number;
  slotName: string;
  name: string;
  abbreviation: string;
  additionPercentage: string;
  tooltip: string;
  legend: string;
  usableForTimesheetTemplates: boolean;
  includeInDailyBalance: boolean;
  showInWorkingOverview: boolean;
  showInUserStatistics: boolean;
  order_by?: number;
  slotType?: number;
};
