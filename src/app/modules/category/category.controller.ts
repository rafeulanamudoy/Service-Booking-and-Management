import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { Request, Response } from 'express';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  console.log(category);
  const result = await CategoryService.createCategory(category);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Service  created successfully',
    data: result,
  });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getCategory();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'category  get successfully',
    data: result,
  });
});
const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.getCategoryById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Category  get successfully',
    data: result,
  });
});
const deleteCategoryById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CategoryService.deleteCategoryById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Category  delete successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getCategory,
  getCategoryById,
  deleteCategoryById,
};
