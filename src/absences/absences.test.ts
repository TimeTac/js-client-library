import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { AbsencesEndpoint } from './index';
import { Absence, AbsenceApprove, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';

describe('Absences', () => {
  const absences = new AbsencesEndpoint({ account: 'testingAccount' });

  const readPath = `${absences.getResourcePath()}/read`;
  const createPath = `${absences.getResourcePath()}/create`;
  const updatePath = `${absences.getResourcePath()}/update`;
  const deletePath = `${absences.getResourcePath()}/delete`;
  const approvePath = `${absences.getResourcePath()}/approve`;
  const rejectPath = `${absences.getResourcePath()}/reject`;
  const cancelPath = `${absences.getResourcePath()}/cancel`;
  const validatePath = `${absences.getResourcePath()}/validate`;

  const mock = new AxiosMockAdapter(axios);

  afterEach(() => {
    mock.reset();
  });

  test('read', async () => {
    mock.onGet(readPath).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence[] = await absences.read();
    expect(result).toStrictEqual([{}]);
  });

  test('read with Success false', async () => {
    mock.onGet(readPath).reply(200, { Success: false });
    await absences.read().catch((result) => { expect(result).toStrictEqual({ Success: false }); });
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await absences.read().catch((err) => { expect(err.message).toMatch('Request failed with status code 500'); });
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.readById(1);
    expect(result).toStrictEqual({});
  });

  test('create', async () => {
    const absenceCreate: AbsenceCreate = { user_id: 1, from_date: '2020-01-01', to_date: '2020-01-02', type_id: 1, subtype_id: 0 };
    mock.onPost(createPath, absenceCreate).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.create(absenceCreate);
    expect(result).toStrictEqual({});
  });

  test('update', async () => {
    const absenceUpdate: AbsenceUpdate = { id: 7, to_date: '2020-01-01' };
    mock.onPut(updatePath, absenceUpdate).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    expect(await absences.update(absenceUpdate)).toStrictEqual({});
  });

  test('delete', async () => {
    mock.onDelete(`${deletePath}/2`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.delete(2);
    expect(result).toStrictEqual({});
  });

  test('approve', async () => {
    const absenceApprove: AbsenceApprove = { id: 3 };
    mock.onPut(approvePath, absenceApprove).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.approve(absenceApprove);
    expect(result).toStrictEqual({});
  });

  test('reject', async () => {
    const absenceReject: AbsenceReject = { id: 4, granted_comment: 'reasons' };
    mock.onPut(rejectPath, absenceReject).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.reject(absenceReject);
    expect(result).toStrictEqual({});
  });

  test('cancel', async () => {
    mock.onPut(cancelPath, { id: 5 }).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.cancel(5);
    expect(result).toStrictEqual({});
  });

  test('validate', async () => {
    const absenceCreate: AbsenceCreate = { user_id: 1, from_date: '2020-01-01', to_date: '2020-01-02', type_id: 2, subtype_id: 0 };
    mock.onPost(validatePath, absenceCreate).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.validate(absenceCreate);
    expect(result).toStrictEqual({});
  });
});
