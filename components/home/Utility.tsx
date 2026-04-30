"use client";

import Image from "next/image";

export default function Utility() {
  return (
    <section className="px-6 mt-6 space-y-6">
      {/* 🎁 PROMO CARD */}
      <div className="bg-white rounded-[14.5px] border border-[#E6E6E6] shadow-[0px_0px_17.7px_-8px_rgba(0,0,0,0.16)] px-4 py-3 flex items-center justify-between overflow-hidden">
        <div className="max-w-[65%]">
          <p className="text-[15px] font-semibold text-[#6C7BFF] leading-tight">
            Invite friends, earn €50
          </p>

          <p className="text-[12px] text-gray-500 mt-2 leading-relaxed">
            Lorem ipsum dolor sit. Lorem ipsum dolor sit.. T&C apply
          </p>
        </div>

        <div className="relative w-[90px] h-[90px] translate-x-2">
          <Image
            src="/images/gift.png"
            alt="gift"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* 🔘 DOT INDICATOR */}
      <div className="flex justify-center gap-2">
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
      </div>

      {/* 🛡️ TRUST STRIP */}
      <div className="flex items-center justify-center gap-2 text-[#6C7BFF] font-semibold text-[12px] tracking-wide">
        <span>🌿</span>
        <span>SAFE. REGULATED. RELIABLE.</span>
        <span>🌿</span>
      </div>

      {/* 🛡️ INFO CARDS */}
      <div className="grid grid-cols-2 gap-4">
        {/* 🔹 Security */}
        <div className="relative h-[180px] rounded-[20px] overflow-hidden">
          <Image
            src="/images/security.png"
            alt="security"
            fill
            className="object-cover"
          />

          {/* Only gradient (NO TEXT, NO BADGE) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>

        {/* 🔹 Management */}
        <div className="relative h-[180px] rounded-[20px] overflow-hidden">
          <Image
            src="/images/management.png"
            alt="management"
            fill
            className="object-cover"
          />

          {/* Only gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
      </div>

      {/* 🔹 TAGLINE */}
      <div>
        <p className="text-[16px] font-inter font-semibold text-black">
          You bring the goals.
        </p>
        <p className="text-[16px] font-inter font-semibold text-[#073E8FFA]">
          We bring the experience.
        </p>
      </div>

      {/* 🔻 DISCLAIMER */}
      <div className="flex justify-between items-center text-sm text-black font-medium">
        <span>Disclaimer</span>

        <span className="flex items-center">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="#000"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  );
}
