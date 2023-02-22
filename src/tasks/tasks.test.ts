import axios from 'axios';

import AxiosMockAdapter from 'axios-mock-adapter';
import { ConfigProvider } from '../utils';

import { TaskUpdate } from './types';
import { TasksEndpoint } from './index';

const mockResponseData = {
  tasks: [
    {
      id: 0,
      mother_id: 0,
      view_id: 'string',
      sort_order: 0,
      node_path: 'string',
      ultimate_mother_id: 0,
      name: 'string',
      is_done: true,
      view_order: 0,
      icon_name: 'string',
      initial_duration: 0,
      target_duration: 0,
      begin: '2019-08-24',
      deadline: '2019-08-24',
      object_type: 'string',
      notes: 'string',
      client_id: 0,
      t_iv_1: 'string',
      t_iv_2: 'string',
      t_iv_3: 'string',
      t_iv_4: 'string',
      t_iv_5: 'string',
      t_iv_6: 'string',
      approve_by_project_leader: true,
      is_blocked: true,
      is_hidden: true,
      restrict_tracking_from_to: true,
      duration: 0,
      is_startable: true,
      is_billable: true,
      is_nonworking: true,
      is_paid_non_working: true,
      internal_cost_per_hour: 0,
      revenue_per_hour: 0,
      skill_id: 0,
      priority: 0,
      is_favourite: true,
      jira_id: 0,
      name_path: 'string',
    },
  ],
  tasksFiltered: [
    {
      id: 0,
      mother_id: 0,
    },
  ],
};

const mockPayloadData: {
  tasks: TaskUpdate;
} = {
  tasks: {
    approve_by_project_leader: true,
    begin: '2023-12-21 11:11:11',
    client_id: 1,
    deadline: '2023-12-21 12:12:12',
    id: 1,
    internal_cost_per_hour: 12,
    is_blocked: false,
    is_done: true,
    is_favourite: false,
    is_paid_non_working: false,
    is_startable: false,
    mother_id: 1,
    name: 'test',
    notes: '',
    priority: 1,
    revenue_per_hour: 1,
    skill_id: 0,
    sort_order: 1,
    t_iv_1: '',
    t_iv_2: '',
    t_iv_3: '',
    t_iv_4: '',
    t_iv_5: '',
    t_iv_6: '',
    target_duration: 2,
    is_hidden: false,
    restrict_tracking_from_to: true,
    is_billable: true,
    is_nonworking: true,
  },
};

describe('TasksEndpoint', () => {
  const clients = new TasksEndpoint(new ConfigProvider({ account: 'testingAccount' }));
  const mock = new AxiosMockAdapter(axios);
  const updatePath = `${clients.getResourcePath()}/update`;
  afterEach(() => {
    mock.reset();
  });

  test('update', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: mockResponseData.tasks });
    const results = await clients.update(mockPayloadData.tasks);
    expect(results).toStrictEqual({
      Results: mockResponseData.tasks,
      Affected: {},
      Deleted: [],
    });
  });

  test('update with desired params', async () => {
    mock.onPut(updatePath).reply(200, { Success: true, NumResults: 1, Results: mockResponseData.tasks });
    const results = await clients.update(mockPayloadData.tasks, ['id', 'mother_id']);
    expect(results).toStrictEqual({
      Results: mockResponseData.tasksFiltered,
      Affected: {},
      Deleted: [],
    });
  });
});
