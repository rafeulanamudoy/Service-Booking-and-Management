"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaintService_route_1 = require("../modules/PaintService/PaintService.route");
const auth_route_1 = require("../modules/auth/auth.route");
const booking_route_1 = require("../modules/booking/booking.route");
const category_route_1 = require("../modules/category/category.route");
const review_route_1 = require("../modules/review/review.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/service',
        route: PaintService_route_1.ServiceRoute,
    },
    {
        path: '/category',
        route: category_route_1.CategoryRoute,
    },
    {
        path: '/booking',
        route: booking_route_1.BookingRoute,
    },
    {
        path: '/review',
        route: review_route_1.ReviewRoute,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
