import { RawApiResponse } from './rawApiResponse';

export type DeletedEntry = {
  id: number;
  deleted_at: string;
};

export type ResourceResponse<T> = {
  success: boolean;
  results: T[];
  deleted: DeletedEntry[];
  affected?: Record<string, any[]>;
  apiResponse: RawApiResponse;
};

export function createResourceResponse<T>(rawApiResponse: RawApiResponse): ResourceResponse<T> {
  const response: ResourceResponse<T> = {
    success: rawApiResponse.Success ?? false,
    apiResponse: rawApiResponse,
    results: rawApiResponse.Results ?? [],
    affected: rawApiResponse.Affected ?? [],
    deleted: rawApiResponse.Deleted ?? [],
  };

  return response;
}
