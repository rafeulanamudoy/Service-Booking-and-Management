import { z } from 'zod';

const createReview = z.object({
  body: z.object({
    review: z.string({
      required_error: 'review  is Required',
    }),
    rating: z.number({
      required_error: 'rating  is Required',
    }),
    userId: z.string({
      required_error: 'userId  is Required',
    }),
    serviceId: z.string({
      required_error: 'serviceId  is Required',
    }),
  }),
});

export const ReviewValidation = {
  createReview,
};
