"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editMenu = exports.addMenu = void 0;
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const MenuModel_1 = require("../models/MenuModel");
const RestaurantModel_1 = require("../models/RestaurantModel");
const addMenu = async (req, res) => {
    try {
        const { restaurantName, menuName, description, sellingPrice, costPrice, cuisine,
        // image,
         } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Image is required..",
            });
        }
        const imageUrl = await (0, imageUpload_1.default)(file);
        const restaurant = await RestaurantModel_1.restaurantModel.findOne({ user: req.id });
        const menu = await MenuModel_1.MenuModel.create({
            restaurantId: restaurant?._id,
            cuisine,
            restaurantName,
            menuName,
            description,
            sellingPrice,
            costPrice,
            image: imageUrl,
        });
        if (restaurant) {
            restaurant.menus.push(menu?._id);
            await restaurant.save();
            return res.status(201).json({
                success: true,
                error: false,
                message: "Menu added successfully..",
                menu,
            });
        }
        else {
            res.status(404).json({
                success: false,
                error: true,
                message: "No restaurant Found for this user",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || "An internal error Occur",
        });
    }
};
exports.addMenu = addMenu;
const editMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const { restaurantName, menuName, description, sellingPrice, costPrice } = req.body;
        const file = req.file;
        const menu = await MenuModel_1.MenuModel.findById(id);
        if (!menu) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Menu not found..",
            });
        }
        if (menuName)
            menu.menuName = menuName;
        if (description)
            menu.description = description;
        if (sellingPrice)
            menu.sellingPrice = sellingPrice;
        if (costPrice)
            menu.costPrice = costPrice;
        if (restaurantName)
            menu.restaurantName = restaurantName;
        if (file) {
            const imageUrl = await (0, imageUpload_1.default)(file);
            menu.image = imageUrl;
        }
        await menu.save();
        return res.status(200).json({
            success: true,
            error: false,
            message: "Menu Updated successfully...",
            menu,
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            success: false,
            message: error.message || "An internal error Occur",
        });
    }
};
exports.editMenu = editMenu;
// Create a controller to delete the Menu by YourSelf :)
