import { Prisma, Service } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { ServiceSearchableFields } from './PaintService.constant';
import { IServiceFilter } from './PaintService.interface';

const createService = async (service: Service): Promise<Service | null> => {
  const result = await prisma.service.create({
    data: service,
  });
  return result;
};

const getService = async (
  filters: IServiceFilter,
  options: IPaginationOptions
) => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const { search, ...filterData } = filters;

  const andConditons = [];
  if (search) {
    andConditons.push({
      OR: ServiceSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.entries(filterData).map(([field, value]) => {
        if (field === 'price') {
          const numericValue = parseFloat(value as string);
          return {
            [field]: {
              equals: numericValue,
            },
          };
        } else if (field === 'category') {
          return {
            category: {
              title: {
                equals: value as string,
              },
            },
          };
        } else if (field === 'minPrice') {
          const parseMinPrice = parseInt(value as string);

          return {
            price: {
              gte: parseMinPrice,
            },
          };
        } else if (field === 'maxPrice') {
          const parseMaxPrice = parseInt(value as string);

          return {
            price: {
              lte: parseMaxPrice,
            },
          };
        }

        return {
          [field]: {
            equals: value,
          },
        };
      }),
    });
  }

  const whereConditons: Prisma.ServiceWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.service.findMany({
    where: whereConditons,
    include: {
      reviews: true,
      category: {
        select: {
          title: true,
        },
      },
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.service.count();
  const totalPage = Math.ceil(total / size);
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const updateService = async (
  id: string,
  service: Service
): Promise<Service | null> => {
  const result = await prisma.service.update({
    where: {
      id: id,
    },
    data: service,
  });
  return result;
};
const deleteService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.delete({
    where: {
      id: id,
    },
  });
  return result;
};
const getServiceById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id: id,
    },
    include: {
      reviews: true,
    },
  });
  return result;
};
export const PaintService = {
  createService,
  getService,
  updateService,
  deleteService,
  getServiceById,
};
