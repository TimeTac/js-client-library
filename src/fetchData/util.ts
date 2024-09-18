import { resourceNameArray, Resources } from '../utils/response/apiResponse';
import { RawApiResponse } from '../utils/response/rawApiResponse';
import { ResourceResponse } from '../utils/response/resourceResponse';
import { FetchDataResponse } from './type';

export function createFetchDataResponse(rawApiResponse: RawApiResponse): FetchDataResponse {
  const results = {} as Resources;
  resourceNameArray.forEach((resource) => {
    const clarifiedKey = resource as keyof Resources;
    const resourceResponse = convert(rawApiResponse, resource);
    if (resourceResponse) {
      Object.defineProperty(results, clarifiedKey, resourceResponse);
    }
  });
  return {
    success: true,
    apiResponse: rawApiResponse,
    results,
  };
}

function convert<T>(fetchDataResponse: RawApiResponse, resource: keyof Resources): ResourceResponse<T> | undefined {
  // @ts-expect-error unknown type used

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const includeResponse: RawApiResponse = fetchDataResponse.Results[resource];

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,@typescript-eslint/strict-boolean-expressions
  if (!includeResponse) {
    return undefined;
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    success: includeResponse.Success ?? false,
    apiResponse: includeResponse,
    // @ts-expect-error unknown type used
    results: includeResponse.Results ?? [],
    // @ts-expect-error unknown type used
    deleted: includeResponse.Deleted ?? [],
    affected: {},
  };
}
