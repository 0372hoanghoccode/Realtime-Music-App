import axios from "axios";
import { toast } from "sonner";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  (config) => {
    // Có thể thêm logic trước khi gửi request ở đây
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Xử lý các lỗi từ response
    const originalRequest = error.config;    // Xử lý token hết hạn (401 Unauthorized)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      const isAuthenticated = (window as any).isUserAuthenticated;

      // Chỉ thử làm mới token nếu người dùng đã đăng nhập trước đó
      if (isAuthenticated) {
        try {
          // Sử dụng hàm refreshToken đã đăng ký trong window
          const refreshAuth = (window as any).refreshAuthToken;

          if (refreshAuth) {
            const newToken = await refreshAuth();
            if (newToken) {
              // Cập nhật token trong header của request gốc
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              // Thử lại request ban đầu với token mới
              return axiosInstance(originalRequest);
            }
          }

          // Nếu không thể làm mới token, đăng xuất người dùng
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        } catch (refreshError) {
          console.error("Error refreshing auth token:", refreshError);
        }
      } else {
        // Nếu người dùng chưa đăng nhập, không hiển thị thông báo lỗi
        console.log("Unauthorized request, but user is not authenticated. Skipping error toast.");
        return Promise.reject(error);
      }

      // Đối với các route không yêu cầu xác thực, chỉ trả về lỗi mà không hiển thị thông báo
      if (originalRequest.url && originalRequest.url.includes('/auth/')) {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }    // Xử lý các lỗi khác
    if (error.response) {
      // Kiểm tra xem người dùng đã đăng nhập hay chưa
      const isAuthenticated = (window as any).isUserAuthenticated;

      // Bỏ qua hiển thị lỗi 401 nếu người dùng chưa đăng nhập
      if (error.response.status === 401 && !isAuthenticated) {
        console.log("Unauthorized error skipped for unauthenticated user");
        return Promise.reject(error);
      }

      // Lỗi từ server với status code
      const statusCode = error.response.status;
      const errorMessage = error.response.data?.message || "Đã xảy ra lỗi từ server";

      switch (statusCode) {
        case 400:
          toast.error(`Yêu cầu không hợp lệ: ${errorMessage}`);
          break;
        case 403:
          toast.error(`Không có quyền truy cập: ${errorMessage}`);
          break;
        case 404:
          toast.error(`Không tìm thấy: ${errorMessage}`);
          break;
        case 500:
          toast.error(`Lỗi server: ${errorMessage}`);
          break;
        default:
          if (statusCode !== 401) { // Bỏ qua thông báo lỗi 401 ở đây
            toast.error(`Lỗi (${statusCode}): ${errorMessage}`);
          }
          break;
      }
    } else if (error.request) {
      // Không nhận được response
      toast.error("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.");
    } else {
      // Lỗi trong quá trình thiết lập request
      toast.error(`Lỗi: ${error.message}`);
    }

    return Promise.reject(error);
  }
);
