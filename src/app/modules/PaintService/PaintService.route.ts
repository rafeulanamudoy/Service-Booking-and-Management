import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { PaintServiceContrller } from './PaintService.controller';
import { ServiceValidation } from './PaintService.validation';

const router = express.Router();

export const ServiceRoute = router;
router.patch(
  '/:id',

  PaintServiceContrller.updateService
);
router.delete(
  '/:id',

  PaintServiceContrller.deleteService
);
router.post(
  '/',
  validateRequest(ServiceValidation.createService),
  PaintServiceContrller.createService
);

router.get(
  '/',

  PaintServiceContrller.getService
);
