import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';

const router = express.Router();

export const BookingRoute = router;
router.get(
  '/book/:id',

  BookingController.getbookingById
);
router.delete(
  '/book/:id',

  BookingController.deleteBookingById
);
router.patch(
  '/book/:id',

  BookingController.updateBooking
);

router.post(
  '/',
  validateRequest(BookingValidation.createBooking),
  BookingController.createBooking
);

router.get(
  '/',

  BookingController.getAllBooking
);
