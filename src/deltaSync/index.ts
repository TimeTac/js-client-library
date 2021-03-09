import BaseApi from '../baseApi';
import { Action } from '../utils/action';
import { DeltaSyncRequestConfig } from '../utils/configs/deltaSyncRequestConfig';
import { RequestMaker } from '../utils/requestMaker';
import { DeltaSyncResponse } from '../utils/response/deltaSyncResponse';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read(config: DeltaSyncRequestConfig): Promise<DeltaSyncResponse> {
    return RequestMaker.deltaSync(this, Action.Read, config);
  }
}
