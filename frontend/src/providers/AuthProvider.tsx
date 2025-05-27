import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const updateApiToken = (token: string | null) => {
  if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus, checkAuthStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  // Tạo hàm refreshToken có thể được sử dụng bởi các interceptor
  const refreshToken = useCallback(async () => {
    try {
      const token = await getToken({ skipCache: true });
      if (token) {
        updateApiToken(token);
        return token;
      }
      return null;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  }, [getToken]);
  // Đăng ký hàm refreshToken với window để có thể truy cập từ axios interceptor
  useEffect(() => {
    // Thêm vào window object để các interceptor có thể sử dụng
    (window as any).refreshAuthToken = refreshToken;
    // Thiết lập trạng thái đăng nhập ban đầu
    (window as any).isUserAuthenticated = false;

    return () => {
      // Cleanup khi component unmount
      delete (window as any).refreshAuthToken;
      delete (window as any).isUserAuthenticated;
    };
  }, [refreshToken]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuthStatus();

        const token = await getToken();
        console.log("Clerk Token:", token);
        console.log("Is signed in:", isSignedIn);

        updateApiToken(token);

        if (token) {
          // Cập nhật trạng thái đăng nhập trong store và window
          useAuthStore.setState({ isAuthenticated: true });
          (window as any).isUserAuthenticated = true;

          await checkAdminStatus();
          if (userId) initSocket(userId);
        } else {
          // Đặt trạng thái khi không có token
          useAuthStore.setState({ isAuthenticated: false });
          (window as any).isUserAuthenticated = false;
        }
      } catch (error: any) {
        updateApiToken(null);
        useAuthStore.setState({ isAuthenticated: false });
        console.error("Error in auth provider:", error);
        toast.error("Có lỗi xảy ra khi xác thực. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // clean up
    return () => disconnectSocket();
  }, [getToken, userId, isSignedIn, checkAdminStatus, checkAuthStatus, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <Loader className='size-8 text-emerald-500 animate-spin' />
      </div>
    );

  return <>{children}</>;
};

export default AuthProvider;
