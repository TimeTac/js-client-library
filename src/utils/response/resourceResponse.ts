import { RawApiResponse } from './rawApiResponse';

export type DeletedEntry = {
  id: number;
  deleted_at: string;
};

export type ResourceResponse<T> = {
  success: boolean;
  results: T[];
  deleted: DeletedEntry[];
  apiResponse: RawApiResponse;
};

export function createResourceResponse<T>(rawApiResponse: RawApiResponse): ResourceResponse<T> {
  const response: ResourceResponse<T> = {
    success: rawApiResponse.Success ?? false,
    apiResponse: rawApiResponse,
    results: rawApiResponse.Results ?? [],
    deleted: rawApiResponse.Deleted ?? [],
  };

  return response;
}
