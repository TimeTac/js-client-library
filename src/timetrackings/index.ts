import BaseApi from '../baseApi';
import TimeTracking from './types';
import responseHandler from '../utils/responseHandlers';

const resourceName = 'timetrackings';

export default class TimeTrackings extends BaseApi {
  readAll() {
    const response = this.get<TimeTracking>(`${resourceName}/read`);
    return responseHandler.requiredList(response);
  }
}
