import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const isAuthApi =
            config.url?.includes("/auth/send-otp") ||
            config.url?.includes("/auth/sign-in");

        if (!isAuthApi) {
            const token = Cookies.get("access_token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const currentPath =
            typeof window !== "undefined"
                ? window.location.pathname
                : "";

        const isLoginPage =
            currentPath.includes("/login");

        if (
            error.response?.status === 401 &&
            !isLoginPage
        ) {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");

            localStorage.removeItem("user");

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;