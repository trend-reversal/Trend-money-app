"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

import {
  fetchGoldInvoice,
  getGoldTransactionDetails,
} from "@/lib/api/safegold";

type Props = {
  txId?: string;
};

type TransactionDetails = {
  goldAmount: string;
  buyPrice: number;
  invoiceUrl: string;
};

export default function GoldSuccess({
  txId,
}: Props) {
  const [details, setDetails] =
    useState<TransactionDetails | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDetails =
      async () => {
        try {
          if (!txId) return;

          const response =
            await getGoldTransactionDetails(
              Number(txId),
            );

          setDetails(
            response?.data,
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDetails();
  }, [txId]);

  const handleDownloadInvoice = async () => {
    try {
      if (!txId) return;

      const response = await fetchGoldInvoice(Number(txId));

      const invoiceUrl =
        response?.link ||
        response?.data?.link ||
        details?.invoiceUrl;

      if (!invoiceUrl) {
        alert("Invoice not available");
        return;
      }

      // Send to React Native to open in browser
      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'OPEN_EXTERNAL_URL',
            url: invoiceUrl,
          })
        );
      } else {
        // PWA fallback
        window.open(invoiceUrl, '_blank');
      }

    } catch (error) {
      console.log(error);
      alert("Failed to download invoice");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[16px] text-[#777777]">
          Loading transaction...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-16 pb-10 max-w-[430px] mx-auto">
      {/* Success Icon */}
      <div className="w-[124px] h-[124px] rounded-full bg-[#22C55E] flex items-center justify-center shadow-lg">
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 13L10 18L19 7"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="mt-8 text-[22px] font-bold text-[#111827]">
        Congratulations!
      </h1>

      <p className="mt-2 text-[15px] text-[#6B7280] text-center">
        Your Gold purchase is successful.
      </p>

      {/* Gold Card */}
      <div className="w-full mt-10 bg-white rounded-[18px] border border-[#EAEAEA] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-5">
          <div>
            <p className="text-[15px] text-[#9CA3AF]">
              You bought
            </p>

            <h2 className="mt-1 text-[28px] font-bold text-[#111827]">
              {Number(
                details?.goldAmount,
              ).toFixed(4)}{" "}
              g
            </h2>

            <p className="mt-1 text-[14px] font-semibold tracking-wide text-[#9CA3AF]">
              24K DIGITAL GOLD
            </p>
          </div>

          <div className="relative w-[120px] h-[90px]">
            <Image
              src="/images/gold/gold-fine.png"
              alt="gold"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Transaction Card */}
      <div className="w-full mt-5 bg-white rounded-[18px] border border-[#EAEAEA] px-5 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[16px] text-[#9CA3AF]">
            Amount Paid
          </span>

          <span className="text-[22px] font-semibold text-[#111827]">
            ₹
            {Number(
              details?.buyPrice,
            ).toLocaleString(
              "en-IN",
            )}
          </span>
        </div>

        <div className="border-t border-dashed border-[#E5E7EB] my-5" />

        <div className="flex items-center justify-between">
          <span className="text-[16px] text-[#9CA3AF]">
            Transaction ID
          </span>

          <span className="text-[18px] font-semibold text-[#111827]">
            {txId}
          </span>
        </div>
      </div>

      <button className="w-full h-[56px] rounded-[12px] bg-black text-white text-[18px] font-medium mt-8 active:scale-[0.98] transition">
        Continue
      </button>

      <button
        onClick={handleDownloadInvoice}
        className="flex items-center gap-2 mt-7 text-[16px] font-medium text-black"
      >
        Download Invoice
        <Download size={20} />
      </button>
    </div>
  );
}