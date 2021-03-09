import { DeltaSyncResults } from '../../deltaSync/types';
import { DeltaSyncRequestConfig } from './deltaSyncRequestConfig';
import { RequestConfig } from './requestConfig';

const DEFAULT_PAGE_SIZE = 1000;

export class DeltaSyncConfigBuilder {
  protected requestConfig: DeltaSyncRequestConfig = { params: {} };

  build(): DeltaSyncRequestConfig {
    return this.requestConfig;
  }

  limit(limit: number): DeltaSyncConfigBuilder {
    this.requestConfig.params['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): DeltaSyncConfigBuilder {
    this.requestConfig.params['_offset'] = String(offset);
    return this;
  }

  /**
   * Warning: since need to be in server timezone and needs to be format as yyyy-mm-dd hh:mm:ss
   * @param since
   */
  since(since: string): DeltaSyncConfigBuilder {
    this.requestConfig.params['_since'] = since;
    return this;
  }

  include<F extends keyof DeltaSyncResults & string>(values: F[]): DeltaSyncConfigBuilder {
    this.requestConfig.params['_include'] = values.join(',');
    return this;
  }
  /**
   * Warning: does not check if the resource fits the includeParams
   * Also there is no check if the resource is included in the deltaSyncParams
   */
  addIncludeParams<F extends keyof DeltaSyncResults & string>(resource: F, includeParams: RequestConfig<unknown>): DeltaSyncConfigBuilder {
    for (const [k, v] of Object.entries(includeParams.params)) {
      this.requestConfig.params[`${resource}__${k}`] = v;
    }
    return this;
  }

  getLimit(): number {
    return this.requestConfig.params['_limit'] ? Number(this.requestConfig.params['_limit']) : DEFAULT_PAGE_SIZE;
  }

  getOffset(): number {
    return this.requestConfig.params['_offset'] ? Number(this.requestConfig.params['_offset']) : 0;
  }
}
