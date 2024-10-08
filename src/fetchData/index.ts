import BaseApi from '../baseApi';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createFetchDataResponse } from '../utils/response/fetchDataUtils';
import { FetchDataResponse } from './type';

const resourceName = 'fetchData';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FetchDataEndpoint extends BaseApi<any> {
  public readonly resourceName = resourceName;
  public async readFetchData(requestParams: DeltaSyncParams): Promise<FetchDataResponse> {
    const params = requestParams.build();
    const response = this._getDeltaSync('read', { params });
    return createFetchDataResponse(await createRawApiResponse(response));
  }
}
