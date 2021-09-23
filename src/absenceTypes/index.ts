import BaseApi from '../baseApi';
import { AbsenceType } from './types';

const resourceName = 'absenceTypes';

export class AbsenceTypesEndpoint extends BaseApi<typeof resourceName> {
  public readonly resourceName = 'absenceTypes';

  public create(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
  public update(): Promise<AbsenceType> {
    throw new Error('not Implemented');
  }
}
