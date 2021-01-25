const DEFAULT_PAGE_SIZE = 1000;

// TODO add unit tests
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

  since(since: string): DeltaSyncParams {
    // TODO add if string is valid
    this.criteria['_since'] = String(since);
    return this;
  }

  // TODO Refactor this function
  // get the values from the deltaSyncResult or get it via the RequestParams that we need to implement later
  includes(values: string[]): DeltaSyncParams {
    this.criteria['_includes'] = values.join(',');
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
