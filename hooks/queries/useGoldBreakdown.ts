import { useQuery } from "@tanstack/react-query";
import { getGoldBreakdown } from "@/lib/api/safegold";

export const useGoldBreakdown = (
    amount: number,
    rate: number,
) => {
    return useQuery({
        queryKey: ["gold-breakdown", amount, rate],
        queryFn: () =>
            getGoldBreakdown({
                amount,
                type: "RS",
                rate,
            }),
        enabled: !!amount && !!rate,
    });
};