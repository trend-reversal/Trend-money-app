"use client";

import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { deleteUser } from "@/lib/api/user";

export const useDeleteUser = () => {
    return useMutation({
        mutationFn: deleteUser,

        onSuccess: () => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");

            localStorage.removeItem("user");

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
        },
    });
};