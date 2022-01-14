"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidateMiddleware = function (schema) { return function (req, res, next) {
    schema
        .validateAsync(req.body)
        .then(function () {
        next();
    })
        .catch(function (error) {
        res.status(422).json({ error: error.details });
    });
}; };
exports.default = ValidateMiddleware;
