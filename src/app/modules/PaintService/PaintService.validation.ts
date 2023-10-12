import { ServiceStatus } from '@prisma/client';
import { z } from 'zod';

const createService = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Service name is Required',
    }),
    image: z
      .string({
        required_error: 'Image  is Required',
      })
      .url('this is not a valid Url'),
    description: z.string({
      required_error: 'description is Required',
    }),

    price: z.number({
      required_error: 'price is Required',
    }),
    serviceStatus: z.enum(
      [...Object.values(ServiceStatus)] as [string, ...string[]],
      {
        required_error: 'serviceStatus is Required',
      }
    ),
  }),
});

export const ServiceValidation = {
  createService,
};
