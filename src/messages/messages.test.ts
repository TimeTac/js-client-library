import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { ConfigProvider } from '../utils';
import { RequestParamsBuilder } from '../utils/params/requestParams';
import { MessagesEndpoint } from './index';
import { Message } from './types';

describe('messages', () => {
  const messages: MessagesEndpoint = new MessagesEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const readPath = `${messages.getResourcePath()}/read`;
  const createPath = `${messages.getResourcePath()}/create`;
  const updatePath = `${messages.getResourcePath()}/update`;
  const deletePath = `${messages.getResourcePath()}/delete`;
  const mock = new AxiosMockAdapter(axios);
  let result: Promise<Message[]> | null;

  afterEach(() => {
    mock.reset();
    result = null;
  });

  test('read', async () => {
    const aParams = { id: 1, message: 'Lorem ipsum', sender_id: 99 };
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [aParams] });
    const result = await messages.read();
    expect(result).toStrictEqual([aParams]);
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { params: { id: '99', _op__id: 'eq' } }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = messages.read(new RequestParamsBuilder<Message>().eq('id', 99).build());
    await result.then((result) => {
      expect(result).toStrictEqual([{}]);
    });
  });

  test('readById', async () => {
    const aParams = { id: 1, message: 'Lorem ipsum', sender_id: 99 };

    mock.onGet(`${readPath}/${aParams['id']}`).reply(200, { Success: true, NumResults: 1, Results: [aParams] });
    const result = await messages.readById(aParams['id']);
    expect(result).toStrictEqual(aParams);
  });

  test('create', async () => {
    const aParams = { sender_id: 1, message: 'Lorem ipsum', receiver_id: 99 };
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: [aParams] });
    const result = await messages.create(aParams);
    expect(result).toStrictEqual(aParams);
  });

  test('update', async () => {
    const aParams = { id: 1, message: 'Lorem ipsum', receiver_id: 80 };
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: [aParams] });
    const result = await messages.update(aParams);
    expect(result).toStrictEqual(aParams);
  });

  test('delete', async () => {
    const aParams = { id: 99 };
    mock.onDelete(`${deletePath}/${aParams['id']}`).reply(200, { Success: true, NumResults: 1, Results: [aParams] });
    const result = await messages.delete(aParams['id']);
    expect(result).toStrictEqual(aParams);
  });
});
