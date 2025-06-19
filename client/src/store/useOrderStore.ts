import { create } from "zustand";
const API_END_POINT = "http://localhost:4000/api/v1/order";

type OrderStore = {
  loading: boolean;
  orders: any[]; // You can replace `any` with a proper order type if you have it

  createCheckOutSession: (checkOutSession: any) => Promise<void>;
  getOrderDetails: () => Promise<void>;
};

export const useOrderStore = create<OrderStore>()((set) => ({
  loading: false,
  orders: [],

  createCheckOutSession: async (checkOutSession: any) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${API_END_POINT}/checkout/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkOutSession),
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        set({ loading: false });
        window.location.href = responseData.url;
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  getOrderDetails: async () => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ loading: false, orders: responseData.order });
      }
    } catch (error) {
      set({ loading: false });
    }
  },
}));
