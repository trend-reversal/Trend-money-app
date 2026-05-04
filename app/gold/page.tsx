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
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[#D99100] font-semibold text-sm">
            Convert your gold into jewellery
          </p>

          <div className="flex gap-4 mt-3">
            <Image
              src="/images/caratlane.png"
              alt="brand"
              width={80}
              height={30}
            />
            <Image
              src="/images/tanishq.png"
              alt="brand"
              width={80}
              height={30}
            />
          </div>

          <Image
            src="/images/jewellery.png"
            alt="jewellery"
            width={300}
            height={120}
            className="mt-3 rounded-lg"
          />
        </div>
      </div>

      {/* 🔹 Market Performance */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-sm text-gray-500 mb-3">Market Performance</p>

          <div className="flex gap-2 mb-4">
            {["6M", "1Y", "3Y", "5Y"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-lg text-sm ${
                  tab === "3Y"
                    ? "bg-[#D99100] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="h-40 bg-[#F7F7FA] rounded-xl flex items-center justify-center text-gray-400 text-sm">
            Graph Placeholder
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
      <div className="px-4 mt-6">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-sm text-gray-500">In Partnership with</p>

          <Image
            src="/images/safegold.png"
            alt="safegold"
            width={120}
            height={40}
            className="mx-auto mt-2"
          />

          <button className="text-[#D99100] text-sm mt-2 underline">
            View Certificate
          </button>
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
