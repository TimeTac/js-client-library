import { DeltaSyncResults } from '../../deltaSync/types';
import { RequestParams } from './requestParams';

const DEFAULT_PAGE_SIZE = 1000;
export class DeltaSyncParams {
  protected requestParams: RequestParams<unknown> = {};

  build(): RequestParams<any> {
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
  /**
   * Warning: does not check if the resource fits the includeParams
   * Also there is no check if the resource is included in the deltaSyncParams
   */
  addIncludeParams<F extends keyof DeltaSyncResults & string>(resource: F, includeParams: RequestParams<unknown>): DeltaSyncParams {
    for (const [k, v] of Object.entries(includeParams)) {
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
