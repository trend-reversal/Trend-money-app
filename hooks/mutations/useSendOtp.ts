"use client";

import { useMutation } from "@tanstack/react-query";
import { sendOtp } from "@/lib/api/auth";

export const useSendOtp = () => {
    return useMutation({
        mutationFn: sendOtp,
    });
};