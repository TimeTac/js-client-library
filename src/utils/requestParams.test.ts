import RequestParams from './requestParams';

describe('RequestParams', () => {
  type Resource = {
    id: number;
    user_id: number;
    status: number;
    comment: string;
    begin: string;
    updated: string;
  };

  test('empty', () => {
    const requestParams = new RequestParams<Resource>();
    expect(requestParams.getParams()).toStrictEqual({});
  });

  test('single eq', () => {
    const requestParams = new RequestParams<Resource>().eq('id', '1');
    expect(requestParams.getParams()).toStrictEqual({ id: '1', _op__id: 'eq' });
  });

  test('double eq', () => {
    const requestParams = new RequestParams<Resource>().eq('id', '1').eq('user_id', '2');
    expect(requestParams.getParams()).toStrictEqual({ id: '1', _op__id: 'eq', user_id: '2', _op__user_id: 'eq' });
  });

  test('limit', () => {
    const requestParams = new RequestParams<Resource>().limit(500);
    expect(requestParams.getParams()).toStrictEqual({ _limit: '500' });
  });

  test('offset', () => {
    const requestParams = new RequestParams<Resource>().offset(500);
    expect(requestParams.getParams()).toStrictEqual({ _offset: '500' });
  });

  test('between', () => {
    const requestParams = new RequestParams<Resource>().between('status', '1', '3');
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'betw', status: '1|3' });
  });

  test('gt', () => {
    const requestParams = new RequestParams<Resource>().gt('status', '1');
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'gt', status: '1' });
  });

  test('gteq', () => {
    const requestParams = new RequestParams<Resource>().gteq('status', '1');
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'gteq', status: '1' });
  });

  test('lt', () => {
    const requestParams = new RequestParams<Resource>().lt('status', '5');
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'lt', status: '5' });
  });

  test('lteq', () => {
    const requestParams = new RequestParams<Resource>().lteq('status', '5');
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'lteq', status: '5' });
  });

  test('in', () => {
    const requestParams = new RequestParams<Resource>().in('status', '5', '3');
    expect(requestParams.getParams()).toStrictEqual({ _op__status: 'in', status: '5|3' });
  });

  test('in', () => {
    const requestParams = new RequestParams<Resource>().fields('status');
    expect(requestParams.getParams()).toStrictEqual({ _fields: 'status' });
  });
});
