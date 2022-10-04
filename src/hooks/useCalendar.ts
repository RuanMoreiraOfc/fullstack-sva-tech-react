import { PureDate } from '@lib/PureDate';

export default useCalendar;

function useCalendar(daysSinceLastSunday: number, from: PureDate) {
  const TOTAL_CALENDAR_DAYS = 35;

  const today = from.setHours(0, 0, 0, 0);
  const firstDateOfMonth = today.firstDateOfMonth;
  const lastDateOfMonth = today.lastDateOfMonth;

  const firstDateInCalendar = firstDateOfMonth.setHours(
    -24 * (firstDateOfMonth.day - daysSinceLastSunday),
  );
  const lastDateInCalendar = firstDateInCalendar.setHours(24 * 35, 0, 0, 0);

  const calendar = Array.from(
    { length: TOTAL_CALENDAR_DAYS },

    (_, i) => firstDateInCalendar.setHours(24 * i, 0, 0, 0),
  );

  return {
    calendar,
    today,
    firstDateOfMonth,
    lastDateOfMonth,
    firstDateInCalendar,
    lastDateInCalendar,
    getCalendarDate(date = today) {
      const formattedLongDate = date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      return formattedLongDate;
    },
    getIsCertainDate(date: PureDate, comparingDate: PureDate) {
      return (
        date > comparingDate.beforeDateStarts && date < comparingDate.nextDate
      );
    },
    getIsInCurrentMonthRange(date: PureDate) {
      return (
        date > firstDateOfMonth.beforeDateStarts &&
        date < lastDateOfMonth.nextDate
      );
    },
  };
}
