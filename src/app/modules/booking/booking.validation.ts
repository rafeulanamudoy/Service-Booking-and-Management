import { z } from 'zod';

const createBooking = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: 'serviceId is Required',
    }),

    userId: z.string({
      required_error: 'userId is Required',
    }),
    timeSlot: z.string({
      required_error: 'slot Time is requerd',
    }),
    startDate: z.string({
      required_error: 'startDate is Requered',
    }),
    location: z.string({
      required_error: 'location is Required',
    }),
    colorScheme: z.string({}).optional(),
    userRequerment: z.string({}).optional(),
    dimention: z.object({
      width: z.string({
        required_error: 'Dimention width is Required',
      }),
      height: z.string({
        required_error: 'Dimention height is Required',
      }),
    }),
  }),
});

export const BookingValidation = {
  createBooking,
};
