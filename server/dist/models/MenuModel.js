"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MenuSchema = new mongoose_1.default.Schema({
    restaurantId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Restaurant",
        require: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    menuName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sellingPrice: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        require: true
    },
    costPrice: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.MenuModel = mongoose_1.default.models.Menus || mongoose_1.default.model("Menus", MenuSchema);
