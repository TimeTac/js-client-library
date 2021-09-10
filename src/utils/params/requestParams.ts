const DEFAULT_PAGE_SIZE = 100;

// This is the serializable RequestParam data that can be passer around in Redux actions (the builder can't).
// _type is unused, was added only to preserve the generic type for type checking
export type RequestParams<R> = Record<string, string> & { _type?: R };

type NestedParams = { [key: string]: undefined | Array<NestedParams> };

// eslint-disable-next-line @typescript-eslint/ban-types
export class RequestParamsBuilder<R extends Object> {
  protected requestParams: RequestParams<R> = {};

  constructor(requestParams?: RequestParams<R>) {
    if (requestParams) {
      this.requestParams = requestParams;
    }
  }

  limit(limit: number): RequestParamsBuilder<R> {
    this.requestParams['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): RequestParamsBuilder<R> {
    this.requestParams['_offset'] = String(offset);
    return this;
  }

  fields<F extends keyof R & string>(values: F[]): RequestParamsBuilder<R> {
    this.requestParams['_fields'] = values.join(',');
    return this;
  }

  eq<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'eq';
    this.requestParams[field] = String(value);
    return this;
  }

  neq<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'neq';
    this.requestParams[field] = String(value);
    return this;
  }

  gt<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'gt';
    this.requestParams[field] = String(value);
    return this;
  }

  gteq<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'gteq';
    this.requestParams[field] = String(value);
    return this;
  }

  lt<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'lt';
    this.requestParams[field] = String(value);
    return this;
  }

  lteq<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'lteq';
    this.requestParams[field] = String(value);
    return this;
  }

  like<F extends keyof R & string>(field: F, value: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'like';
    this.requestParams[field] = String(value);
    return this;
  }

  in<F extends keyof R & string>(field: F, values: Array<R[F]>): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'in';
    this.requestParams[field] = values.join('|');
    return this;
  }

  nin<F extends keyof R & string>(field: F, values: Array<R[F]>): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'nin';
    this.requestParams[field] = values.join('|');
    return this;
  }

  between<F extends keyof R & string>(field: F, min: R[F], max: R[F]): RequestParamsBuilder<R> {
    this.requestParams[`_op__${field}`] = 'betw';
    this.requestParams[field] = [min, max].join('|');
    return this;
  }

  orderBy<F extends keyof R & string>(field: F, order: 'asc' | 'desc'): RequestParamsBuilder<R> {
    this.requestParams[`_order_by`] = field;
    this.requestParams[`_order_desc`] = order === 'desc' ? 'true' : 'false';
    return this;
  }

  groupBy<F extends keyof R & string>(fields: F[]): RequestParamsBuilder<R> {
    this.requestParams['_group_by'] = fields.join('|');
    return this;
  }

  aggregate<F extends keyof R & string>(field: F, func: 'sum' | 'avg' | 'max' | 'min' | 'count' | 'group_concat'): RequestParamsBuilder<R> {
    this.requestParams[`_aggregate__${field}`] = func;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  build() {
    return this.requestParams;
  }

  getLimit(): number {
    return this.requestParams['_limit'] ? Number(this.requestParams['_limit']) : DEFAULT_PAGE_SIZE;
  }

  getOffset(): number {
    return this.requestParams['_offset'] ? Number(this.requestParams['_offset']) : 0;
  }

  nestedEntities(nestedParams: NestedParams): RequestParamsBuilder<R> {
    this.requestParams['nestedEntities'] = JSON.stringify(nestedParams);
    return this;
  }
}
