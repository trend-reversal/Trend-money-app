import Image from "next/image";

export default function GoldPromoCard() {
  return (
    <div className="mx-4 mt-4 relative overflow-hidden rounded-[18px] bg-[#FAF8F5] border border-[#ECECEC] pointer-events-none">
      {/* Background Image */}
      <Image
        src="/images/gold/gold.png"
        alt="gold-bg"
        fill
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        priority
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-between px-[18px] py-[16px]">
        {/* Left Content */}
        <div className="flex-1">
          {/* Top Text */}
          <p className="font-serif text-[15px] leading-[16px] text-black whitespace-nowrap">
            Gold has soared nearly
          </p>

          {/* 50% */}
          <div className="flex items-end mt-[4px] gap-[4px]">
            <span className="font-serif text-[38px] leading-[38px] text-[#FFFFFF]">
              50%
            </span>

            <span className="font-serif text-[16px] leading-[16px] text-black mb-[4px] whitespace-nowrap">
              this year!
            </span>
          </div>

          {/* Divider */}
          <div className="w-[28px] h-[1px] bg-black mt-[8px] mb-[10px]" />

          {/* Bottom Text */}
          <p className="font-serif text-[9px] leading-[11px] text-black">
            Don’t miss the shine,
          </p>

          <p className="font-serif text-[9px] leading-[11px] text-[#1A1A1A] mt-[2px]">
            start your journey today
          </p>
        </div>

        {/* Right Gold Image */}
        <Image
          src="/images/gold/gold-fine.png"
          alt="gold"
          width={160}
          height={160}
          className="object-contain -mr-4 relative z-10"
        />
      </div>
    </div>
  );
}
