"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Category() {
  const router = useRouter();

  const items = [
    { name: "FDs", icon: "/images/fd.png", route: "/fd" },
    { name: "GOLD", icon: "/images/gold-icon.png", route: "/gold" },
    { name: "BONDS", icon: "/images/bond.png", route: "/bonds" },
    { name: "SILVER", icon: "/images/silver.png", route: "/silver" },
  ];

  return (
    <section className="px-6 mt-38">
      <div className="grid grid-cols-4 gap-2 text-center">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.route)}
            className="flex flex-col items-center cursor-pointer"
          >
            {/* 🔥 Icon */}
            <div className="relative w-[64px] h-[64px]">
              <Image
                src={item.icon}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>

            {/* Label */}
            <p className="text-[11px] mt-2 text-[#595C5D] font-inter font-medium tracking-wide">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
