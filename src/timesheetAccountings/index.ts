import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { TimesheetAccounting } from './types';

export default class TimesheetAccountings extends BaseApi {
  static resourceName = 'timesheetAccountings';

  public read(): Promise<TimesheetAccounting[]> {
    const response = this.get<TimesheetAccounting[]>(`${TimesheetAccountings.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
}
