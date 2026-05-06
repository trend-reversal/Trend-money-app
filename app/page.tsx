"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // safer navigation for mobile
      router.replace("/login");

      // fallback (in case router fails on some devices)
      setTimeout(() => {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-[100dvh] w-full max-w-[430px] mx-auto flex flex-col justify-between bg-white px-6 py-8 overflow-hidden">
      {/* Center Content */}
      <div className="flex flex-col items-center justify-center flex-1">
        {/* Logo */}
        <div className="w-[72px] h-[72px] rounded-[20px] overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={72}
            height={72}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* App Name */}
        <h1 className="mt-[14px] text-[19px] font-cabin font-bold text-black tracking-[0.01em]">
          Trend Money
        </h1>
      </div>

      {/* Bottom ISO Badge */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2">
          <Image
            src="/images/crtificate.png"
            alt="ISO 27001 Certified"
            width={35}
            height={35}
          />
          <div className="flex flex-col leading-none">
            <span className="text-[18px] font-inter font-bold text-[#2F2F2F] tracking-wide">
              ISO 27001
            </span>
            <span className="text-[16px] font-inter font-medium text-[#2F2F2F] tracking-widest uppercase">
              CERTIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
