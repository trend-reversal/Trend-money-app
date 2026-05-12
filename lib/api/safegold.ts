import axiosInstance from "./axios";

export const getLiveGoldPrice = async () => {
    const { data } = await axiosInstance.get(
        "/metals/safegold/live-buy-price",
    );

    return data;
};

export const getGoldBreakdown = async (params: {
    amount: number;
    type: string;
    rate: number;
}) => {
    const { data } = await axiosInstance.get(
        "/metals/safegold/buy-breakup",
        {
            params,
        },
    );

    return data;
};

export const verifyGoldPurchase = async (payload: {
    rate_id: number;
    gold_amount: number;
    buy_price: number;
}) => {
    const { data } = await axiosInstance.post(
        "/metals/safegold/buy-verify",
        payload,
    );

    return data;
};

export const confirmGoldPurchase = async (payload: {
    tx_id: number;
    pincode: number;
}) => {
    const { data } = await axiosInstance.post(
        "/metals/safegold/buy-confirm",
        payload,
    );

    return data;
};

export const getGoldPurchaseStatus = async (tx_id: number) => {
    const { data } = await axiosInstance.get(
        "/metals/safegold/buy-status",
        {
            params: {
                tx_id,
            },
        },
    );

    return data;
};

export const fetchGoldBalance = async () => {
    const { data } = await axiosInstance.get(
        "/metals/safegold/fetch-balance",
    );

    return data;
};

export const fetchGoldInvoice = async (
    tx_id: number,
) => {
    const { data } =
        await axiosInstance.get(
            "/metals/safegold/invoice-fetch",
            {
                params: {
                    tx_id,
                },
            },
        );

    return data;
};

export const getGoldTransactionDetails =
    async (txId: number) => {
        const { data } =
            await axiosInstance.get(
                "/metals/safegold/transaction-details",
                {
                    params: {
                        txId,
                    },
                },
            );

        return data;
    };