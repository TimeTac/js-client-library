export default class RequestParams<R extends Object> {
  private criteria: { [index: string]: string } = {};

  limit(limit: number): RequestParams<R> {
    this.criteria['_limit'] = String(limit);
    return this;
  }

  offset(offset: number): RequestParams<R> {
    this.criteria['_offset'] = String(offset);
    return this;
  }

  fields<F extends keyof R & string>(...values: F[]): RequestParams<R> {
    this.criteria['_fields'] = values.join(',');
    return this;
  }

  eq<F extends keyof R & string>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'eq';
    this.criteria[field] = value;
    return this;
  }

  gt<F extends keyof R & string>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'gt';
    this.criteria[field] = value;
    return this;
  }

  gteq<F extends keyof R & string>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'gteq';
    this.criteria[field] = value;
    return this;
  }

  lt<F extends keyof R & string>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'lt';
    this.criteria[field] = value;
    return this;
  }

  lteq<F extends keyof R & string>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'lteq';
    this.criteria[field] = value;
    return this;
  }

  like<F extends keyof R & string>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'like';
    this.criteria[field] = value;
    return this;
  }

  in<F extends keyof R & string>(field: F, ...values: string[]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'in';
    this.criteria[field] = values.join('|');
    return this;
  }

  between<F extends keyof R & string>(field: F, min: String, max: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'betw';
    this.criteria[field] = [min, max].join('|');
    return this;
  }

  orderBy<F extends keyof R & string>(field: F, descending = false): RequestParams<R> {
    this.criteria[`_order_by`] = field;
    if (descending) {
      this.criteria[`_order_desc`] = 'true';
    }
    return this;
  }

  groupBy<F extends keyof R & string>(...fields: F[]): RequestParams<R> {
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
}
