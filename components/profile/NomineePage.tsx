"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const relations = ["Father", "Mother", "Spouse", "Brother", "Sister", "Other"];

export default function NomineePage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relation, setRelation] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    relation.trim() !== "" &&
    mobile.trim().length >= 10;

  const handleSave = () => {
    if (!isValid) return;
    console.log({ firstName, lastName, relation, mobile });
    alert("Nominee saved successfully");
  };

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden px-4">
      {/* Relation Bottom Sheet */}
      {showPicker && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          onClick={() => setShowPicker(false)}
        >
          <div
            className="w-full max-w-[430px] bg-white rounded-t-[20px] pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-4">
              <div className="w-10 h-[4px] rounded-full bg-[#E5E7EB]" />
            </div>

            {/* Title */}
            <div className="flex items-center justify-between px-5 mb-3">
              <h3 className="text-[15px] font-semibold text-black">
                Select Relation
              </h3>
              <button
                onClick={() => setShowPicker(false)}
                className="text-[13px] text-[#6B7280]"
              >
                Cancel
              </button>
            </div>

            {/* Options */}
            <div className="flex flex-col">
              {relations.map((r, i) => (
                <button
                  key={r}
                  onClick={() => {
                    setRelation(r);
                    setShowPicker(false);
                  }}
                  className={`flex items-center justify-between px-5 py-4 text-[14px] text-black active:bg-[#F3F4F6] transition ${
                    i !== relations.length - 1
                      ? "border-b border-[#F3F4F6]"
                      : ""
                  }`}
                >
                  <span>{r}</span>
                  {relation === r && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12L10 17L19 7"
                        stroke="#111827"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
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
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 19L5 12L12 5"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h1 className="text-[18px] font-medium text-black ml-4">Nominee</h1>
      </div>

      {/* Card */}
      <div className="rounded-[14px] bg-[#F8F8FA] px-4 pt-4 pb-5">
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

        {/* Relation — custom trigger */}
        <div className="mt-3 border-b border-[#E5E7EB] pb-2">
          <label className="block text-[9px] text-[#6B7280] mb-1">
            Relation
          </label>
          <button
            onClick={() => setShowPicker(true)}
            className="w-full flex items-center justify-between bg-transparent outline-none text-[12px] text-left"
          >
            <span className={relation ? "text-black" : "text-[#9CA3AF]"}>
              {relation || "Select"}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
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
