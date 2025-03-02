import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
    isAdmin: boolean;
    isAuthenticated: boolean; 
    isLoading: boolean;
    error: string | null;

    checkAdminStatus: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/check");
            set({ isAdmin: response.data.admin });
        } catch (error: any) {
            set({ isAdmin: false, error: error.response?.data?.message || "Error checking admin status" });
        } finally {
            set({ isLoading: false });
        }
    },

    checkAuthStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ isAuthenticated: response.data.authenticated });
        } catch (error: any) {
            set({ isAuthenticated: false, error: error.response?.data?.message || "Error checking authentication" });
        } finally {
            set({ isLoading: false });
        }
    },

    reset: () => {
        set({ isAdmin: false, isAuthenticated: false, isLoading: false, error: null });
    },
}));
