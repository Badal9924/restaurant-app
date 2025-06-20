"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = async (req, res, next) => {
    try {
        const tokens = req.cookies.myToken;
        if (!tokens) {
            return res.json({
                success: false,
                error: true,
                message: "token not found.........",
            });
        }
        const decode = jsonwebtoken_1.default.verify(tokens, process.env.SECRET_KEY);
        if (!decode) {
            return res.json({
                success: false,
                error: true,
                message: "Invalid Token",
            });
        }
        req.id = decode?.userId;
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal Server error",
        });
    }
};
exports.isAuthenticated = isAuthenticated;
