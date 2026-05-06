"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoldPage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen pb-6">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="p-2 active:scale-90 transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5"
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Right Side (Price instead of search) */}
        <div className="w-[111px] h-[32.46px] bg-[#F9F8F7] rounded-[18.85px] flex items-center px-2 gap-1.5">
          {/* Wifi Icon */}
          <Image
            src="/images/silver/wifi-silver.svg"
            alt="live"
            width={14}
            height={14}
            className="object-contain"
          />

          {/* Text */}
          <div className="leading-none">
            <p className="text-[6px] text-[#111111] font-medium mb-[2px]">
              Gold Live Price
            </p>

            <p className="text-[9px] font-semibold text-[#111111]">
              ₹10646.08/g
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Hero Card */}
      <div className="mx-4 mt-4 bg-[#F7F4F3] rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm text-gray-600">Gold has soared nearly</p>
          <h1 className="text-3xl font-bold text-[#D99100]">50%</h1>
          <p className="text-sm text-gray-500">this year!</p>

          <p className="text-xs text-gray-400 mt-2">
            Don’t miss this shine, <br /> start your journey today
          </p>
        </div>

        <Image
          src="/images/silver/silver-fine.png"
          alt="silver"
          width={140}
          height={140}
          className="object-contain"
        />
      </div>

      {/* 🔹 Dots */}
      <div className="flex justify-center gap-1 mt-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
      </div>

      {/* 🔹 Quick Actions */}
      {/* 🔹 Quick Actions */}
      <div className="px-4 mt-6">
        <h3 className="text-sm text-gray-500 mb-3">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Daily SIP",
              icon: "/images/gold/daily.png",
            },
            {
              title: "Monthly SIP",
              icon: "/images/gold/monthly.png",
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
              className="
          relative
          w-full
          h-[105px]
          bg-white
          border border-[#F7F7FA]
          rounded-[10px]
          shadow-[0px_4px_4px_rgba(0,0,0,0.04)]
          flex flex-col items-center justify-center
          overflow-hidden
        "
            >
              {/* Recommended Tag */}
              {item.title === "Monthly SIP" && (
                <div
                  className="
              absolute
              top-0
              right-0
              w-[76px]
              h-[20px]
              bg-[#16A34A]
              text-white
              text-[8px]
              font-semibold
              flex items-center justify-center
              rounded-tl-[10px]
              rounded-tr-[2.3px]
              rounded-br-[2.3px]
              rounded-bl-[10px]
            "
                >
                  RECOMMENDED
                </div>
              )}

              {/* Icon */}
              <Image
                src={item.icon}
                alt={item.title}
                width={36}
                height={36}
                className="object-contain"
              />

              {/* Text */}
              <p className="text-[13px] mt-2 text-center leading-tight text-[#1D1D1F] font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 CTA */}
      <div className="mt-6 flex justify-center">
        <button className="w-[330px] h-[51px] bg-[#111111] rounded-[8px] text-white text-[15px] font-medium flex items-center justify-center">
          Start Investing
        </button>
      </div>

      {/* 🔹 Gold Growth Card */}
      <div className="px-4 mt-6">
        {/* Heading */}
        <h2 className="text-[13px] font-medium uppercase text-[#B0B0B0] mb-1 tracking-[0.5px]">
          Market Performance
        </h2>

        <div
          className="
      bg-white
      rounded-[8px]
      border border-[#F7F7FA]
      shadow-[0px_0px_25px_rgba(13,13,13,0.04)]
      p-4
    "
        >
          {/* Top Text */}

          <p className="text-[11px] leading-[22px] text-[#8E95A4]">
            The best to purchase silver was yesterday
            <br />
            but second best is{" "}
            <span className="text-[#69A1E1] font-medium">NOW!</span>
          </p>

          {/* Tabs */}
          <div className="flex justify-between mt-5">
            {["6M", "1Y", "3Y", "5Y"].map((tab) => (
              <button
                key={tab}
                className={`
            w-[68px]
            h-[48px]
            rounded-[12px]
            border
            text-[18px]
            font-medium
            transition-all
            ${
              tab === "3Y"
                ? "bg-[#69A1E1] border-[#69A1E1 ] text-white"
                : "bg-white border-[#E5E7EB] text-[#222222]"
            }
          `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chart Area */}
          <div className="relative mt-6 h-[240px] bg-[#F9F9FB] rounded-lg overflow-hidden">
            {/* Graph */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(105, 161, 225, 0.2)" />
                    <stop offset="108.83%" stopColor="rgba(105, 161, 225, 0)" />
                  </linearGradient>
                </defs>

                {/* Fill */}
                <path
                  d="M0 180 C50 170, 80 150, 110 130 C140 110, 170 120, 200 90 C230 60, 260 80, 300 70 L300 200 L0 200 Z"
                  fill="url(#blueGradient)"
                />

                {/* Line */}
                <path
                  d="M0 180 C50 170, 80 150, 110 130 C140 110, 170 120, 200 90 C230 60, 260 80, 300 70"
                  fill="none"
                  stroke="#69A1E1"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Highlight Dot */}
            <div className="absolute right-[58px] top-[88px] w-[12px] h-[12px] rounded-full bg-[#69A1E1]" />

            {/* Tooltip */}
            <div className="absolute right-[68px] top-[36px] bg-white px-3 py-2 rounded-[10px] border border-[#F3F3F3] shadow-sm">
              <p className="text-[10px] text-[#9CA3AF] text-center">MAY'25</p>
              <p className="text-[13px] font-semibold text-[#69A1E1] text-center">
                ₹1,305.49/g
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Instant SIP */}
      {/* 🔹 Instant SIP (Matched with chart card) */}
      <div className="px-4 mt-6">
        <div
          className="
      bg-[#F9F9FB]
      rounded-lg
      border border-[#F3F3F3]
      shadow
      p-4
      flex justify-between items-start
    "
        >
          {/* LEFT */}
          <div>
            <h3 className="text-[14px] font-semibold text-black">
              Instant SIP
            </h3>

            <p className="text-[10px] text-gray-400 mt-1 leading-tight">
              START SMALL, GROW BIG EVERY MONTH.
            </p>

            <h2 className="text-[26px] font-bold mt-2 text-black">
              ₹2000{" "}
              <span className="text-[12px] text-gray-400 font-medium">
                / MONTH
              </span>
            </h2>

            <button className="mt-4 w-[184px] h-[43px] bg-[#00130C] rounded-[10px] text-white text-[13px] font-medium flex items-center justify-center">
              Instant SIP
            </button>
          </div>

          {/* RIGHT ICON */}
          <div className="w-[38px] h-[38px] bg-[#EEF4FC] rounded-md flex items-center justify-center">
            <svg
              width="14"
              height="26"
              viewBox="0 0 14 26"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path d="M8.5 0L1 14H6L4.5 26L13 10H8L8.5 0Z" fill="#69A1E1" />
            </svg>
          </div>
        </div>
      </div>

      {/* 🔹 Certificates */}
      {/* 🔹 Authenticity Certificate Slider */}
      <div className="px-4 mt-6">
        <h3 className="text-sm text-[#B5B7B9] mb-3 font-inter  uppercase">
          Authenticity Certificate
        </h3>

        <div className="flex gap-4 overflow-x-scroll no-scrollbar snap-x snap-mandatory">
          {[
            "/images/gold/safegold.png",
            "/images/gold/vistra.png",
            "/images/gold/brinks.png",
          ].map((src, i) => (
            <div
              key={i}
              className="
          min-w-[260px]
          h-[300px]
          bg-[#F9F9FB]
          
          
          flex items-center justify-center
          snap-start
          p-1
        "
            >
              <Image
                src={src}
                alt="certificate"
                width={300}
                height={300}
                className="w-full h-full object-contain rounded-[12px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 FAQ */}
      {/* 🔹 FAQ */}
      <div className="px-4 mt-6">
        {/* Heading */}
        <h3 className="text-[15px] font-inter font-semibold text-[#B5B7B9] mb-2">
          FAQs
        </h3>

        {/* FAQ Container */}
        <div className="bg-transparent rounded-[14px] overflow-hidden">
          {[
            {
              question: "Why should I upgrade?",
              answer:
                "Upgrading gives you access to premium features and better investment benefits.",
            },
            {
              question: "What payment methods can I use?",
              answer:
                "You can pay using UPI, debit cards, credit cards, and net banking.",
            },
            {
              question: "How does billing work?",
              answer:
                "Billing is processed automatically according to your selected investment plan.",
            },
            {
              question: "How can I cancel?",
              answer:
                "You can cancel anytime directly from your profile settings.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="border-b border-dashed border-[#E5E5E5] py-5 group"
            >
              {/* Question */}
              <summary className="list-none flex items-start justify-between cursor-pointer">
                <p className="text-[16px] leading-[24px] text-[#111827] font-inter pr-4">
                  {faq.question}
                </p>

                {/* Plus / Minus */}
                <span className="text-[#9CA3AF] text-[22px] leading-none transition-all duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>

              {/* Answer */}
              <p className="mt-3 text-[14px] leading-[22px] text-[#6B7280] pr-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      {/* 🔹 Footer */}
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
              99.9% pure <br /> Silver
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
