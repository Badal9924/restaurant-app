import toast from "react-hot-toast";
import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
const API_END_POINT = "https://restaurant-app-2-neei.onrender.com/api/v1/user";

export const useUserStore = create<any>()((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  loading: false,

  signup: async (input: any) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        set({
          loading: false,
          user: responseData.userData,
          isAuthenticated: true,
        });
      }

      if (responseData.error) {
        set({ loading: false });
        toast.error(responseData.message);
      }
    } catch (error: any) {
      set({ loading: false });
      console.log("Error Occur -->>", error);
    }
  },

  login: async (input: any) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const responseData = await response.json();
      console.log("Login -->> ", responseData);
      if (responseData.success) {
        toast.success(responseData.message);
        set({
          loading: false,
          user: responseData.userData,
          isAuthenticated: true,
        });
      }

      if (responseData.error) {
        set({ loading: false });
        toast.error(responseData.message);
      }
    } catch (error: any) {
      set({ loading: false });
      console.log("Error Occur -->>", error);
    }
  },

  verify_Email: async (completeOtp: any) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/verifyEmail`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeOtp),
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({
          loading: false,
          user: responseData.userData,
          isAuthenticated: true,
        });

        toast.success(responseData.message);
      }
      if (responseData.error) {
        set({ loading: false });
        toast.error(responseData.message);
      }
    } catch (error) {
      set({ loading: false });
      console.log("Error Occur -->>", error);
    }
  },

  checkAuthentication: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await fetch(`${API_END_POINT}/check-auth`, {
        method: "GET",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        set({
          user: responseData.userData,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      }

      if (responseData.error) {
        set({
          user: null,
          isAuthenticated: false,
          isCheckingAuth: false,
        });
      }
    } catch (error) {
      set({ isAuthenticated: false, isCheckingAuth: false });
      console.log(error);
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/logout`, {
        method: "POST",
        credentials: "include",
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        set({ loading: false, user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  forgotPassword: async (email: string) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        set({ loading: false });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  resetPasswordCall: async (token: string, newPassword: string) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/resetPassword/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({newPassword}),
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        set({ loading: false });
      }
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },

  updateProfile: async (input: any) => {
    try {
      set({ loading: true });
      const response = await fetch(`${API_END_POINT}/profile/update`, {
        method: "PATCH",
        credentials: "include",
        body: input,
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(responseData.message);
        set({
          loading: false,
          user: responseData.updatedUser,
          isAuthenticated: true,
        });
      }
    } catch (error: any) {
      set({ loading: false });
    }
  },
  
}));
