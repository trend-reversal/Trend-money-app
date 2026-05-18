"use client";

import { ReactNode } from "react";

export interface HoldingCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  value: string;
  returnPct: string;
  hasActivity?: boolean; // 👈 added
  onClick?: () => void;
}

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C5C8D0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function PortfolioHoldingCard({
  icon,
  title,
  subtitle,
  value,
  returnPct,
  hasActivity = true, // 👈 default true so existing cards are unaffected
  onClick,
}: HoldingCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-[12px] bg-white px-4 py-[14px] text-left active:scale-[0.99] transition-transform duration-100"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#F5F5F5]">
          {icon}
        </div>
        <div>
          <p className="text-[14px] font-medium text-black">{title}</p>
          <p className="mt-[2px] text-[11px] text-[#9198A4]">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {hasActivity ? (
          <div className="text-right">
            <p className="text-[14px] font-semibold text-black">{value}</p>
            <p className="mt-[2px] text-[11px] text-[#16A05D]">{returnPct}</p>
          </div>
        ) : (
          <p className="text-[13px] font-medium text-black">Invest Now</p>
        )}
        <ChevronRight />
      </div>
    </button>
  );
}

export function DigitalGoldIcon() {
  return (
    <img
      src="/images/porffolio/gold-icon.svg"
      width={22}
      height={22}
      alt="Digital Gold"
    />
  );
}

export function DigitalSilverIcon() {
  return (
    <img
      src="/images/porffolio/silver-icon.svg"
      width={22}
      height={22}
      alt="Digital Silver"
    />
  );
}

export function FixedDepositIcon() {
  return (
    <img
      src="/images/porffolio/fd-icon.svg"
      width={22}
      height={22}
      alt="Fixed Deposit"
    />
  );
}

export function BondsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#555"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}
