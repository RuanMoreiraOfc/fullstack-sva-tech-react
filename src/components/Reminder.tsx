import type { GridProps } from '@chakra-ui/react';
import { Grid } from '@chakra-ui/react';

export default Reminder;
export type { ReminderProps, Reminder };

type ReminderProps = { containerColor: string } & GridProps;

function Reminder({ children, containerColor, ...props }: ReminderProps) {
   return (
      <Grid padding='1' borderRadius='base' bgColor={containerColor} {...props}>
         {children}
      </Grid>
   );
}
