import { DateTime } from 'luxon';

let previousDeviation = 0;

export function updateCanonicalTime(data: unknown, onServerTimeDeviationChange: ((deviation: number) => void) | undefined): void {
  if (typeof data === 'object' && data != null && 'RequestEndTime' in data) {
    const body = data as { RequestEndTime: string };
    const time = DateTime.fromISO(body.RequestEndTime).setZone('UTC+2');
    const deviation = DateTime.local().toMillis() / 1000 - time.toMillis() / 1000;
    if (Math.abs(deviation - previousDeviation) > 2) {
      previousDeviation = deviation;
      if (onServerTimeDeviationChange) onServerTimeDeviationChange(deviation);
    }
  }
}
