"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// type DeliveryDetails = {
//   email: string;
//   name: string;
//   address: string;
//   city: string;
// };
// type CartItems = {
//   menuId: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// };
// export interface Iorder extends Document {
//   user: mongoose.Schema.Types.ObjectId;
//   restaurant: mongoose.Schema.Types.ObjectId;
//   deliveryDetails: DeliveryDetails;
//   cartItems: CartItems;
//   totalAmount: number;
//   status: "pending" | "confirmed" | "out for delivery";
// }
const OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliveryDetails: {
        email: { type: String, required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
        state: { type: String, require: true },
        phone: { type: String, require: true },
    },
    cartItems: [
        {
            menuId: { type: String, required: true },
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: String, required: true },
            status: {
                type: String,
                enum: [
                    "Pending",
                    "Preparing",
                    "Confirmed",
                    "Out for Delivery",
                    "Delivered",
                ],
                default: "Pending",
            },
            restaurantId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Restaurant",
                required: true,
            },
        },
    ],
    totalAmount: Number,
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
}, { timestamps: true });
exports.OrderModel = mongoose_1.default.model("Orders", OrderSchema);
