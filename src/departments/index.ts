import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Department } from './types';

export default class AbsenceDays extends BaseApi {
  static resourceName = 'absencesDays';

  public read(): Promise<Department[]> {
    const response = this.get<Department[]>(`${AbsenceDays.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
}
