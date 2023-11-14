import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';

const router = express.Router();

export const CategoryRoute = router;
router.get(
  '/:id',

  CategoryController.getCategoryById
);
router.delete('/:id', CategoryController.deleteCategoryById);

router.post(
  '/',
  validateRequest(CategoryValidation.createCategory),
  CategoryController.createCategory
);

router.get(
  '/',

  CategoryController.getCategory
);
