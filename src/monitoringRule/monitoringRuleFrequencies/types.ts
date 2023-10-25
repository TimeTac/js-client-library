import { MonitoringRulesFrequency } from '../monitoringRules/types';

export type MonitoringRuleFrequencyRead = {
  id: number;
  name: string;
  frequency: MonitoringRulesFrequency;
};
