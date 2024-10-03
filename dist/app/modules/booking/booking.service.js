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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBooking = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const { dimention } = service, others = __rest(service, ["dimention"]);
    const { width, height } = dimention;
    const result = yield prisma_1.default.bookingModel.create({
        data: Object.assign(Object.assign({}, others), { dimention: {
                width: width,
                height: height,
            } }),
    });
    return result;
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookingModel.findMany({
        include: {
            Bookings: true,
            serviceType: true,
        },
    });
    return result;
});
const getBookingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookingModel.findMany({
        where: {
            userId: id,
        },
        include: {
            serviceType: true,
        },
    });
    return result;
});
const deleteBookingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.bookingModel.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const updateBooking = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-unused-vars
    const { dimention } = data, others = __rest(data, ["dimention"]);
    const updateBooking = yield prisma_1.default.bookingModel.update({
        where: {
            id: id,
        },
        data: others,
    });
    return updateBooking;
});
exports.BookingService = {
    createBooking,
    getAllBooking,
    getBookingById,
    deleteBookingById,
    updateBooking,
};
