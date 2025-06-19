import mongoose, { Document } from "mongoose";

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

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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
          type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Orders", OrderSchema);
