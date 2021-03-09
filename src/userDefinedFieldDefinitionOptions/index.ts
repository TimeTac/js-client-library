import BaseApi from '../baseApi';
import { RequestConfig } from '../utils/configs/requestConfig';
import { createRawApiResponse } from '../utils/response/rawApiResponse';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { UserDefinedFieldDefinitionOptions } from './types';

export class UserDefinedFieldDefinitionOptionsEndpoint extends BaseApi {
  public readonly resourceName = 'userDefinedFieldDefinitionOptions';

  public read(config?: RequestConfig<UserDefinedFieldDefinitionOptions>): Promise<UserDefinedFieldDefinitionOptions[]> {
    const response = this._get<UserDefinedFieldDefinitionOptions[]>(`${this.getResourceName()}/read`, config);
    return responseHandlers.list(response);
  }

  public async readRaw(
    config: RequestConfig<UserDefinedFieldDefinitionOptions>
  ): Promise<ReadRawResponse<UserDefinedFieldDefinitionOptions>> {
    const response = this._get<UserDefinedFieldDefinitionOptions[]>(`${this.getResourceName()}/read`, config);
    return createReadRawResponse<UserDefinedFieldDefinitionOptions>(createResourceResponse(await createRawApiResponse(response)), config);
  }
}
