import { UserRole } from '@prisma/client';
import { z } from 'zod';

const signUpZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is Required',
      })
      .email('this is not a valid email'),
    password: z.string({
      required_error: 'Password is Required',
    }),
    firstName: z.string({
      required_error: 'First Name is Required',
    }),
    lastName: z.string({
      required_error: 'Last  Name is Required',
    }),
    contactNumber: z.string({
      required_error: 'Contact Number  is Required',
    }),

    gender: z.string({
      required_error: 'Gender is Required',
    }),
    address: z.string({
      required_error: 'Address is Required',
    }),
    secret_key: z.string({}).optional(),
    role: z
      .enum([...Object.values(UserRole)] as [string, ...string[]], {})
      .optional(),
  }),
});
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email('this is not a valid email'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
export const AuthValidation = {
  signUpZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
