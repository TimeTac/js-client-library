import { RequestParams } from './requestParams';
import { Response } from '../response/response';

export class PagingParams<T extends Object> extends RequestParams<T> {
  private readonly valid: boolean;
  private readonly startTime?: string;

  constructor(params: RequestParams<T> | PagingParams<T>, result: Response<T>) {
    super();
    this.criteria = params.getCriteria();

    if (params instanceof RequestParams) {
      this.startTime = result.startTime;
    }
    if (params instanceof PagingParams) {
      this.startTime = params.startTime;
    }

    if (result.results.length < this.getLimit()) {
      this.valid = false;
    } else {
      this.valid = true;
      this.offset(this.getOffset() + this.getLimit());
    }
  }

  getCriteria(): { [index: string]: string } {
    return this.criteria;
  }

  getParams() {
    if (!this.isValid()) {
      throw new Error('Call with invalid params');
    }
    return super.getParams();
  }

  isValid(): boolean {
    return this.valid;
  }
}
