import TodoTasksEndpoint from './index';
import { TodoTask } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiResponseOnSuccess } from '../utils/response/apiResponse';

describe('TodoTasks', () => {
  var todoTasksEndpoint: TodoTasksEndpoint = new TodoTasksEndpoint({});
  var readPath: string = `${todoTasksEndpoint.getResourcePath()}/read`;
  var createPath: string = `${todoTasksEndpoint.getResourcePath()}/create`;
  var deletePath: string = `${todoTasksEndpoint.getResourcePath()}/delete`;
  var mock = new AxiosMockAdapter(axios);
  var result: Promise<TodoTask[]> | null;
  var resultSingle: Promise<TodoTask> | null;
  var resultRaw: Promise<ApiResponseOnSuccess<TodoTask[]>> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
    resultRaw = null;
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    result = todoTasksEndpoint.read();
    await result.then((result) => expect(result).toStrictEqual([{}]));
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    result = todoTasksEndpoint.read();
    await result.catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await todoTasksEndpoint.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1 }] });
    resultSingle = todoTasksEndpoint.readById(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({ id: 1 }));
  });

  test('create', async () => {
    const data = { id: 1, node_id: 2, user_id: 3 };
    mock.onPost(createPath).reply(200, { Success: true, NumResults: 1, Results: [data] });
    resultSingle = todoTasksEndpoint.create({ node_id: 2, user_id: 3 });
    await resultSingle.then((result) => expect(result).toStrictEqual(data));
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = todoTasksEndpoint.delete(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
