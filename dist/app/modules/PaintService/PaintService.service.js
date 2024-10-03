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
exports.PaintService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const PaintService_constant_1 = require("./PaintService.constant");
const createService = (service) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data: service,
    });
    return result;
});
const getService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filterData = __rest(filters, ["search"]);
    const andConditons = [];
    if (search) {
        andConditons.push({
            OR: PaintService_constant_1.ServiceSearchableFields.map(field => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditons.push({
            AND: Object.entries(filterData).map(([field, value]) => {
                if (field === 'price') {
                    const numericValue = parseFloat(value);
                    return {
                        [field]: {
                            equals: numericValue,
                        },
                    };
                }
                else if (field === 'category') {
                    return {
                        category: {
                            title: {
                                equals: value,
                            },
                        },
                    };
                }
                else if (field === 'minPrice') {
                    const parseMinPrice = parseInt(value);
                    return {
                        price: {
                            gte: parseMinPrice,
                        },
                    };
                }
                else if (field === 'maxPrice') {
                    const parseMaxPrice = parseInt(value);
                    return {
                        price: {
                            lte: parseMaxPrice,
                        },
                    };
                }
                return {
                    [field]: {
                        equals: value,
                    },
                };
            }),
        });
    }
    const whereConditons = andConditons.length > 0 ? { AND: andConditons } : {};
    const result = yield prisma_1.default.service.findMany({
        where: whereConditons,
        include: {
            reviews: true,
            category: {
                select: {
                    title: true,
                },
            },
        },
        skip,
        take: size,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
    });
    const total = yield prisma_1.default.service.count();
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const updateService = (id, service) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id: id,
        },
        data: service,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id: id,
        },
    });
    return result;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id: id,
        },
        include: {
            reviews: true,
        },
    });
    return result;
});
exports.PaintService = {
    createService,
    getService,
    updateService,
    deleteService,
    getServiceById,
};
