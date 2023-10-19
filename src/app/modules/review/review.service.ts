import { ReviewAndRating } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createReview = async (
  review: ReviewAndRating
): Promise<ReviewAndRating | null> => {
  const result = await prisma.reviewAndRating.create({
    data: review,
  });
  return result;
};

export const ReviewService = {
  createReview,
};
