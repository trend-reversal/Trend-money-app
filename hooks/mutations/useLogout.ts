"use client";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { logout } from "@/lib/api/auth";

export const useLogout = () => {
    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            // Remove Cookies
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");

            // Remove User Data
            localStorage.removeItem("user");

            // React Native WebView Support
            if (
                typeof window !== "undefined" &&
                window.ReactNativeWebView
            ) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: "LOGOUT",
                    })
                );
            }

            // Redirect
            window.location.href = "/";
        },

        onError: () => {
            // Even if API fails → clear local session
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");

            localStorage.removeItem("user");

            window.location.href = "/";
        },
    });
};