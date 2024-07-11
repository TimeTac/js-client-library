import { callCanonicalTimeUpdater } from './canonicalTime';

describe('callCanonicalTimeUpdater', () => {
  it('calls canonicalTimeUpdater with correct arguments when data has ServerTimeZone and RequestEndTime', () => {
    // Mock function for canonicalTimeUpdater
    const mockCanonicalTimeUpdater = jest.fn();

    // Mock data with ServerTimeZone and RequestEndTime
    const data = {
      RequestEndTime: '2024-07-08T11:59:58Z',
      ServerTimeZone: 'Europe/Berlin',
    };

    // Call the function under test
    callCanonicalTimeUpdater(data, mockCanonicalTimeUpdater);

    // Assert that canonicalTimeUpdater was called exactly once
    expect(mockCanonicalTimeUpdater).toHaveBeenCalledTimes(1);

    // Assert that canonicalTimeUpdater was called with the correct arguments
    expect(mockCanonicalTimeUpdater).toHaveBeenCalledWith(data.ServerTimeZone, data.RequestEndTime);
  });

  it('calls canonicalTimeUpdater with default timeZone Europe/Vienna when data is missing ServerTimeZone', () => {
    // Mock function for canonicalTimeUpdater
    const mockCanonicalTimeUpdater = jest.fn();

    // Mock data missing ServerTimeZone
    const data = {
      RequestEndTime: '2024-07-08T11:59:58Z',
    };

    // Call the function under test
    callCanonicalTimeUpdater(data, mockCanonicalTimeUpdater);

    // Assert that canonicalTimeUpdater was called exactly once
    expect(mockCanonicalTimeUpdater).toHaveBeenCalledTimes(1);

    // Assert that canonicalTimeUpdater was called with the default timeZone 'Europe/Vienna'
    expect(mockCanonicalTimeUpdater).toHaveBeenCalledWith('Europe/Vienna', data.RequestEndTime);
  });

  it('does not call canonicalTimeUpdater when data is missing RequestEndTime', () => {
    // Mock function for canonicalTimeUpdater
    const mockCanonicalTimeUpdater = jest.fn();

    // Mock data missing RequestEndTime
    const data = {
      ServerTimeZone: 'Europe/Berlin',
    };

    // Call the function under test
    callCanonicalTimeUpdater(data, mockCanonicalTimeUpdater);

    // Assert that canonicalTimeUpdater was not called
    expect(mockCanonicalTimeUpdater).not.toHaveBeenCalled();
  });

  it('does not call canonicalTimeUpdater when data is undefined', () => {
    // Mock function for canonicalTimeUpdater
    const mockCanonicalTimeUpdater = jest.fn();

    // Call the function under test with undefined data
    callCanonicalTimeUpdater(undefined, mockCanonicalTimeUpdater);

    // Assert that canonicalTimeUpdater was not called
    expect(mockCanonicalTimeUpdater).not.toHaveBeenCalled();
  });

  it('does not call canonicalTimeUpdater when canonicalTimeUpdater is undefined', () => {
    // Call the function under test with undefined canonicalTimeUpdater
    callCanonicalTimeUpdater({ RequestEndTime: '2024-07-08T11:59:58Z', ServerTimeZone: 'Europe/Berlin' }, undefined);
    // No need to assert anything since it's testing the absence of a call
  });
});
