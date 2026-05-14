import axiosInstance from "./axios";


export interface CreatePaymentPayload {
    amount: number;
    safegold_tx_id: number;
    productType: string;
    deviceName: string;
    isNativeApp: boolean;
}
export interface CreateSipIntentPayload {
    frequency: string;
    amount: number;
    deviceOS: string;
    targetApp: string;
    safegoldTxId: number;
    productType: string;
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

export const createSipIntent = async (
    payload: CreateSipIntentPayload,
) => {
    const { data } = await axiosInstance.post(
        "/phonepe/autopay/upi_intent",
        payload,
    );

    return data;
};

export const checkSipStatus = async (
    merchantOrderId: string,
) => {
    const { data } = await axiosInstance.get(
        "/phonepe/autopay/order-status",
        {
            params: {
                merchantOrderId,
            },
        },
    );

    return data;
};