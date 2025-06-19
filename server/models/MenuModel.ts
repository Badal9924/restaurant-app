import mongoose, { Document } from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

export const MenuModel =
  mongoose.models.Menus || mongoose.model("Menus", MenuSchema);
