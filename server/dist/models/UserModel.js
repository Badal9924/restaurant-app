"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    number: {
        type: Number,
        required: [true, "Please provide a contact number"],
    },
    address: {
        type: String,
        default: "Update your address",
    },
    city: {
        type: String,
        default: "Update your city",
    },
    country: {
        type: String,
        default: "Update your country",
    },
    profilePicture: {
        type: String,
        default: "",
    },
    admin: {
        type: Boolean,
        default: false,
    },
    superAdmin: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
    },
    pincode: {
        type: String,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });
const userModel = mongoose_1.default.model("User", UserSchema);
exports.default = userModel;
