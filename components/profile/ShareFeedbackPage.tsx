"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

export default function ShareFeedbackPage() {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const isValid = rating > 0 && feedback.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) return;
    console.log({ rating, feedback });
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    router.push("/profile");
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden px-4">
      {/* Thank You Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={handlePopupClose}
        >
          <div
            className="w-full max-w-[300px] bg-white rounded-[14px] px-6 py-8 flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-[20px] font-bold text-black leading-snug">
              Thank you!
            </h2>
            <p className="mt-2 text-[14px] text-[#4B5563] leading-[1.5]">
              For sharing your valuable feedback.
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
          Share Feedback
        </h1>
      </div>

      {/* Content */}
      <div>
        {/* Rating */}
        <h2 className="text-[15px] font-medium text-black">
          How Was Your Review?
        </h2>

        <div className="flex items-center gap-3 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Star
                size={28}
                strokeWidth={1.2}
                className={
                  star <= rating
                    ? "fill-[#FACC15] text-[#FACC15]"
                    : "fill-none text-[#D1D5DB]"
                }
              />
            </button>
          ))}
        </div>

        {/* Feedback Card */}
        <div className="mt-8 rounded-[16px] bg-[#F7F7F9] px-4 pt-4 pb-6">
          <h3 className="text-[13px] font-medium text-black">
            Tell us how we can improve?
          </h3>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your feedback is extremely valuable to us to deliver the best experience"
            className="mt-3 w-full h-[140px] bg-[#EFEFEF] rounded-[8px] px-4 py-4 text-[11px] leading-[17px] text-black placeholder:text-[#9CA3AF] outline-none resize-none border-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full h-[54px] rounded-[4px] text-[14px] font-medium transition ${
            isValid
              ? "bg-black text-white active:scale-[0.98]"
              : "bg-[#C9CED3] text-white cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
