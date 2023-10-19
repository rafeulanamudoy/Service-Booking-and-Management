import { BookingModel } from '@prisma/client';
import prisma from '../../../shared/prisma';
type Dimention = {
  width: string;
  height: string;
};
const createBooking = async (
  service: BookingModel
): Promise<BookingModel | null> => {
  console.log(service);
  const { dimention, ...others } = service;
  const { width, height } = dimention as Dimention;
  const result = await prisma.bookingModel.create({
    data: {
      ...others,
      dimention: {
        width: width,
        height: height,
      },
    },
  });
  return result;
};
const getAllBooking = async (): Promise<BookingModel[] | null> => {
  const result = await prisma.bookingModel.findMany({
    include: {
      Bookings: true,
    },
  });

  return result;
};

const getBookingByEmail = async (
  id: string
): Promise<BookingModel[] | null> => {
  const result = await prisma.bookingModel.findMany({
    where: {
      userId: id,
    },
    include: {
      serviceType: true,
    },
  });

  return result;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getBookingByEmail,
};
