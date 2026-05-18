"use client";

import { ArrowLeft, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SilverTransactionDetailsAccordion from "@/components/silver/transaction/SilverTransactionDetailsAccordion";

export default function SilverTransactionDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status") || "success";

  const isFailed = status === "failed";
  const isPending = status === "pending";

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white text-[#111827]">
      <div className="relative min-h-screen w-full overflow-x-hidden bg-white">
        <section className="w-full bg-[#A9AEFF] px-6 pt-[56px] pb-[34px] text-white">
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => router.back()}>
              <ArrowLeft size={24} strokeWidth={2} />
            </button>

            <h1 className="text-[15px] font-semibold tracking-[0.4px] text-white">
              Transaction Details
            </h1>
          </div>
        </section>

        <section className="-mt-[14px] w-full px-6 pb-[120px]">
          <div className="w-full overflow-hidden rounded-[8px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
            <div className="relative min-h-[96px] px-[14px] pt-[18px]">
              <div>
                <p className="text-[11px] font-medium text-[#8E95A3]">
                  {isFailed
                    ? "Purchase Unsuccessful"
                    : isPending
                      ? "You Are Buying"
                      : "You bought"}
                </p>

                <h2 className="mt-[5px] text-[20px] font-bold leading-none tracking-[0.4px] text-[#111827]">
                  0.453 g
                </h2>

                <p className="mt-[8px] text-[11px] font-semibold tracking-[1px] text-[#A2A9B7]">
                  999 DIGITAL SILVER
                </p>
              </div>

              <img
                src="/images/silver/silver-fine.png"
                alt="Silver"
                className="absolute right-[-2px] top-[20px] h-[66px] w-[130px] object-contain"
              />
            </div>

            <div className="px-[14px] pt-[8px]">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-medium text-black">
                  Total Breakdown
                </h3>

                <span
                  className={`inline-flex h-[24px] items-center gap-1.5 rounded-full border px-3 text-[11px] font-semibold ${
                    isFailed
                      ? "border-[#E53935] bg-[#FFECEC] text-[#E53935]"
                      : isPending
                        ? "border-[#E5B73B] bg-[#FFF8E6] text-[#D69A00]"
                        : "border-[#16A05D] bg-white text-[#16A05D]"
                  }`}
                >
                  <span
                    className={`flex h-[13px] w-[13px] items-center justify-center rounded-full text-[8px] ${
                      isFailed
                        ? "bg-[#E53935] text-white"
                        : isPending
                          ? "border border-[#D69A00] bg-white text-[#D69A00]"
                          : "bg-[#16A05D] text-white"
                    }`}
                  >
                    {isFailed ? "!" : isPending ? "!" : "✓"}
                  </span>
                  {isFailed ? "FAILED" : isPending ? "PENDING" : "Success"}
                </span>
              </div>

              <div className="mt-[13px] border-t border-dashed border-[#E5E7EB] pt-[13px]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] text-[#6B7280]">Silver Value</p>
                  <p className="text-[12px] font-medium text-[#333333]">
                    ₹ 11,015.33
                  </p>
                </div>

                <div className="mt-[13px] flex items-center justify-between">
                  <p className="text-[12px] text-[#6B7280]">GST (3%)</p>
                  <p className="text-[12px] font-medium text-[#333333]">
                    ₹ 256.66
                  </p>
                </div>

                <div className="mt-[13px] border-t border-dashed border-[#E5E7EB] pt-[13px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] text-[#6B7280]">Silver quality</p>
                    <p className="text-[12px] font-medium text-[#333333]">
                      0.453 gm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[16px] flex h-[42px] items-center justify-between bg-[#EFFFF5] px-[14px]">
              <p className="text-[12px] font-semibold text-[#333333]">
                Total Paid Amount
              </p>
              <p className="text-[12px] font-semibold text-[#333333]">
                ₹11,272.00
              </p>
            </div>
          </div>

          <SilverTransactionDetailsAccordion
            variant={isFailed ? "failed" : isPending ? "pending" : "success"}
          />
        </section>

        <div className="fixed bottom-[28px] left-0 right-0 w-full px-6">
          <button
            type="button"
            className="flex h-[42px] w-full items-center justify-center gap-4 rounded-[4px] bg-black text-[13px] font-medium tracking-[0.3px] text-white shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
          >
            Download Invoice
            <Download size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </main>
  );
}
