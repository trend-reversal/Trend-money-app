"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/* 🔥 Animated Heading */
function AnimatedHeading() {
  const texts = [
    <>
      One place <br />
      for all your <br />
      <span className="text-[#6C7BFF] font-semibold">investments</span>
    </>,
    <>
      An Investment <br />
      <span className="text-[#6C7BFF] font-semibold">experience</span>
      <br />
      for you
    </>,
  ];

  // Append a clone of the first slide so we can always scroll right→left
  const slides = [...texts, texts[0]];

  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimated(true);
      setIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // When we land on the cloned first slide, silently jump back to the real one
  useEffect(() => {
    if (index === slides.length - 1) {
      const timer = setTimeout(() => {
        setAnimated(false); // disable transition
        setIndex(0); // jump to real first slide instantly
      }, 700); // wait for slide animation to finish
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex"
        style={{
          transform: `translate3d(-${index * 100}%, 0, 0)`,
          transition: animated ? "transform 700ms ease-in-out" : "none",
        }}
      >
        {slides.map((text, i) => (
          <div key={i} className="min-w-full">
            <h1 className="text-[34px] leading-[42px] font-medium text-[#1A1A2E]">
              {text}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔥 Main Page */
export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const router = useRouter();

  return (
    <div className="h-[100dvh] w-full max-w-[430px] mx-auto bg-white flex flex-col">
      {/* 🔵 Top Gradient */}
      <div
        className="w-full h-[373px] px-6 flex justify-center items-start pt-[80px]"
        style={{
          background:
            "linear-gradient(176.45deg, #7480FE -7.42%, #FFFFFF 80.76%)",
        }}
      >
        <div className="flex items-center gap-[14px]">
          <Image src="/images/logo.png" alt="logo" width={34} height={34} />
          <span className="font-cabin text-[25px] font-medium">
            Trend Money
          </span>
        </div>
      </div>

      {/* ⚪ Bottom */}
      <div className="flex-1 px-6 flex flex-col justify-between pb-6">
        <div>
          {!showOtp ? (
            <>
              {/* 🔹 LOGIN */}
              <AnimatedHeading />

              <div className="mt-8">
                <div className="w-full h-[55px] flex items-center rounded-[12px] border border-[#7480FE] bg-white px-4">
                  <span className="text-[14px] pr-3 border-r">+91</span>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    inputMode="numeric"
                    placeholder="Enter Phone Number"
                    className={`flex-1 pl-3 outline-none ${
                      phone ? "text-black" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 🔥 OTP SCREEN */}

              <div className="pt-2">
                {/* Back */}
                <button
                  onClick={() => setShowOtp(false)}
                  className="mb-6 active:scale-90 transition"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Title */}
                <h2 className="text-[22px] font-semibold text-[#1A1A2E]">
                  Enter OTP
                </h2>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 mt-2">
                  Enter your 4 digit OTP sent to <br />
                  <span className="text-[#6C7BFF]">+91 {phone}</span>
                </p>

                {/* OTP Boxes */}
                <div className="flex gap-3 mt-6">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-${i}`}
                      value={digit}
                      maxLength={1}
                      type="tel"
                      autoFocus={i === 0}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (!value) return;

                        const newOtp = [...otp];
                        newOtp[i] = value;
                        setOtp(newOtp);

                        const next = document.getElementById(`otp-${i + 1}`);
                        next?.focus();

                        if (newOtp.join("").length === 4) {
                          router.push("/home");
                        }
                      }}
                      className="w-[60px] h-[60px] text-center text-xl border border-[#7480FE] rounded-[12px]
                      focus:outline-none focus:ring-2 focus:ring-[#7480FE]"
                    />
                  ))}
                </div>

                {/* Resend */}
                <p className="text-xs text-gray-400 mt-4">
                  Resend OTP in <span className="text-[#6C7BFF]">00:25</span>
                </p>
              </div>
            </>
          )}
        </div>

        {/* 🔘 Button */}
        {!showOtp && (
          <button
            onClick={() => {
              if (phone.length > 0) setShowOtp(true);
            }}
            className={`w-full h-[51px] rounded-[8px] text-[15px] font-semibold transition active:scale-[0.98]
              ${
                phone.length > 0
                  ? "bg-black text-white"
                  : "bg-[#E5E9E9] text-[#9CA3AF]"
              }`}
          >
            {phone.length > 0 ? "Continue" : "Get Started"}
          </button>
        )}
      </div>
    </div>
  );
}
