"use client";

import Image from "next/image";

export default function Utility() {
  return (
    <section className="px-4 mt-6 space-y-6">
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
        {/* Left Leaf */}
        <Image
          src="/images/lief-left.png"
          alt="leaf-left"
          width={14}
          height={22}
          className="object-contain"
        />

        <span>SAFE. REGULATED. RELIABLE.</span>

        {/* Right Leaf */}
        <Image
          src="/images/lief-right.png"
          alt="leaf-right"
          width={14}
          height={22}
          className="object-contain"
        />
      </div>

      <div className="-mx-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-2">
          {[
            "/images/security.png",
            "/images/management.png",
            "/images/fees.png",
            "/images/trust.png",
          ].map((src, i) => (
            <div
              key={i}
              className="relative min-w-[215px] w-[215px] h-[233px] rounded-[14px] overflow-hidden  flex-shrink-0"
            >
              <Image
                src={src}
                alt={`card-${i}`}
                fill
                className="object-containobject-cover rounded-[14px]"
                sizes="215px"
              />
            </div>
          ))}
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
