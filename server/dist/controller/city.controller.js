"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAvailableCity = void 0;
const RestaurantModel_1 = require("../models/RestaurantModel");
const getAllAvailableCity = async (req, res) => {
    try {
        const cityList = await RestaurantModel_1.restaurantModel.find({});
        if (cityList.length === 0) {
            return res.status(500).json({
                error: true,
                success: false,
                message: "An internal error occur..",
            });
        }
        return res.status(200).json({
            success: true,
            data: cityList,
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
exports.getAllAvailableCity = getAllAvailableCity;
