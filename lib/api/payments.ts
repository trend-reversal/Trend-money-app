import axiosInstance from "./axios";


export interface CreatePaymentPayload {
    amount: number;
    safegold_tx_id: number;
    productType: string;
    deviceName: string;
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