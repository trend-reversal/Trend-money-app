import { useQuery } from "@tanstack/react-query";
import { getFDPage } from "@/lib/api/fd";

export const useFDs = () => {
    return useQuery({
        queryKey: ["fd-page"],
        queryFn: getFDPage,
    });
};