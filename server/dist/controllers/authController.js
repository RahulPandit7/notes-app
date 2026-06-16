"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const authService_1 = require("../services/authService");
const apiResponse_1 = require("../utils/apiResponse");
const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await (0, authService_1.loginUser)(email, password);
    return (0, apiResponse_1.sendSuccess)(res, "Login successful", result);
};
exports.login = login;
const register = async (req, res) => {
    const { name, email, password } = req.body;
    const result = await (0, authService_1.registerUser)(name, email, password);
    return (0, apiResponse_1.sendSuccess)(res, "Registration successful", result, 201);
};
exports.register = register;
