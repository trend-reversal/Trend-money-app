import { useQuery } from "@tanstack/react-query";
import { getLiveGoldPrice } from "@/lib/api/safegold";

export const useGoldPrice = () => {
    return useQuery({
        queryKey: ["gold-price"],
        queryFn: getLiveGoldPrice,
        refetchInterval: 10000,
    });
};