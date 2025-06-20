"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleRestaurant = exports.searchRestaurant = exports.updateOrderStatus = exports.getRestaurantOrder = exports.updateRestaurant = exports.getRestaurant = exports.createRestaurant = void 0;
const RestaurantModel_1 = require("../models/RestaurantModel");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const OrderModel_1 = require("../models/OrderModel");
const MenuModel_1 = require("../models/MenuModel");
const createRestaurant = async (req, res) => {
    try {
        const { restaurantName, country, cuisines, city, deliveryTime, contact, email, state, pinCode } = req.body;
        const file = req.file;
        const restaurant = await RestaurantModel_1.restaurantModel.findOne({
            user: req.id,
        });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Restaurant already exist for this user..",
            });
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Image is required..",
            });
        }
        const imageUrl = await (0, imageUpload_1.default)(file);
        await RestaurantModel_1.restaurantModel.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            contact,
            email,
            state,
            pinCode,
            imageUrl,
        });
        return res.status(201).json({
            success: true,
            error: false,
            message: "Restaurant created successfully..",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.createRestaurant = createRestaurant;
const getRestaurant = async (req, res) => {
    try {
        const restaurant = await RestaurantModel_1.restaurantModel
            .findOne({ user: req.id })
            .populate("menus");
        if (!restaurant) {
            return res.json({
                success: false,
                restaurant: [],
                error: true,
                message: "Restaurant not found...",
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            restaurant,
        });
    }
    catch (error) {
        return res.json({
            m: "xc",
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.getRestaurant = getRestaurant;
const updateRestaurant = async (req, res) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines, email, contact, state, pinCode, } = req.body;
        const restaurant = await RestaurantModel_1.restaurantModel.findOne({ user: req.id });
        const file = req.file;
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Restaurant not found...",
            });
        }
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.email = email;
        restaurant.contact = contact;
        restaurant.state = state;
        restaurant.pinCode = pinCode;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);
        if (file) {
            const imageUrl = await (0, imageUpload_1.default)(file);
            restaurant.imageUrl = imageUrl;
        }
        else {
            console.log("File not exist :( ");
        }
        await restaurant.save();
        res.status(200).json({
            success: true,
            error: false,
            message: "Restaurant Updated Successfully ",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.updateRestaurant = updateRestaurant;
const getRestaurantOrder = async (req, res) => {
    try {
        const restaurant = await RestaurantModel_1.restaurantModel.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Restaurant not found...",
            });
        }
        const orders = await OrderModel_1.OrderModel.find({
            "cartItems.restaurantId": restaurant._id,
        })
            .populate("cartItems.restaurantId")
            .populate("user");
        return res.status(200).json({
            success: true,
            error: false,
            orders,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.getRestaurantOrder = getRestaurantOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, cartItemId } = req.body;
        const order = await OrderModel_1.OrderModel.updateOne({ "cartItems._id": cartItemId }, { $set: { "cartItems.$[elem].status": status } }, { arrayFilters: [{ "elem._id": cartItemId }] });
        return res.status(200).json({
            success: true,
            error: false,
            message: "Status Updated",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const searchRestaurant = async (req, res) => {
    try {
        const searchText = req.params.searchText || ""; // search by country and city name
        const searchQuery = req.query.searchQuery || ""; // search by cuisines & restaurantName & Menu
        const selectedCuisines = (req.query.cuisines || "")
            .split(",")
            .filter((cuisines) => cuisines);
        const query = {};
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: "i" } },
                { city: { $regex: searchText, $options: "i" } },
                { country: { $regex: searchText, $options: "i" } },
            ];
        }
        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchQuery, $options: "i" } },
                { cuisine: { $regex: searchQuery, $options: "i" } },
                { menuName: { $regex: searchQuery, $options: "i" } },
            ];
        }
        const filterMenu = await MenuModel_1.MenuModel.find({
            cuisine: { $in: selectedCuisines },
        });
        const restaurants = await RestaurantModel_1.restaurantModel.find(query);
        const menuBySearching = await MenuModel_1.MenuModel.find(query);
        const searchedMenuList = [...menuBySearching, ...filterMenu];
        return res.status(200).json({
            success: true,
            error: false,
            data: restaurants,
            searchedMenuList,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.searchRestaurant = searchRestaurant;
const getSingleRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params?.id;
        const restaurant = await RestaurantModel_1.restaurantModel.findById(restaurantId).populate({
            path: "menus",
            options: { sort: { createdAt: -1 } },
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Restaurant not found....",
            });
        }
        return res.status(200).json({
            success: true,
            error: false,
            restaurant,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error..",
        });
    }
};
exports.getSingleRestaurant = getSingleRestaurant;
