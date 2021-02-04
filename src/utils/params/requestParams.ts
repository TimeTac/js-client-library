const DEFAULT_PAGE_SIZE = 100;

export class RequestParams<R extends Object> {
  protected criteria: { [index: string]: string } = {};

  limit(limit: number): RequestParams<R> {
    this.criteria['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): RequestParams<R> {
    this.criteria['_offset'] = String(offset);
    return this;
  }

  fields<F extends keyof R & string>(values: F[]): RequestParams<R> {
    this.criteria['_fields'] = values.join(',');
    return this;
  }

  eq<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'eq';
    this.criteria[field] = String(value);
    return this;
  }

  neq<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'neq';
    this.criteria[field] = String(value);
    return this;
  }

  gt<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'gt';
    this.criteria[field] = String(value);
    return this;
  }

  gteq<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'gteq';
    this.criteria[field] = String(value);
    return this;
  }

  lt<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'lt';
    this.criteria[field] = String(value);
    return this;
  }

  lteq<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'lteq';
    this.criteria[field] = String(value);
    return this;
  }

  like<F extends keyof R & string>(field: F, value: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'like';
    this.criteria[field] = String(value);
    return this;
  }

  in<F extends keyof R & string>(field: F, values: Array<R[F]>): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'in';
    this.criteria[field] = values.join('|');
    return this;
  }

  nin<F extends keyof R & string>(field: F, values: Array<R[F]>): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'nin';
    this.criteria[field] = values.join('|');
    return this;
  }

  between<F extends keyof R & string>(field: F, min: R[F], max: R[F]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'betw';
    this.criteria[field] = [min, max].join('|');
    return this;
  }

  orderBy<F extends keyof R & string>(field: F, order: 'asc' | 'desc'): RequestParams<R> {
    this.criteria[`_order_by`] = field;
    this.criteria[`_order_desc`] = order === 'desc' ? 'true' : 'false';
    return this;
  }

  groupBy<F extends keyof R & string>(fields: F[]): RequestParams<R> {
    this.criteria['_group_by'] = fields.join('|');
    return this;
  }

  aggregate<F extends keyof R & string>(field: F, func: 'sum' | 'avg' | 'max' | 'min' | 'count' | 'group_concat'): RequestParams<R> {
    this.criteria[`_aggregate__${field}`] = func;
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

  clone(source: RequestParams<R>) {
    Object.assign(this.criteria, source.getCriteria());
    return this;
  }
}
