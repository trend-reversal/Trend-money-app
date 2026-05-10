"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function GoldSuccess() {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const txId = searchParams.get("txId");
  const gold = searchParams.get("gold");
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-16 pb-10 max-w-[430px] mx-auto">
      {/* Success Icon */}
      <div className="w-[124px] h-[124px] rounded-full bg-[#22C55E] flex items-center justify-center shadow-lg">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13L10 18L19 7"
            stroke="white"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="mt-8 text-[22px] font-bold text-[#111827]">
        Congratulations!
      </h1>

      <p className="mt-2 text-[15px] text-[#6B7280] text-center">
        Your Gold purchase is successful.
      </p>

      {/* Gold Card */}
      <div className="w-full mt-10 bg-white rounded-[18px] border border-[#EAEAEA] overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-5 py-5">
          {/* Left */}
          <div>
            <p className="text-[15px] text-[#9CA3AF]">You bought</p>

            <h2 className="mt-1 text-[28px] font-bold text-[#111827]">
              {gold} g
            </h2>

            <p className="mt-1 text-[14px] font-semibold tracking-wide text-[#9CA3AF]">
              24K DIGITAL GOLD
            </p>
          </div>

          {/* Gold Image */}
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
          <span className="text-[16px] text-[#9CA3AF]">Amount Paid</span>

          <span className="text-[22px] font-semibold text-[#111827]">
            ₹{amount}
          </span>
        </div>

        <div className="border-t border-dashed border-[#E5E7EB] my-5" />

        <div className="flex items-center justify-between">
          <span className="text-[16px] text-[#9CA3AF]">Transaction ID</span>

          <span className="text-[18px] font-semibold text-[#111827]">
            {txId}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <button className="w-full h-[56px] rounded-[12px] bg-black text-white text-[18px] font-medium mt-8 active:scale-[0.98] transition">
        Continue
      </button>

      {/* Invoice */}
      <button className="flex items-center gap-2 mt-7 text-[16px] font-medium text-black">
        Download Invoice
        <Download size={20} />
      </button>
    </div>
  );
}
