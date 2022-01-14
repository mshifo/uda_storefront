"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var OrderCreateSchema = joi_1.default.object().keys({
    product_id: joi_1.default.number(),
    quantity: joi_1.default.number().min(1),
    user_id: joi_1.default.number()
});
exports.default = OrderCreateSchema;
