"use client";

import { useRouter } from "next/navigation";
import {
  Settings,
  UserPlus,
  MessageSquare,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    { icon: <Settings size={18} color="#4B5563" />, label: "Settings" },
    { icon: <UserPlus size={18} color="#4B5563" />, label: "Add Nominee" },
    {
      icon: <MessageSquare size={18} color="#4B5563" />,
      label: "Share Feedback",
    },
  ];

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center relative pt-14 px-4">
        <button onClick={() => router.back()} className="absolute left-4">
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

        <h1 className="text-[18px] font-medium text-black">Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-7">
        <div className="relative w-[120px] h-[120px]">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#D9D9D9"
              strokeWidth="5"
              fill="none"
            />

            <circle
              cx="60"
              cy="60"
              r="55"
              stroke="#16A34A"
              strokeWidth="5"
              fill="none"
              strokeDasharray="345"
              strokeDashoffset="110"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-[14px] rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-[40px] font-medium">AD</span>
          </div>
        </div>

        <h2 className="mt-5 text-[18px] font-semibold text-black">
          Adwin Dorman
        </h2>

        <p className="mt-1 text-[12px] text-[#606060]">+91 7011281257</p>

        <button className="mt-4 w-[118px] h-[34px] rounded-[6px] bg-black text-white text-[12px] font-medium active:scale-[0.98] transition">
          Edit Profile
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-[#ECECEC] mt-8 mx-6" />

      {/* Menu */}
      <div className="px-4 mt-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4">
              {item.icon}

              <span className="text-[14px] text-black">{item.label}</span>
            </div>

            <ChevronRight size={16} color="#4B5563" />
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[#DDDDDD] mt-3 mx-4" />

      {/* Bottom Menu */}
      <div className="px-4 mt-3">
        {/* Help */}
        <button className="w-full flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <HelpCircle size={18} color="#4B5563" />

            <span className="text-[14px] text-black">Help & Support</span>
          </div>

          <ChevronRight size={16} color="#4B5563" />
        </button>

        {/* Logout */}
        <button className="w-full flex items-center gap-4 py-4">
          <LogOut size={18} color="#FF4D4F" />

          <span className="text-[14px] text-[#FF4D4F] font-medium">
            Log Out
          </span>
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 right-0 max-w-[430px] mx-auto px-4">
        <p className="text-[11px] text-[#2563EB]">About Trend Reversal</p>

        <p className="text-[10px] text-[#7B7B7B] mt-1">App Version 0.1</p>
      </div>
    </div>
  );
}
