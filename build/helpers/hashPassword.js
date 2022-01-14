"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("./config"));
var hashPassword = function (password) {
    var hash = bcrypt_1.default.hashSync(password + config_1.default.pepper, parseInt(config_1.default.salt, 10));
    return hash;
};
exports.hashPassword = hashPassword;
var comparePasswords = function (password1, password2) {
    return bcrypt_1.default.compareSync(password1 + config_1.default.pepper, password2);
};
exports.comparePasswords = comparePasswords;
