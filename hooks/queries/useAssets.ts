"use client";

import { getAssets } from "@/lib/api/bonds";
import { useQuery } from "@tanstack/react-query";


export const useAssets = () => {
    return useQuery({
        queryKey: ["assets"],
        queryFn: getAssets,
    });
};