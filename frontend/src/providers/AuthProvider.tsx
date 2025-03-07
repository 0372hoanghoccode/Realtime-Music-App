import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
  if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus, checkAuthStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuthStatus();

        const token = await getToken();
        console.log("Clerk Token:", token);
        console.log("Is signed in:", isSignedIn);

        updateApiToken(token);

        if (token) {
          useAuthStore.setState({ isAuthenticated: true });
          await checkAdminStatus();
          if (userId) initSocket(userId);
        } else {
          useAuthStore.setState({ isAuthenticated: false });
        }
      } catch (error: any) {
        updateApiToken(null);
        useAuthStore.setState({ isAuthenticated: false });
        console.log("Error in auth provider", error);
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
