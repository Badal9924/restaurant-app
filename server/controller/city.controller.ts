import { restaurantModel } from "../models/RestaurantModel";

export const getAllAvailableCity = async (req: any, res: any) => {
  try {
    const cityList = await restaurantModel.find({});
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "An Internal Error Occur",
    });
  }
};
