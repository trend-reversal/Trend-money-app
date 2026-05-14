"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, ChevronUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useGetUser } from "@/hooks/queries/useGetUser";
import { useUpdateUser } from "@/hooks/mutations/useUpdateUser";

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
  children,
  isOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mx-4 border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-4"
      >
        <span className="text-[14px] font-medium text-black">
          {title}
        </span>

        {isOpen ? (
          <ChevronUp size={16} color="#6B7280" />
        ) : (
          <ChevronRight size={16} color="#9CA3AF" />
        )}
      </button>

      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

export default function DetailsPage() {
  const router = useRouter();

  const { data: user, isLoading, error } = useGetUser();

  const { mutate, isPending } = useUpdateUser();

  const userData = user?.data;

  const [personalOpen, setPersonalOpen] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);
  const [nomineeOpen, setNomineeOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    account_number: "",
    ifsc_code: "",
    pan_number: "",

    nominee: {
      firstName: "",
      lastName: "",
      relation: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData?.email || "",
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        dateOfBirth: userData?.dateOfBirth || "",
        account_number: userData?.account_number || "",
        ifsc_code: userData?.ifsc_code || "",
        pan_number: userData?.pan_number || "",

        nominee: {
          firstName: userData?.nominee?.firstName || "",
          lastName: userData?.nominee?.lastName || "",
          relation: userData?.nominee?.relation || "",
          phone: userData?.nominee?.phone || "",
        },
      });
    }
  }, [userData]);

  const isPanVerified = userData?.isPanVerified;

  const hasChanges = useMemo(() => {
    if (!userData) return false;

    return (
      JSON.stringify({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        account_number: formData.account_number,
        ifsc_code: formData.ifsc_code,
        pan_number: formData.pan_number,
        nominee: formData.nominee,
      }) !==
      JSON.stringify({
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        dateOfBirth: userData.dateOfBirth || "",
        account_number: userData.account_number || "",
        ifsc_code: userData.ifsc_code || "",
        pan_number: userData.pan_number || "",

        nominee: {
          firstName: userData?.nominee?.firstName || "",
          lastName: userData?.nominee?.lastName || "",
          relation: userData?.nominee?.relation || "",
          phone: userData?.nominee?.phone || "",
        },
      })
    );
  }, [formData, userData]);

  const handleSave = () => {
    if (!userData) return;

    const payload: any = {};

    if (formData.email !== userData.email) {
      payload.email = formData.email;
    }

    if (
      !isPanVerified &&
      formData.firstName !== userData.firstName
    ) {
      payload.firstName = formData.firstName;
    }

    if (
      !isPanVerified &&
      formData.lastName !== userData.lastName
    ) {
      payload.lastName = formData.lastName;
    }

    if (
      !isPanVerified &&
      formData.dateOfBirth !== userData.dateOfBirth
    ) {
      payload.dateOfBirth = formData.dateOfBirth;
    }

    if (
      !isPanVerified &&
      formData.pan_number !== userData.pan_number
    ) {
      payload.pan_number = formData.pan_number;
    }

    if (
      formData.account_number !== userData.account_number
    ) {
      payload.account_number = formData.account_number;
    }

    if (formData.ifsc_code !== userData.ifsc_code) {
      payload.ifsc_code = formData.ifsc_code;
    }

    const nomineeChanged =
      JSON.stringify(formData.nominee) !==
      JSON.stringify({
        firstName: userData?.nominee?.firstName || "",
        lastName: userData?.nominee?.lastName || "",
        relation: userData?.nominee?.relation || "",
        phone: userData?.nominee?.phone || "",
      });

    if (nomineeChanged) {
      payload.nominee = {
        userId: userData?.id,
        ...formData.nominee,
      };
    }

    mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <p className="text-sm text-red-500">
          Failed to load details
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[100dvh] w-full max-w-[430px] mx-auto bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center relative pt-14 px-4 mb-6">
        <button onClick={() => router.back()}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
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
            />
          </svg>
        </button>

        <h1 className="text-[18px] font-medium text-black ml-4">
          Details
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {/* Personal Details */}
        <AccordionSection
          title="Personal Details"
          isOpen={personalOpen}
          onToggle={() => setPersonalOpen((prev) => !prev)}
        >
          <div className="space-y-4">
            {[
              {
                label: "First Name",
                key: "firstName",
                disabled: isPanVerified,
              },
              {
                label: "Last Name",
                key: "lastName",
                disabled: isPanVerified,
              },
              {
                label: "Email",
                key: "email",
              },
              {
                label: "Date Of Birth",
                key: "dateOfBirth",
                disabled: isPanVerified,
              },
              {
                label: "PAN Number",
                key: "pan_number",
                disabled: isPanVerified,
              },
            ].map((field: any, index) => (
              <div
                key={index}
                className="border-b border-[#F0F0F0] pb-3"
              >
                <p className="text-[11px] text-[#9CA3AF] mb-1">
                  {field.label}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <input
                    value={(formData as any)[field.key]}
                    disabled={field.disabled}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.key]: e.target.value,
                      }))
                    }
                    className={`w-full bg-transparent outline-none text-[14px] ${field.disabled
                      ? "text-gray-400"
                      : "text-black"
                      }`}
                  />

                  {field.key === "pan_number" &&
                    userData?.isPanVerified && (
                      <VerifiedIcon />
                    )}

                  {field.key === "email" &&
                    userData?.isEmailVerified && (
                      <VerifiedIcon />
                    )}
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* Bank Details */}
        <AccordionSection
          title="Bank Details"
          isOpen={accountOpen}
          onToggle={() => setAccountOpen((prev) => !prev)}
        >
          <div className="space-y-4">
            <div className="border-b border-[#F0F0F0] pb-3">
              <p className="text-[11px] text-[#9CA3AF] mb-1">
                Account Number
              </p>

              <div className="flex items-center justify-between gap-2">
                <input
                  value={formData.account_number}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      account_number: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent outline-none text-[14px] text-black"
                />

                {userData?.isBankVerified && (
                  <VerifiedIcon />
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] text-[#9CA3AF] mb-1">
                IFSC Code
              </p>

              <input
                value={formData.ifsc_code}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ifsc_code: e.target.value.toUpperCase(),
                  }))
                }
                className="w-full bg-transparent outline-none text-[14px] text-black"
              />
            </div>
          </div>
        </AccordionSection>

        {/* Nominee Details */}
        <AccordionSection
          title="Nominee Details"
          isOpen={nomineeOpen}
          onToggle={() => setNomineeOpen((prev) => !prev)}
        >
          <div className="space-y-4">
            {[
              {
                label: "First Name",
                key: "firstName",
              },
              {
                label: "Last Name",
                key: "lastName",
              },
              {
                label: "Relation",
                key: "relation",
              },
              {
                label: "Phone Number",
                key: "phone",
              },
            ].map((field: any, index) => (
              <div
                key={index}
                className="border-b border-[#F0F0F0] pb-3"
              >
                <p className="text-[11px] text-[#9CA3AF] mb-1">
                  {field.label}
                </p>

                <input
                  value={(formData.nominee as any)[field.key]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,

                      nominee: {
                        ...prev.nominee,
                        [field.key]: e.target.value,
                      },
                    }))
                  }
                  className="w-full bg-transparent outline-none text-[14px] text-black"
                />
              </div>
            ))}
          </div>
        </AccordionSection>

        {/* Save Button */}
        <div className="px-4 pt-3 pb-10">
          <button
            disabled={!hasChanges || isPending}
            onClick={handleSave}
            className={`w-full h-[52px] rounded-xl text-white text-[14px] font-medium transition ${hasChanges
              ? "bg-black"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}