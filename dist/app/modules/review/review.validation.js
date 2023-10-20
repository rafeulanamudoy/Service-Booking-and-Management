"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReview = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: 'review  is Required',
        }),
        rating: zod_1.z.number({
            required_error: 'rating  is Required',
        }),
        userId: zod_1.z.string({
            required_error: 'userId  is Required',
        }),
        serviceId: zod_1.z.string({
            required_error: 'serviceId  is Required',
        }),
    }),
});
exports.ReviewValidation = {
    createReview,
};
