"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    menuId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Menus"
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    quantity: Number
}, { timestamps: true });
exports.cartModel = mongoose_1.default.model("cart", cartSchema);
