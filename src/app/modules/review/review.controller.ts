import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

import { Request, Response } from 'express';
import { ReviewService } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body;
  console.log(review);
  const result = await ReviewService.createReview(review);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,

    message: 'review submitted successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
