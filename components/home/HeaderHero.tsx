"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function HeaderHero() {
  const assets = [
    {
      name: "Gold",
      img: "/images/gold-main.png",
      starting: "₹10",
      label: "Returns",
      value: "25.0%*",
    },
    {
      name: "Silver",
      img: "/images/silver-main.png",
      starting: "₹10",
      label: "Returns",
      value: "25.0%*",
    },
    {
      name: "Bond",
      img: "/images/bond-main.png",
      starting: "₹1,000",
      label: "YTM upto",
      value: "12.5%*",
    },
    {
      name: "FD",
      img: "/images/fd-main.png",
      starting: "₹1,000",
      label: "Returns",
      value: "8.10%*",
    },
  ];

  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0); // for info section, updates after animation
  const animating = useRef(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const CENTER_CARD = 200;
  const SIDE_CARD = 148;
  const GAP = 12;
  const STEP = CENTER_CARD / 2 + GAP + SIDE_CARD / 2; // 186px

  // Each offset slot's center/side size — driven by a motion value per slot
  // We use a single trackX motion value for the sliding
  const trackX = useMotionValue(0);

  // Per-slot animated sizes: offsets -2,-1,0,1,2
  // slot 2 (center) = CENTER_CARD, others = SIDE_CARD
  // We'll animate these with framer on slide
  const slotSizes = useRef([
    SIDE_CARD, // -2
    SIDE_CARD, // -1
    CENTER_CARD, // 0 (center)
    SIDE_CARD, // +1
    SIDE_CARD, // +2
  ]);

  // Motion values for each slot's width/height
  const slot0W = useMotionValue(SIDE_CARD);
  const slot1W = useMotionValue(SIDE_CARD);
  const slot2W = useMotionValue(CENTER_CARD); // center
  const slot3W = useMotionValue(SIDE_CARD);
  const slot4W = useMotionValue(SIDE_CARD);
  const slotWidths = [slot0W, slot1W, slot2W, slot3W, slot4W];

  const EASING = [0.32, 0.72, 0, 1] as const;
  const DURATION = 0.42;

  const slide = (dir: "next" | "prev") => {
    if (animating.current) return;
    animating.current = true;

    // Slide track
    animate(trackX, dir === "next" ? -STEP : STEP, {
      duration: DURATION,
      ease: EASING,
      onComplete: () => {
        // Snap: reset trackX instantly, update index
        trackX.set(0);
        setIndex((prev) =>
          dir === "next"
            ? (prev + 1) % assets.length
            : (prev - 1 + assets.length) % assets.length,
        );
        setDisplayIndex((prev) =>
          dir === "next"
            ? (prev + 1) % assets.length
            : (prev - 1 + assets.length) % assets.length,
        );
        animating.current = false;
      },
    });

    // Animate sizes: on "next", slot index 3 (offset +1) grows to center, slot 2 (offset 0) shrinks
    // on "prev", slot index 1 (offset -1) grows to center, slot 2 (offset 0) shrinks
    const growing = dir === "next" ? 3 : 1; // slot array index
    const shrinking = 2; // center slot

    animate(slotWidths[growing], CENTER_CARD, {
      duration: DURATION,
      ease: EASING,
    });
    animate(slotWidths[shrinking], SIDE_CARD, {
      duration: DURATION,
      ease: EASING,
    });

    // After snap, reset sizes back
    setTimeout(
      () => {
        slotWidths[growing].set(SIDE_CARD);
        slotWidths[shrinking].set(CENTER_CARD);
      },
      DURATION * 1000 + 10,
    );
  };

  const handleTouchStart = (e: any) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) slide("next");
    if (touchStart - touchEnd < -50) slide("prev");
  };

  return (
    <section className="pt-14 pb-6 w-full h-[386px] -mt-[31px] bg-gradient-to-b from-[#7480FE] to-[#FFFFFF]">
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

      {/* Carousel */}
      <div
        className="relative overflow-hidden h-[220px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="absolute flex items-center top-1/2 -translate-y-1/2"
          style={{
            gap: GAP,
            left: "50%",
            x: trackX,
            translateX: "-50%",
          }}
        >
          {[-2, -1, 0, 1, 2].map((offset, slotIdx) => {
            const i = (index + offset + assets.length * 10) % assets.length;
            const w = slotWidths[slotIdx];
            const isCenter = offset === 0;

            return (
              <motion.div
                key={offset}
                style={{
                  width: w,
                  height: w,
                  flexShrink: 0,
                  borderRadius: 16,
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: isCenter
                    ? "0 8px 24px rgba(0,0,0,0.10)"
                    : "0 4px 12px rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={assets[i].img}
                  alt={assets[i].name}
                  width={CENTER_CARD}
                  height={CENTER_CARD}
                  className="object-contain w-full h-full p-2"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Info */}
      <div className="mt-5 px-6 bg-white pt-5 pb-2 text-center">
        <h2 className="text-[18px] font-bold text-[#1C1B1B]">
          {assets[displayIndex].name}
        </h2>
        <p className="text-[13px] text-[#4D4D4D] mt-1">
          Starting at {assets[displayIndex].starting} |{" "}
          {assets[displayIndex].label}{" "}
          <span className="text-[#16A34A] font-semibold">
            {assets[displayIndex].value}
          </span>
        </p>
        <button className="w-[135px] h-[41px] mt-4 bg-[#131314] text-white rounded-[6px] text-[14px] active:scale-[0.98] transition">
          Invest Now
        </button>
      </div>
    </section>
  );
}
