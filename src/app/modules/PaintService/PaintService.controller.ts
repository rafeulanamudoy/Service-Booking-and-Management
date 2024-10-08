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

  const result = await PaintService.getService(filters, paginationOptions);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Service fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const service = req.body;

  const result = await PaintService.updateService(id, service);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'update  service successfully',
    data: result,
  });
});
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaintService.deleteService(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Delete  service successfully',
    data: result,
  });
});
const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await PaintService.getServiceById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'Service  get successfully',
    data: result,
  });
});
export const PaintServiceContrller = {
  createService,
  getService,
  updateService,
  deleteService,
  getServiceById,
};
