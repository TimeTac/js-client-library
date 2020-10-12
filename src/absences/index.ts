import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { Absence } from './types';

export default class Absences extends BaseApi {
  static resourceName = 'absences';

  public read(): Promise<Absence[]> {
    const response = this.get<Absence[]>(`${Absences.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
  public create(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public approve(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public reject(): Promise<Absence> {
    throw new Error('not Implemented');
  }
  public cancel(): Promise<Absence> {
    throw new Error('not Implemented');
  }
}
