import { z } from 'zod';

const createCategory = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title  is Required',
    }),
  }),
});

export const CategoryValidation = {
  createCategory,
};
