"use client";

import { useAssets } from "@/hooks/queries/useAssets";
import { getBondRedirectUrl } from "@/lib/api/bonds";
import Image from "next/image";
import { useFDs } from "@/hooks/queries/useFDs";
import { getFDRedirectUrl } from "@/lib/api/fd";

/* 🔹 Bond Card */
function BondItem({
  name,
  min,
  tenure,
  rate,
  logo,
  onClick,
}: {
  name: string;
  min: string;
  tenure: string;
  rate: string;
  logo: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative w-full bg-white rounded-[14px] border border-[#ECECEC] shadow-[0px_3.6px_5.4px_-0.9px_rgba(0,31,42,0.05)] px-4 py-3 flex justify-between items-center active:scale-[0.98] transition"
    >
      {/* ✅ Badge */}
      <span className="absolute top-0 right-4 -translate-y-1/2 bg-[#ECFCF2] text-green-600 text-[10px] px-3 py-[3px] rounded-[6px] font-medium whitespace-nowrap shadow-sm">
        Sell Anytime
      </span>
      {/* Left */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-[40px] h-[40px] relative shrink-0">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 min-w-0 text-left">
          <p className="text-[14px] font-medium text-black truncate">
            {name}
          </p>

          <p className="text-xs text-gray-500 mt-1 truncate">
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
    </button>
  );
}

/* 🔹 FD Card */
function FDItem({
  name,
  min,
  tenure,
  rate,
  logo,
  onClick,
}: {
  name: string;
  min: string;
  tenure: string;
  rate: string;
  logo: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-[14px] border border-[#ECECEC] shadow-[0px_3.6px_5.4px_-0.9px_rgba(0,31,42,0.05)] px-4 py-3 flex justify-between items-center active:scale-[0.98] transition"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* LOGO */}
        <div className="w-[44px] h-[44px] min-w-[44px] relative rounded-full overflow-hidden bg-white border border-[#F1F1F1]">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain p-[6px]"
            unoptimized
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[15px] font-medium text-black truncate">
            {name}
          </p>

          <p className="text-[12px] text-[#6B7280] mt-1 truncate">
            Min. {min} • {tenure}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-right flex flex-col items-end justify-center ml-3">
        <p className="text-[#16A34A] font-semibold text-[16px] leading-tight">
          {rate}
        </p>

        <p className="text-[10px] text-[#9CA3AF] mt-[2px]">
          P.A.
        </p>
      </div>
    </button>
  );
}

/* 🔥 Main Section */
export default function Investments() {
  const { data, isLoading } = useAssets();
  const { data: fdData } = useFDs();

  const fdPageData =
    fdData?.data?.[0] || {};

  const fds =
    fdPageData?.bank_cards?.slice(0, 3) || [];

  const bonds =
    data?.data?.Bonds?.list?.slice(0, 3) || [];
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

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

  const handleBondClick = async ({
    page,
    section,
    assetId,
  }: {
    page: string;
    section: string;
    assetId: number;
  }) => {
    try {
      const response =
        await getBondRedirectUrl({
          page,
          section,
          assetId,
        });

      const redirectUrl =
        response?.data?.redirectUrl;

      if (redirectUrl) {
        if (typeof window !== "undefined") {
          // @ts-ignore
          const isReactNativeWebView =
            !!window.ReactNativeWebView;

          console.log(
            "IS_RN_WEBVIEW",
            isReactNativeWebView
          );

          if (isReactNativeWebView) {
            // @ts-ignore
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: "OPEN_BOND_URL",
                url: redirectUrl,
              })
            );
          } else {
            window.open(redirectUrl, "_blank");
          }
        }
      }
    } catch (error) {
      console.error(
        "Failed to fetch redirect URL",
        error
      );
    }
  };

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
          {isLoading ? (
            <p className="text-sm text-gray-400">
              Loading bonds...
            </p>
          ) : (
            bonds.map((bond: any) => (
              <BondItem
                key={bond.id}
                name={bond.description}
                min={formatCurrency(
                  bond.investmentAmount
                )}
                tenure={`${bond.timeToMaturity} Months`}
                rate={`${bond.preTaxYield}%`}
                logo={
                  bond.logo ||
                  "/images/best-capital.png"
                }
                onClick={() =>
                  handleBondClick({
                    page: "asset-detail",
                    section: "bonds",
                    assetId: bond.assetID,
                  })
                }
              />
            ))
          )}
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
          {fds.map((fd: any) => (
            <FDItem
              key={fd.issuer}
              name={fd.name}
              min={`₹${Number(
                fd.min_investment
              ).toLocaleString("en-IN")}`}
              tenure={fd.rating}
              rate={`${fd.returns}%`}
              logo={fd.logo}
              onClick={() =>
                handleFDClick(fd.issuer)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
