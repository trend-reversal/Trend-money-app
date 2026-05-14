import axiosInstance from "./axios";

export const getUser = async () => {
    const response = await axiosInstance.get("/user/me");

    return response.data;
};

export const updateUser = async (payload: any) => {
    const response = await axiosInstance.patch("/user/me", payload);

    return response.data;
};

export const deleteUser = async (payload: {
    reason: string;
    others?: string;
}) => {
    const response = await axiosInstance.delete("/user", {
        data: payload,
    });

    return response.data;
};