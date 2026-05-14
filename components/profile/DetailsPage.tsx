"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, ChevronUp } from "lucide-react";
import { useState } from "react";

const personalFields = [
  { label: "First Name", value: "Adiwin", verified: false },
  { label: "Last Name", value: "Dor", verified: false },
  { label: "Mobile Number", value: "7468789242", verified: false },
  { label: "Email ID", value: "Adiwon@dor@gmail.com", verified: false },
  { label: "PAN Number", value: "ABCDE1234F", verified: false },
  { label: "Date of Birth", value: "12-12-2000", verified: false },
];

const accountFields = [
  { label: "Bank Account Number", value: "847290128", verified: false },
  { label: "Confirm Bank Account Number", value: "847290128", verified: true },
  { label: "IFSC Code", value: "HDFC0001234", verified: false },
];

function VerifiedIcon() {
  return (
    <svg
      width="17.19"
      height="17.17"
      viewBox="0 0 17.19 17.17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8.595"
        cy="8.585"
        r="7.515"
        fill="#EEF0FF"
        stroke="#7480FE82"
        strokeWidth="2.06"
      />
      <path
        d="M5.2 8.585L7.6 11L12 6.2"
        stroke="#7480FE"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccordionSection({
  title,
  fields,
  isOpen,
  onToggle,
}: {
  title: string;
  fields: { label: string; value: string; verified: boolean }[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mx-4 border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-4"
      >
        <span className="text-[14px] font-medium text-black">{title}</span>
        {isOpen ? (
          <ChevronUp size={16} color="#6B7280" />
        ) : (
          <ChevronRight size={16} color="#9CA3AF" />
        )}
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`py-3 ${
                index < fields.length - 1 ? "border-b border-[#F0F0F0]" : ""
              }`}
            >
              <p className="text-[11px] text-[#9CA3AF] mb-[3px]">
                {field.label}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-black">{field.value}</p>
                {field.verified && <VerifiedIcon />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DetailsPage() {
  const router = useRouter();
  const [personalOpen, setPersonalOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center relative pt-14 px-4 mb-6">
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
        <h1 className="text-[18px] font-medium text-black ml-4">Details</h1>
      </div>

      <div className="flex flex-col gap-3">
        <AccordionSection
          title="Personal Details"
          fields={personalFields}
          isOpen={personalOpen}
          onToggle={() => setPersonalOpen((prev) => !prev)}
        />

        <AccordionSection
          title="Account Details"
          fields={accountFields}
          isOpen={accountOpen}
          onToggle={() => setAccountOpen((prev) => !prev)}
        />
      </div>
    </div>
  );
}
