"use client";

import { useRouter } from "next/navigation";

const TRANSACTIONS = [
  {
    type: "SIP",
    title: "Silver Bought",
    date: "01 Mar 2026 • 09:00 AM",
    txn: "TXN1234567885",
    amount: "₹5,000",
    status: "SUCCESS",
    statusType: "success",
    bg: "#FFFBEA",
    text: "#C59B00",
    note: "Monthly SIP",
  },
  {
    type: "BUY",
    title: "Silver Bought",
    date: "15 Apr 2026 • 09:45 AM",
    txn: "TXN1234567888",
    amount: "₹11,000",
    status: "FAILED",
    statusType: "failed",
    bg: "#EFFFF4",
    text: "#16A05D",
    note: "",
  },
  {
    type: "SELL",
    title: "Silver Sold",
    date: "22 Apr 2026 • 10:32 AM",
    txn: "TXN1234567890",
    amount: "₹17,488.63",
    status: "SUCCESS",
    statusType: "success",
    bg: "#FFF0F0",
    text: "#EF4444",
    note: "",
  },
  {
    type: "BUY",
    title: "Silver Bought",
    date: "15 Apr 2026 • 09:45 AM",
    txn: "TXN1234567888",
    amount: "₹11,000",
    status: "PENDING",
    statusType: "pending",
    bg: "#EFFFF4",
    text: "#16A05D",
    note: "",
  },
  {
    type: "BUY",
    title: "Silver Bought",
    date: "15 Apr 2026 • 09:45 AM",
    txn: "TXN1234567888",
    amount: "₹11,000",
    status: "FAILED",
    statusType: "failed",
    bg: "#EFFFF4",
    text: "#16A05D",
    note: "",
  },
];

function StatusBadge({ status, type }: { status: string; type: string }) {
  const styles =
    type === "success"
      ? "bg-[#E8F9EF] text-[#0FA355] border-[#BFECCF]"
      : type === "failed"
        ? "bg-[#FFEDED] text-[#E03C3C] border-[#FFC7C7]"
        : "bg-[#FFF8E0] text-[#C8920A] border-[#F3D98A]";

  const icon =
    type === "success" ? (
      <svg
        className="h-[10px] w-[10px] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="#0FA355"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline
          points="8.5 12.2 10.8 14.5 15.8 9.5"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : type === "failed" ? (
      <svg className="h-[10px] w-[10px] flex-shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#E03C3C" />
        <line
          x1="8"
          y1="8"
          x2="16"
          y2="16"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <line
          x1="16"
          y1="8"
          x2="8"
          y2="16"
          stroke="white"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </svg>
    ) : (
      <svg
        className="h-[10px] w-[10px] flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C8920A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6.5 12 12 15.5 14" />
      </svg>
    );

  return (
    <span
      className={`inline-flex items-center gap-[5px] rounded-full border px-[8px] py-[3px] text-[9px] font-bold leading-none ${styles}`}
    >
      {icon}
      {status}
    </span>
  );
}

export default function SilverTransaction() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-[#111827]">
      {/* FULL WIDTH HEADER */}
      <section
        className="w-full"
        style={{
          background:
            "linear-gradient(176.45deg, #7480FE -7.42%, #FFFFFF 80.76%)",
        }}
      >
        <div className="mx-auto flex min-h-[150px] w-full max-w-[390px] flex-col justify-between px-5 pt-[52px] pb-5">
          <div className="flex items-start justify-between">
            {/* LEFT */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="mt-[2px]"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div>
                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                    color: "#ffffff",
                    margin: 0,
                    fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
                  }}
                >
                  Transaction
                </h1>

                <p
                  style={{
                    marginTop: "5px",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  View your investment activity
                </p>
              </div>
            </div>

            {/* FILTER BUTTON */}
            <button
              type="button"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[14px] bg-white/95 shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT CONTAINER */}
      <div className="mx-auto min-h-screen w-full max-w-[390px] bg-white">
        {/* SEARCH + FILTERS */}
        <section className="bg-white px-[14px] pt-[13px] pb-[20px]">
          <div className="flex gap-[7px]">
            <div className="flex h-[43px] flex-1 items-center gap-[10px] rounded-[7px] border border-[#E6E8EF] bg-white px-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8F98A8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                placeholder="Search by ID, Status, Type"
                className="w-full bg-transparent text-[12px] outline-none placeholder:text-[#8F98A8]"
              />
            </div>

            <button
              type="button"
              className="flex h-[43px] w-[43px] flex-shrink-0 items-center justify-center rounded-[7px] border border-[#E6E8EF] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111827"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="3" x2="12" y2="21" />
                <polyline points="17 8 12 3 7 8" />
                <polyline points="17 16 12 21 7 16" />
              </svg>
            </button>
          </div>

          <div className="mt-[21px] flex gap-[12px] overflow-x-auto pb-[1px] [&::-webkit-scrollbar]:hidden">
            {["All", "Buy", "Sell", "SIP", "Mandates"].map((item) => (
              <button
                type="button"
                key={item}
                className={`flex h-[34px] min-w-[56px] items-center justify-center whitespace-nowrap rounded-[7px] border px-[15px] text-[12px] font-semibold ${
                  item === "All"
                    ? "border-[#7B7CFF] text-[#7476FF] shadow-[0_2px_5px_rgba(116,118,255,0.16)]"
                    : item === "Mandates"
                      ? "rounded-full border-[#EBEDF3] text-[#6B7280]"
                      : "border-[#EBEDF3] text-[#9CA3AF]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* DATE ROW */}
        <div className="flex items-center justify-between bg-white px-[24px] pb-[14px]">
          <p className="text-[16px] font-medium text-[#111827]">April 2026</p>
          <p className="text-[11px] text-[#9AA3B2]">Total (8)</p>
        </div>

        {/* LIST */}
        <section className="space-y-[11px] bg-white px-[10px] pb-7">
          {TRANSACTIONS.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                if (item.status === "SUCCESS") {
                  router.push("/silver/transaction-success?status=success");
                }

                if (item.status === "FAILED") {
                  router.push("/silver/transaction-success?status=failed");
                }

                if (item.status === "PENDING") {
                  router.push("/silver/transaction-success?status=pending");
                }
              }}
              className={`flex min-h-[78px] items-center rounded-[15px] border border-[#EEEFF4] bg-white px-3 shadow-[0_2px_10px_rgba(0,0,0,0.045)] ${
                item.status === "SUCCESS" ||
                item.status === "FAILED" ||
                item.status === "PENDING"
                  ? "cursor-pointer active:scale-[0.99]"
                  : ""
              } transition-transform duration-100`}
            >
              <div
                className="flex h-[58px] w-[58px] flex-shrink-0 items-center justify-center rounded-[10px] text-center text-[11px] font-bold leading-tight"
                style={{
                  backgroundColor: item.bg,
                  color: item.text,
                }}
              >
                {item.type}
              </div>

              <div className="ml-[11px] min-w-0 flex-1">
                <p className="truncate text-[10px] text-[#8E98A8]">
                  {item.date}
                </p>
                <h3 className="mt-[4px] truncate text-[15px] font-bold text-[#111827]">
                  {item.title}
                </h3>
                <p className="mt-[4px] truncate text-[9.5px] text-[#9AA3B2]">
                  {item.txn}
                </p>
              </div>

              <div className="ml-2 flex-shrink-0 text-right">
                <p className="mb-[9px] text-[16px] font-extrabold tracking-[0.2px] text-[#111827]">
                  {item.amount}
                </p>

                <div className="flex justify-end">
                  <StatusBadge status={item.status} type={item.statusType} />
                </div>

                {item.note && (
                  <p className="mt-[5px] text-[9px] text-[#9AA3B2]">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
