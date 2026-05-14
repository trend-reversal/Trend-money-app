import axiosInstance from "./axios";

export interface SendOtpPayload {
    phone: string;
}

export interface SignInPayload {
    phone: string;
    otp: string;
}

export interface RefreshTokenPayload {
    refresh_token: string;
}

export const sendOtp = async (payload: SendOtpPayload) => {
    const response = await axiosInstance.post("/auth/send-otp", payload);

    return response.data;
};

export const signIn = async (payload: SignInPayload) => {
    const response = await axiosInstance.post("/auth/sign-in", payload);

    return response.data;
};

export const refreshToken =
    async (
        payload: RefreshTokenPayload
    ) => {
        const response =
            await axiosInstance.post(
                "/auth/refresh-token",
                payload
            );

        return response.data;
    };

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");

    return response.data;
}    