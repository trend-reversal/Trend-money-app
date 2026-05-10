"use client";

import { useEffect } from "react";

import {
    useRouter,
    useSearchParams,
} from "next/navigation";

import {
    checkPaymentStatus,
} from "@/lib/api/payments";

import {
    confirmGoldPurchase,
    getGoldPurchaseStatus,
} from "@/lib/api/safegold";

export default function PaymentReturnPage() {
    const router = useRouter();

    const searchParams =
        useSearchParams();

    const orderId =
        searchParams.get("orderId");

    const txId =
        searchParams.get("txId");

    useEffect(() => {
        if (!orderId || !txId) {
            router.replace("/gold/failed");

            return;
        }

        let attempts = 0;

        const poll = setInterval(
            async () => {
                attempts++;

                if (attempts > 40) {
                    clearInterval(poll);

                    router.replace(
                        "/gold/failed"
                    );

                    return;
                }

                try {
                    /*
                     * PAYMENT STATUS
                     */

                    const paymentStatus =
                        await checkPaymentStatus(
                            orderId
                        );

                    const state =
                        paymentStatus?.state;

                    console.log(
                        "PAYMENT STATE:",
                        state
                    );

                    /*
                     * SUCCESS
                     */

                    if (
                        state === "COMPLETED"
                    ) {
                        clearInterval(poll);

                        /*
                         * BUY CONFIRM
                         */

                        await confirmGoldPurchase({
                            tx_id: Number(txId),
                        });

                        /*
                         * BUY STATUS
                         */

                        const buyStatus =
                            await getGoldPurchaseStatus(
                                Number(txId)
                            );

                        const status =
                            buyStatus?.status;

                        console.log(
                            "SAFEGOLD STATUS:",
                            status
                        );

                        /*
                         * SUCCESS
                         */

                        if (status === 1) {
                            router.replace(
                                `/gold/success?txId=${txId}&gold=${buyStatus.gold_amount}`
                            );

                            return;
                        }

                        /*
                         * PENDING
                         */

                        if (status === 0) {
                            router.replace(
                                "/gold/pending"
                            );

                            return;
                        }

                        /*
                         * FAILED
                         */

                        router.replace(
                            "/gold/failed"
                        );

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

                        router.replace(
                            "/gold/failed"
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            3000
        );

        return () =>
            clearInterval(poll);
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