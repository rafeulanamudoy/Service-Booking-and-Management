import express from 'express';
import { ServiceRoute } from '../modules/PaintService/PaintService.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { BookingRoute } from '../modules/booking/booking.route';
import { CategoryRoute } from '../modules/category/category.route';
import { ReviewRoute } from '../modules/review/review.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/service',
    route: ServiceRoute,
  },
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/booking',
    route: BookingRoute,
  },
  {
    path: '/review',
    route: ReviewRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
