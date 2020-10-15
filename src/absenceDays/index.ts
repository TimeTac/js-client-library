import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import RequestParams from '../utils/requestParams';
import { AbsenceDay } from './types';

export default class AbsenceDays extends BaseApi {
  private readonly resourceName = 'absencesDays';

  public read(requestParams: RequestParams<AbsenceDay>): Promise<AbsenceDay[]> {
    const response = this._get(this, '/read', requestParams);
    return responseHandler.requiredList(response);
  }

  // Move this to BasiAPI (or some where else)
  private _get(endpoint: AbsenceDays, slug: string, requestParams: RequestParams<Object>): any {
    const params = requestParams.getParams();
    return this.get<any>(`${endpoint.getResourceName()}${slug}`, { params });
  }

  // Also move BaseAPI
  public getResourceName(): String {
    return this.resourceName;
  }
}
