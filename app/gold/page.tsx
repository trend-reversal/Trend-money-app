"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCreatePayment } from "@/hooks/mutations/useCreatePayment";
import { useGoldPrice } from "@/hooks/queries/useGoldPrice";
import { useGoldBreakdown } from "@/hooks/queries/useGoldBreakdown";
import BottomSheet from "@/components/common/BottomSheet";
import { confirmGoldPurchase, getGoldPurchaseStatus, verifyGoldPurchase } from "@/lib/api/safegold";
import { checkPaymentStatus } from "@/lib/api/payments";
export default function GoldPage() {
  const router = useRouter();

  const [showAmountBox, setShowAmountBox] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [txId, setTxId] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      /*
       * USER RETURNED FROM PHONEPE
       */

      if (
        document.visibilityState === "visible" &&
        orderId &&
        txId &&
        !isPolling
      ) {
        console.log(
          "Resuming payment polling...",
        );

        startPaymentPolling(
          orderId,
          txId,
        );
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [orderId, txId, isPolling]);


  const { data: livePrice } = useGoldPrice();
  const { mutate: createPaymentMutation, isPending: isCreatingPayment } =
    useCreatePayment();

  const { data: breakdown } = useGoldBreakdown(
    Number(amount),
    livePrice?.current_price,
  );

  const handleStartInvestment = async () => {
    try {
      if (!amount) return;

      setIsProcessing(true);

      /*
       * STEP 1
       * BUY VERIFY
       */

      const verifyResponse = await verifyGoldPurchase({
        rate_id: livePrice?.rate_id,
        gold_amount: breakdown?.gold_amount,
        buy_price: Number(amount),
      });

      const generatedTxId = verifyResponse?.tx_id;

      if (!generatedTxId) {
        throw new Error("TX ID missing");
      }

      setTxId(generatedTxId);

      createPaymentMutation(
        {
          amount: Number(verifyResponse.buy_price),
          safegold_tx_id: generatedTxId,
          productType: "GOLD",
          deviceName: "mobile",
          isNativeApp: true,
        },
        {
          onSuccess: async (response) => {
            const checkoutUrl = response?.checkout_url;
            const generatedOrderId = response?.order_id;

            if (!checkoutUrl || !generatedOrderId) {
              setIsProcessing(false);
              return;
            }

            setOrderId(generatedOrderId);

            /*
             * MOBILE APP
             */

            if (
              typeof window !== "undefined" &&
              window.ReactNativeWebView
            ) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type: "OPEN_PAYMENT_PAGE",
                  url: checkoutUrl,
                  orderId: generatedOrderId,
                  txId: generatedTxId,
                }),
              );
            } else {
              /*
               * PWA WEB
               */
              window.location.href = checkoutUrl;
            }
          },

          onError: () => {
            setIsProcessing(false);
          },
        },
      );
    } catch (err) {
      console.log(err);
      setIsProcessing(false);
    }
  };

  const startPaymentPolling = async (
    orderId: string,
    txId: number,
  ) => {
    try {

      if (isPolling) return;

      setIsPolling(true);

      let attempts = 0;

      const poll = setInterval(async () => {
        attempts++;

        if (attempts > 40) {
          clearInterval(poll);

          setIsPolling(false);
          setIsProcessing(false);

          router.push("/gold/failed");

          return;
        }

        try {
          /*
           * STEP 1
           * PAYMENT STATUS
           */

          const paymentStatus =
            await checkPaymentStatus(
              orderId,
            );

          const state =
            paymentStatus?.state;

          console.log(
            "PAYMENT STATE:",
            state,
          );

          /*
           * PAYMENT SUCCESS
           */

          if (state === "COMPLETED") {
            clearInterval(poll);

            /*
             * STEP 2
             * BUY CONFIRM
             */

            await confirmGoldPurchase({
              tx_id: txId,
            });

            /*
             * STEP 3
             * BUY STATUS
             */

            const buyStatus =
              await getGoldPurchaseStatus(
                txId,
              );

            const status =
              buyStatus?.status;

            console.log(
              "SAFEGOLD STATUS:",
              status,
            );

            setIsPolling(false);
            setIsProcessing(false);

            /*
             * SUCCESS
             */

            if (status === 1) {
              router.push(
                `/gold/success?amount=${amount}&txId=${txId}&gold=${buyStatus.gold_amount}`
              );

              return;
            }

            /*
             * PENDING
             */

            if (status === 0) {
              router.push(
                "/gold/pending",
              );

              return;
            }

            /*
             * FAILED
             */

            if (status === 2) {
              router.push(
                "/gold/failed",
              );

              return;
            }

            /*
             * UNKNOWN STATUS
             */

            router.push(
              "/gold/pending",
            );

            return;
          }

          /*
           * PAYMENT FAILED
           */

          if (
            state === "FAILED" ||
            state === "CANCELLED"
          ) {
            clearInterval(poll);

            setIsPolling(false);
            setIsProcessing(false);

            router.push(
              "/gold/failed",
            );

            return;
          }

          /*
           * STILL PENDING
           */

          console.log(
            "Payment pending..."
          );
        } catch (err) {
          console.log(err);
        }
      }, 3000);
    } catch (err) {
      console.log(err);

      setIsPolling(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-6">
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="p-2 active:scale-90 transition"
        >
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

        {/* Right Side (Price instead of search) */}
        <div className="w-[111px] h-[32.46px] bg-[#FFF4DD] rounded-[18.85px] flex items-center px-2 gap-1.5">
          {/* Wifi Icon */}
          <Image
            src="/images/wifi.svg"
            alt="live"
            width={14}
            height={14}
            className="object-contain"
          />

          {/* Text */}
          <div className="leading-none">
            <p className="text-[6px] text-[#111111] font-medium mb-[2px]">
              Gold Live Price
            </p>

            <p className="text-[9px] font-semibold text-[#111111]">
              ₹{livePrice?.current_price}/g
            </p>
          </div>
        </div>
      </div>

      {/*  Hero Card */}
      <div className="mx-4 mt-4 relative overflow-hidden rounded-[18px] bg-[#FAF8F5] border border-[#ECECEC]">
        {/* Background Image */}
        <Image
          src="/images/gold/gold.png"
          alt="gold-bg"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay Content */}
        <div className="relative z-10 flex items-center justify-between px-[18px] py-[16px]">
          {/* Left Content */}
          <div className="flex-1">
            {/* Top Text */}
            <p className="font-serif text-[15px] leading-[16px] text-black whitespace-nowrap">
              Gold has soared nearly
            </p>

            {/* 50% */}
            <div className="flex items-end mt-[4px] gap-[4px]">
              <span className="font-serif text-[38px] leading-[38px] text-[#FFFFFF]">
                50%
              </span>

              <span className="font-serif text-[16px] leading-[16px] text-black mb-[4px] whitespace-nowrap">
                this year!
              </span>
            </div>

            {/* Divider */}
            <div className="w-[28px] h-[1px] bg-black mt-[8px] mb-[10px]" />

            {/* Bottom Text */}
            <p className="font-serif text-[9px] leading-[11px] text-black">
              Don’t miss the shine,
            </p>

            <p className="font-serif text-[9px] leading-[11px] text-[#1A1A1A] mt-[2px]">
              start your journey today
            </p>
          </div>

          {/* Right Gold Image */}
          <Image
            src="/images/gold/gold-fine.png"
            alt="gold"
            width={160}
            height={160}
            className="object-contain -mr-4 relative z-10"
          />
        </div>
      </div>

      <div className="flex justify-center gap-1 mt-2">
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-300 rounded-full" />
        <div className="w-2 h-2 bg-gray-400 rounded-full" />
      </div>

      <div className="px-4 mt-6">
        <h3 className="text-sm text-[#B5B7B9] uppercase mb-3">Quick Actions</h3>

        <div className="grid grid-cols-2 gap-3">
          {[
            {
              title: "Daily SIP",
              icon: "/images/gold/daily.png",
            },
            {
              title: "Monthly SIP",
              icon: "/images/gold/monthly.png",
            },
            {
              title: "Weekly SIP",
              icon: "/images/gold/weekly.png",
            },
            {
              title: "One-Time Investment",
              icon: "/images/gold/onetime.png",
            },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                if (
                  item.title === "Weekly SIP" ||
                  item.title === "Monthly SIP"
                ) {
                  router.push("/gold/invest");
                }

                if (item.title === "Daily SIP") {
                  setShowAmountBox(true);
                }
              }}
              className="
          relative
          w-full
          h-[92px]
          bg-white
          border border-[#F1F1F1]
          rounded-[14px]
          shadow-sm
          flex flex-col items-center justify-center
          active:scale-[0.98]
          transition
        "
            >
              {/* Recommended */}
              {item.title === "Monthly SIP" && (
                <div className="absolute top-0 right-0 bg-[#16A34A] text-white text-[8px] px-2 py-1 rounded-tr-[14px] rounded-bl-[10px] font-semibold">
                  RECOMMENDED
                </div>
              )}

              <img
                src={item.icon}
                alt={item.title}
                className="w-[34px] h-[34px] object-contain"
              />

              <p className="text-[14px] mt-2 font-medium text-black">
                {item.title}
              </p>
            </button>
          ))}
        </div>

        {showAmountBox && (
          <div className="mt-4">
            {/* Input */}
            <div className="w-full h-[74px] border border-[#E7E7E7] rounded-[16px] px-5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3 w-full">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedChip(null); // clear chip selection on manual type
                    setShowBreakdown(false);
                  }}
                  placeholder="Enter Amount"
                  className="w-full bg-transparent outline-none text-[20px] text-black placeholder:text-[#C7C7C7]"
                />

              </div>
            </div>

            {/* Amount Chips */}
            <div className="flex items-center justify-between mt-3 gap-3">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {["₹2,000", "₹5,000", "₹10,000"].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const val = item.replace(/[₹,]/g, "");
                      setAmount(val);
                      setSelectedChip(item);
                      setShowBreakdown(false);
                    }}
                    className={`
            px-4 h-[34px] rounded-full border text-[15px] text-[#7A7A7A] whitespace-nowrap transition-all
            ${selectedChip === item
                        ? "border-[#D4AF37] bg-[#FFF8E7] text-[#B8860B] font-semibold"
                        : "border-[#E5E5E5] bg-[#FAFAFA]"
                      }
          `}
                  >
                    {item}
                  </button>

                ))}

                {amount && (
                  <button
                    onClick={() => setShowBreakdown(true)}
                    className="
        shrink-0
        rounded-full
        bg-[#EDFCF4]
        px-3
        py-1.5
        text-[13px]
        font-semibold
      "
                  >
                    Breakdown
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleStartInvestment}
          disabled={
            !amount ||
            isCreatingPayment ||
            isProcessing ||
            isPolling
          }
          className="w-[330px] h-[51px] bg-[#111111] rounded-[8px] text-white text-[15px] font-medium flex items-center justify-center"
        >
          {isProcessing || isPolling
            ? "Processing..."
            : "Start Investing"}
        </button>
      </div>

      <div className="px-4 mt-6">
        <Image
          src="/images/gold/jewellery.png"
          alt="jewellery"
          width={400}
          height={160}
          className="w-full h-[160px] object-cover rounded-2xl"
        />
      </div>

      <div className="px-4 mt-6">
        <div
          className="
      bg-white
      rounded-[8px]
      border border-[#F7F7FA]
      shadow-[0px_0px_25px_rgba(13,13,13,0.04)]
      p-4
    "
        >
          {/* Top Text */}
          <p className="text-[11px] leading-[22px] text-[#8E95A4]">
            The best to purchase gold was yesterday
            <br />
            but second best is{" "}
            <span className="text-[#D4AF37] font-medium">NOW!</span>
          </p>

          {/* Tabs */}
          <div className="flex justify-between mt-5">
            {["6M", "1Y", "3Y", "5Y"].map((tab) => (
              <button
                key={tab}
                className={`
            w-[68px]
            h-[48px]
            rounded-[12px]
            border
            text-[18px]
            font-medium
            transition-all
            ${tab === "3Y"
                    ? "bg-[#D4AF37] border-[#D4AF37] text-white"
                    : "bg-white border-[#E5E7EB] text-[#222222]"
                  }
          `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chart Area */}
          <div className="relative mt-6 h-[240px] bg-[#F9F9FB] rounded-lg overflow-hidden">
            {/* Graph */}
            <div className="absolute inset-0">
              <svg viewBox="0 0 300 200" className="w-full h-full">
                {/* Line */}
                <path
                  d="M0 180 C50 170, 80 150, 110 130 C140 110, 170 120, 200 90 C230 60, 260 80, 300 70"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />

                {/* Fill */}
                <path
                  d="M0 180 C50 170, 80 150, 110 130 C140 110, 170 120, 200 90 C230 60, 260 80, 300 70 L300 200 L0 200 Z"
                  fill="#D4AF37"
                  opacity="0.12"
                />
              </svg>
            </div>

            {/* Highlight Dot */}
            <div className="absolute right-[58px] top-[88px] w-[12px] h-[12px] rounded-full bg-[#D4AF37]" />

            {/* Tooltip */}
            <div className="absolute right-[68px] top-[36px] bg-white px-3 py-2 rounded-[10px] border border-[#F3F3F3] shadow-sm">
              <p className="text-[10px] text-[#9CA3AF] text-center">MAY'25</p>

              <p className="text-[13px] font-semibold text-[#D4AF37] text-center">
                ₹1,305.49/g
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div
          className="
      bg-[#F9F9FB]
      rounded-lg
      border border-[#F3F3F3]
      shadow
      p-4
      flex justify-between items-start
    "
        >
          {/* LEFT */}
          <div>
            <h3 className="text-[14px] font-semibold text-black">
              Instant SIP
            </h3>

            <p className="text-[10px] text-gray-400 mt-1 leading-tight">
              START SMALL, GROW BIG EVERY MONTH.
            </p>

            <h2 className="text-[26px] font-bold mt-2 text-black">
              ₹2000{" "}
              <span className="text-[12px] text-gray-400 font-medium">
                / MONTH
              </span>
            </h2>

            <button className="mt-4 w-[184px] h-[43px] bg-[#00130C] rounded-[10px] text-white text-[13px] font-medium flex items-center justify-center">
              Instant SIP
            </button>
          </div>

          {/* RIGHT ICON */}
          <div className="w-[38px] h-[38px] bg-[#EFE3C2] rounded-md flex items-center justify-center">
            <svg
              width="14"
              height="26"
              viewBox="0 0 14 26"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-180"
            >
              <path d="M8.5 0L1 14H6L4.5 26L13 10H8L8.5 0Z" fill="#775A19" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm text-[#B5B7B9] mb-3 font-inter uppercase px-4">
          Authenticity Certificate
        </h3>

        <div className="flex gap-4 overflow-x-scroll no-scrollbar snap-x snap-mandatory px-4">
          {[
            "/images/gold/safegold.png",
            "/images/gold/vistra.png",
            "/images/gold/brinks.png",
          ].map((src, i) => (
            <div key={i} className="min-w-[260px] snap-start">
              <Image
                src={src}
                alt="certificate"
                width={300}
                height={300}
                className="w-full h-auto object-contain rounded-[12px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Heading */}
        <h3 className="text-[15px] font-inter font-semibold text-[#B5B7B9] mb-2">
          FAQs
        </h3>

        {/* FAQ Container */}
        <div className="bg-transparent rounded-[14px] overflow-hidden">
          {[
            {
              question: "Why should I upgrade?",
              answer:
                "Upgrading gives you access to premium features and better investment benefits.",
            },
            {
              question: "What payment methods can I use?",
              answer:
                "You can pay using UPI, debit cards, credit cards, and net banking.",
            },
            {
              question: "How does billing work?",
              answer:
                "Billing is processed automatically according to your selected investment plan.",
            },
            {
              question: "How can I cancel?",
              answer:
                "You can cancel anytime directly from your profile settings.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="border-b border-dashed border-[#E5E5E5] py-5 group"
            >
              {/* Question */}
              <summary className="list-none flex items-start justify-between cursor-pointer">
                <p className="text-[16px] leading-[24px] text-[#111827] font-inter pr-4">
                  {faq.question}
                </p>

                {/* Plus / Minus */}
                <span className="text-[#9CA3AF] text-[22px] leading-none transition-all duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>

              {/* Answer */}
              <p className="mt-3 text-[14px] leading-[22px] text-[#6B7280] pr-6">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="mt-10 px-6 pb-8">
        {/* View More */}
        <div className="flex justify-center">
          <button className="text-[14px] text-[#C3C3C5] border-b border-[#C3C3C5] pb-[2px] tracking-wide">
            VIEW MORE
          </button>
        </div>

        {/* Features */}
        <div className="flex justify-between items-center mt-10 text-center">
          {/* Item 1 */}
          <div className="flex-1">
            <p className="text-[18px] leading-[34px] text-[#C3C3C5] font-normal">
              100% Safe & <br /> Secure
            </p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-[92px] bg-[#E5E5E5]" />

          {/* Item 2 */}
          <div className="flex-1">
            <p className="text-[18px] leading-[34px] text-[#C3C3C5] font-normal">
              24k Gold <br /> Savings
            </p>
          </div>

          {/* Divider */}
          <div className="w-[1px] h-[92px] bg-[#E5E5E5]" />

          {/* Item 3 */}
          <div className="flex-1">
            <p className="text-[18px] leading-[34px] text-[#C3C3C5] font-normal">
              Withdraw <br /> Anytime
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-center justify-between mt-14">
          <h3 className="text-[16px] font-medium text-black">Disclaimer</h3>

          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <BottomSheet
        open={showBreakdown}
        onClose={() => setShowBreakdown(false)}
      >
        <div className="px-4 pt-2">
          <h2 className="text-[20px] font-semibold text-black">
            Investment Breakdown
          </h2>

          <div className="mt-6 rounded-[20px] border border-[#ECECEC] overflow-hidden">
            {/* Gold Value */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-dashed border-[#ECECEC]">
              <span className="text-[20px] text-[#111111]">
                Gold Value
              </span>

              <span className="text-[20px] font-medium text-[#111111]">
                ₹
                {breakdown?.pre_gst_buy_price?.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </span>
            </div>

            {/* GST */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-dashed border-[#ECECEC]">
              <span className="text-[20px] text-[#111111]">
                GST (3%)
              </span>

              <span className="text-[20px] font-medium text-[#111111]">
                ₹
                {breakdown?.gst_amount?.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  },
                )}
              </span>
            </div>

            {/* Gold Quantity */}
            {/* <div className="flex justify-between items-center px-4 py-4 border-b border-dashed border-[#ECECEC]">
              <span className="text-[14px] text-[#111111]">
                Gold Quantity
              </span>

              <span className="text-[14px] font-medium text-[#111111]">
                {breakdown?.gold_amount} gm
              </span>
            </div> */}

            {/* Total */}
            <div className="bg-[#EDFCF4] px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-[20px] font-semibold text-[#111111]">
                  Total Payable
                </span>

                <span className="text-[20px] font-semibold text-[#111111]">
                  ₹
                  {Number(amount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 py-4">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2L4 6V12C4 16.418 7.582 20.418 12 22C16.418 20.418 20 16.418 20 12V6L12 2Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-[12px] text-[#9CA3AF]">
                All investments are secure
              </span>
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
