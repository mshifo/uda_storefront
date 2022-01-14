"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("./products"));
var users_1 = __importDefault(require("./users"));
var orders_1 = __importDefault(require("./orders"));
var routes = (0, express_1.Router)();
routes.use('/products', products_1.default);
routes.use('/users', users_1.default);
routes.use('/orders', orders_1.default);
exports.default = routes;
