"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    checkSipStatus,
} from "@/lib/api/payments";

import {
    confirmGoldPurchase,
    getGoldPurchaseStatus,
} from "@/lib/api/safegold";

type Props = {
    orderId?: string;
    txId?: string;
};

export default function SipReturnClient({
    orderId,
    txId,
}: Props) {
    const router = useRouter();

    useEffect(() => {
        /*
         * PWA FALLBACK
         */

        const storedOrderId =
            localStorage.getItem(
                "sip_order_id",
            );

        const storedTxId =
            localStorage.getItem(
                "sip_tx_id",
            );

        const finalOrderId =
            orderId || storedOrderId;

        const finalTxId =
            txId || storedTxId;

        if (
            !finalOrderId ||
            !finalTxId
        ) {
            router.replace(
                "/gold/failed",
            );

            return;
        }

        let attempts = 0;

        const poll = setInterval(
            async () => {
                attempts++;

                /*
                 * MAX RETRIES
                 */

                if (attempts > 40) {
                    clearInterval(poll);

                    router.replace(
                        "/gold/failed",
                    );

                    return;
                }

                try {
                    const paymentStatus =
                        await checkSipStatus(
                            finalOrderId,
                        );

                    const state =
                        paymentStatus?.status;

                    /*
                     * SIP SUCCESS
                     */

                    if (
                        state ===
                        "COMPLETED"
                    ) {
                        clearInterval(poll);

                        /*
                         * CONFIRM GOLD
                         */

                        await confirmGoldPurchase(
                            {
                                tx_id:
                                    Number(
                                        finalTxId,
                                    ),
                                pincode: 201301,
                            },
                        );

                        /*
                         * FINAL GOLD STATUS
                         */

                        const buyStatus =
                            await getGoldPurchaseStatus(
                                Number(
                                    finalTxId,
                                ),
                            );

                        const status =
                            buyStatus?.status;

                        /*
                         * SUCCESS
                         */

                        if (status === 1) {
                            localStorage.removeItem(
                                "sip_order_id",
                            );

                            localStorage.removeItem(
                                "sip_tx_id",
                            );

                            router.replace(
                                `/gold/success?txId=${finalTxId}&gold=${buyStatus.gold_amount}`,
                            );

                            return;
                        }

                        /*
                         * PENDING
                         */

                        if (status === 0) {
                            router.replace(
                                "/gold/pending",
                            );

                            return;
                        }

                        /*
                         * FAILED
                         */

                        router.replace(
                            "/gold/failed",
                        );

                        return;
                    }

                    /*
                     * SIP FAILED
                     */

                    if (
                        state ===
                        "FAILED" ||
                        state ===
                        "CANCELLED"
                    ) {
                        clearInterval(poll);

                        router.replace(
                            "/gold/failed",
                        );
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            3000,
        );

        return () =>
            clearInterval(poll);
    }, [orderId, txId, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                <h2 className="text-[22px] font-semibold text-black">
                    Verifying SIP Mandate
                </h2>

                <p className="mt-2 text-[14px] text-[#777777]">
                    Please wait while we confirm your SIP setup.
                </p>
            </div>
        </div>
    );
}