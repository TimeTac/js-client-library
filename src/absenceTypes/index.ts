import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { AbsenceType } from './types';

export default class AbsenceTypes extends BaseApi {
  static resourceName = 'absencesDays';

  public read(): Promise<AbsenceType[]> {
    const response = this._get<AbsenceType[]>(`${AbsenceTypes.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
  public create(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public update(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
}
