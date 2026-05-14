"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const aboutItems = [
  {
    label: "Terms & Conditions",
    route: "/profile/about-trend-reversal/terms-conditions",
  },
  {
    label: "Privacy Policy",
    route: "/profile/about-trend-reversal/privacy-policy",
  },
  {
    label: "Key Policies",
    route: "/profile/about-trend-reversal/key-policies",
  },
  {
    label: "UPI User guidelines",
    route: "/profile/about-trend-reversal/upi-user-guidelines",
  },
  {
    label: "Our Partners",
    route: "/profile/about-trend-reversal/our-partners",
  },
  {
    label: "Refund & Cancellation",
    route: "/profile/about-trend-reversal/refund-cancellation",
  },
];

export default function AboutTrendReversalPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden px-4">
      {/* Header */}
      <div className="flex items-center relative pt-14 mb-6">
        <button onClick={() => router.back()}>
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

        <h1 className="text-[18px] font-medium text-black ml-4">
          About Trend Reversal
        </h1>
      </div>

      {/* List */}
      <div className="flex flex-col gap-[10px]">
        {aboutItems.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.route)}
            className="w-full h-[50px] rounded-[12px] bg-[#F7F7F9] px-4 flex items-center justify-between active:scale-[0.98] transition"
          >
            <span className="text-[13px] text-black">{item.label}</span>
            <ChevronRight size={16} color="#9CA3AF" strokeWidth={2} />
          </button>
        ))}
      </div>
    </div>
  );
}
