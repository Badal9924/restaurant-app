"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    city: {
        type: String,
        require: true,
        trim: true
    },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true
    },
    pinCode: {
        type: String,
        require: true
    },
}, {
    timestamps: true,
    collection: "city"
});
exports.cityModel = mongoose_1.default.model("city", citySchema);
