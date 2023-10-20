"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string({
            required_error: 'serviceId is Required',
        }),
        userId: zod_1.z.string({
            required_error: 'userId is Required',
        }),
        timeSlot: zod_1.z.string({
            required_error: 'slot Time is requerd',
        }),
        startDate: zod_1.z.string({
            required_error: 'startDate is Requered',
        }),
        location: zod_1.z.string({
            required_error: 'location is Required',
        }),
        colorScheme: zod_1.z.string({}).optional(),
        userRequerment: zod_1.z.string({}).optional(),
        dimention: zod_1.z.object({
            width: zod_1.z.string({
                required_error: 'Dimention width is Required',
            }),
            height: zod_1.z.string({
                required_error: 'Dimention height is Required',
            }),
        }),
    }),
});
exports.BookingValidation = {
    createBooking,
};
