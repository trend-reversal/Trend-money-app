import { useQuery } from "@tanstack/react-query";
import { getHistoricalGoldPrice } from "@/lib/api/safegold";

type Params = {
    from_date: string;
    to_date: string;
    type?: string;
};

export const useGoldHistoricalPrice = (
    params: Params,
) => {
    return useQuery({
        queryKey: [
            "gold-historical-price",
            params,
        ],
        queryFn: () =>
            getHistoricalGoldPrice(params),
    });
};