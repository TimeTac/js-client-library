import { RequestParams } from './requestParams';
import { ApiResponseOnSuccess } from '../response/apiResponse';

export class PagingParams<T extends Object> extends RequestParams<T> {
  private readonly valid: boolean;
  private readonly startTime: string;

  constructor(params: RequestParams<T> | PagingParams<T>, apiResponse: ApiResponseOnSuccess<T[]>) {
    super();
    this.criteria = params.getCriteria();

    let startTime = '';
    if (params instanceof RequestParams) {
      startTime = apiResponse.RequestStartTime;
    }

    if (params instanceof PagingParams) {
      startTime = params.startTime;
    }

    this.startTime = startTime;

    // If there this was the last page, the nextPageParams object is not valid and can not be used to make a request.
    // This logic can be improved if we create PagingParams via a factory.
    if (apiResponse.NumResults < this.getLimit()) {
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
