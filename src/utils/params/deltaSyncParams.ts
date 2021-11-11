import { DeltaSyncResults } from '../../deltaSync/types';
import { Entity } from '../response/apiResponse';
import { RequestParams, RequestParamsBuilder } from './requestParams';

const DEFAULT_PAGE_SIZE = 1000;
export class DeltaSyncParams {
  protected requestParams: RequestParams<unknown> = {};

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

  include<F extends keyof DeltaSyncResults & string>(values: F[]): DeltaSyncParams {
    this.requestParams['_include'] = values.join(',');
    return this;
  }

  resource<F extends keyof DeltaSyncResults & string>(
    resource: F,
    addFilter: (params: RequestParamsBuilder<Entity<F>>) => void
  ): DeltaSyncParams {
    const params = new RequestParamsBuilder<Entity<F>>();
    addFilter(params);
    const includeParams = params.build();

    for (const [k, v] of Object.entries<string>(includeParams)) {
      this.requestParams[`${resource}__${k}`] = v;
    }
    return this;
  }

  getLimit(): number {
    return this.requestParams['_limit'] ? Number(this.requestParams['_limit']) : DEFAULT_PAGE_SIZE;
  }

  getOffset(): number {
    return this.requestParams['_offset'] ? Number(this.requestParams['_offset']) : 0;
  }
}
