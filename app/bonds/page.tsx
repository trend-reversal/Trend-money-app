"use client";

import { useAssets } from "@/hooks/queries/useAssets";
import { getBondRedirectUrl } from "@/lib/api/bonds";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BondsPage() {
  const router = useRouter();
  const [active, setActive] = useState("All Bonds");
  const [searchQuery, setSearchQuery] =
    useState("");
  const { data, isLoading } = useAssets();

  const [visibleCount, setVisibleCount] =
    useState(6);

  const allBonds =
    data?.data?.Bonds?.list || [];

  /* FILTERED */
  const getRatingRank = (rating: string = "") => {
    const normalized =
      rating.toUpperCase();

    const ratingOrder = [
      "AAA",
      "AA+",
      "AA",
      "AA-",
      "A+",
      "A",
      "A-",
      "BBB+",
      "BBB",
      "BBB-",
      "BB+",
      "BB",
      "BB-",
    ];

    const index = ratingOrder.findIndex((r) =>
      normalized.includes(r)
    );

    return index === -1 ? 999 : index;
  };

  const applySearchFilter = (list: any[]) => {
    if (!searchQuery.trim()) {
      return list;
    }

    const query =
      searchQuery.toLowerCase().trim();

    const numberMatch =
      query.match(/\d+(\.\d+)?/);

    const numeric = numberMatch
      ? parseFloat(numberMatch[0])
      : null;

    const isPercentQuery =
      query.includes("%");

    const isMonthQuery =
      query.includes("month");

    return list.filter((bond: any) => {
      const rating =
        bond.rating?.toLowerCase() || "";

      const company = `
      ${bond.description || ""}
      ${bond.partnerName || ""}
    `.toLowerCase();

      const ytm =
        Number(bond.preTaxYield) || 0;

      const tenure =
        Number(bond.timeToMaturity) || 0;

      /* TEXT */
      const matchesText =
        rating.includes(query) ||
        company.includes(query);

      /* YTM */
      let matchesYTM = false;

      if (
        numeric !== null &&
        isPercentQuery
      ) {
        matchesYTM =
          Math.abs(ytm - numeric) < 0.01;
      }

      /* TENURE */
      let matchesTenure = false;

      if (
        numeric !== null &&
        isMonthQuery
      ) {
        matchesTenure =
          Math.abs(tenure - numeric) <= 2;
      }

      /* GENERIC NUMBER */
      let matchesGeneric = false;

      if (
        numeric !== null &&
        !isPercentQuery &&
        !isMonthQuery
      ) {
        matchesGeneric =
          Math.abs(ytm - numeric) <= 0.5 ||
          Math.abs(tenure - numeric) <= 2;
      }

      return (
        matchesText ||
        matchesYTM ||
        matchesTenure ||
        matchesGeneric
      );
    });
  };

  const filteredBonds = [...allBonds];

  if (active === "High Returns") {
    filteredBonds.sort(
      (a, b) =>
        (b.preTaxYield || 0) -
        (a.preTaxYield || 0)
    );
  }

  if (active === "High Rated") {
    filteredBonds.sort(
      (a, b) =>
        getRatingRank(a.rating) -
        getRatingRank(b.rating)
    );
  }

  if (active === "Short Term") {
    filteredBonds.sort(
      (a, b) =>
        (a.timeToMaturity || 0) -
        (b.timeToMaturity || 0)
    );
  }

  const searchedBonds =
    applySearchFilter(filteredBonds);

  const bonds = searchedBonds.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < searchedBonds.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getRiskLabel = (rating?: string) => {
    if (!rating) return "Moderate Risk";

    const normalized = rating.toUpperCase();

    if (
      normalized.includes("AAA") ||
      normalized.includes("AA") ||
      normalized.includes("SOVEREIGN")
    ) {
      return "Very Low Risk";
    }

    if (
      normalized.includes("A+") ||
      normalized.includes("A1") ||
      normalized.includes("A")
    ) {
      return "Low Risk";
    }

    if (
      normalized.includes("BBB+") ||
      normalized.includes("BBB")
    ) {
      return "Moderate Risk";
    }

    if (
      normalized.includes("BBB-") ||
      normalized.includes("BB")
    ) {
      return "Moderately High Risk";
    }

    return "High Risk";
  };

  const getRatingImage = (rating?: string) => {
    if (!rating) {
      return "/risk-meter/IND-BBB.png";
    }

    const formattedRating = rating
      .trim()
      .replace(/\s+/g, "-");

    return `/risk-meter/${formattedRating}.png`;
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
    <section className="min-h-screen bg-[#F7F8FA]">
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

        <div className="px-6 mt-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              placeholder="Search bonds, ratings, YTM..."
              className="w-full h-[46px] rounded-[14px] border border-[#E5E7EB] bg-white pl-11 pr-4 text-[14px] outline-none focus:border-[#5B6FFF]"
            />

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="#9CA3AF"
                strokeWidth="1.5"
              />
              <line
                x1="16.5"
                y1="16.5"
                x2="21"
                y2="21"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

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

      </div>

      <div className="flex gap-3 px-4 mt-5 overflow-x-auto no-scrollbar whitespace-nowrap">
        {["All Bonds", "High Returns", "High Rated", "Short Term"].map(
          (f, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(f);
                setVisibleCount(6);
              }}
              className={`h-[35px] px-[16px] rounded-[6.77px] border text-[12px] font-medium flex items-center justify-center whitespace-nowrap flex-shrink-0 transition-all duration-200 ${active === f
                ? "bg-[#EEF2FF] text-[#5B6FFF] border-[#5B6FFF]"
                : "bg-white border-[#E5E7EB] text-[#5F6368]"
                }`}
            >
              {f}
            </button>
          ),
        )}
      </div>

      <div className="px-6 mt-5 space-y-4 pb-10">
        {bonds.map((item: any, i: any) => {
          const primaryBadge =
            item.badges?.find((b: any) => b) || "New";

          return (
            <div
              key={i}
              className="relative bg-white rounded-[20px] px-4 py-4 border border-[#EEF0F4] shadow-[0px_4px_14px_rgba(15,23,42,0.05)]"
            >
              {/* BADGE */}
              <span
                className={`absolute top-0 right-4 -translate-y-1/2 text-[10px] px-3 py-[5px] rounded-full font-medium tracking-wide ${primaryBadge.toLowerCase().includes("trend")
                  ? "bg-[#F3E8FF] text-[#7C3AED]"
                  : "bg-[#ECFDF3] text-[#16A34A]"
                  }`}
              >
                {primaryBadge}
              </span>

              {/* TOP */}
              <div className="flex justify-between items-start gap-3">
                {/* LEFT */}
                <div className="flex gap-3 flex-1 min-w-0">
                  {/* LOGO */}
                  <div className="w-[56px] h-[56px] min-w-[56px] relative rounded-full overflow-hidden bg-white border border-[#EEF0F4] shadow-sm">
                    <Image
                      src={
                        item.logo ||
                        "/images/bond/default-bond.png"
                      }
                      alt={item.description}
                      fill
                      className="object-contain scale-[1.18] p-[6px]"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-[#111827] leading-[20px] line-clamp-2">
                      {item.description}
                    </p>

                    {/* META */}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-[11px] bg-[#F3F4F6] text-[#4B5563] px-2 py-[3px] rounded-full">
                        {item.timeToMaturity} Months
                      </span>

                      <span className="text-[11px] bg-[#EEF2FF] text-[#5B6FFF] px-2 py-[3px] rounded-full">
                        Min {formatCurrency(item.minInvestment)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right min-w-fit">
                  <p className="text-[#16A34A] font-bold text-[24px] leading-none">
                    {item.preTaxYield}%
                  </p>

                  <p className="text-[11px] text-[#9CA3AF] mt-[4px]">
                    YTM
                  </p>
                </div>
              </div>

              {/* PROGRESS */}
              {/* <div className="mt-4">
                <div className="flex items-center justify-between mb-[6px]">
                  <p className="text-[11px] text-[#6B7280] font-medium">
                    Filled
                  </p>

                  <p className="text-[11px] font-semibold text-[#111827]">
                    {item.percentageCompletion?.toFixed(0) || 0}%
                  </p>
                </div>

                <div className="w-full h-[7px] bg-[#EEF1F5] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.percentageCompletion >= 75
                      ? "bg-green-500"
                      : item.percentageCompletion >= 40
                        ? "bg-yellow-500"
                        : "bg-[#5B6FFF]"
                      }`}
                    style={{
                      width: `${Math.min(
                        item.percentageCompletion || 0,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div> */}

              {/* BOTTOM */}
              <div className="flex items-center justify-between mt-4">
                {/* RISK IMAGE */}
                <div className="relative w-[190px] h-[32px]">
                  <Image
                    src={getRatingImage(item.rating)}
                    alt={item.rating || "rating"}
                    fill
                    className="object-contain object-left"
                    unoptimized
                  />
                </div>

                {/* CTA */}
                <button
                  onClick={() =>
                    handleBondClick({
                      page: "asset-detail",
                      section: "bonds",
                      assetId: item.assetID,
                    })
                  }
                  className="h-[32px] px-4 rounded-full bg-[#F5F7FF] text-[#4F46E5] text-[13px] font-medium hover:bg-[#EEF2FF] transition-all duration-200"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={() =>
              setVisibleCount((prev) => prev + 6)
            }
            className="text-[#5B6FFF] text-[12px] font-semibold"
          >
            VIEW MORE
          </button>
        </div>
      )}

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
