import toast from "react-hot-toast";
import { create } from "zustand";
const API_END_POINT = "http://localhost:4000/api/v1/cart";

type CartStore = {
  cart: any[];
  addToCart: (item: any) =>  Promise<any>;
  viewCartItems: () => void;
  FullPageLoader: boolean;
  IncreaseCartItems: (id: string, quantity: number) => Promise<any>;
  decreaseCartItems: (id: string, quantity: number) => Promise<any>;
  deleteCartItem: (id: string) => Promise<any>;
};

export const useCartStore = create<CartStore>()((set) => ({
  cart: [],
  FullPageLoader: false,

  // Add Items to cart :)
  addToCart: async (id: any) => {
    try {
      set({ FullPageLoader: true });
      const response = await fetch(`${API_END_POINT}/addtocart`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuId: id }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ FullPageLoader: false });
        toast.success(responseData.message);
      }
      if (responseData.error) {
        set({ FullPageLoader: false });
        toast.error(responseData.message);
      }
      return responseData;
    } catch (error: any) {
      set({ FullPageLoader: false });
      console.log(error);
    }
  },

  // View all cartItems of logined User :)
  viewCartItems: async () => {
    try {
      set({ FullPageLoader: true });
      const response = await fetch(`${API_END_POINT}/viewcartitems`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ cart: responseData?.cartItems, FullPageLoader: false });
      }
    } catch (error) {
      set({ FullPageLoader: false });
      console.log(error);
    }
  },

  IncreaseCartItems: async (id: any, quantity: any) => {
    try {
      set({ FullPageLoader: true });
      const response = await fetch(`${API_END_POINT}/updatecartitems`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, quantity: quantity + 1 }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ FullPageLoader: false });
      }

      if (responseData.error) {
        set({ FullPageLoader: false });
        toast.error(responseData.message);
      }
      return responseData;
    } catch (error: any) {
      console.log(error);
    }
  },

  decreaseCartItems: async (id: any, quantity: any) => {
    try {
      set({ FullPageLoader: true });
      const response = await fetch(`${API_END_POINT}/updatecartitems`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, quantity: quantity - 1 }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ FullPageLoader: false });
      }

      if (responseData.error) {
        set({ FullPageLoader: false });
        toast.error(responseData.message);
      }
      return responseData;
    } catch (error: any) {
      console.log(error);
    }
  },

  deleteCartItem: async (id: any) => {
    try {
      set({ FullPageLoader: true });
      const response = await fetch(`${API_END_POINT}/deleteitemincart`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ FullPageLoader: false });
        toast.success(responseData.message);
      }
      if (responseData.error) {
        set({ FullPageLoader: false });
        toast.error(responseData.message);
      }
      return responseData;
    } catch (error) {
      console.log(error);
    }
  },
}));
