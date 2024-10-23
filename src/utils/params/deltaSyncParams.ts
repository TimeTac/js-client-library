import { Entity, ResourceNames } from '../response/apiResponse';
import { RequestParams, RequestParamsBuilder } from './requestParams';

export class DeltaSyncParams<RN extends ResourceNames = ResourceNames> {
  protected requestParams: RequestParams<unknown> = {};

  constructor(params?: DeltaSyncParams<RN>) {
    if (params) {
      this.requestParams = { ...params.requestParams };
    }
  }

  build(): RequestParams<unknown> {
    return this.requestParams;
  }

  limit(limit: number): DeltaSyncParams<RN> {
    this.requestParams['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): DeltaSyncParams<RN> {
    this.requestParams['_offset'] = String(offset);
    return this;
  }

  /**
   * Warning: since need to be in server timezone and needs to be formatted as yyyy-mm-dd hh:mm:ss
   * @param since
   */
  since(since: string): DeltaSyncParams<RN> {
    this.requestParams['_since'] = since;
    return this;
  }

  include(values: RN[]): DeltaSyncParams<RN> {
    this.requestParams['_include'] = values.join(',');
    return this;
  }

  resource<F extends RN>(resource: F, addFilter: (params: RequestParamsBuilder<Entity<F>>) => void): DeltaSyncParams<RN> {
    const params = new RequestParamsBuilder<Entity<F>>();
    addFilter(params);
    const includeParams = params.build();

    for (const [k, v] of Object.entries<string>(includeParams)) {
      this.requestParams[`${resource}__${k}`] = v;
    }
    return this;
  }

  get(param: string): string | undefined {
    return this.requestParams[param];
  }
}
