"use client";

import Image from "next/image";

export default function SilverPage() {
  return (
    <div className="min-h-screen bg-[#F7F7FA] px-4 pb-6">

      {/* 🔹 Header */}
      <div className="flex items-center justify-between pt-4 pb-3">
        <button className="text-xl">←</button>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="text-blue-500">📡</span>
          ₹10646.08/g
        </div>
      </div>

      {/* 🔹 Banner */}
      <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Silver has soared nearly</p>
          <h1 className="text-4xl font-bold text-blue-500">171%</h1>
          <p className="text-sm text-gray-500">this year!</p>
          <p className="text-xs text-gray-400 mt-2">
            Don’t miss the shine,
          </p>
          <p className="text-xs text-blue-500">start your journey today</p>
        </div>

        <Image
          src="/images/silver.png" // replace with your asset
          alt="silver"
          width={120}
          height={120}
        />
      </div>

      {/* 🔹 Dots */}
      <div className="flex justify-center gap-2 mt-3">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
      </div>

      {/* 🔹 Quick Actions */}
      <h3 className="text-sm text-gray-500 mt-5 mb-2">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {[
          "Daily SIP",
          "Monthly SIP",
          "Weekly SIP",
          "One-Time Investment",
        ].map((item, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-xl p-4 shadow-sm ${
              item === "Monthly SIP"
                ? "border-2 border-blue-500"
                : "border border-gray-200"
            }`}
          >
            {item === "Monthly SIP" && (
              <span className="absolute top-2 right-2 text-[10px] bg-green-500 text-white px-2 py-[2px] rounded-full">
                RECOMMENDED
              </span>
            )}

            <div className="h-10 w-10 bg-gray-100 rounded-md mb-2" />
            <p className="text-sm font-medium">{item}</p>
          </div>
        ))}
      </div>

      {/* 🔹 CTA */}
      <button className="w-full bg-black text-white py-3 rounded-xl mt-5 font-medium">
        Start Investing
      </button>

      {/* 🔹 Market Performance */}
      <div className="bg-white rounded-2xl p-4 mt-5 shadow-sm">
        <p className="text-sm font-medium mb-2">Market Performance</p>

        <div className="flex gap-2 mb-3">
          {["6M", "1Y", "3Y", "5Y"].map((t, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md text-xs ${
                t === "3Y"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Fake Graph */}
        <div className="h-40 bg-gradient-to-t from-blue-100 to-transparent rounded-lg relative">
          <div className="absolute right-5 top-6 bg-white px-2 py-1 rounded-md shadow text-xs">
            MAY’25 <br /> ₹1,305.49/g
          </div>
        </div>
      </div>

      {/* 🔹 Instant SIP */}
      <div className="bg-white rounded-2xl p-4 mt-5 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Instant SIP</p>
          <p className="text-xs text-gray-400">
            START SMALL, GROW BIG EVERY MONTH.
          </p>
          <h2 className="text-2xl font-bold mt-1">₹2000 / MONTH</h2>

          <button className="mt-2 bg-green-900 text-white px-4 py-2 rounded-lg text-sm">
            Instant SIP
          </button>
        </div>

        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          ⚡
        </div>
      </div>

      {/* 🔹 Certificate */}
      <div className="bg-white rounded-2xl p-4 mt-5 shadow-sm text-center">
        <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
          🛡️
        </div>

        <p className="text-sm text-gray-500 mt-2">In Partnership with</p>

        <h2 className="text-xl font-semibold text-yellow-600 mt-1">
          SAFEGOLD
        </h2>

        <button className="text-blue-500 text-sm mt-2">
          View Certificate
        </button>
      </div>

      {/* 🔹 FAQs */}
      <div className="mt-5">
        <h3 className="text-sm text-gray-500 mb-2">FAQs</h3>

        {[
          "Why should I upgrade?",
          "What payment methods can I use?",
          "How does billing work?",
          "How can I cancel?",
          "Can I change plan?",
        ].map((q, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-3 mb-2 flex justify-between items-center shadow-sm"
          >
            <p className="text-sm">{q}</p>
            <span>+</span>
          </div>
        ))}
      </div>

      {/* 🔹 Footer */}
      <div className="mt-6 text-center text-xs text-gray-400">
        <p>100% Safe & Secure</p>
        <p>999.9 Pure Silver</p>
        <p>Withdraw Anytime</p>
      </div>
    </div>
  );
}