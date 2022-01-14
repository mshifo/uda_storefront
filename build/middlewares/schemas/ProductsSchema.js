"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var ProductCreateSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    price: joi_1.default.number().required().min(1)
});
exports.default = ProductCreateSchema;
