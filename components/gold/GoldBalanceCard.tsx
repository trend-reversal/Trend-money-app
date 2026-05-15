import Image from "next/image";

export default function GoldBalanceCard() {
  return (
    <div className="mx-4 mt-5 rounded-[18px] overflow-hidden relative border border-[#D8B14B]">
      {/* Background Image */}
      <Image
        src="/images/gold/gold.png"
        alt="bg"
        fill
        className="object-cover"
      />

      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.18)_100%)] z-[1]" />

      <div className="relative z-10 px-4 py-4">
        {/* Top */}
        <div className="flex items-center gap-2">
          <p className="text-[13px] text-[#111111]">Gold Balance</p>

          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3C4.5 3 1.61 5.18 0.5 8C1.61 10.82 4.5 13 8 13C11.5 13 14.39 10.82 15.5 8C14.39 5.18 11.5 3 8 3Z"
              stroke="#515151"
              strokeWidth="1.5"
            />

            <circle cx="8" cy="8" r="2.5" stroke="#515151" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <h2 className="text-[42px] leading-[44px] font-bold text-black">
              ₹2,486
            </h2>

            <p className="text-[22px] text-black mt-1">0.1374 g</p>
          </div>

          <Image
            src="/images/gold/gold-fine.png"
            alt="gold"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button className="w-[150px] h-[42px] rounded-[8px] border border-[#5A4A17] bg-transparent text-[#5A4A17] text-[14px] font-medium">
            Withdraw
          </button>

          <button className="w-[150px] h-[42px] rounded-[8px] bg-black text-white text-[14px] font-medium">
            Invest More
          </button>
        </div>
      </div>
    </div>
  );
}
