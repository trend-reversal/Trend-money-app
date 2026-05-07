"use client";

import { useAssets } from "@/hooks/queries/useAssets";
import { getBondRedirectUrl } from "@/lib/api/bonds";
import Image from "next/image";

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
  const { data, isLoading } = useAssets();
  const bonds =
    data?.data?.Bonds?.list?.slice(0, 3) || [];
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
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
        if (
          typeof window !== "undefined" &&
          // @ts-ignore
          window.ReactNativeWebView
        ) {
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
