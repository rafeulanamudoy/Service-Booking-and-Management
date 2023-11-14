import { PaintingCategory } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (
  service: PaintingCategory
): Promise<PaintingCategory | null> => {
  const result = await prisma.paintingCategory.create({
    data: service,
  });
  return result;
};
const getCategory = async (): Promise<PaintingCategory[] | null> => {
  const result = await prisma.paintingCategory.findMany({});

  return result;
};
const getCategoryById = async (
  id: string
): Promise<PaintingCategory | null> => {
  const result = await prisma.paintingCategory.findUnique({
    where: {
      id: id,
    },
    include: {
      service: true,
    },
  });

  return result;
};

const deleteCategoryById = async (
  id: string
): Promise<PaintingCategory | null> => {
  const result = await prisma.paintingCategory.delete({
    where: {
      id: id,
    },
  });

  return result;
};
export const CategoryService = {
  createCategory,
  getCategory,
  getCategoryById,
  deleteCategoryById,
};
