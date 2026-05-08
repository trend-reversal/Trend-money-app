"use client";

import Image from "next/image";
import { Info } from "lucide-react";

export default function GoldPending() {
  return (
    <div className="min-h-screen bg-white flex flex-col px-5 pt-20 pb-8 max-w-[430px] mx-auto">
      {/* Top Content */}
      <div className="flex flex-col items-center">
        {/* Pending Icon */}
        {/* Pending Icon */}
        {/* Pending Icon */}
        <div className="w-[124px] h-[124px] flex items-center justify-center">
          <Image
            src="/images/gold/pending.svg"
            alt="pending"
            width={124}
            height={124}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="mt-10 text-[24px] font-bold text-[#111827]">
          Payment Pending
        </h1>

        <p className="mt-3 text-[18px] text-[#000000] text-center leading-7 font-regular">
          We’ll notify you once your digital
          <br />
          gold is confirmed
        </p>
      </div>

      {/* Gold Card */}
      <div className="mt-10 bg-white rounded-[18px] border border-[#ECECEC] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-5">
          {/* Left */}
          <div>
            <p className="text-[15px] text-[#9CA3AF]">You are buying</p>

            <h2 className="mt-2 text-[24px] font-semibold text-[#D4AA27]">
              0.1602 g
            </h2>

            <p className="mt-1 text-[14px] font-semibold tracking-wide text-[#9CA3AF]">
              24K DIGITAL GOLD
            </p>
          </div>

          {/* Gold Image */}
          <div className="relative w-[115px] h-[90px]">
            <Image
              src="/images/gold/gold-fine.png"
              alt="gold"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Info Box */}
      <div className="w-full h-[42px] rounded-full bg-[#ECECEC] flex items-center px-5 gap-3">
        <Info size={16} color="#6B7280" />

        <p className="text-[12px] text-[#6B7280]">
          We’ll notify you once the payment is confirmed.
        </p>
      </div>

      {/* Continue Button */}
      <button className="w-full h-[54px] rounded-[12px] bg-black text-white text-[18px] font-medium mt-6 active:scale-[0.98] transition">
        Continue
      </button>
    </div>
  );
}
