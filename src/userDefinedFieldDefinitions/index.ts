import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { UserDefinedFieldDefinitions } from './types';

export class UserDefinedFieldDefinitionsEndpoint extends BaseApi {
  public readonly resourceName = 'userDefinedFieldDefinitions';

  public read(params?: RequestParams<UserDefinedFieldDefinitions>): Promise<UserDefinedFieldDefinitions[]> {
    const response = this._get<UserDefinedFieldDefinitions[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(params: RequestParams<UserDefinedFieldDefinitions>): Promise<ReadRawResponse<UserDefinedFieldDefinitions>> {
    const response = this._get<UserDefinedFieldDefinitions[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<UserDefinedFieldDefinitions>(createResourceResponse(await createRawApiResponse(response)), params);
  }
}
