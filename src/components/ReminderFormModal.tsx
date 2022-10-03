import { PureDate } from '@lib/PureDate';

import type { FormEventHandler } from 'react';

import { useState, useCallback } from 'react';
import type { UseToastOptions } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import type { APIResponse } from '@hooks/useReminder';
import useReminder from '@hooks/useReminder';

import type { SystemStyleObject, ModalProps } from '@chakra-ui/react';
import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalOverlay,
   FormLabel,
   Input,
} from '@chakra-ui/react';
import { CirclePicker } from 'react-color';

export default ReminderFormModal;
export type { ReminderFormModalProps };

type ReminderFormModalProps = {
   date: PureDate;
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
   onAddReminder: (data: APIResponse) => void;
} & Omit<ModalProps, 'children'>;

function ReminderFormModal({
   date,
   isOpen,
   onOpen,
   onClose,
   onAddReminder: onAddReminder,
   ...props
}: ReminderFormModalProps) {
   const toast = useToast();
   const { onAddReminder: onAPIAddReminder } = useReminder();

   const [selectedColor, setSelectedColor] = useState('#f44336');

   const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
      async (event) => {
         event.preventDefault();

         const {
            description: descriptionInput,
            city: cityInput,
            time: timeInput,
         } = event.currentTarget.elements as unknown as Record<
            'description' | 'city' | 'time',
            HTMLInputElement
         >;

         const { error, response } = await onAPIAddReminder({
            date: date.setHours(0, 0, 0, timeInput.valueAsNumber).time,
            description: descriptionInput.value,
            city: cityInput.value || undefined,
            color: selectedColor,
         });

         if (error !== null) {
            const TOAST_ID = 'toast-error-modal';

            const showUniqueToast = toast.isActive(TOAST_ID)
               ? (options: UseToastOptions) => toast.update(TOAST_ID, options)
               : toast;

            showUniqueToast({
               id: TOAST_ID,
               position: 'top-right',
               duration: 2000,
               description: error,
               status: 'error',
            });
            return;
         }

         onAddReminder(response);
         onClose();
      },
      [date, selectedColor, onClose],
   );

   return (
      <Modal isOpen={isOpen} onClose={onClose} {...props}>
         <ModalOverlay />
         <ModalContent sx={ContentCSS}>
            <ModalCloseButton />
            <ModalBody
               as='form'
               className='form'
               onSubmit={handleSubmit as () => void}
            >
               <FormLabel>
                  Description*
                  <Input
                     name='description'
                     placeholder='eg.: Salon'
                     maxLength={30}
                     required
                  />
               </FormLabel>

               <FormLabel>
                  City
                  <Input name='city' placeholder='eg.: New York' />
               </FormLabel>

               <FormLabel>
                  Hours*
                  <Input
                     name='time'
                     type='time'
                     placeholder='eg.: 10:00 AM'
                     required
                  />
               </FormLabel>

               <CirclePicker
                  className='form__color-picker'
                  width='100%'
                  color={selectedColor}
                  onChange={(clr) => setSelectedColor(clr.hex)}
               />

               <Button type='submit' colorScheme='linkedin'>
                  Add
               </Button>
            </ModalBody>
         </ModalContent>
      </Modal>
   );
}

const ContentCSS: SystemStyleObject = {
   '.form': {
      margin: '0 auto',
      py: '20',
      px: '8',

      display: 'grid',
      gap: '5',
   },

   '.chakra-form__label': {
      w: 'full',
   },

   '.form__color-picker': {
      justifyContent: 'space-between',
   },

   '.form__color-picker :focus-visible': {
      outline: '2px solid -webkit-focus-ring-color !important',
   },
};
