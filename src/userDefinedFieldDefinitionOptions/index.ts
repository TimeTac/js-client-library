import { RawApiResponse } from '..';
import BaseApi from '../baseApi';
import { RequestParams } from '../utils/params/requestParams';
import { createReadRawResponse, ReadRawResponse } from '../utils/response/readRawResponse';
import { createResourceResponse } from '../utils/response/resourceResponse';
import * as responseHandlers from '../utils/response/responseHandlers';
import { UserDefinedFieldDefinitionOptions } from './types';

export class UserDefinedFieldDefinitionOptionsEndpoint extends BaseApi {
  public readonly resourceName = 'userDefinedFieldDefinitionOptions';

  public read(params?: RequestParams<UserDefinedFieldDefinitionOptions>): Promise<UserDefinedFieldDefinitionOptions[]> {
    const response = this._get<UserDefinedFieldDefinitionOptions[]>(`${this.getResourceName()}/read`, { params });
    return responseHandlers.list(response);
  }

  public async readRaw(
    params: RequestParams<UserDefinedFieldDefinitionOptions>
  ): Promise<ReadRawResponse<UserDefinedFieldDefinitionOptions>> {
    const response = this._get<UserDefinedFieldDefinitionOptions[]>(`${this.getResourceName()}/read`, { params });
    return createReadRawResponse<UserDefinedFieldDefinitionOptions>(
      createResourceResponse(((await response) as unknown) as RawApiResponse),
      params
    );
  }
}
