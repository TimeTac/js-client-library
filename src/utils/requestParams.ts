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

  fields(...values: string[]): RequestParams<R> {
    this.criteria['_fields'] = values.join(',');
    return this;
  }

  eq<F extends keyof R>(field: F, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'eq';
    this.criteria[String(field)] = value;
    return this;
  }

  gt(field: string, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'gt';
    this.criteria[field] = value;
    return this;
  }

  gteq(field: string, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'gteq';
    this.criteria[field] = value;
    return this;
  }

  lt(field: string, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'lt';
    this.criteria[field] = value;
    return this;
  }

  lteq(field: string, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'lteq';
    this.criteria[field] = value;
    return this;
  }

  like(field: string, value: string): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'like';
    this.criteria[field] = value;
    return this;
  }

  in(field: string, ...values: string[]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'in';
    this.criteria[field] = values.join('|');
    return this;
  }

  between(field: string, ...values: string[]): RequestParams<R> {
    this.criteria[`_op__${field}`] = 'betw';
    this.criteria[field] = values.join('|');
    return this;
  }

  orderBy(field: string, descending = false): RequestParams<R> {
    this.criteria[`_order_by`] = field;
    if (descending) {
      this.criteria[`_order_desc`] = 'true';
    }
    return this;
  }

  groupBy(...fields: string[]): RequestParams<R> {
    this.criteria['_group_by'] = fields.join('|');
    return this;
  }

  aggregate(field: string, func: 'sum' | 'avg' | 'max' | 'min' | 'count' | 'group_concat'): RequestParams<R> {
    this.criteria[`_aggregate__${field}`] = func;
    return this;
  }

  getParams() {
    return this.criteria;
  }
}
