"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const PaintService_controller_1 = require("./PaintService.controller");
const PaintService_validation_1 = require("./PaintService.validation");
const router = express_1.default.Router();
exports.ServiceRoute = router;
router.patch('/:id', PaintService_controller_1.PaintServiceContrller.updateService);
router.get('/:id', PaintService_controller_1.PaintServiceContrller.getServiceById);
router.delete('/:id', PaintService_controller_1.PaintServiceContrller.deleteService);
router.post('/', (0, validateRequest_1.default)(PaintService_validation_1.ServiceValidation.createService), PaintService_controller_1.PaintServiceContrller.createService);
router.get('/', PaintService_controller_1.PaintServiceContrller.getService);
