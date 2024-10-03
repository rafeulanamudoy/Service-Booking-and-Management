import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = req.body;

  const result = await BookingService.createBooking(booking);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Successfully booked your Service ',
    data: result,
  });
});
const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBooking();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'booking get    successfully',
    data: result,
  });
});
const getbookingById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.getBookingById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'booking get    successfully',
    data: result,
  });
});
const deleteBookingById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookingService.deleteBookingById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'booking deleted    successfully',
    data: result,
  });
});
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await BookingService.updateBooking(id, data);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Update  successfully',
    data: result,
  });
});
export const BookingController = {
  createBooking,
  getAllBooking,
  getbookingById,
  deleteBookingById,
  updateBooking,
};
