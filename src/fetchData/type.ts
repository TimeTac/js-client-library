import { Resources } from '../utils/response/apiResponse';
import { RawApiResponse } from '../utils/response/rawApiResponse';

export type FetchDataResponse = {
  success: boolean;
  apiResponse: RawApiResponse;
  results: Partial<Resources>;
};
