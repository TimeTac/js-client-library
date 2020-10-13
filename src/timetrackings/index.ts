import BaseApi from '../baseApi';
import responseHandler from '../utils/responseHandlers';
import { TimeTracking } from './types';

export default class TimeTrackings extends BaseApi {
  static resourceName = 'absences';

  public read(): Promise<TimeTracking[]> {
    const response = this.get<TimeTracking>(`${TimeTrackings.resourceName}/read`);
    return responseHandler.requiredList(response);
  }
  public create(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public update(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public start(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public stop(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public split(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public approve(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public reject(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
  public delete(): Promise<TimeTracking> {
    throw new Error('not Implemented');
  }
}
