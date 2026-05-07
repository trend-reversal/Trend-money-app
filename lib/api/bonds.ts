import axiosInstance from "./axios";

export const getAssets = async () => {
    const response = await axiosInstance.get("/bonds/client/assets");

    return response.data;
};

interface RedirectUrlPayload {
    page: string;
    section: string;
    assetId: number;
}

export const getBondRedirectUrl = async ({
    page,
    section,
    assetId,
}: RedirectUrlPayload) => {
    const response = await axiosInstance.get(
        `/bonds/redirect-url`,
        {
            params: {
                page,
                section,
                assetId,
            },
        }
    );

    return response.data;
};