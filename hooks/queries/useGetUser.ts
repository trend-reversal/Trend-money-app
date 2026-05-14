import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/lib/api/user";

export const useGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });
};