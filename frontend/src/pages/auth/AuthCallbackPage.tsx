import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded) return;

      if (!user) {
        setError("Không thể xác thực người dùng. Vui lòng thử lại.");
        setProcessing(false);
        return;
      }

      try {
        console.log("User data being sent:", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

        // Thêm thêm thông tin user nếu có
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
          email: user.primaryEmailAddress?.emailAddress, // Thêm email nếu có
          // Có thể thêm các thông tin khác từ Clerk nếu cần
        };

        await axiosInstance.post("/auth/callback", userData);

        // Hiển thị thông báo thành công
        toast.success("Đăng nhập thành công!");

        // Chuyển hướng sau khi đăng nhập thành công
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error: any) {
        console.error("Error in auth callback", error);
        setError(error.response?.data?.message || "Có lỗi xảy ra khi xác thực. Vui lòng thử lại.");
        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
        setProcessing(false);
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
      <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
        <CardContent className='flex flex-col items-center gap-4 pt-6 py-8'>
          {processing ? (
            <>
              <Loader className='size-6 text-emerald-500 animate-spin' />
              <h3 className="text-zinc-400 text-xl font-bold">Đang xác thực...</h3>
              <p className="text-zinc-400 text-sm">Vui lòng đợi trong khi chúng tôi xác minh thông tin đăng nhập của bạn.</p>
            </>
          ) : (
            <>
              <div className="bg-red-500/10 p-3 rounded-full">
                <Loader className='size-6 text-red-500' />
              </div>
              <h3 className="text-red-400 text-xl font-bold">Xác thực thất bại</h3>
              <p className="text-zinc-400 text-sm text-center">{error || "Có lỗi xảy ra khi xác thực tài khoản của bạn."}</p>
              <Button
                onClick={() => navigate("/")}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Quay lại trang chủ
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default AuthCallbackPage;
