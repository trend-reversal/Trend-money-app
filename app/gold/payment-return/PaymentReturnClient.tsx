"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { checkPaymentStatus } from "@/lib/api/payments";

import {
    confirmGoldPurchase,
    getGoldPurchaseStatus,
} from "@/lib/api/safegold";

type Props = {
    orderId?: string;
    txId?: string;
};

export default function PaymentReturnClient({
    orderId,
    txId,
}: Props) {
    const router = useRouter();

    useEffect(() => {
        if (!orderId || !txId) {
            router.replace("/gold/failed");
            return;
        }

        let attempts = 0;

        const poll = setInterval(async () => {
            attempts++;

            if (attempts > 40) {
                clearInterval(poll);
                router.replace("/gold/failed");
                return;
            }

            try {
                const paymentStatus =
                    await checkPaymentStatus(orderId);

                const state = paymentStatus?.state;

                /*
                 * PAYMENT SUCCESS
                 */

                if (state === "COMPLETED") {
                    clearInterval(poll);

                    await confirmGoldPurchase({
                        tx_id: Number(txId),
                    });

                    const buyStatus =
                        await getGoldPurchaseStatus(
                            Number(txId)
                        );

                    const status = buyStatus?.status;

                    /*
                     * GOLD SUCCESS
                     */

                    if (status === 1) {
                        router.replace(
                            `/gold/success?txId=${txId}&gold=${buyStatus.gold_amount}`
                        );

                        return;
                    }

                    /*
                     * GOLD PENDING
                     */

                    if (status === 0) {
                        router.replace("/gold/pending");
                        return;
                    }

                    /*
                     * GOLD FAILED
                     */

                    router.replace("/gold/failed");
                    return;
                }

                /*
                 * PAYMENT FAILED
                 */

                if (
                    state === "FAILED" ||
                    state === "CANCELLED"
                ) {
                    clearInterval(poll);
                    router.replace("/gold/failed");
                }
            } catch (error) {
                console.error(error);
            }
        }, 3000);

        return () => clearInterval(poll);
    }, [orderId, txId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h2 className="text-[22px] font-semibold text-black">
                    Verifying Payment
                </h2>

                <p className="mt-2 text-[14px] text-[#777777]">
                    Please wait while we confirm your gold purchase.
                </p>
            </div>
        </div>
    );
}