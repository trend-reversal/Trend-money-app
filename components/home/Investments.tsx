"use client";

import Image from "next/image";

/* 🔹 Bond Card */
function BondItem({
  name,
  min,
  tenure,
  rate,
  logo,
}: {
  name: string;
  min: string;
  tenure: string;
  rate: string;
  logo: string;
}) {
  return (
    <div className="relative bg-white rounded-[14px] border border-[#ECECEC] shadow-[0px_3.6px_5.4px_-0.9px_rgba(0,31,42,0.05)] px-4 py-3 flex justify-between items-center">
      {/* ✅ Badge */}
      <span className="absolute top-2 right-2 text-[10px] bg-[#ECFCF2] text-green-600 px-2 py-[2px] rounded-[4px] font-medium whitespace-nowrap">
        Sell Anytime
      </span>

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] relative">
          <Image src={logo} alt={name} fill className="object-contain" />
        </div>

        <div>
          <p className="text-[14px] font-medium text-black">{name}</p>
          <p className="text-xs text-gray-500 mt-1">
            Min. {min} • {tenure}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right flex flex-col items-end justify-center">
        <p className="text-green-600 font-semibold text-[14px] leading-tight">
          {rate}
        </p>
        <p className="text-[10px] text-gray-400">YTM</p>
      </div>
    </div>
  );
}

/* 🔹 FD Card */
function FDItem({
  name,
  min,
  tenure,
  rate,
  logo,
}: {
  name: string;
  min: string;
  tenure: string;
  rate: string;
  logo: string;
}) {
  return (
    <div className="bg-white rounded-[14px] border border-[#ECECEC] shadow-[0px_3.6px_5.4px_-0.9px_rgba(0,31,42,0.05)] px-4 py-3 flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-[40px] h-[40px] relative">
          <Image src={logo} alt={name} fill className="object-contain" />
        </div>

        <div>
          <p className="text-[14px] font-medium text-black">{name}</p>
          <p className="text-xs text-gray-500 mt-1">
            Min. {min} • {tenure}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="text-right flex flex-col items-end justify-center">
        <p className="text-green-600 font-semibold text-[14px] leading-tight">
          {rate}
        </p>
        <p className="text-[10px] text-gray-400">P.A.</p>
      </div>
    </div>
  );
}

/* 🔥 Main Section */
export default function Investments() {
  return (
    <section className="px-6 mt-6 space-y-6">
      {/* 🔹 Top Bonds */}
      <div>
        <p className="text-[10px] tracking-[2px] text-[#7480FE] font-semibold">
          YIELD FOCUSED
        </p>

        <h3 className="text-[18px] font-semibold text-[#B4B4B4] mt-1 mb-4">
          Top Bonds
        </h3>

        <div className="space-y-3">
          <BondItem
            name="Best Capital"
            min="₹9,918"
            tenure="35 Months"
            rate="13.65%"
            logo="/images/best-capital.png"
          />

          <BondItem
            name="Unifinz Capital"
            min="₹49,987"
            tenure="14 Months"
            rate="13.50%"
            logo="/images/unifize.png"
          />

          <BondItem
            name="Aakara Capitals"
            min="₹99,519"
            tenure="14 Months"
            rate="13.25%"
            logo="/images/akara.png"
          />
        </div>
      </div>

      {/* 🔹 Prime FDs */}
      <div>
        <p className="text-[10px] tracking-[2px] text-[#7480FE] font-semibold">
          CAPITAL PROTECTION
        </p>

        <h3 className="text-[18px] font-semibold text-[#B4B4B4] mt-1 mb-4">
          Prime FDs
        </h3>

        <div className="space-y-3">
          <FDItem
            name="Shriram Finance FD"
            min="₹5,000"
            tenure="3 Years"
            rate="7.81%"
            logo="/images/shriram.png"
          />

          <FDItem
            name="Suryoday Finance FD"
            min="₹5,000"
            tenure="3 Years"
            rate="7.25%"
            logo="/images/suryoday.png"
          />

          <FDItem
            name="Unifinz Finance FD"
            min="₹5,000"
            tenure="3 Years"
            rate="7.50%"
            logo="/images/unifize.png"
          />
        </div>
      </div>
    </section>
  );
}
