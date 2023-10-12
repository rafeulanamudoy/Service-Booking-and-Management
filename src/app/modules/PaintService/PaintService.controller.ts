import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PaintService } from './PaintService.service';

import { Request, Response } from 'express';
import { paginationFields } from '../../../constants/pagination';
import pick from '../../../shared/pick';
import { ServiceFilterableField } from './PaintService.constant';
const createService = catchAsync(async (req: Request, res: Response) => {
  const service = req.body;
  console.log(service);
  const result = await PaintService.createService(service);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Service  created successfully',
    data: result,
  });
});
const getService = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, ServiceFilterableField);
  console.log(
    filters,
    'i am from controller to check filters',
    paginationOptions,
    'i am from controller to check paginationOptions'
  );
  const result = await PaintService.getService(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Service fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
export const PaintServiceContrller = {
  createService,
  getService,
};
