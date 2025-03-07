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
            console.log("Admin check response:", response.data);
        } catch (error: any) {
            console.error("Admin check error:", error);
            set({ isAdmin: false, error: error.response?.data?.message || "Error checking admin status" });
        } finally {
            set({ isLoading: false });
        }
    },

    checkAuthStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const hasAuthHeader = !!axiosInstance.defaults.headers.common["Authorization"];
            console.log("Has auth header:", hasAuthHeader);

            if (hasAuthHeader) {
                try {
                    const response = await axiosInstance.get("/auth/check");
                    console.log("Auth check response:", response.data);
                    set({ isAuthenticated: response.data.authenticated });
                } catch (error) {
                    console.log("API auth check failed, but token exists - setting authenticated");
                    set({ isAuthenticated: true });
                }
            } else {
                console.log("No auth header - setting not authenticated");
                set({ isAuthenticated: false });
            }
        } catch (error: any) {
            console.error("Auth check general error:", error);
            set({ isAuthenticated: false, error: error.response?.data?.message || "Error checking authentication" });
        } finally {
            set({ isLoading: false });
        }
    },

    reset: () => {
        set({ isAdmin: false, isAuthenticated: false, isLoading: false, error: null });
    },
}));
