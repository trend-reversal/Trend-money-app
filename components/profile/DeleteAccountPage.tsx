"use client";

import { useRouter } from "next/navigation";

export default function DeleteAccountPage() {
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
          Delete Account
        </h1>
      </div>

      {/* Content */}
      <div>
        <h2 className="text-[16px] font-medium text-black leading-5">
          Are you sure you want to delete
          <br />
          your account ?
        </h2>

        <p className="mt-5 text-[12px] text-[#4B5563] leading-[18px] max-w-[320px]">
          Once deleted, this action can’t be undone.
          <br />
          All your personal details including your name,
          <br />
          phone number, email address, and login will
          <br />
          be permanently deleted from our records
          <br />
          immediately.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={() => router.back()}
          className="w-full h-[54px] rounded-[2px] bg-black text-white text-[14px] font-medium active:scale-[0.98] transition"
        >
          Cancel
        </button>

        <button
          onClick={() =>
            router.push("/profile/profile-settings/delete-account-reason")
          }
          className="w-full mt-4 text-[14px] font-medium text-[#EF4444] active:scale-[0.98] transition"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
