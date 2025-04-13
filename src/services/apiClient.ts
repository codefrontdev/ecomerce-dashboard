/** @format */

import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة Interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`API Error: ${error.response?.data || error.message}`);
    return Promise.reject(error);
  }
);

// أضف Interceptor للتعامل مع Request قبل الإرسال
apiClient.interceptors.request.use(
  (config) => {
    // إذا كان الـ body يحتوي على FormData (مثل الصور)
    if (config.data instanceof FormData) {
      // لا تقم بتعيين Content-Type يدويا، لأن axios سيتولى تعيينه تلقائيًا
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
