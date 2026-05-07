"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FDPage() {
  const router = useRouter();

  const fds = [
    {
      name: "Shriram Finance FD",
      rating: "AAA • Low Risk",
      min: "₹5,000",
      tenure: "3 Years",
      rate: "7.81%",
      logo: "/images/shriram.png",
    },
    {
      name: "Suryoday Finance FD",
      rating: "AA • Moderate Risk",
      min: "₹5,000",
      tenure: "3 Years",
      rate: "7.25%",
      logo: "/images/suryoday.png",
    },
    {
      name: "Unifinz Finance FD",
      rating: "AA+ • Low Risk",
      min: "₹5,000",
      tenure: "3 Years",
      rate: "7.50%",
      logo: "/images/fd/bjaj.png",
    },
  ];

  return (
    <section className="min-h-screen bg-[#F7F8FA]">
      {/*  HEADER */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white">
        <button
          onClick={() => router.back()}
          className="p-2 active:scale-90 transition"
        >
          {/* Back */}
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
        <h1 className="text-[18px] font-semibold">Fixed Deposits</h1>

        <div />
      </div>

      {/*  HERO */}
      <div className="px-6 mt-4">
        <div className="relative w-full h-[160px] rounded-[16px] overflow-hidden shadow-sm">
          <Image
            src="/images/fd/fd-banner.png"
            alt="fd-banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

    
      {/*  LIST */}
      <div className="px-6 mt-5 space-y-4 pb-10">
        {fds.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-[16px] p-4 shadow-sm border border-[#F0F0F0]"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-[44px] h-[44px] relative">
                  <Image
                    src={item.logo}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <p className="text-[15px] font-semibold text-[#1C1B1B]">
                    {item.name}
                  </p>
                  <p className="text-[12px] text-gray-500 mt-[2px]">
                    {item.rating}
                  </p>
                </div>
              </div>

              {/* RATE */}
              <div className="text-right">
                <p className="text-[#16A34A] font-semibold text-[18px]">
                  {item.rate}
                </p>
                <p className="text-[11px] text-gray-400">P.A.</p>
              </div>
            </div>

            {/* MID */}
            <div className="mt-3">
              <p className="text-[13px] text-gray-500">
                Min. {item.min} • {item.tenure}
              </p>
            </div>

            {/* BOTTOM */}
            <div className="mt-3 flex justify-between items-center">
              {/* TAG */}
              <span className="text-[10px] bg-[#ECFCF2] text-[#16A34A] px-2 py-[3px] rounded-[6px] font-medium">
                Sell Anytime
              </span>

              {/* BUTTON */}
              <button className="text-[13px] bg-[#EEF2FF] text-[#5B6FFF] px-5 py-2 rounded-[10px] font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mt-2">
        <div className="w-full max-w-[336px] mx-auto bg-[#FEFEFE] border border-[#F3F3F3] rounded-[7px] shadow-[0px_2px_6px_rgba(0,0,0,0.04)] p-4">
          {/* TITLE */}
          <h3 className="text-[16px] font-semibold text-[#1C1B1B] text-center">
            Compare With Your Favourite Banks
          </h3>

          {/* SUBTEXT */}
          <p className="text-[13px] text-gray-500 text-center mt-1">
            Get the best FD rates in minutes
          </p>

          {/* ICONS */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {[
              "/images/fd/state-bank.svg",
              "/images/fd/hdfc.svg",
              "/images/fd/icici.svg",
              "/images/fd/axis.svg",
              "/images/fd/kotak.svg",
            ].map((icon, i) => (
              <div
                key={i}
                className="w-[36px] h-[36px] rounded-full bg-white shadow-sm border border-[#F0F0F0] flex items-center justify-center"
              >
                <Image src={icon} alt="bank" width={20} height={20} />
              </div>
            ))}

            {/* +195 */}
            <div className="w-[36px] h-[36px] rounded-full bg-[#EEF2FF] flex items-center justify-center text-[12px] text-[#5B6FFF] font-medium">
              +195
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-5 bg-[#EEF2FF] text-[#5B6FFF] py-[10px] rounded-[10px] text-[14px] font-medium flex items-center justify-center gap-2">
            Compare Now
            <span className="text-[16px]">›</span>
          </button>
        </div>
      </div>
      <div className="px-6 mt-6">
        {/* 🔹 HEADING */}
        <p className="text-[10px] tracking-[2px] text-[#7480FE] font-semibold">
          TOP PRIME
        </p>

        <h2 className="text-[20px] font-semibold text-[#A3A3A3] mt-1 mb-4">
          Fixed Deposits
        </h2>

        {/* 🔹 LIST */}
        <div className="space-y-3">
          {[
            {
              name: "Shriram Finance FD",
              min: "₹5,000",
              tenure: "3 Years",
              rate: "7.81%",
              logo: "/images/shriram.png",
            },
            {
              name: "Mahindra Finance FD",
              min: "₹5,000",
              tenure: "3 Years",
              rate: "7.25%",
              logo: "/images/fd/mahindra.png",
            },
            {
              name: "Suryoday Finance FD",
              min: "₹5,000",
              tenure: "N Years",
              rate: "8.40%",
              logo: "/images/suryoday.png",
            },
            {
              name: "Bajaj Finance FD",
              min: "₹5,000",
              tenure: "N Years",
              rate: "7.30%",
              logo: "/images/fd/bjaj.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-[14px] border border-[#ECECEC] shadow-[0px_3px_6px_rgba(0,0,0,0.05)] px-4 py-3 flex justify-between items-center"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] relative">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <p className="text-[14px] font-medium text-black">
                    {item.name}
                  </p>
                  <p className="text-[12px] text-gray-500 mt-[2px]">
                    Min. {item.min} • {item.tenure}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-[#16A34A] font-semibold text-[15px]">
                  {item.rate}
                </p>
                <p className="text-[10px] text-gray-400">P.A.</p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 VIEW MORE */}
        <div className="text-center mt-4">
          <button className="text-[12px] text-gray-500 font-medium tracking-wide">
            VIEW MORE FDs
          </button>
        </div>
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

      <div className="mt-6 -mx-2 overflow-x-auto no-scrollbar">
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
    </section>
  );
}
