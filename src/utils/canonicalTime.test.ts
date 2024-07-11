import { callCanonicalTimeUpdater } from './canonicalTime';

describe('callCanonicalTimeUpdater', () => {
  it('calls canonicalTimeUpdater with correct arguments when data has ServerTimeZone and RequestEndTime', () => {
    const mockCanonicalTimeUpdater = jest.fn();

    const data = {
      RequestEndTime: '2024-07-08T11:59:58Z',
      ServerTimeZone: 'Europe/Berlin',
    };

    callCanonicalTimeUpdater(data, mockCanonicalTimeUpdater);

    expect(mockCanonicalTimeUpdater).toHaveBeenCalledTimes(1);

    expect(mockCanonicalTimeUpdater).toHaveBeenCalledWith(data.ServerTimeZone, data.RequestEndTime);
  });

  it('calls canonicalTimeUpdater with default timeZone Europe/Vienna when data is missing ServerTimeZone', () => {
    const mockCanonicalTimeUpdater = jest.fn();

    const data = {
      RequestEndTime: '2024-07-08T11:59:58Z',
    };

    callCanonicalTimeUpdater(data, mockCanonicalTimeUpdater);

    expect(mockCanonicalTimeUpdater).toHaveBeenCalledTimes(1);

    expect(mockCanonicalTimeUpdater).toHaveBeenCalledWith('Europe/Vienna', data.RequestEndTime);
  });

  it('does not call canonicalTimeUpdater when data is missing RequestEndTime', () => {
    const mockCanonicalTimeUpdater = jest.fn();

    const data = {
      ServerTimeZone: 'Europe/Berlin',
    };

    callCanonicalTimeUpdater(data, mockCanonicalTimeUpdater);

    expect(mockCanonicalTimeUpdater).not.toHaveBeenCalled();
  });

  it('does not call canonicalTimeUpdater when data is undefined', () => {
    const mockCanonicalTimeUpdater = jest.fn();

    callCanonicalTimeUpdater(undefined, mockCanonicalTimeUpdater);

    expect(mockCanonicalTimeUpdater).not.toHaveBeenCalled();
  });

  it('does not call canonicalTimeUpdater when canonicalTimeUpdater is undefined', () => {
    callCanonicalTimeUpdater({ RequestEndTime: '2024-07-08T11:59:58Z', ServerTimeZone: 'Europe/Berlin' }, undefined);
  });
});
