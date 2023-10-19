import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

export const ReviewRoute = router;

router.post(
  '/',
  validateRequest(ReviewValidation.createReview),
  ReviewController.createReview
);
