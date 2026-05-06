"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InvestPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const press = (val: string) => {
    if (val === "." && amount.includes(".")) return;
    if (amount.length >= 10) return;
    setAmount((prev) => prev + val);
  };

  const del = () => setAmount((prev) => prev.slice(0, -1));

  return (
    <div className="min-h-screen bg-[#F9F7F4] px-5 pt-12 pb-6 flex flex-col">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="w-fit mb-7 active:scale-90 transition"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 9H3"
            stroke="#000000"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M9 15L3 9L9 3"
            stroke="#000000"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Security */}
      <div className="flex items-center gap-3 pb-5 border-b border-dashed border-[#E8D7BA]">
        <div className="w-[44px] h-[44px] rounded-full border-[1.5px] border-[#E8D7BA] bg-[#FDF8F2] flex items-center justify-center flex-shrink-0 text-[18px]">
          🛡️
        </div>
        <div>
          <p className="text-[15px] font-semibold text-[#1A1A1A]">
            Safe. Secure. Encrypted.
          </p>
          <p className="text-[13px] text-[#888] mt-0.5">
            Your transaction is 100% protected.
          </p>
        </div>
      </div>

      {/* Tag */}
      <div className="flex justify-center mt-5">
        <div className="h-[32px] px-4 rounded-full border-[1.5px] border-[#E2D0B8] bg-[#F5EFE5] flex items-center gap-1.5 text-[13px] text-[#8B7355] font-medium">
          ✏️ Enter amount
        </div>
      </div>

      {/* Amount */}
      <div className="mt-9 px-0.5">
        <p className="text-[13px] tracking-[3px] text-[#ABABAB] uppercase font-normal">
          Enter Investment Amount
        </p>
        <div className="flex items-center mt-2.5 min-h-[58px]">
          <span className="text-[44px] font-light text-[#111]">
            {amount ? `₹${amount}` : ""}
          </span>
          <span className="inline-block w-[2px] h-[46px] bg-[#333] rounded-sm ml-0.5 animate-pulse" />
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-y-4 gap-x-3 mt-7 justify-items-center">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map((num) => (
          <button
            key={num}
            onClick={() => press(num)}
            className="w-[86px] h-[86px] rounded-full bg-[#F4EFE8] border-[1.5px] border-[#E6DACC] text-[26px] text-black active:scale-95 active:bg-[#EBE4D8] transition"
          >
            {num}
          </button>
        ))}
        <button
          onClick={del}
          className="w-[86px] h-[86px] rounded-full bg-[#F4EFE8] border-[1.5px] border-[#E6DACC] text-[22px] text-[#6B5B45] active:scale-95 active:bg-[#EBE4D8] transition"
        >
          ⌫
        </button>
      </div>

      {/* Continue */}
      <button className="mt-auto h-[60px] rounded-[14px] bg-[#111] text-white text-[20px] font-medium active:scale-[0.98] transition tracking-[0.2px]">
        Continue
      </button>

      {/* Footer */}
      <div className="flex items-center justify-center gap-1.5 mt-3.5">
        <span className="text-[12px] text-[#888]">Secured by</span>
        <div className="w-[18px] h-[18px] rounded-full bg-[#5F259F] flex items-center justify-center">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
            <path d="M17.5 7.5C17.5 5.57 15.93 4 14 4H8V20H11V14H14C15.93 14 17.5 12.43 17.5 10.5V7.5ZM14.5 10.5C14.5 11.33 13.83 12 13 12H11V6H13C13.83 6 14.5 6.67 14.5 7.5V10.5Z" />
          </svg>
        </div>
        <span className="text-[12px] font-semibold text-[#5F259F]">
          PhonePe
        </span>
      </div>
    </div>
  );
}
