import mongoose, { Document } from "mongoose";

export interface Irestaurant {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId[];
  email : string;
  state : string;
  pinCode : string;
  contact : string;
}

export interface IrestaurantDocument extends Irestaurant, Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new mongoose.Schema<IrestaurantDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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

    contact : {
      type : String,
      required : true
    },

    city: {
      type: String,
      required: true,
    },

    state : {
      type : String,
      require : true
    },

    pinCode : {
      type : String,
      require : true
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
      { type: mongoose.Schema.Types.ObjectId, ref: 'Menus' }
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const restaurantModel = mongoose.model("Restaurant", restaurantSchema);