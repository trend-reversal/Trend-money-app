"use client";

import { useFDs } from "@/hooks/queries/useFDs";
import { getFDRedirectUrl } from "@/lib/api/fd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FDPage() {
  const router = useRouter();
  const { data, isLoading } = useFDs();

  const pageData =
    data?.data?.[0] || {};

  const allFDs =
    pageData?.bank_cards || [];



  const fds = allFDs;
  const bankLogos =
    pageData?.bank_logos || [];

  const handleFDClick = async (
    issuer: string
  ) => {
    try {
      const response =
        await getFDRedirectUrl({
          issuer,
        });

      const redirectUrl =
        response?.data?.redirectUrl;

      if (redirectUrl) {
        if (typeof window !== "undefined") {
          // @ts-ignore
          const isReactNativeWebView =
            !!window.ReactNativeWebView;

          if (isReactNativeWebView) {
            // @ts-ignore
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "OPEN_FD_URL",
                url: redirectUrl,
              })
            );
          } else {
            window.open(
              redirectUrl,
              "_blank"
            );
          }
        }
      }
    } catch (error) {
      console.error(
        "Failed to fetch FD redirect URL",
        error
      );
    }
  };
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
        {fds.map((item: any, i: number) => (
          <div
            key={i}
            className="bg-white rounded-[20px] p-4 border border-[#EEF0F4] shadow-[0px_4px_14px_rgba(15,23,42,0.05)]"
          >
            <div className="flex justify-between items-start gap-3">
              {/* LEFT */}
              <div className="flex gap-3 flex-1">
                <div className="w-[56px] h-[56px] relative rounded-full overflow-hidden border border-[#EEF0F4] bg-white">
                  <Image
                    src={
                      item.logo ||
                      "/images/fd/default.png"
                    }
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1">
                  <p className="text-[16px] font-semibold text-[#111827]">
                    {item.name}
                  </p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-[11px] bg-[#F3F4F6] text-[#4B5563] px-2 py-[4px] rounded-full">
                      {item.rating}
                    </span>

                    <span className="text-[11px] bg-[#EEF2FF] text-[#5B6FFF] px-2 py-[4px] rounded-full">
                      Min ₹
                      {Number(
                        item.min_investment
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-[#16A34A] font-bold text-[20px] leading-none">
                  {item.returns}%
                </p>

                <p className="text-[11px] text-[#9CA3AF] mt-1">
                  P.A.
                </p>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="flex justify-between items-center mt-5">
              <span className="text-[11px] text-[#6B7280] font-medium">

              </span>

              <button
                onClick={() =>
                  handleFDClick(item.issuer)
                }
                className="h-[32px] px-4 rounded-full bg-[#F5F7FF] text-[#4F46E5] text-[13px] font-medium">
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
            {bankLogos.slice(0, 5).map(
              (bank: any, i: number) => (
                <div
                  key={i}
                  className="w-[36px] h-[36px] rounded-full bg-white shadow-sm border border-[#F0F0F0] flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
              )
            )}

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
        <div

          className="space-y-3">
          {fds.map((item: any, i: number) => (
            <div
              onClick={() =>
                handleFDClick(item.issuer)
              }
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
                    Min. ₹
                    {Number(
                      item.min_investment
                    ).toLocaleString("en-IN")}{" "}
                    • {item.rating}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-[#16A34A] font-semibold text-[15px]">
                  {item.returns}%
                </p>
                <p className="text-[10px] text-gray-400">P.A.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 🛡️ TRUST STRIP */}
      <div className="flex items-center justify-center gap-2 text-[#6C7BFF] font-semibold text-[12px] tracking-wide pt-4">
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
