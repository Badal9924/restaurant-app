"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartItems = exports.updateCartItems = exports.viewCartItems = exports.addToCart = void 0;
const CartModel_1 = require("../models/CartModel");
const addToCart = async (req, res) => {
    try {
        const { menuId } = req?.body;
        const currentUserId = req?.id;
        const isMenuAvailable = await CartModel_1.cartModel.findOne({
            menuId,
            userId: currentUserId,
        });
        if (isMenuAvailable) {
            return res.json({
                success: false,
                error: true,
                message: "Menu already exist in Cart",
            });
        }
        const payload = {
            menuId,
            userId: currentUserId,
            quantity: 1,
        };
        const newItem = new CartModel_1.cartModel(payload);
        const savedItemInCart = await newItem.save();
        return res.status(200).json({
            data: savedItemInCart,
            success: true,
            error: false,
            message: "Item added to cart",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An Internal Error Occur",
        });
    }
};
exports.addToCart = addToCart;
const viewCartItems = async (req, res) => {
    try {
        const loginedUser = req?.id;
        const allItems = await CartModel_1.cartModel
            .find({ userId: loginedUser })
            .populate("menuId");
        return res.json({
            success: true,
            error: false,
            cartItems: allItems,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An Internal Error Occur",
        });
    }
};
exports.viewCartItems = viewCartItems;
const updateCartItems = async (req, res) => {
    try {
        const menuItemId = req?.body?.id;
        const qty = req?.body?.quantity;
        const updatedmenuItem = await CartModel_1.cartModel.findByIdAndUpdate(menuItemId, {
            quantity: qty,
        }, { new: true });
        return res.status(200).json({
            data: updatedmenuItem,
            success: true,
            error: false,
            message: "Items Updated",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An Internal Error Occur",
        });
    }
};
exports.updateCartItems = updateCartItems;
const deleteCartItems = async (req, res) => {
    try {
        const menuItemId = req?.body?.id;
        const deletedItem = await CartModel_1.cartModel.findByIdAndDelete(menuItemId);
        return res.status(200).json({
            deletedItem,
            success: true,
            error: false,
            message: "Item removed from the cart",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "An Internal Error Occur",
        });
    }
};
exports.deleteCartItems = deleteCartItems;
