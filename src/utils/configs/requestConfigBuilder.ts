import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { RequestConfig } from './requestConfig';

const DEFAULT_PAGE_SIZE = 100;

// eslint-disable-next-line @typescript-eslint/ban-types
export class RequestConfigBuilder<R extends Object> {
  protected requestConfig: RequestConfig<R> = { params: {} };

  constructor(requestConfig?: RequestConfig<R>) {
    if (requestConfig) {
      this.requestConfig = requestConfig;
    }
  }

  static from<R>(params: RequestConfig<R>): RequestConfigBuilder<R> {
    return new RequestConfigBuilder<R>(cloneDeep(params));
  }

  build(clientRequestId?: string): RequestConfig<R> {
    return { ...cloneDeep(this.requestConfig), clientRequestId: clientRequestId ?? uuidv4() };
  }

  limit(limit: number): RequestConfigBuilder<R> {
    this.requestConfig.params['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): RequestConfigBuilder<R> {
    this.requestConfig.params['_offset'] = String(offset);
    return this;
  }

  fields<F extends keyof R & string>(values: F[]): RequestConfigBuilder<R> {
    this.requestConfig.params['_fields'] = values.join(',');
    return this;
  }

  eq<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'eq';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  neq<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'neq';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  gt<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'gt';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  gteq<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'gteq';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  lt<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'lt';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  lteq<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'lteq';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  like<F extends keyof R & string>(field: F, value: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'like';
    this.requestConfig.params[field] = String(value);
    return this;
  }

  in<F extends keyof R & string>(field: F, values: Array<R[F]>): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'in';
    this.requestConfig.params[field] = values.join('|');
    return this;
  }

  nin<F extends keyof R & string>(field: F, values: Array<R[F]>): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'nin';
    this.requestConfig.params[field] = values.join('|');
    return this;
  }

  between<F extends keyof R & string>(field: F, min: R[F], max: R[F]): RequestConfigBuilder<R> {
    this.requestConfig.params[`_op__${field}`] = 'betw';
    this.requestConfig.params[field] = [min, max].join('|');
    return this;
  }

  orderBy<F extends keyof R & string>(field: F, order: 'asc' | 'desc'): RequestConfigBuilder<R> {
    this.requestConfig.params[`_order_by`] = field;
    this.requestConfig.params[`_order_desc`] = order === 'desc' ? 'true' : 'false';
    return this;
  }

  groupBy<F extends keyof R & string>(fields: F[]): RequestConfigBuilder<R> {
    this.requestConfig.params['_group_by'] = fields.join('|');
    return this;
  }

  aggregate<F extends keyof R & string>(field: F, func: 'sum' | 'avg' | 'max' | 'min' | 'count' | 'group_concat'): RequestConfigBuilder<R> {
    this.requestConfig.params[`_aggregate__${field}`] = func;
    return this;
  }

  getLimit(): number {
    return this.requestConfig.params['_limit'] ? Number(this.requestConfig.params['_limit']) : DEFAULT_PAGE_SIZE;
  }

  getOffset(): number {
    return this.requestConfig.params['_offset'] ? Number(this.requestConfig.params['_offset']) : 0;
  }
}
