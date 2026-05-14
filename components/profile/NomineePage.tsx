"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NomineePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relation, setRelation] = useState("");
  const [mobile, setMobile] = useState("");

  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    relation.trim() !== "" &&
    mobile.trim().length >= 10;

  const handleSave = () => {
    if (!isValid) return;

    console.log({
      firstName,
      lastName,
      relation,
      mobile,
    });

    alert("Nominee saved successfully");
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center pt-4 px-4">
        <button
          onClick={() => router.back()}
          className="w-6 h-6 flex items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#111827"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h1 className="ml-3 text-[18px] font-medium text-[#111827]">Nominee</h1>
      </div>

      {/* Card */}
      <div className="mx-4 mt-5 rounded-[14px] bg-[#F8F8FA] px-4 pt-4 pb-5">
        <h2 className="text-[13px] font-medium text-black">Nominee Details</h2>

        {/* First Name */}
        <div className="mt-4 border-b border-[#E5E7EB] pb-2">
          <label className="block text-[9px] text-[#6B7280] mb-1">
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            className="w-full bg-transparent outline-none text-[12px] text-black placeholder:text-[#9CA3AF]"
          />
        </div>

        {/* Last Name */}
        <div className="mt-3 border-b border-[#E5E7EB] pb-2">
          <label className="block text-[9px] text-[#6B7280] mb-1">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            className="w-full bg-transparent outline-none text-[12px] text-black placeholder:text-[#9CA3AF]"
          />
        </div>

        {/* Relation */}
        <div className="mt-3 border-b border-[#E5E7EB] pb-2">
          <label className="block text-[9px] text-[#6B7280] mb-1">
            Relation
          </label>

          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            className="w-full bg-transparent outline-none text-[12px] text-black"
          >
            <option value="">Select</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Spouse">Spouse</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Mobile */}
        <div className="mt-3">
          <label className="block text-[9px] text-[#6B7280] mb-1">
            Mobile Number
          </label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            inputMode="numeric"
            placeholder="Enter Mobile Number"
            className="w-full bg-transparent outline-none text-[12px] text-black placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={handleSave}
          disabled={!isValid}
          className={`w-full h-[54px] rounded-[3px] text-[13px] font-medium transition ${
            isValid
              ? "bg-black text-white active:scale-[0.98]"
              : "bg-[#C9CED3] text-white cursor-not-allowed"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
