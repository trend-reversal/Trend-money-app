"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

const menuItems = [
  {
    label: "Security & Permission",
    route: "/profile/profile-settings/manage-permission",
  },
  {
    label: "Delete Account",
    route: "/profile/profile-settings/delete-account",
  },
];

export default function ProfileSettingsPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center relative pt-14 px-4 mb-6">
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
        <h1 className="text-[18px] font-medium text-black ml-4">Settings</h1>
      </div>

      {/* Menu */}
      <div className="px-4 flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.route)}
            className="w-full flex items-center justify-between bg-[#F7F7F7] rounded-xl px-4 py-[17px] active:scale-[0.98] transition"
          >
            <span className="text-[14px] text-black">{item.label}</span>
            <ChevronRight size={16} color="#9CA3AF" />
          </button>
        ))}
      </div>
    </div>
  );
}
