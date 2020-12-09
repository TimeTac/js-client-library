import FavouriteTasksEndpoint from './index';
import { FavouriteTask } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('FavouriteTasks', () => {
  var favouriteTasksEndpoint: FavouriteTasksEndpoint = new FavouriteTasksEndpoint({});
  var readPath: string = `${favouriteTasksEndpoint.getResourcePath()}/read`;
  var createPath: string = `${favouriteTasksEndpoint.getResourcePath()}/create`;
  var deletePath: string = `${favouriteTasksEndpoint.getResourcePath()}/delete`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<FavouriteTask[]> | null;
  var resultSingle: Promise<FavouriteTask> | null;
  var resultRaw: Promise<ApiResponseOnSuccess<FavouriteTask[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
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

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1 }] });
    resultSingle = favouriteTasksEndpoint.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({ id: 1 }));
  });

  test('create', async () => {
    const checkData = { id: 1, node_id: 2, user_id: 3 };
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: [checkData] });
    resultSingle = favouriteTasksEndpoint.create({ node_id: 2, user_id: 3 });
    await resultSingle.then((result) => expect(result).toStrictEqual(checkData));
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = favouriteTasksEndpoint.delete(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
