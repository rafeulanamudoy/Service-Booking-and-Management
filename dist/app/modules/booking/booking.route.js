"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_controller_1 = require("./booking.controller");
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
exports.BookingRoute = router;
router.get('/book/:id', booking_controller_1.BookingController.getbookingById);
router.delete('/book/:id', booking_controller_1.BookingController.deleteBookingById);
router.patch('/book/:id', booking_controller_1.BookingController.updateBooking);
router.post('/', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBooking), booking_controller_1.BookingController.createBooking);
router.get('/', booking_controller_1.BookingController.getAllBooking);
