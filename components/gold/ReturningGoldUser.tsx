"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReturningGoldUser() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen pb-10 max-w-[430px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12">
        <button onClick={() => router.back()}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#111111"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Live Price */}
        <div className="bg-[#FFF4DD] rounded-full px-3 py-2 flex items-center gap-2">
          <Image src="/images/wifi.svg" alt="wifi" width={14} height={14} />

          <div>
            <p className="text-[7px] text-black">Gold Live Price</p>

            <p className="text-[10px] font-semibold text-black">₹10646.08/g</p>
          </div>
        </div>
      </div>

      {/* Balance Card */}
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

              <circle
                cx="8"
                cy="8"
                r="2.5"
                stroke="#515151"
                strokeWidth="1.5"
              />
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

      {/* Quick Actions */}
      <div className="px-4 mt-5">
        <p className="text-[12px] text-[#B5B7B9] uppercase mb-3">
          Quick Actions
        </p>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Daily SIP",
              icon: "/images/gold/daily.png",
            },
            {
              title: "Monthly SIP",
              icon: "/images/gold/monthly.png",
              recommended: true,
            },
            {
              title: "Weekly SIP",
              icon: "/images/gold/weekly.png",
            },
            {
              title: "One-Time Investment",
              icon: "/images/gold/onetime.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-[14px] border h-[106px] flex flex-col items-center justify-center ${
                item.recommended ? "border-[#D4AF37]" : "border-[#ECECEC]"
              }`}
            >
              {item.recommended && (
                <div className="absolute top-0 right-0 bg-[#22C55E] text-white text-[8px] px-2 py-1 rounded-tr-[14px] rounded-bl-[10px]">
                  RECOMMENDED
                </div>
              )}

              <Image src={item.icon} alt={item.title} width={36} height={36} />

              <p className="mt-2 text-[14px] text-black">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 mt-5">
        <button className="w-full h-[54px] bg-black rounded-[10px] text-white text-[16px] font-medium">
          Start Investing
        </button>
      </div>

      {/* Jewellery Banner */}
      <div className="px-4 mt-5">
        <Image
          src="/images/gold/jewellery.png"
          alt="banner"
          width={400}
          height={160}
          className="w-full rounded-[16px]"
        />
      </div>

      {/* Market Performance */}
      <div className="px-4 mt-6">
        <p className="text-[12px] text-[#B5B7B9] uppercase">
          Market Performance
        </p>

        {/* Tabs */}
        <div className="flex gap-3 mt-4">
          {["6M", "1Y", "3Y", "5Y"].map((tab) => (
            <button
              key={tab}
              className={`w-[56px] h-[36px] rounded-[8px] text-[14px] ${
                tab === "3Y"
                  ? "bg-[#D4AF37] text-white"
                  : "bg-white border border-[#ECECEC] text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Graph */}
        <div className="relative mt-5 h-[320px] bg-white rounded-[18px] overflow-hidden border border-[#F3F3F3]">
          <svg
            viewBox="0 0 300 200"
            className="absolute bottom-0 left-0 w-full h-full"
          >
            <path
              d="M0 180 C50 175, 90 160, 120 120 C150 80, 190 100, 230 60 C250 40, 270 70, 300 40"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
            />

            <path
              d="M0 180 C50 175, 90 160, 120 120 C150 80, 190 100, 230 60 C250 40, 270 70, 300 40 L300 220 L0 220 Z"
              fill="#D4AF37"
              opacity="0.12"
            />
          </svg>

          {/* Dot */}
          <div className="absolute right-[52px] top-[110px] w-[12px] h-[12px] rounded-full bg-[#D4AF37]" />

          {/* Tooltip */}
          <div className="absolute right-[64px] top-[70px] bg-white rounded-[10px] border border-[#ECECEC] px-3 py-2 shadow-sm">
            <p className="text-[10px] text-[#9CA3AF]">MAY'25</p>

            <p className="text-[14px] font-semibold text-[#D4AF37]">
              ₹1,305.49/g
            </p>
          </div>
        </div>
      </div>
      {/* Earn Section */}
      <div className="mt-8">
        <Image
          src="/images/gold/earns.png"
          alt="earns"
          width={386}
          height={387}
          className="w-full h-auto object-contain"
        />
      </div>
      {/* Journey Section */}
      <div className="mt-8">
        <Image
          src="/images/gold/journy.png"
          alt="journey"
          width={386}
          height={520}
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="mt-6 py-10 bg-[linear-gradient(175.54deg,#FCF4E8_3.61%,#FEFAF4_22.19%,#FFFFFF_40.77%)]">
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* Left Laurel */}
          <Image
            src="/images/lief-left.png"
            alt="left"
            width={24}
            height={24}
            className="object-contain"
          />

          <div className="text-center">
            <p className="text-[13px] leading-[18px] font-medium tracking-[0.5px] text-[#C5A14A] uppercase">
              Secured With Industry
            </p>

            <p className="text-[13px] leading-[18px] font-medium tracking-[0.5px] text-[#C5A14A] uppercase">
              Grade Protection
            </p>
          </div>

          {/* Right Laurel */}
          <Image
            src="/images/lief-right.png"
            alt="right"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>

        <div className="flex gap-4 overflow-x-scroll no-scrollbar snap-x snap-mandatory px-4">
          {[
            "/images/gold/safegold.png",
            "/images/gold/vistra.png",
            "/images/gold/brinks.png",
          ].map((src, i) => (
            <div key={i} className="min-w-[260px] snap-start">
              <Image
                src={src}
                alt="certificate"
                width={300}
                height={300}
                className="w-full h-auto object-contain rounded-[12px]"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Explore Gold */}
      <div className="px-4 mt-8">
        {/* Heading */}
        <p className="text-[11px] uppercase tracking-[1px] text-[#B5B7B9] mb-3">
          Explore Gold
        </p>

        {/* Items */}
        {[
          "Start SIP",
          "One-Time Investment",
          "Convert to jewellery",
          "Withdraw",
          "Faqs",
        ].map((item, i) => (
          <button
            key={i}
            className="w-full h-[58px] border-b border-dashed border-[#E5E7EB] flex items-center justify-between"
          >
            <span className="text-[18px] text-[#111827] font-normal">
              {item}
            </span>

            <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
              <path
                d="M1 6H9"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <path
                d="M5 2L9 6L5 10"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
      <div className="mt-10 px-6 pb-8">
        {/* View More */}
        <div className="flex justify-center">
          <button className="text-[14px] text-[#C3C3C5] border-b border-[#C3C3C5] pb-[2px] tracking-wide">
            VIEW MORE
          </button>
        </div>

        {/* Features */}
        <div className="flex justify-between items-center mt-10 text-center">
          {/* Item 1 */}
          <div className="flex-1">
            <p className="text-[18px] leading-[34px] text-[#C3C3C5] font-normal">
              100% Safe & <br /> Secure
            </p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-[92px] bg-[#E5E5E5]" />

          {/* Item 2 */}
          <div className="flex-1">
            <p className="text-[18px] leading-[34px] text-[#C3C3C5] font-normal">
              24k Gold <br /> Savings
            </p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-[92px] bg-[#E5E5E5]" />

          {/* Item 3 */}
          <div className="flex-1">
            <p className="text-[18px] leading-[34px] text-[#C3C3C5] font-normal">
              Withdraw <br /> Anytime
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-center justify-between mt-14">
          <h3 className="text-[16px] font-medium text-black">Disclaimer</h3>

          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
