import Image from "next/image";
import { CalendarDays, ShieldCheck, Clock3 } from "lucide-react";

export default function GoldSavingOpportunityCard() {
  return (
    <section className="mx-4 mt-4 overflow-hidden rounded-[18px] bg-white border border-[#F1F1F1]">
      {/* Top Section */}
      <div className="relative px-5 pt-5 pb-4">
        <div className="flex items-start justify-between">
          {/* Left Chart Image */}
          <div className="relative w-[120px] h-[125px] shrink-0">
            <Image
              src="/images/gold/gold-growth.png"
              alt="gold growth"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Right Heading */}
          <div className="flex-1 pl-4 pt-1">
            <h2 className="font-serif text-[30px] leading-[33px] text-black">
              You could’ve
              <br />
              earned ₹
              <span className="inline-block w-[62px] border-b border-black ml-2 translate-y-[-7px]" />
            </h2>

            <p className="font-serif text-[25px] leading-[28px] text-[#B8871B] mt-1">
              by now
            </p>
          </div>
        </div>

        {/* Middle Text Row */}
        <div className="mt-2 flex items-center gap-3">
          <div className="w-[54px] h-[54px] rounded-full bg-[#F8EDCF] flex items-center justify-center shrink-0">
            <CalendarDays
              size={25}
              strokeWidth={1.4}
              className="text-[#C4932D]"
            />
          </div>

          <p className="text-[15px] leading-[21px] text-[#2B2B2B]">
            A ₹100daily SIP in gold adds Up
            <br />
            faster than you think.
          </p>

          <div className="ml-auto w-[42px] h-[42px] rounded-full bg-[#7A2CB8] shadow-[0_0_12px_rgba(122,44,184,0.45)] flex items-center justify-center text-white text-[20px] font-semibold">
            G
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-[#EFEFEF] mx-5" />

      {/* Features */}
      <div className="grid grid-cols-3 px-2 py-5">
        <div className="flex flex-col items-center justify-center">
          <ShieldCheck size={29} strokeWidth={1.4} className="text-[#C4932D]" />
          <p className="text-[12px] text-[#222222] mt-3">100% Secure</p>
        </div>

        <div className="flex flex-col items-center justify-center border-x border-[#EFEFEF]">
          <Image
            src="/images/gold/gold-bars-icon.png"
            alt="24k pure gold"
            width={46}
            height={34}
            className="object-contain"
          />
          <p className="text-[12px] text-[#222222] mt-3">24k Pure Gold</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Clock3 size={29} strokeWidth={1.4} className="text-[#C4932D]" />
          <p className="text-[12px] text-[#222222] mt-3">Instant Liquidity</p>
        </div>
      </div>

      {/* Button */}
      <button className="w-full h-[52px] flex items-center justify-center gap-3 text-[#C4932D] text-[17px] font-medium border-t border-[#F2F2F2]">
        Start Saving
        <span className="text-[24px] leading-none">→</span>
      </button>
    </section>
  );
}
    