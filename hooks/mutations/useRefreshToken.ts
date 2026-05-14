import { useMutation } from "@tanstack/react-query";

import { refreshToken } from "@/lib/api/auth";

export const useRefreshToken =
    () => {
        return useMutation({
            mutationFn:
                refreshToken,
        });
    };