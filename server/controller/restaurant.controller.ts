import { Request, Response } from "express";
import { restaurantModel } from "../models/RestaurantModel";
import { Multer } from "multer";
import upLoadImageOnCloudinary from "../utils/imageUpload";
import { OrderModel } from "../models/OrderModel";
import { MenuModel } from "../models/MenuModel";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      country,
      cuisines,
      city,
      deliveryTime,
      contact,
      email,
      state,
      pinCode
    } = req.body;

    const file = req.file;
    const restaurant = await restaurantModel.findOne({
      user: req.id as String,
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

    const imageUrl = await upLoadImageOnCloudinary(file);
    await restaurantModel.create({
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantModel
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
  } catch (error: any) {
    return res.json({
      m: "xc",
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines,
      email,
      contact,
      state,
      pinCode,
    } = req.body;

    const restaurant = await restaurantModel.findOne({ user: req.id });
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
      const imageUrl = await upLoadImageOnCloudinary(
        file as Express.Multer.File
      );

      restaurant.imageUrl = imageUrl;
    } else {
      console.log("File not exist :( ");
    }

    await restaurant.save();
    res.status(200).json({
      success: true,
      error: false,
      message: "Restaurant Updated Successfully ",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const getRestaurantOrder = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantModel.findOne({ user: req.id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Restaurant not found...",
      });
    }

    const orders = await OrderModel.find({
      "cartItems.restaurantId": restaurant._id,
    })
      .populate("cartItems.restaurantId")
      .populate("user");

    return res.status(200).json({
      success: true,
      error: false,
      orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status, cartItemId } = req.body;
    const order = await OrderModel.updateOne(
      { "cartItems._id": cartItemId },
      { $set: { "cartItems.$[elem].status": status } },
      { arrayFilters: [{ "elem._id": cartItemId }] }
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "Status Updated",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || ""; // search by country and city name
    const searchQuery = req.query.searchQuery || ""; // search by cuisines & restaurantName & Menu

    const selectedCuisines = ((req.query.cuisines as string) || "")
      .split(",")
      .filter((cuisines) => cuisines);

    const query: any = {};

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

    const filterMenu = await MenuModel.find({
      cuisine: { $in: selectedCuisines },
    });

    const restaurants = await restaurantModel.find(query);
    const menuBySearching = await MenuModel.find(query);
    const searchedMenuList = [...menuBySearching, ...filterMenu];

    return res.status(200).json({
      success: true,
      error: false,
      data: restaurants,
      searchedMenuList,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};

export const getSingleRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params?.id;
    const restaurant = await restaurantModel.findById(restaurantId).populate({
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "Internal server error..",
    });
  }
};
