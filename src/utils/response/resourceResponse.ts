import { RawApiResponse } from './rawApiResponse';

export type DeletedEntry = {
  id: number;
  deleted_at: string;
};

export type ResourceResponse<T> = {
  success: boolean;
  results: T[];
  deleted: DeletedEntry[];
  affected: Record<string, unknown[]>; // TODO this should not be an record, it is should be AffectedBy<T>
  apiResponse: RawApiResponse;
};

export function createResourceResponse<T>(rawApiResponse: RawApiResponse): ResourceResponse<T> {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    success: rawApiResponse.Success ?? false,
    apiResponse: rawApiResponse,
    // @ts-expect-error unknown type used
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    results: rawApiResponse.Results ?? [],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // @ts-expect-error unknown type used
    affected: rawApiResponse.Affected ?? {},
    // @ts-expect-error unknown type used
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    deleted: rawApiResponse.Deleted ?? [],
  };
}
