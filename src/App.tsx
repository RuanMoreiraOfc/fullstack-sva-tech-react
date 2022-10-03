import useWeekNames from '@hooks/useWeekNames';

import type { SystemStyleObject } from '@chakra-ui/react';
import { Grid, Table, Thead, Tr, Th } from '@chakra-ui/react';

export default App;

function App() {
   const FIRST_DAY = 0;

   const weekNameList = useWeekNames(FIRST_DAY);

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
         </Table>
      </Grid>
   );
}

const tableCSS: SystemStyleObject = {
   th: {
      w: 'min(100vmax / 7, 100vmin/5)',

      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: 'neutral.500',

      textAlign: 'center',

      color: 'black',
      bgColor: '#c6e0b4',

      verticalAlign: 'middle',
   },
};
