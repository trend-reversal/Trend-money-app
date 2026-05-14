"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/hooks/mutations/useDeleteUser";

const reasons = [
  "I found a better alternative",
  "Too many notifications",
  "Privacy concerns",
  "I don't use the app anymore",
  "Facing technical issues",
  "Other",
];

export default function DeleteAccountReasonPage() {
  const router = useRouter();
  const [selectedReason, setSelectedReason] = useState("");
  const [comment, setComment] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { mutate: deleteAccount, isPending } =
    useDeleteUser();

  const handleDeleteAccount = () => {
    if (!selectedReason) {
      alert("Please select a reason");
      return;
    }

    const payload: {
      reason: string;
      others?: string;
    } = {
      reason: selectedReason,
    };

    if (comment.trim()) {
      payload.others = comment.trim();
    }

    deleteAccount(payload, {
      onSuccess: () => {
        setShowPopup(true);
      },
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);

    window.location.href = "/";
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden px-4">
      {/* Success Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={handlePopupClose}
        >
          <div
            className="w-full max-w-[300px] bg-white rounded-[14px] px-6 py-7 flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[18px] font-semibold text-[#111827] leading-snug">
              Thank You For Being With Us.
            </h2>
            <p className="mt-2 text-[13px] text-[#6B7280] leading-[1.5]">
              Your account has been successfully deleted.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center relative pt-14 mb-6">
        <button onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#000"
              strokeWidth="2"
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
          We're sad to see you go
        </h2>

        <p className="mt-2 text-[12px] text-[#4B5563] leading-[18px]">
          Before you delete your account, please tell us why — it takes under a
          minute and helps us improve.
        </p>

        <h3 className="mt-6 text-[14px] font-medium text-black">
          Why are you leaving?
        </h3>

        <div className="mt-2 flex flex-col gap-2">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`w-full h-[42px] rounded-[2px] border px-3 flex items-center gap-3 bg-white transition-all active:scale-[0.99] ${selectedReason === reason ? "border-black" : "border-[#E5E7EB]"
                }`}
            >
              <span
                className={`w-[14px] h-[14px] rounded-full border-[1.5px] flex items-center justify-center flex-shrink-0 ${selectedReason === reason
                  ? "border-black"
                  : "border-[#9CA3AF]"
                  }`}
              >
                {selectedReason === reason && (
                  <span className="w-[7px] h-[7px] rounded-full bg-black" />
                )}
              </span>
              <span className="text-[13px] text-[#4B5563]">{reason}</span>
            </button>
          ))}
        </div>

        <h3 className="mt-5 text-[13px] font-medium text-black">
          Additional comments (optional)
        </h3>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Anything else you'd like to share..."
          className="mt-2 w-full h-[100px] rounded-[2px] border border-[#E5E7EB] px-3 py-3 text-[13px] text-black placeholder:text-[#9CA3AF] outline-none resize-none"
        />
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={handleDeleteAccount}
          disabled={isPending}
          className="w-full h-[54px] rounded-[2px] bg-black text-white text-[14px] font-medium active:scale-[0.98] transition disabled:opacity-60"
        >
          {isPending ? "Deleting..." : "Delete Account"}
        </button>

        <button
          onClick={() => router.back()}
          className="w-full mt-4 text-[14px] font-medium text-[#EF4444] active:scale-[0.98] transition"
        >
          Keep My Account
        </button>
      </div>
    </div>
  );
}
