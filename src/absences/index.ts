import BaseApi from '../baseApi';
import { Absence } from './types';
import responseHandler from '../utils/responseHandlers';

const resourceName = 'absences';

export default class Absences extends BaseApi {
  getAll() {
    const response = this.get<Absence[]>(`${resourceName}/read`);
    return responseHandler.requiredList(response);
  }
}
