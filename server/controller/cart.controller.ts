import { cartModel } from "../models/CartModel";

export const addToCart = async (req: any, res: any) => {
  try {
    const { menuId } = req?.body;
    const currentUserId = req?.id;
    const isMenuAvailable = await cartModel.findOne({
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
    const newItem = new cartModel(payload);
    const savedItemInCart = await newItem.save();
    return res.status(200).json({
      data: savedItemInCart,
      success: true,
      error: false,
      message: "Item added to cart",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "An Internal Error Occur",
    });
  }
};

export const viewCartItems = async (req: any, res: any) => {
  try {
    const loginedUser = req?.id;
    const allItems = await cartModel
      .find({ userId: loginedUser })
      .populate("menuId");
    return res.json({
      success: true,
      error: false,
      cartItems: allItems,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "An Internal Error Occur",
    });
  }
};

export const updateCartItems = async (req: any, res: any) => {
  try {
    const menuItemId = req?.body?.id;
    const qty = req?.body?.quantity;
    const updatedmenuItem = await cartModel.findByIdAndUpdate(
      menuItemId,
      {
        quantity: qty,
      },
      { new: true }
    );
    return res.status(200).json({
      data: updatedmenuItem,
      success: true,
      error: false,
      message: "Items Updated",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "An Internal Error Occur",
    });
  }
};

export const deleteCartItems = async (req: any, res: any) => {
  try {
    const menuItemId = req?.body?.id;
    const deletedItem = await cartModel.findByIdAndDelete(menuItemId);
    return res.status(200).json({
      deletedItem,
      success: true,
      error: false,
      message: "Item removed from the cart",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message || "An Internal Error Occur",
    });
  }
};