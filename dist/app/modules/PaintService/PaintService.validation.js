"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createService = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Service name is Required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'CategoryId  is Required',
        }),
        image: zod_1.z
            .string({
            required_error: 'Image  is Required',
        })
            .url('this is not a valid Url'),
        description: zod_1.z.string({
            required_error: 'description is Required',
        }),
        price: zod_1.z.number({
            required_error: 'price is Required',
        }),
        serviceStatus: zod_1.z.enum([...Object.values(client_1.ServiceStatus)], {
            required_error: 'serviceStatus is Required',
        }),
    }),
});
exports.ServiceValidation = {
    createService,
};
