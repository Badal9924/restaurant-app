import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  number: Number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  lastLogin?: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  state?: string;
  pincode?: string;
  superAdmin?: boolean;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
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

    superAdmin : {
      type : Boolean,
      default : false
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
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
