/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { RawApiResponse } from '../response/rawApiResponse';

export enum TimeTacErrorType {
  InteralError,
  FailedRequest,
  Unknown,
}

export type TimeTacApiError = {
  errorType: TimeTacErrorType;
  message: string;
  response?: Partial<RawApiResponse>;
  axiosError?: Record<string, unknown>;
};

/**
 * THIS FUNCTION IS COPY AND PASTED FROM AXIOS
 *
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code: string | null,
  request: any,
  response: AxiosResponse
): AxiosError {
  const error = new Error(message) as any;
  return enhanceError(error, config, code, request, response);
}

function enhanceError(error: any, config: AxiosRequestConfig, code: string | null, request: any, response: AxiosResponse): AxiosError {
  error.config = config;
  if (code != null) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
    };
  };
  return error as AxiosError;
}
