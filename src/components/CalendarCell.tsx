import { PureDate } from '@lib/PureDate';

import { useState, useCallback } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import type { APIResponse } from '@hooks/useReminder';

import type { TableCellProps } from '@chakra-ui/react';
import { Grid, Td, Button } from '@chakra-ui/react';
import ReminderFormModal from '@components/ReminderFormModal';
import Reminder from '@components/Reminder';

export default CalendarCell;
export type { CalendarCellProps };

type Reminder = APIResponse;

type CalendarCellProps = {
   date: PureDate;
   initialReminders: Reminder[];
} & TableCellProps;

function CalendarCell({
   children,
   date,
   initialReminders,
   ...props
}: CalendarCellProps) {
   const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
   const {
      isOpen, //
      onOpen: handleOpen,
      onClose: handleClose,
   } = useDisclosure();

   const handleAddReminder = useCallback((data: APIResponse) => {
      setReminders((oldState) => oldState.concat(data));
   }, []);

   return (
      <Td pos='relative' {...props}>
         <Button
            w='100%'
            h='inherit'
            p='4'
            border='inherit   '
            borderColor='transparent'
            bgColor='transparent'
            display='flex'
            alignItems='flex-start'
            onClick={handleOpen}
            aria-label='Add reminder'
         >
            {children}
         </Button>

         <ReminderFormModal
            date={date}
            isOpen={isOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            onAddReminder={handleAddReminder}
         />

         <Grid //
            w='100%'
            h='3em'
            p='2'
            alignItems='center'
            gap='2'
            overflow='hidden'
            pos='absolute'
            bottom='0'
            sx={{
               '*:nth-of-type(7n) &:hover': {
                  '--translate-dir': '-1',
               },

               '&:empty': {
                  pointerEvents: 'none',
               },

               '&:hover:not(:empty)': {
                  zIndex: 1,
                  h: '80%',
                  overflowY: 'auto',
                  transform:
                     'translateX(calc(5em * var(--translate-dir, 1))) scale(2)',
               },
            }}
         >
            {reminders.map(({ color, description, date }) => (
               <Reminder
                  key={`${description}-${date}`}
                  containerColor={color}
                  whiteSpace='nowrap'
                  textOverflow='ellipsis'
                  fontSize='70%'
                  textAlign='left'
                  color='neutral.700'
               >
                  {description}
               </Reminder>
            ))}
         </Grid>
      </Td>
   );
}
