import { Service } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createService = async (service: Service): Promise<Service | null> => {
  const result = await prisma.service.create({
    data: service,
  });
  return result;
};

export const PaintService = {
  createService,
};
