import BaseApi from '../baseApi';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { createDeltaSyncResponse, DeltaSyncResponse } from '../utils/response/deltaSyncResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';

const resourceName = 'deltaSync';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DeltaSyncEndpoint extends BaseApi<any> {
  public readonly resourceName = resourceName;

  async readDeltaSync(requestParams: DeltaSyncParams): Promise<DeltaSyncResponse> {
    const params = requestParams.build();
    const response = this._getDeltaSync('read', { params });
    return createDeltaSyncResponse(await createRawApiResponse(response));
  }
}
