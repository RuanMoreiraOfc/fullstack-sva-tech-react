import { PureDate } from '@lib/PureDate';

import useWeekNames from '@hooks/useWeekNames';
import useCalendar from '@hooks/useCalendar';

import type { SystemStyleObject } from '@chakra-ui/react';
import { Grid, Table, Thead, Tbody, Td, Tr, Th } from '@chakra-ui/react';

export default App;

function App() {
   const FIRST_DAY = 0;

   const weekNameList = useWeekNames(FIRST_DAY);
   const {
      calendar,
      today,
      getCalendarDate,
      getIsCertainDate,
      getIsInCurrentMonthRange,
   } = useCalendar(FIRST_DAY, new PureDate());

   const calendarWeek = calendar.reduce((acc, cur, i) => {
      const arrayIndex = Math.floor(i / 7);
      const date = cur;
      const day = getCalendarDate(date);

      if (acc[arrayIndex] instanceof Array) {
         acc[arrayIndex].push({ date, day });
      } else {
         acc[arrayIndex] = [{ date, day }];
      }

      return acc;
   }, [] as { date: PureDate; day: string | number }[][]);

   return (
      <Grid as='main'>
         <Table sx={tableCSS}>
            <Thead>
               <Tr aria-rowindex={1}>
                  {weekNameList.map((dayName, i) => (
                     <Th aria-colindex={i + 1}>{dayName}</Th>
                  ))}
               </Tr>
            </Thead>
            <Tbody textAlign='left'>
               {calendarWeek.map((week, i) => (
                  <Tr key={`week-${i}`} aria-rowindex={i + 2}>
                     {week.map(({ day, date }) => (
                        <Td
                           key={day}
                           data-is-today={getIsCertainDate(date, today)}
                           data-in-range={getIsInCurrentMonthRange(date)}
                        >
                           {day}
                        </Td>
                     ))}
                  </Tr>
               ))}
            </Tbody>
         </Table>
      </Grid>
   );
}

const tableCSS: SystemStyleObject = {
   'th, td': {
      w: 'min(100vmax / 7, 100vmin/5)',

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'neutral.500',

      textAlign: 'center',
   },

   th: {
      color: 'black',
      bgColor: '#c6e0b4',

      verticalAlign: 'middle',
   },

   td: {
      h: 'min(100vmax / 7, 100vmin/5)',
      p: 'unset',
   },

   'td:nth-of-type(6n+1)': {
      bgColor: '#aaaa',
   },

   '[data-is-today=true]': {
      pos: 'relative',

      '&::before': {
         content: "''",

         aspectRatio: '1/1',
         w: '20%',

         bgColor: 'black',

         pointerEvents: 'none',
         clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',

         pos: 'absolute',
         top: 1,
         right: 1,
      },
   },

   '[data-in-range=false]': {
      color: '#0004',
   },
};
