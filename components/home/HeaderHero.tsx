"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderHero() {
  const assets = [
    {
      name: "Gold",
      img: "/images/gold-main.png",
      starting: "₹10",
      label: "Returns",
      value: "25.0%*",
      route: "/gold",
    },
    {
      name: "Silver",
      img: "/images/silver-main.png",
      starting: "₹10",
      label: "Returns",
      value: "25.0%*",
      route: "/silver",
    },
    {
      name: "Bond",
      img: "/images/bond-main.png",
      starting: "₹1,000",
      label: "YTM upto",
      value: "12.5%*",
      route: "/bonds",
    },
    {
      name: "FD",
      img: "/images/fd-main.png",
      starting: "₹1,000",
      label: "Returns",
      value: "8.10%*",
      route: "/fd",
    },
  ];

  const [index, setIndex] = useState(0);
  const router = useRouter();
  const [trackX, setTrackX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slidingDir, setSlidingDir] = useState<"next" | "prev" | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const CENTER_CARD = 200;
  const SIDE_CARD = 148;
  const GAP = 12;
  const STEP = CENTER_CARD / 2 + GAP + SIDE_CARD / 2; // 186px

  const slide = (dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setSlidingDir(dir);
    setTrackX(dir === "next" ? -STEP : STEP);

    setTimeout(() => {
      setIndex((prev) =>
        dir === "next"
          ? (prev + 1) % assets.length
          : (prev - 1 + assets.length) % assets.length,
      );
      setTrackX(0);
      setAnimating(false);
      setSlidingDir(null);
    }, 420);
  };

  // ✅ Slide ke dauran incoming card grow karo, outgoing shrink karo
  const getCardSize = (offset: number) => {
    if (animating && slidingDir === "next") {
      if (offset === 1) return CENTER_CARD; // incoming → grow
      if (offset === 0) return SIDE_CARD; // outgoing → shrink
    }
    if (animating && slidingDir === "prev") {
      if (offset === -1) return CENTER_CARD; // incoming → grow
      if (offset === 0) return SIDE_CARD; // outgoing → shrink
    }
    return offset === 0 ? CENTER_CARD : SIDE_CARD;
  };

  const handleTouchStart = (e: any) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);

    if (Math.abs(touchStart - e.targetTouches[0].clientX) > 10) {
      setIsSwiping(true);
    }
  };
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      slide("next");
    } else if (touchStart - touchEnd < -50) {
      slide("prev");
    }

    setTimeout(() => {
      setIsSwiping(false);
    }, 100);
  };

  return (
    <section className="pt-24 pb-6 w-full h-[386px] -mt-[31px] bg-gradient-to-b from-[#7480FE] to-[#FFFFFF]">
      {/* Header */}
      <div className="flex justify-between items-center text-white px-6 mb-8">
        <div>
          <h1 className="text-[24px] italic">Hi, Investor!</h1>
          <p className="text-[13px] mt-[2px]">
            Let's Build Your Financial Future
          </p>
        </div>
        <div className="relative w-[48px] h-[48px]">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#22C55E"
              strokeWidth="3"
              strokeDasharray="132"
              strokeDashoffset="33"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-[4px] bg-white rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#929292">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 🔥 Carousel */}
      <div
        className="relative overflow-hidden h-[220px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute flex items-center top-1/2"
          style={{
            gap: GAP,
            left: "50%",
            transform: `translateX(calc(-50% + ${trackX}px)) translateY(-50%)`,
            transition: animating ? "transform 420ms ease-in-out" : "none",
          }}
        >
          {[-2, -1, 0, 1, 2].map((offset) => {
            const i = (index + offset + assets.length * 10) % assets.length;
            const size = getCardSize(offset);
            const imgSize = size === CENTER_CARD ? 168 : 124;
            const padding = size === CENTER_CARD ? 16 : 12;

            return (
              <div
                key={offset}
                onClick={() => {
                  if (!isSwiping) {
                    router.push(assets[i].route);
                  }
                }}
                style={{
                  width: size,
                  height: size,
                  flexShrink: 0,
                  borderRadius: 16,
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding,
                  boxShadow:
                    size === CENTER_CARD
                      ? "0 8px 24px rgba(0,0,0,0.10)"
                      : "0 4px 12px rgba(0,0,0,0.06)",
                  // ✅ Track ke saath saath size bhi smoothly animate hoga
                  transition:
                    "width 420ms ease-in-out, height 420ms ease-in-out, padding 420ms ease-in-out, box-shadow 420ms ease-in-out",
                }}
              >
                <Image
                  src={assets[i].img}
                  alt={assets[i].name}
                  width={imgSize}
                  height={imgSize}
                  className="object-contain"
                  style={{
                    transition:
                      "width 420ms ease-in-out, height 420ms ease-in-out",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 px-6 bg-white pt-5 pb-2 text-center">
        <h2 className="text-[18px] font-bold text-[#1C1B1B]">
          {assets[index].name}
        </h2>
        <p className="text-[13px] text-[#4D4D4D] mt-1">
          Starting at {assets[index].starting} | {assets[index].label}{" "}
          <span className="text-[#16A34A] font-semibold">
            {assets[index].value}
          </span>
        </p>
        <button className="w-[135px] h-[41px] mt-4 bg-[#131314] text-white rounded-[6px] text-[14px] active:scale-[0.98] transition">
          Invest Now
        </button>
      </div>
    </section>
  );
}
