import { Resources } from '../utils/response/apiResponse';
import { RawApiResponse } from '../utils/response/rawApiResponse';
import { ResourceResponse } from '../utils/response/resourceResponse';

export type FetchDataResponse = {
  success: boolean;
  apiResponse: RawApiResponse;
  results: Partial<{
    [K in keyof Resources]: ResourceResponse<Resources[K]>;
  }>;
};
