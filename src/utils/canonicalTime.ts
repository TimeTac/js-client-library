let previousDeviation = 0;

export function updateCanonicalTime(data: unknown, onServerTimeDeviationChange: ((deviation: number) => void) | undefined): void {
  if (typeof data === 'object' && data != null && 'RequestEndTime' in data) {
    const body = data as { RequestEndTime: string; ServerTimeZone: string | undefined };
    const time = new Date(
      new Intl.DateTimeFormat(undefined, {
        timeZone: body.ServerTimeZone ?? 'Europe/Vienna',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date(body.RequestEndTime)),
    );

    const deviation = new Date().getTime() / 1000 - time.getTime() / 1000;
    if (Math.abs(deviation - previousDeviation) > 2) {
      previousDeviation = deviation;
      if (onServerTimeDeviationChange) onServerTimeDeviationChange(deviation);
    }
  }
}

export function callCanonicalTimeUpdater(
  data: unknown,
  canonicalTimeUpdater: ((serverTimeZone: string, serverRequestEndTime: string) => void) | undefined,
): void {
  if (typeof data === 'object' && data != null && 'RequestEndTime' in data && canonicalTimeUpdater) {
    const body = data as { RequestEndTime: string; ServerTimeZone: string | undefined };
    canonicalTimeUpdater(body.ServerTimeZone ?? 'Europe/Vienna', body.RequestEndTime);
  }
}
