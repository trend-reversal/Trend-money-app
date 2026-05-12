"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const settingsItems = [
    {
      label: "Security & Permission",
      route: "/security-permission",
    },
    {
      label: "Delete Account",
      route: "/delete-account",
    },
  ];

  return (
    <div className="min-h-[100dvh] w-full max-w-[430px] mx-auto bg-[#F7F7F7]">
      {/* Header */}
      <div className="flex items-center gap-3 pt-14 px-4">
        <button onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#000"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h1 className="text-[18px] font-medium text-black">Settings</h1>
      </div>

      {/* Settings Menu */}
      <div className="mt-8 px-4 space-y-4">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.route)}
            className="w-full h-[52px] bg-[#F2F2F2] rounded-full px-5 flex items-center justify-between active:scale-[0.99] transition"
          >
            <span className="text-[14px] text-black">{item.label}</span>

            <ChevronRight size={18} color="#6B7280" />
          </button>
        ))}
      </div>
    </div>
  );
}
