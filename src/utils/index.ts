import { ApiConfig } from '../baseApi';

type Data = {
  [index: string]: unknown;
};

/*
 * Method check if object values are there and generate a string telling which one are missing.
 * Adding prefix and postfix if there are any.
 * Return object that tells if check passed and report message.
 *
 * @param {object} data to be checked
 * @param {string} prefix = undefined prefix of message
 * @param {string} postfix = undefined postfix of message
 *
 * @return {Error | null} message
 */
export const objectCheck = (data: Data, prefix?: string, postfix?: string): Error | null => {
  let message = ''; //: string = `${prefix || ''}`;

  for (const key in data) {
    if (data[key] == undefined) {
      message += `${key}`;
    }
  }

  if (message) {
    message += `${postfix ?? '.'}`;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (prefix) {
      message = `${prefix} ${message}`;
    }
  }

  return message ? new Error(message) : null;
};

export class ConfigProvider {
  private _config: ApiConfig;
  constructor(config: ApiConfig) {
    this._config = config;
  }

  get settings(): ApiConfig {
    return this._config;
  }

  set settings(newConfig: ApiConfig) {
    this._config = newConfig;
  }

  public setFields(newConfigFields: Partial<ApiConfig>): ConfigProvider {
    this._config = { ...this._config, ...newConfigFields };
    return this;
  }
}
