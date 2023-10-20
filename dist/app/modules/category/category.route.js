"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
exports.CategoryRoute = router;
router.get('/:id', category_controller_1.CategoryController.getCategoryById);
router.post('/', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.createCategory), category_controller_1.CategoryController.createCategory);
router.get('/', category_controller_1.CategoryController.getCategory);
