import { Request, Response } from "express";
import upLoadImageOnCloudinary from "../utils/imageUpload";
import { MenuModel } from "../models/MenuModel";
import { restaurantModel } from "../models/RestaurantModel";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      menuName,
      description,
      sellingPrice,
      costPrice,
      cuisine,
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

    const imageUrl = await upLoadImageOnCloudinary(file);

    const restaurant = await restaurantModel.findOne({ user: req.id });
    const menu: any = await MenuModel.create({
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
    } else {
      res.status(404).json({
        success: false,
        error: true,
        message: "No restaurant Found for this user",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: true,
      success: false,
      message: error.message || "An internal error Occur",
    });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { restaurantName, menuName, description, sellingPrice, costPrice } =
      req.body;
    const file = req.file;

    const menu = await MenuModel.findById(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Menu not found..",
      });
    }

    if (menuName) menu.menuName = menuName;
    if (description) menu.description = description;
    if (sellingPrice) menu.sellingPrice = sellingPrice;
    if (costPrice) menu.costPrice = costPrice;
    if (restaurantName) menu.restaurantName = restaurantName;

    if (file) {
      const imageUrl = await upLoadImageOnCloudinary(file);
      menu.image = imageUrl;
    }
    await menu.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "Menu Updated successfully...",
      menu,
    });
  } catch (error: any) {
    res.status(500).json({
      error: true,
      success: false,
      message: error.message || "An internal error Occur",
    });
  }
};

// Create a controller to delete the Menu by YourSelf :)
