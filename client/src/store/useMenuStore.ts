import toast from "react-hot-toast";
import { create } from "zustand";
const API_END_POINT = "http://localhost:4000/api/v1/menu";

type MenuStore = {
  loading: boolean;
  Editloading: boolean;
  menu: any; // You can replace `any` with a specific Menu[] or Menu type if you have one
  singleMenuData: any; // Same here – replace with specific type if available

  createMenu: (formData: FormData) => Promise<void>;
  editMenu: (menuId: string, formData: FormData) => Promise<void>;
};

export const useMenuStore = create<MenuStore>()((set) => ({
  loading: false,
  menu: null,
  Editloading : false,
  singleMenuData : null,

  createMenu: async (formData: FormData) => {
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
      toast(error.message);
      set({ loading: false });
    }
  },

  editMenu: async (menuId: string, formData: FormData) => {
    try {
        const response = await fetch(`${API_END_POINT}/${menuId}`, {
            method: "PATCH",
            credentials: "include",
            body: formData,
          });
          const responseData = await response.json();      
          if (responseData.success) {
            set({ loading: false });
            toast.success(responseData.message);
          }
    } catch (error:any) {
        set({loading : false});
        toast.error(error.message);
    }
  },

}));
