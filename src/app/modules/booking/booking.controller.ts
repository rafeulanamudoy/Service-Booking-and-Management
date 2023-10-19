import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = req.body;
  //console.log(booking, 'controller');
  const result = await BookingService.createBooking(booking);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Successfully booked your Service ',
    data: result,
  });
});
const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  //console.log(booking, 'controller');
  const result = await BookingService.getAllBooking();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'booking get    successfully',
    data: result,
  });
});
const getBookingByEmail = catchAsync(async (req: Request, res: Response) => {
  //console.log(booking, 'controller');
  const id = req.params.id;
  const result = await BookingService.getBookingByEmail(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'booking get    successfully',
    data: result,
  });
});
export const BookingController = {
  createBooking,
  getAllBooking,
  getBookingByEmail,
};
