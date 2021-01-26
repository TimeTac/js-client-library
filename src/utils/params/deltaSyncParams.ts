import { DeltaSyncResults } from '../../deltaSync/types';

const DEFAULT_PAGE_SIZE = 1000;

export class DeltaSyncParams {
  protected criteria: { [index: string]: string } = {};

  limit(limit: number): DeltaSyncParams {
    this.criteria['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): DeltaSyncParams {
    this.criteria['_offset'] = String(offset);
    return this;
  }

  /**
   * Warning: since need to be in server timezone and needs to be format as yyyy-mm-dd hh:mm:ss
   * @param since
   */
  since(since: string): DeltaSyncParams {
    this.criteria['_since'] = String(since);
    return this;
  }

  include<F extends keyof DeltaSyncResults & string>(values: F[]): DeltaSyncParams {
    this.criteria['_include'] = values.join(',');
    return this;
  }

  getParams() {
    return this.criteria;
  }

  getLimit(): number {
    return this.criteria['_limit'] ? Number(this.criteria['_limit']) : DEFAULT_PAGE_SIZE;
  }

  getOffset(): number {
    return this.criteria['_offset'] ? Number(this.criteria['_offset']) : 0;
  }

  getCriteria(): { [index: string]: string } {
    return this.criteria;
  }
}
