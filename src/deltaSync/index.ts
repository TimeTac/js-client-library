import { DeltaSyncResponse } from '..';
import BaseApi from '../baseApi';
import { DeltaSyncParams } from '../utils/params/deltaSyncParams';
import { Resource } from './types';

export class DeltaSyncEndpoint extends BaseApi {
  public readonly resourceName = 'deltaSync';

  async read<R extends Resource>(requestParams: DeltaSyncParams): Promise<DeltaSyncResponse<R>> {
    const params = requestParams.getParams();
    return (await this._getDeltaSync<R>({ params })).data;
  }
}
