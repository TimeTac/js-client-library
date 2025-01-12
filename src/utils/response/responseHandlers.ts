import { AxiosError, AxiosResponse } from 'axios';
import { ServerCommunication } from '../../serverCommunication/types';

import {
  ApiResponse,
  ApiResponseOnFailure,
  ApiResponseOnFailureServerCommunication,
  ApiResponseOnSuccess,
  ApiResponseBatchOnSuccess,
  Entity,
  LibraryReturn,
  ResourceNames,
  ApiBatchResponse,
  ApiResponseBatchOnFailure,
  NonEntityResult,
} from './apiResponse';
import { hasSuccessProperty } from './rawApiResponse';

export type RequestPromise<ResourceName extends ResourceNames> = Promise<AxiosResponse<ApiResponse<ResourceName>>>;

export type RequestBatchPromise<ResourceName extends ResourceNames> = Promise<AxiosResponse<ApiBatchResponse<ResourceName>>>;

export type Required<ResourceName extends ResourceNames, Resource = Entity<ResourceName>> = Promise<LibraryReturn<ResourceName, Resource>>;

export type ParsedErrorMesage = {
  response: ApiResponseOnFailure;
  message: string;
  stack: string | undefined;
  code?: number;
};

type ParserErrorMesageObject<ResourceName extends ResourceNames> = ParsedErrorMesage & {
  _plainError: AxiosResponse<ApiBatchResponse<ResourceName> | ApiResponse<ResourceName>>;
  code: number;
};

export function getParsedErrorMessage(apiResponse: ApiResponseOnFailure): ParsedErrorMesage {
  let errorMessage = 'Something went wrong';

  if (typeof apiResponse.ErrorExtended?.errorString == 'string' && 0 < apiResponse.ErrorExtended.errorString.length) {
    errorMessage = apiResponse.ErrorExtended.errorString;
  } else if (typeof apiResponse.ErrorMessage == 'string') {
    errorMessage = apiResponse.ErrorMessage;
  }

  return {
    response: apiResponse,
    message: errorMessage,
    stack: new Error().stack,
    code: apiResponse.Error,
  };
}

function getParsedErrorMessageObject<ResourceName extends ResourceNames>(
  apiResponse: ApiResponseOnFailure,
  resolved: AxiosResponse<ApiBatchResponse<ResourceName>>,
): ParserErrorMesageObject<ResourceName>;

function getParsedErrorMessageObject<ResourceName extends ResourceNames>(
  apiResponse: ApiResponseOnFailure,
  resolved: AxiosResponse<ApiResponse<ResourceName>>,
): ParserErrorMesageObject<ResourceName>;

function getParsedErrorMessageObject<ResourceName extends ResourceNames>(
  apiResponse: ApiResponseOnFailure,
  resolved: AxiosResponse<ApiBatchResponse<ResourceName> | ApiResponse<ResourceName>>,
): ParserErrorMesageObject<ResourceName> {
  const { response, message, stack, code } = getParsedErrorMessage(apiResponse);

  return {
    response,
    message,
    stack,
    code: code ?? resolved.status,
    _plainError: resolved,
  };
}

async function resolveResponse<ResourceName extends ResourceNames>(
  promise: RequestBatchPromise<ResourceName>,
): Promise<AxiosResponse<ApiBatchResponse<ResourceName>>>;

async function resolveResponse<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<AxiosResponse<ApiResponse<ResourceName>>>;

async function resolveResponse<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName> | RequestBatchPromise<ResourceName>,
): Promise<AxiosResponse<ApiResponse<ResourceName> | ApiBatchResponse<ResourceName>>> {
  let resolved;
  try {
    resolved = await promise;
  } catch (e) {
    const error = e as AxiosError;

    if (error.response?.data != null && typeof error.response.data !== 'string' && hasSuccessProperty(error.response.data)) {
      resolved = error.response as AxiosResponse<ApiResponse<ResourceName>> | AxiosResponse<ApiBatchResponse<ResourceName>>;
    } else {
      //eslint-disable-next-line @typescript-eslint/only-throw-error
      throw {
        _plainError: error,
        message: error.message,
        code: error.response?.status,
        stack: error.stack ?? new Error().stack,
      };
    }
  }
  return resolved;
}

export async function toApiBatchResponse<ResourceName extends ResourceNames>(
  promise: RequestBatchPromise<ResourceName>,
): Promise<ApiResponseBatchOnSuccess<ResourceName> | ApiResponseBatchOnFailure<ResourceName>> {
  const resolved = await resolveResponse<ResourceName>(promise);

  const apiResponse: ApiBatchResponse<ResourceName> = resolved.data;
  if (apiResponse.Success) {
    return apiResponse;
  }

  //eslint-disable-next-line @typescript-eslint/only-throw-error
  throw getParsedErrorMessageObject(apiResponse, resolved);
}

export async function toApiResponse<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<ApiResponseOnSuccess<ResourceName>> {
  const resolved: AxiosResponse<ApiResponse<ResourceName>> = await resolveResponse(promise);

  const apiResponse:
    | ApiResponseOnFailureServerCommunication
    | ApiResponseOnSuccess<ResourceName>
    | ApiResponseOnFailure
    | ApiResponseOnSuccess<ResourceName, ServerCommunication> = resolved.data;
  // Workaround for serverCommunication endpoint returning Success: true despite an error
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (apiResponse.Success && apiResponse.Results == null) {
    (apiResponse as ApiResponseOnFailure).Success = false;
  }

  if (apiResponse.Success) {
    return apiResponse;
  }

  //eslint-disable-next-line @typescript-eslint/only-throw-error
  throw getParsedErrorMessageObject(apiResponse, resolved);
}

/**
 * @return A promise that resolves to Type or rejects if no results
 */
export async function required<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Required<ResourceName, Entity<ResourceName>[]> {
  const response = await toApiResponse<ResourceName>(promise);

  if (response.NumResults > 0) {
    return {
      Results: response.Results,
      Affected: response.Affected ?? {},
      Deleted: response.Deleted ?? {},
    };
  } else {
    throw new Error('There are no results.');
  }
}

/**
 * @return A promise that resolves to Type or rejects if no results
 */
export async function requiredBatch<ResourceName extends ResourceNames>(
  promise: RequestBatchPromise<ResourceName>,
): Required<ResourceName, (Entity<ResourceName> | ParsedErrorMesage)[]> {
  const response = await toApiBatchResponse<ResourceName>(promise);

  if (response.NumResults > 0) {
    const childResults = response.Results.map((result) => {
      if (result.Success) {
        return result.Results[0];
      } else {
        return getParsedErrorMessage(result);
      }
    });
    return {
      Results: childResults,
      Affected: response.Affected ?? {},
      Deleted: response.Deleted ?? {},
    };
  } else {
    throw new Error('There are no results.');
  }
}

export async function requiredSingle<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<LibraryReturn<ResourceName>> {
  const response = await toApiResponse<ResourceName>(promise);

  if (response.NumResults > 0) {
    return {
      Results: response.Results[0],
      Affected: response.Affected ?? {},
      Deleted: response.Deleted ?? {},
    };
  } else {
    throw new Error('There are no results.');
  }
}

export async function serverCommunication<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<{ Results: ServerCommunication }> {
  const response = (await toApiResponse<ResourceName>(promise)) as unknown as ApiResponseOnSuccess<ResourceName, ServerCommunication>;

  if (response.Results.host) {
    return {
      Results: response.Results,
    };
  } else {
    throw new Error('There are no results.');
  }
}

export async function plainObject<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<{ Results: Entity<ResourceName> }> {
  const response = (await toApiResponse<ResourceName>(promise)) as unknown as ApiResponseOnSuccess<ResourceName, Entity<ResourceName>>;

  return {
    Results: response.Results,
  };
}

/**
 * @return A promise that resolves to Results T or undefined if no results but Success is true.
 */
export async function optional<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<LibraryReturn<ResourceName, Entity<ResourceName> | undefined>> {
  const response = await toApiResponse<ResourceName>(promise);

  return {
    Results: response.Results[0] ?? undefined,
    Affected: response.Affected ?? {},
    Deleted: response.Deleted ?? {},
  };
}

export async function list<ResourceName extends ResourceNames>(
  promise: RequestPromise<ResourceName>,
): Promise<LibraryReturn<ResourceName, Entity<ResourceName>[]>> {
  const response = await toApiResponse<ResourceName>(promise);

  return {
    Results: response.Results,
    Affected: response.Affected ?? {},
    Deleted: response.Deleted ?? {},
  };
}

/**
 * @return A promise that resolves to Results T or undefined if no results but Success is true.
 */
export async function nonEntityResult<ResourceName extends ResourceNames, T>(
  promise: RequestPromise<ResourceName>,
): Promise<NonEntityResult<T>> {
  const response = (await toApiResponse<ResourceName>(promise)) as unknown as ApiResponseOnSuccess<ResourceName, T>;

  return {
    Results: (response.Results as T[])[0],
  };
}
