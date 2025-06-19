import { create } from "zustand";
const API_END_POINT = "http://localhost:4000/api/v1/city";

type CityStore = {
  cityList: any[]; // Replace `any` with your actual city type if available
  getAllCityList: () => Promise<void>;
};

export const useCityStore = create<CityStore>()((set) => ({
  cityList: [],

  getAllCityList: async () => {
    try {
      const response = await fetch(`${API_END_POINT}`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      set({ cityList: responseData.data });
    } catch (error) {
      console.log("Error -->> ", error);
    }
  },
}));
