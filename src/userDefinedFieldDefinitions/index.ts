import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { creatGetResponse, GetResponse } from '../utils/response/getResponse';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { UserDefinedFieldDefinitions } from './types';

export class UserDefinedFieldDefinitionsEndpoint extends BaseApi {
  public readonly resourceName = 'userDefinedFieldDefinitions';

  public read(config?: RequestConfig<UserDefinedFieldDefinitions>): Promise<UserDefinedFieldDefinitions[]> {
    const response = this._get<UserDefinedFieldDefinitions[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public async readRaw(config: RequestConfig<UserDefinedFieldDefinitions>): Promise<GetResponse<UserDefinedFieldDefinitions>> {
    const response = this._get<UserDefinedFieldDefinitions[]>(`${this.getResourceName()}/read`, config);
    return creatGetResponse<UserDefinedFieldDefinitions>(createResourceResponse(await createRawApiResponse(response)), config);
  }
}
