import Absences from './index';
import { Absence, AbsenceApprove, AbsenceCancel, AbsenceCreate, AbsenceReject, AbsenceUpdate } from './types';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { successfulResponse } from '../test/utils/successfulResponse';

describe('Absences', () => {
  const absences = new Absences({});

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
    await absences.read().catch((result) => expect(result).toStrictEqual({ Success: false }));
  });

  test('read with status code 500', async () => {
    mock.onGet(readPath).reply(500);
    expect.assertions(1);
    await absences.read().catch((err) => expect(err.message).toMatch('Request failed with status code 500'));
  });

  test('readById', async () => {
    mock.onGet(`${readPath}/1`).reply(200, { Success: true, NumResults: 1, Results: [{}] });
    const result: Absence = await absences.readById(1);
    expect(result).toStrictEqual({});
  });

  test('create', async () => {
    const absence: AbsenceCreate = { user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    mock.onPost(createPath).reply(...successfulResponse(absence));
    const result: Absence = await absences.create(absence);
    expect(result).toStrictEqual(absence);
  });

  test('update', async () => {
    const absence = { id: 1, user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    const absenceUpdate: AbsenceUpdate = { id: 7, to_date: '05-01-2020' };
    mock.onPut(updatePath).reply(...successfulResponse(absence));
    expect(await absences.update(absenceUpdate)).toStrictEqual(absence);
  });

  test('delete', async () => {
    const absence = { id: 2, user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    mock.onDelete(`${deletePath}/2`).reply(...successfulResponse(absence));
    const result: Absence = await absences.delete(2);
    expect(result).toStrictEqual(absence);
  });

  test('approve', async () => {
    const absence = { id: 3, user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    const absenceApprove: AbsenceApprove = { id: 3 };
    mock.onPut(approvePath).reply(...successfulResponse(absence));
    const result: Absence = await absences.approve(absenceApprove);
    expect(result).toStrictEqual(absence);
  });

  test('reject', async () => {
    const absence = { id: 4, user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    const absenceReject: AbsenceReject = { id: 4, granted_comment: 'reasons' };
    mock.onPut(rejectPath).reply(...successfulResponse(absence));
    const result: Absence = await absences.reject(absenceReject);
    expect(result).toStrictEqual(absence);
  });

  test('cancel', async () => {
    const absence = { id: 5, user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    const absenceCancel: AbsenceCancel = { id: 5 };
    mock.onPut(cancelPath).reply(...successfulResponse(absence));
    const result: Absence = await absences.cancel(absenceCancel);
    expect(result).toStrictEqual(absence);
  });

  test('validate', async () => {
    const absence: AbsenceCreate = { user_id: 1, from_date: '01-01-2020', to_date: '03-01-2020', type_id: 2, subtype_id: 3 };
    mock.onPost(validatePath).reply(...successfulResponse(absence));
    const result: Absence = await absences.validate(absence);
    expect(result).toStrictEqual(absence);
  });
});
