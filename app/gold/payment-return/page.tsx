import PaymentReturnClient from "./PaymentReturnClient";

export const dynamic = "force-dynamic";

type Props = {
    searchParams: Promise<{
        orderId?: string;
        txId?: string;
    }>;
};

export default async function Page({
    searchParams,
}: Props) {
    const params = await searchParams;

    return (
        <PaymentReturnClient
            orderId={params.orderId}
            txId={params.txId}
        />
    );
}