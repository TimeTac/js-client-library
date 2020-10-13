import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { AbsenceDay } from './types';

export default class AbsenceDays extends BaseApi {
  static resourceName = 'absencesDays';

  public read(): Promise<AbsenceDay[]> {
    const response = this.get<AbsenceDay[]>(`${AbsenceDays.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
}
