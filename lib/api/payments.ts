import axiosInstance from "./axios";


export interface CreatePaymentPayload {
    amount: number;
    safegold_tx_id: number;
    productType: string;
    deviceName: string;
    isNativeApp: boolean;
}

export const createPayment = async (
    payload: CreatePaymentPayload
) => {
    const response =
        await axiosInstance.post(
            "/phonepe/create-payment",
            payload
        );

    return response.data;
};

export const checkPaymentStatus = async (orderId: string) => {
    const { data } = await axiosInstance.get(
        "/phonepe/check-status",
        {
            params: {
                orderId,
            },
        },
    );

    return data;
};