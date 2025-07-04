import { Entity, ResourceNames } from '../response/apiResponse';
import { RequestParams, RequestParamsBuilder } from './requestParams';

export class DeltaSyncParams {
  protected requestParams: RequestParams<unknown> = {};

  constructor(params?: DeltaSyncParams) {
    if (params) {
      this.requestParams = { ...params.requestParams };
    }
  }

  build(): RequestParams<unknown> {
    return this.requestParams;
  }

  limit(limit: number): DeltaSyncParams {
    this.requestParams['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): DeltaSyncParams {
    this.requestParams['_offset'] = String(offset);
    return this;
  }

  /**
   * Warning: since need to be in server timezone and needs to be format as yyyy-mm-dd hh:mm:ss
   * @param since
   */
  since(since: string): DeltaSyncParams {
    this.requestParams['_since'] = since;
    return this;
  }

  include(values: ResourceNames[]): DeltaSyncParams {
    this.requestParams['_include'] = values.join(',');
    return this;
  }

  includeWithCustomFields<T>(values: T[]): DeltaSyncParams {
    this.requestParams['_include'] = values.join(',');
    return this;
  }

  resource<F extends ResourceNames>(resource: F, addFilter: (params: RequestParamsBuilder<Entity<F>>) => void): DeltaSyncParams {
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
