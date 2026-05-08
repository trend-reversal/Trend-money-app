"use client";

import { ReactNode, useEffect } from "react";

interface BottomSheetProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    maxHeight?: string;
}

export default function BottomSheet({
    open,
    onClose,
    children,
    maxHeight = "85vh",
}: BottomSheetProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`
          fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]
          transition-all duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
            />

            {/* Sheet */}
            <div
                className={`
          fixed bottom-0 left-0 right-0 z-[100]
          w-full bg-white
          rounded-t-[28px]
          shadow-[0_-10px_40px_rgba(0,0,0,0.12)]
          transition-transform duration-300 ease-out
          will-change-transform
          ${open ? "translate-y-0" : "translate-y-full"}
        `}
                style={{
                    maxHeight,
                    paddingBottom: "env(safe-area-inset-bottom)",
                }}
            >
                {/* Top Handle */}
                <div className="sticky top-0 z-10 bg-white rounded-t-[28px]">
                    <div className="flex justify-center pt-3 pb-2">
                        <div className="h-[4px] w-[42px] rounded-full bg-[#D8D8D8]" />
                    </div>
                </div>

                {/* Scrollable Content */}
                <div
                    className="
            overflow-y-auto
            px-0
            pb-6
          "
                    style={{
                        maxHeight: "calc(85vh - 24px)",
                    }}
                >
                    {children}
                </div>
            </div>
        </>
    );
}