import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { AbsenceDay } from './types';

export default class AbsenceDays extends BaseApi {
  static resourceName = 'absencesDays';

  public read(requestParams: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const params = requestParams.getParams();
    const response = this.get<AbsenceDay[]>(`${AbsenceDays.resourceName}/read`, { params });

    return responseHandler.requiredList(response);
  }
}
