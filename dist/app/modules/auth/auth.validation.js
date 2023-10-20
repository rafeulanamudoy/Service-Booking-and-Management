"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is Required',
        })
            .email('this is not a valid email'),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        firstName: zod_1.z.string({
            required_error: 'First Name is Required',
        }),
        lastName: zod_1.z.string({
            required_error: 'Last  Name is Required',
        }),
        contactNumber: zod_1.z.string({
            required_error: 'Contact Number  is Required',
        }),
        gender: zod_1.z.string({
            required_error: 'Gender is Required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is Required',
        }),
        secret_key: zod_1.z.string({}).optional(),
        role: zod_1.z
            .enum([...Object.values(client_1.UserRole)], {})
            .optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email('this is not a valid email'),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    signUpZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
