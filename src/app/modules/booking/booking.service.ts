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
      serviceType: true,
    },
  });

  return result;
};

const getBookingById = async (id: string): Promise<BookingModel[] | null> => {
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
const deleteBookingById = async (id: string): Promise<BookingModel | null> => {
  const result = await prisma.bookingModel.delete({
    where: {
      id: id,
    },
  });

  return result;
};
const updateBooking = async (
  id: string,
  data: Partial<BookingModel>
): Promise<BookingModel | null> => {
  // eslint-disable-next-line no-unused-vars
  const { dimention, ...others } = data;

  const updateBooking = await prisma.bookingModel.update({
    where: {
      id: id,
    },
    data: others,
  });
  return updateBooking;
};

export const BookingService = {
  createBooking,
  getAllBooking,
  getBookingById,
  deleteBookingById,
  updateBooking,
};
