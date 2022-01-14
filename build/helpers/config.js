"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("Couldn't find .env file");
}
exports.default = {
    port: process.env.PORT,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_DATABASE,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    salt: process.env.SALT_ROUNDS,
    pepper: process.env.BCRYPT_PASSWORD,
    token_secret: process.env.TOKEN_SECRET
};
