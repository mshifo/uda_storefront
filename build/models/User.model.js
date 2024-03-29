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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = __importDefault(require("../database"));
var hashPassword_1 = require("../helpers/hashPassword");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.all = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, rows, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM users')];
                    case 2:
                        rows = (_b.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows];
                    case 3:
                        error_1 = _b.sent();
                        throw new Error("Failed to fetch data error: ".concat(error_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, rows, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE id = $1', [id])];
                    case 2:
                        rows = (_b.sent()).rows;
                        connection.release();
                        if (rows.length) {
                            return [2 /*return*/, rows[0]];
                        }
                        return [2 /*return*/, null];
                    case 3:
                        error_2 = _b.sent();
                        throw new Error("Failed to fetch data error: ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.authenticate = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, rows, user, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE userName = $1', [userName])];
                    case 2:
                        rows = (_b.sent()).rows;
                        connection.release();
                        if (rows.length) {
                            user = rows[0];
                            if ((0, hashPassword_1.comparePasswords)(password, user.password)) {
                                return [2 /*return*/, user];
                            }
                        }
                        return [2 /*return*/, null];
                    case 3:
                        error_3 = _b.sent();
                        throw new Error("Failed to fetch data error: ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.findByUserName = function (userName) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, rows, user, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _b.sent();
                        return [4 /*yield*/, database_1.default.query('SELECT * FROM users WHERE userName = $1', [userName])];
                    case 2:
                        rows = (_b.sent()).rows;
                        connection.release();
                        if (rows.length) {
                            user = rows[0];
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                    case 3:
                        error_4 = _b.sent();
                        throw new Error("Failed to fetch data error: ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var _a;
    _a = UserModel;
    UserModel.add = function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var sql, parameters, connection, rows, error_5;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    sql = 'INSERT INTO users (userName,firstName,lastName,password) VALUES($1,$2,$3,$4) RETURNING *';
                    parameters = [user.userName, user.firstName, user.lastName, (0, hashPassword_1.hashPassword)(user.password)];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, database_1.default.connect()];
                case 2:
                    connection = _b.sent();
                    return [4 /*yield*/, database_1.default.query(sql, parameters)];
                case 3:
                    rows = (_b.sent()).rows;
                    connection.release();
                    return [2 /*return*/, rows[0]];
                case 4:
                    error_5 = _b.sent();
                    throw new Error("Failed to fetch data error: ".concat(error_5));
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return UserModel;
}());
exports.default = UserModel;
