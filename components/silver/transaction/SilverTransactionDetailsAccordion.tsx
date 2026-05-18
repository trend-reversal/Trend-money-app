"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

type SilverTransactionDetailsAccordionProps = {
  variant?: "success" | "failed" | "pending";
};

export default function SilverTransactionDetailsAccordion({
  variant = "success",
}: SilverTransactionDetailsAccordionProps) {
  const isFailed = variant === "failed";
  const isPending = variant === "pending";

  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="mt-[18px] overflow-hidden rounded-[4px] bg-white shadow-[0_4px_14px_rgba(0,0,0,0.10)]">
      <button
        type="button"
        onClick={() => setShowDetails((prev) => !prev)}
        className="flex h-[48px] w-full items-center justify-between px-[14px] text-left"
      >
        <span className="text-[13px] font-medium text-black">
          Transaction Details
        </span>

        <ChevronDown
          size={18}
          className={`text-[#6B7280] transition-transform duration-200 ${
            showDetails ? "rotate-180" : ""
          }`}
        />
      </button>

      {showDetails && (
        <div className="px-[14px] pb-[18px]">
          <div className="border-t border-dashed border-[#E5E7EB] pt-[14px]">
            <div className="space-y-[10px]">
              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#6B7280]">Type</p>
                <p className="text-[12px] font-medium text-[#333333]">Buy</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#6B7280]">Transaction ID</p>
                <p className="text-[12px] font-medium text-[#333333]">
                  8901533
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#6B7280]">Transaction Date</p>
                <p className="text-[12px] font-medium text-[#333333]">
                  24 Mar 2026
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#6B7280]">Transaction Type</p>
                <p className="text-[12px] font-medium text-[#333333]">SIP</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] text-[#6B7280]">Frequency</p>
                <p className="text-[12px] font-medium text-[#333333]">Daily</p>
              </div>
            </div>

            {isFailed ? (
              <p className="mt-[16px] text-[11px] leading-[15px] text-[#FF3B30]">
                If money is deducted from your bank, it will be refunded within
                24 hours.
              </p>
            ) : isPending ? (
              <p className="mt-[16px] text-[11px] leading-[15px] text-[#D69A00]">
                Your request is being processed. It may take some time to
                complete.
              </p>
            ) : (
              <div className="mt-[20px] border-t border-dashed border-[#E5E7EB] pt-[20px]">
                <h3 className="text-[15px] font-medium text-black">
                  Transaction Status
                </h3>

                <div className="mt-[18px] flex items-start justify-between">
                  <div className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#16A05D] text-[13px] text-white">
                        ✓
                      </span>
                      <span className="h-[1px] flex-1 bg-[#16A05D]" />
                    </div>
                    <p className="mt-[8px] text-center text-[14px] text-[#6B7280]">
                      Initiated
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#16A05D] text-[13px] text-white">
                        ✓
                      </span>
                      <span className="h-[1px] flex-1 bg-[#E5E7EB]" />
                    </div>
                    <p className="mt-[8px] text-center text-[14px] leading-[18px] text-[#6B7280]">
                      Payment
                      <br />
                      Confirmed
                    </p>
                  </div>

                  <div className="flex flex-1 flex-col items-center">
                    <div className="flex w-full items-center justify-end">
                      <span className="h-[1px] flex-1 bg-[#E5E7EB]" />
                      <span className="h-[22px] w-[22px] rounded-full border-2 border-[#D8D8D8] bg-white" />
                    </div>
                    <p className="mt-[8px] text-center text-[14px] leading-[18px] text-[#6B7280]">
                      Silver
                      <br />
                      Purchased
                    </p>
                  </div>
                </div>

                <p className="mt-[28px] text-[11px] leading-[16px] text-[#4B5563]">
                  Your silver will be delivered to your account within 24–48
                  hours. You'll get an update once the process is complete.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
