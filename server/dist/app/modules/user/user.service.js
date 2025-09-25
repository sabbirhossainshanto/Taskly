"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const getMe = async (user) => {
    return await user_model_1.User.findById(user._id);
};
exports.userService = {
    getMe,
};
