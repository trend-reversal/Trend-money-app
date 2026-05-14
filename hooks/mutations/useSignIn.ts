"use client";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { signIn } from "@/lib/api/auth";

export const useSignIn = () => {
    return useMutation({
        mutationFn: signIn,

        onSuccess: (response) => {
            const data = response?.data;

            const user = data?.user;
            const tokens = data?.tokens;

            if (tokens?.access_token) {
                Cookies.set("access_token", tokens.access_token);
            }

            if (tokens?.refresh_token) {
                Cookies.set("refresh_token", tokens.refresh_token);
            }

            if (user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        id: user?.id || "",
                        name: user?.name || "",
                        firstName: user?.firstName || "",
                        lastName: user?.lastName || "",
                        email: user?.email || "",
                        phone: user?.phone || "",
                        roles: user?.roles || [],
                        isActive: user?.isActive || false,
                        isFirstLogin: user?.isFirstLogin || false,
                    })
                );
            }

            if (
                typeof window !== "undefined" &&
                window.ReactNativeWebView
            ) {
                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        type: "SAVE_AUTH",
                        accessToken:
                            tokens.access_token,
                        refreshToken:
                            tokens.refresh_token,
                        user,
                    }),
                );
            }

            window.location.href = "/home";
        },
    });
};