"use client";

export default function GoldFailed() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6 pt-20 pb-10 max-w-[430px] mx-auto">
      {/* Failed Icon — pink outer ring + red circle */}
      <div className="w-[110px] h-[110px] rounded-full bg-[#FEE2E2] flex items-center justify-center">
        <div className="w-[76px] h-[76px] rounded-full bg-[#B91C1C] flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 8v5"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16.5" r="1.2" fill="white" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-[24px] font-bold leading-[32px] tracking-[0px] text-[#111827] text-center">
        Payment Failed
      </h1>

      <p className="mt-4 text-[12px] text-[#111111] text-center leading-[36px] font-normal px-2">
        Something went wrong with your
        <br />
        transaction. Please check your payment
        <br />
        method and try again.
      </p>

      {/* Order Summary Card */}
      <div className="w-full mt-10 bg-white rounded-[16px] border border-[#ECECEC] overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[13px] text-[#9CA3AF]">Order Summary</p>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[#ECECEC] mx-5" />

        {/* Amount Row */}
        <div className="flex justify-between items-center px-5 py-4">
          <span className="text-[14px] text-[#9CA3AF]">Amount</span>
          <span className="text-[16px] font-semibold text-[#111111]">
            ₹2000
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-[#ECECEC] mx-5" />

        {/* Transaction ID Row */}
        <div className="flex justify-between items-center px-5 py-4">
          <span className="text-[14px] text-[#9CA3AF]">Transaction ID</span>
          <span className="text-[16px] font-bold text-[#111111]">
            75212457896
          </span>
        </div>
      </div>

      {/* Info Banner */}
      <div className="w-[316px] h-[38px] mt-4 bg-[#F3F4F6] rounded-[18px] px-4 flex items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0"
        >
          <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="1.8" />

          <path
            d="M12 11v5"
            stroke="#9CA3AF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          <circle cx="12" cy="8" r="0.8" fill="#9CA3AF" />
        </svg>

        <p className="text-[11px] text-[#6B7280] leading-none">
          If money is deducted, it will be refunded within 3-7 days.
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Retry Button */}
      <button className="w-full h-[54px] rounded-[10px] bg-[#111111] text-white text-[16px] font-medium mt-10 active:scale-[0.98] transition">
        Retry
      </button>
    </div>
  );
}
