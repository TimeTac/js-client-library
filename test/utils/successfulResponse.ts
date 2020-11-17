import { ApiResponseOnSuccess } from '../../src/utils/response/apiResponse';

type MockResponse<T> = [number, ApiResponseOnSuccess<T[]>];

export function successfulResponse<T>(data: T): MockResponse<T[]>;

export function successfulResponse<T>(data: T[]): MockResponse<T[]>;

export function successfulResponse<T>(data: any): MockResponse<T[]> {
  if (!Array.isArray(data)) {
    data = [data];
  }

  return [
    200,
    {
      Success: true,
      NumResults: data.length,
      RequestStartTime: '01-01-2020 00:00:00',
      Results: data,
    },
  ];
}
