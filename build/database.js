"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_1 = __importDefault(require("./helpers/config"));
var client = new pg_1.Pool({
    host: config_1.default.db_host,
    user: config_1.default.db_user,
    password: config_1.default.db_password,
    database: config_1.default.db_name
});
exports.default = client;
