import toast from "react-hot-toast";
import { create } from "zustand";
const API_END_POINT = "http://localhost:4000/api/v1/restaurant";

export const useRestaurantStore = create<any>()((set) => ({
  loading: false,
  restaurant: null,
  searchedRestaurant: null,
  appliedFilter: JSON.parse(localStorage.getItem("appliedFilter") || "[]"),
  singleRestaurant: null,
  restaurantOrder: [],
  searchedMenuList: [],

  ceateRestaurantData: async (formData: any) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ loading: false });
        toast.success(responseData.message);
      }
    } catch (error: any) {
      console.log(error);
      toast(error.message);
      set({ loading: false });
    }
  },

  getRestaurantData: async () => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ loading: false, restaurant: responseData?.restaurant });
      }

      if (responseData.error) {
        set({ restaurant: null, loading: false });
      }
    } catch (error: any) {
      toast(error.message);
      set({ restaurant: null, loading: false });
    }
  },

  updateRestaurant: async (data: FormData) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}`, {
        method: "PUT",
        credentials: "include",
        body: data,
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        set({ loading: false });
      }
    } catch (error: any) {
      set({ loading: false });
      toast.error(error.message);
    }
  },

  searchRestaurant: async (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => {
    try {
      set({ loading: true });
      const response = await fetch(
        `${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}&cuisines=${selectedCuisines}`,
        {
          credentials: "include",
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        set({
          loading: false,
          searchedRestaurant: responseData.data,
          searchedMenuList: responseData.searchedMenuList,
        });
      }

      if (responseData.error) {
        set({ loading: false, searchedRestaurant: null });
      }
    } catch (error: any) {
      console.log(error);
      set({ loading: false });
      toast.error(error.message);
    }
  },

  setAppliedFilter: (value: string) => {
    set((state: any) => {
      const isAlreadyApplied = state.appliedFilter.includes(value);
      const updatedFilter = isAlreadyApplied
        ? state.appliedFilter.filter((item:any) => item !== value)
        : [...state.appliedFilter, value];
      localStorage.setItem("appliedFilter", JSON.stringify(updatedFilter));
      return { appliedFilter: updatedFilter };
    });
  },

  resetAppliedFilter: () => {
    set({ appliedFilter: [] });
  },

  getSingleRestaurantDetails: async (restaurantId: string) => {
    try {
      const response = await fetch(`${API_END_POINT}/${restaurantId}`, {
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ singleRestaurant: responseData?.restaurant });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getRestaurantOrders: async () => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/order`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({ loading: false, restaurantOrder: responseData.orders });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  updateRestaurantOrderStatus: async (
    orderId: any,
    status: any,
    cartItemId: any
  ) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/order/${orderId}/status`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, cartItemId }),
      });
      const respponseData = await response.json();
      if (respponseData.success) {
        toast.success(respponseData?.message);
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));
