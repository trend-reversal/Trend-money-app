"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BondsPage() {
  const router = useRouter();

  const bonds = [
    {
      name: "Best Capital",
      rating: "AAA • Low Risk",
      min: "₹9,918",
      tenure: "35 Months",
      rate: "13.65%",
      tag: "Sell Anytime",
      logo: "/images/best-capital.png",
    },
    {
      name: "Unifinz Capital",
      rating: "AA+ • Low Risk",
      min: "₹49,987",
      tenure: "14 Months",
      rate: "13.50%",
      tag: "Trending",
      logo: "/images/unifize.png",
    },
    {
      name: "Aakara Capitals",
      rating: "AA • Moderate Risk",
      min: "₹95,519",
      tenure: "14 Months",
      rate: "13.25%",
      tag: "Sell Anytime",
      logo: "/images/akara.png",
    },

    // 👇 duplicate (to match UI)
    {
      name: "Best Capital",
      rating: "AAA • Low Risk",
      min: "₹9,918",
      tenure: "35 Months",
      rate: "13.65%",
      tag: "Sell Anytime",
      logo: "/images/best-capital.png",
    },
    {
      name: "Unifinz Capital",
      rating: "AA+ • Low Risk",
      min: "₹49,987",
      tenure: "14 Months",
      rate: "13.50%",
      tag: "Trending",
      logo: "/images/unifize.png",
    },
    {
      name: "Aakara Capitals",
      rating: "AA • Moderate Risk",
      min: "₹95,519",
      tenure: "14 Months",
      rate: "13.25%",
      tag: "Sell Anytime",
      logo: "/images/akara.png",
    },
  ];

  return (
    <section className="min-h-screen bg-[#F7F8FA]">
      {/* 🔵 HEADER */}
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

        <h1 className="text-[18px] font-semibold">Bonds</h1>

        <button className="p-2">
          {/* Search */}
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#000" strokeWidth="1.4" />
            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
              stroke="#000"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* 🔥 HERO (FULL WIDTH like Home) */}
      <div className="px-6 mt-4">
        <div className="relative w-full h-[160px] rounded-[16px] overflow-hidden shadow-sm">
          <Image
            src="/images/bond/bond-main.png"
            alt="bond-banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* dots */}
      </div>

      {/* 🔘 FILTERS */}
      <div className="flex gap-2 px-6 mt-5 overflow-x-auto">
        {["All Bonds", "High Returns", "High Rated", "Short Term"].map(
          (f, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-[10px] text-[12px] border ${
                i === 0
                  ? "bg-[#EEF2FF] text-[#5B6FFF] border-[#5B6FFF]"
                  : "bg-white border-[#E5E7EB] text-gray-600"
              }`}
            >
              {f}
            </button>
          ),
        )}
      </div>

      {/* 📦 LIST */}
      <div className="px-6 mt-5 space-y-4 pb-10">
        {bonds.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-[16px] p-4 border border-[#F0F0F0] shadow-[0px_2px_8px_rgba(0,0,0,0.04)] space-y-3"
          >
            {/* TOP */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
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

              <div className="text-right leading-tight">
                <p className="text-[#16A34A] font-semibold text-[20px]">
                  {item.rate}
                </p>
                <p className="text-[11px] text-gray-400 mt-[2px]">YTM</p>
              </div>
            </div>

            {/* MID */}
            <p className="text-[13px] text-[#6B7280]">
              Min. {item.min} • {item.tenure}
            </p>

            {/* RISK BAR */}
            <div className="flex items-center gap-2">
              <Image
                src="/images/bond/risk-bar.png"
                alt="risk"
                width={56}
                height={7}
              />
              <span className="text-[10px] text-gray-500">CRISIL BBB</span>
            </div>

            {/* BOTTOM (FD STYLE) */}
            <div className="flex justify-between items-center pt-1">
              <span
                className={`text-[10px] px-2 py-[3px] rounded-[6px] font-medium ${
                  item.tag === "Trending"
                    ? "bg-[#EDE9FE] text-purple-600"
                    : "bg-[#ECFCF2] text-[#16A34A]"
                }`}
              >
                {item.tag}
              </span>

              <button className="text-[13px] bg-[#EEF2FF] text-[#5B6FFF] px-4 py-[7px] rounded-[10px] font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* 🔻 VIEW MORE */}
      <div className="text-center mt-6">
        <button className="text-[#5B6FFF] text-[12px] font-semibold">
          VIEW MORE
        </button>
      </div>

      {/* 🔵 POWERED BY */}
      {/* 🔵 POWERED BY GRIP (Simple) */}
      <div className="px-6 mt-8">
        {/* Top line */}
        <div className="w-[60%] mx-auto border-t border-gray-300" />

        {/* Text */}
        <div className="flex items-center justify-center gap-2 py-4">
          <p className="text-[16px] text-[#2E2E2E] font-medium">Powered by</p>

          <Image
            src="/images/bond/grip-logo.webp"
            alt="GRIP"
            width={70}
            height={24}
            className="object-contain"
          />
        </div>

        {/* Bottom line */}
        <div className="w-[40%] mx-auto border-t border-gray-300" />
      </div>

      {/* 📘 EDUCATION CARDS (IMAGE BASED) */}
      <div className="mt-6 px-6 overflow-x-auto">
        <div className="flex gap-4 w-max">
          {/* Card 1 */}
          <div className="relative w-[300px] h-[200px] rounded-[16px] overflow-hidden shadow-sm bg-white flex-shrink-0">
            <Image
              src="/images/bond/learn1.png"
              alt="learn"
              fill
              className="object-contain p-2"
              priority
            />
          </div>

          {/* Card 2 */}
          <div className="relative w-[300px] h-[200px] rounded-[16px] overflow-hidden shadow-sm bg-white flex-shrink-0">
            <Image
              src="/images/bond/learn2.png"
              alt="learn"
              fill
              className="object-contain p-2"
            />
          </div>
        </div>
      </div>

      {/* 🔵 BOTTOM BANNER */}
      <div className="mt-8 w-full">
        <div
          className="relative w-full h-[190px] px-6 py-6 flex justify-between items-center overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #FFFFFF 10%, #8791FE4D 100%)",
          }}
        >
          {/* LEFT TEXT */}
          <div>
            <p className="text-[20px] font-semibold text-[#8C94F5] leading-snug">
              Smart Bonds For <br /> Smarter Goals
            </p>

            <p className="text-[13px] text-[#6B7280] mt-2">
              brought to you by Trend Reversal
            </p>

            <p className="text-[15px] text-[#8C94F5] font-medium mt-3">
              Safe. Steady. Structured
            </p>
          </div>

          {/* RIGHT ICON */}
          <div className="relative w-[70px] h-[70px] opacity-80">
            <Image
              src="/images/bond/doc.svg"
              alt="doc"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
