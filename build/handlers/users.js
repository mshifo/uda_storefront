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
var express_1 = require("express");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_model_1 = __importDefault(require("../models/User.model"));
var ValidateMiddleware_1 = __importDefault(require("../middlewares/ValidateMiddleware"));
var UsersSchema_1 = require("../middlewares/schemas/UsersSchema");
var config_1 = __importDefault(require("../helpers/config"));
var AuthenticateMiddleware_1 = __importDefault(require("../middlewares/AuthenticateMiddleware"));
var userRoutes = (0, express_1.Router)();
/**
 * login
 */
userRoutes.post('/login', (0, ValidateMiddleware_1.default)(UsersSchema_1.UserLoginSchema), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userToLogin, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userToLogin = req.body;
                return [4 /*yield*/, User_model_1.default.authenticate(userToLogin.userName, userToLogin.password)];
            case 1:
                user = _a.sent();
                if (user) {
                    token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.token_secret, { expiresIn: '1d' });
                    res.json({ token: token });
                }
                else {
                    res.status(422).json({ message: 'Wrong Credentials!' });
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json({ message: 'Something went wrong!' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * index
 */
userRoutes.get('/', AuthenticateMiddleware_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_model_1.default.all()];
            case 1:
                users = _a.sent();
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Something went wrong!' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * show
 */
userRoutes.get('/:id', AuthenticateMiddleware_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_model_1.default.find(req.params.id)];
            case 1:
                user = _a.sent();
                res.status(user ? 200 : 404).send(user !== null && user !== void 0 ? user : { message: 'User Not found' }); // ternary operator
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ message: 'Something went wrong!' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * create
 */
userRoutes.post('/', (0, ValidateMiddleware_1.default)(UsersSchema_1.UserCreateSchema), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_model_1.default.add(req.body)];
            case 1:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ user: user }, config_1.default.token_secret, { expiresIn: '1d' });
                res.json({ token: token });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Something went wrong!' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = userRoutes;
