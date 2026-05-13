"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ManagePermissionPage() {
  const router = useRouter();
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center relative pt-14 px-4 mb-8">
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
          Manage Permission
        </h1>
      </div>

      {/* Biometric Row */}
      <div className="px-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-medium text-black">
              Unlock with Biometric
            </p>
            <p className="text-[12px] text-[#9CA3AF] leading-[1.5]">
              When enables, you'll need to use biometric to open Trend Reversal
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setBiometricEnabled((prev) => !prev)}
            className={`relative shrink-0 w-[46px] h-[26px] rounded-full transition-colors duration-200 ${
              biometricEnabled ? "bg-[#6366F1]" : "bg-[#D1D5DB]"
            }`}
          >
            <span
              className={`absolute top-[3px] w-[20px] h-[20px] bg-white rounded-full shadow transition-all duration-200 ${
                biometricEnabled ? "left-[23px]" : "left-[3px]"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
