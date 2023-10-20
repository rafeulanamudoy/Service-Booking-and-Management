"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const user_1 = require("../../enums/user");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const roleBaseAuth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = req.body;
        if (credential.role === user_1.ENUM_USER_ROLE.SUPER_ADMIN &&
            credential.superRoleKey !== config_1.default.super_admin) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'you are not allowed to create super admin Account');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = roleBaseAuth;
