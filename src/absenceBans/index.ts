import BaseApi from '../baseApi';
import { required, Required, requiredSingle } from '../utils/response/responseHandlers';
import { Resources } from '../utils/response/apiResponse';
import { AbsenceBanCreate, AbsenceBanUpdate } from './types';

const resourceName = 'absenceBans';

export class AbsenceBansEndpoint extends BaseApi<'absenceBans'> {
  public readonly resourceName = resourceName;

  public create(data: AbsenceBanCreate): Required<typeof resourceName> {
    const response = this._post<typeof resourceName>('create', data);
    return requiredSingle(response);
  }

  public update(data: AbsenceBanUpdate): Required<typeof resourceName, Resources[typeof resourceName][]> {
    const response = this._put<typeof resourceName>('update', data);
    return required(response);
  }
}
