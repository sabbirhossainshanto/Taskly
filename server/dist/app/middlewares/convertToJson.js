"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertToJson = (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
};
exports.default = convertToJson;
