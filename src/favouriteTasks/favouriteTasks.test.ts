import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { RequestParamsBuilder } from '../utils/params/requestParams';
import { FavouriteTasksEndpoint } from './index';
import { FavouriteTask } from './types';

describe('FavouriteTasks', () => {
  const favouriteTasksEndpoint: FavouriteTasksEndpoint = new FavouriteTasksEndpoint({ account: 'testingAccount' });
  const readPath: string = `${favouriteTasksEndpoint.getResourcePath()}/read`;
  const createPath: string = `${favouriteTasksEndpoint.getResourcePath()}/create`;
  const deletePath: string = `${favouriteTasksEndpoint.getResourcePath()}/delete`;

  const mock = new AxiosMockAdapter(axios);
  let result: Promise<FavouriteTask[]> | null;
  let resultSingle: Promise<FavouriteTask> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = favouriteTasksEndpoint.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = favouriteTasksEndpoint.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await favouriteTasksEndpoint.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { id: 1 }).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1, node_id: 2, user_id: 3 }] });

    result = favouriteTasksEndpoint.read(new RequestParamsBuilder<FavouriteTask>().eq('id', 1).build());
    await result.then((result) => expect(result).toStrictEqual([{ id: 1, node_id: 2, user_id: 3 }]));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1 }] });
    resultSingle = favouriteTasksEndpoint.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({ id: 1 }));
  });

  test('create', async () => {
    const results = { id: 1, node_id: 2, user_id: 3 };
    const data = { node_id: 2, user_id: 3 };

    mock.onPost(createPath, data).reply(200, { Success: true, NumResults: 1, Results: [results] });
    resultSingle = favouriteTasksEndpoint.create({ node_id: 2, user_id: 3 });

    await resultSingle.then((result) => expect(result).toStrictEqual(results));
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = favouriteTasksEndpoint.delete(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
