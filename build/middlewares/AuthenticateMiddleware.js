"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../helpers/config"));
var AuthenticateMiddleware = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            var token = authorizationHeader.split(' ')[1];
            if (jsonwebtoken_1.default.verify(token, config_1.default.token_secret)) {
                next();
            }
        }
        else {
            res.status(401).json({ error: 'Access denied, token required' });
        }
    }
    catch (_a) {
        res.status(401).json({ error: 'Access denied, invalid token' });
    }
};
exports.default = AuthenticateMiddleware;
