import TodoTasksEndpoint from './index';
import { TodoTask } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import RequestParams from '../utils/requestParams/requestParams';

describe('TodoTasks', () => {
  const todoTasksEndpoint: TodoTasksEndpoint = new TodoTasksEndpoint({ account: 'testingAccount' });
  const readPath: string = `${todoTasksEndpoint.getResourcePath()}/read`;
  const createPath: string = `${todoTasksEndpoint.getResourcePath()}/create`;
  const deletePath: string = `${todoTasksEndpoint.getResourcePath()}/delete`;
  const mock = new AxiosMockAdapter(axios);

  let result: Promise<TodoTask[]> | null;
  let resultSingle: Promise<TodoTask> | null;

  afterEach(() => {
    mock.reset();
    result = null;
    resultSingle = null;
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

  test('read with RequestParmas', async () => {
    mock.onGet(readPath, { id: 1 }).reply(200, { Success: true, NumResults: 1, Results: [{ id: 1, node_id: 2, user_id: 3 }] });

    result = todoTasksEndpoint.read(new RequestParams<TodoTask>().eq('id', 1));
    await result.then((result) => expect(result).toStrictEqual([{ id: 1, node_id: 2, user_id: 3 }]));
  });

  test('create', async () => {
    const results = { id: 1, node_id: 2, user_id: 3 };
    const data = { node_id: 2, user_id: 3 };

    mock.onPost(createPath, data).reply(200, { Success: true, NumResults: 1, Results: [results] });
    resultSingle = todoTasksEndpoint.create({ node_id: 2, user_id: 3 });

    await resultSingle.then((result) => expect(result).toStrictEqual(results));
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    resultSingle = todoTasksEndpoint.delete(1);
    await resultSingle.then((result) => expect(result).toStrictEqual({}));
  });
});
