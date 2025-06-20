"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        lowercase: true, // Converts email to lowercase
        trim: true, // Removes spaces before & after
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], // Regex validation
    },
    contact: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        require: true
    },
    pinCode: {
        type: String,
        require: true
    },
    country: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    cuisines: [{ type: String, required: true }],
    menus: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Menus' }
    ],
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.restaurantModel = mongoose_1.default.model("Restaurant", restaurantSchema);
