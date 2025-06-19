import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    menuId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Menus"
    },

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    quantity : Number
    
},{timestamps : true});

export const cartModel = mongoose.model("cart",cartSchema);