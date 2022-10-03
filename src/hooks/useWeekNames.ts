import { PureDate } from '@lib/PureDate';

export default useWeekNames;

function useWeekNames(daysSinceLastSunday: number) {
  const INITIAL_SUNDAY_DATE_FROM_ZERO_DATE = -3;

  const initialDay = INITIAL_SUNDAY_DATE_FROM_ZERO_DATE - daysSinceLastSunday;

  const firstDayOfWeek = new PureDate(0).setHours(24 * initialDay, 0, 0, 0);

  const weekNames = Array.from(
    { length: 7 },

    (_, i) => firstDayOfWeek.setHours(24 * i, 0, 0, 0).asDate,
  ).map(
    Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      timeZone: 'UTC',
    }).format,
  );

  return weekNames;
}
