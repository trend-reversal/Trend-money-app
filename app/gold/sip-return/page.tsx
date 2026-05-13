import SipReturnClient from "./SipReturnClient";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        orderId?: string;
        txId?: string;
    }>;
}) {
    const params =
        await searchParams;

    return (
        <SipReturnClient
            orderId={params.orderId}
            txId={params.txId}
        />
    );
}