"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoldPage() {
  const router = useRouter();

  return (
    <div className="bg-[#F7F7FA] min-h-screen pb-6">
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
        <div className="bg-[#FFF3E0] px-3 py-1 rounded-full text-[12px] text-[#D99100] font-medium">
          ₹10646.08/g
        </div>
      </div>

      {/* 🔹 Hero Card */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-sm text-gray-600">Gold has soared nearly</p>
          <h1 className="text-3xl font-bold text-[#D99100]">50%</h1>
          <p className="text-sm text-gray-500">this year!</p>

          <p className="text-xs text-gray-400 mt-2">
            Don’t miss this shine, <br /> start your journey today
          </p>
        </div>

        <Image
          src="/images/gold/gold-fine.png"
          alt="gold"
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
              className="relative h-[105px] bg-white border border-[#F7F7FA] rounded-[10px] flex flex-col items-center justify-center"
            >
              {/* Recommended Tag */}
              {item.title === "Monthly SIP" && (
                <span className="absolute top-2 right-2 text-[9px] bg-[#E6F9F0] text-[#12B76A] px-2 py-[2px] rounded-full">
                  RECOMMENDED
                </span>
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
              <p className="text-[13px] mt-2 text-center leading-tight">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 CTA */}
      <div className="px-4 mt-6">
        <button className="w-full bg-black text-white py-3 rounded-xl font-medium">
          Start Investing
        </button>
      </div>

      {/* 🔹 Exclusive Benefit */}
      <div className="px-4 mt-6">
        <Image
          src="/images/gold/jewellery.png"
          alt="jewellery"
          width={400}
          height={160}
          className="w-full h-[160px] object-cover rounded-2xl"
        />
      </div>

      <div className="px-4 mt-6">
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
          <p className="text-[11px] text-gray-400 leading-tight">
            The best to purchase gold was yesterday <br />
            but second best is{" "}
            <span className="text-[#D99100] font-semibold">NOW!</span>
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {["6M", "1Y", "3Y", "5Y"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1.5 rounded-md text-[12px] border ${
                  tab === "3Y"
                    ? "bg-[#D4AF37] text-white border-[#D4AF37]"
                    : "bg-white text-gray-500 border-[#E5E7EB]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chart Area */}
          <div className="relative mt-6 h-[240px] bg-[#F9F9FB] rounded-lg overflow-hidden">
            {/* Fake Graph Line */}
            <div className="absolute bottom-0 left-0 w-full h-full">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                <path
                  d="M0 180 C50 170, 80 150, 110 130 C140 110, 170 120, 200 90 C230 60, 260 80, 300 70"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />

                {/* Area fill */}
                <path
                  d="M0 180 C50 170, 80 150, 110 130 C140 110, 170 120, 200 90 C230 60, 260 80, 300 70 L300 200 L0 200 Z"
                  fill="#D4AF37"
                  opacity="0.15"
                />
              </svg>
            </div>

            {/* Highlight Dot */}
            <div className="absolute right-[60px] top-[90px] w-3 h-3 bg-[#D4AF37] rounded-full" />

            {/* Tooltip */}
            <div className="absolute right-[70px] top-[40px] bg-white px-3 py-2 rounded-md shadow text-center border border-[#F3F3F3]">
              <p className="text-[10px] text-gray-400">MAY'25</p>
              <p className="text-[13px] font-semibold text-[#D4AF37]">
                ₹1,305.49/g
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Instant SIP */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            START SMALL, GROW BIG EVERY MONTH
          </p>

          <h2 className="text-3xl font-bold mt-1">
            ₹2000 <span className="text-sm text-gray-500">/ MONTH</span>
          </h2>

          <button className="mt-4 bg-[#0B5E4E] text-white w-full py-2 rounded-lg">
            Instant SIP
          </button>
        </div>
      </div>

      {/* 🔹 Certificates */}
      {/* 🔹 Authenticity Certificate Slider */}
      <div className="px-4 mt-6">
        <h3 className="text-sm text-gray-400 mb-3">Authenticity Certificate</h3>

        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory">
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
          rounded-[16px]
          border border-[#EBEBEB]
          shadow-[0px_4px_10px_rgba(0,0,0,0.08)]
          flex items-center justify-center
          snap-start
          p-4
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
      <div className="px-4 mt-6">
        <h3 className="text-sm text-gray-500 mb-3">FAQs</h3>

        {[
          "Why should I upgrade?",
          "What payment methods can I use?",
          "How does billing work?",
          "How can I cancel?",
        ].map((q, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-lg mb-2 flex justify-between items-center"
          >
            <p className="text-sm">{q}</p>
            <span>+</span>
          </div>
        ))}
      </div>

      {/* 🔹 Footer */}
      <div className="text-center text-xs text-gray-400 mt-6">
        100% Safe & Secure • 24k Gold Savings • Withdraw Anytime
      </div>
    </div>
  );
}
