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

  console.log(options, 'chekc options');
  console.log(filters, 'filters data');
  //console.log(filterData, 'filterData');

  //   console.log(search, filterData, 'filters');
  // console.log(page, limit, skip, 'pagination');
  //console.log(search);
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
        } else if (field === 'minPrice') {
          const parseMinPrice = parseInt(value as string);

          return {
            price: {
              lte: parseMinPrice,
            },
          };
        } else if (field === 'maxPrice') {
          const parseMaxPrice = parseInt(value as string);

          return {
            price: {
              gte: parseMaxPrice,
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
  // console.log(Object.keys(filterData), 'using key');
  //console.log(Object.entries(filterData), 'using entries');
  const whereConditons: Prisma.ServiceWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};
  const result = await prisma.service.findMany({
    where: whereConditons,
    include: {
      reviews: true,
    },
    skip,
    take: size,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            price: 'desc',
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
export const PaintService = {
  createService,
  getService,
};
