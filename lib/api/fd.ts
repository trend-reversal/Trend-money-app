import api from "./axios";

export const getFDPage = async () => {
    const response = await api.get(
        "/app/fd-page"
    );

    return response.data;
};

export const getFDRedirectUrl = async ({
    issuer,
    tenure = 1825,
    amount = 500000,
}: {
    issuer: string;
    tenure?: number;
    amount?: number;
}) => {
    const response = await api.get(
        "/fixed/redirect-url",
        {
            params: {
                issuer,
                tenure,
                amount,
                payout: "Maturity",
                senior: false,
                tax: false,
                women: false,
                renewal: "no",
                redirect: "fd_select",
            },
        }
    );

    return response.data;
};