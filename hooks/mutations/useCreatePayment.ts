"use client";

import { useMutation } from "@tanstack/react-query";
import { createPayment } from "@/lib/api/payments";

export const useCreatePayment = () => {
    return useMutation({
        mutationFn: createPayment,
    });
};