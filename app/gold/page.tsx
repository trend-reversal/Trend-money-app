"use client";

import Image from "next/image";
import { useState } from "react";
import { useCreatePayment } from "@/hooks/mutations/useCreatePayment";
import { useGoldPrice } from "@/hooks/queries/useGoldPrice";
import { useGoldBreakdown } from "@/hooks/queries/useGoldBreakdown";
import BottomSheet from "@/components/common/BottomSheet";
import { getGoldBreakdown, verifyGoldPurchase } from "@/lib/api/safegold";
import { createSipIntent } from "@/lib/api/payments";
import GoldPriceChart from "@/components/gold/GoldPriceChart";
import { useGoldHistoricalPrice } from "@/hooks/queries/useGoldHistoricalPrice";
import QuickActionCard from "@/components/gold/QuickActionCard";
import InstantSipCard from "@/components/gold/InstantSipCard";
import CertificateCarousel from "@/components/gold/CertificateCarousel";
import FaqSection from "@/components/gold/FaqSection";
import GoldFeatures from "@/components/gold/GoldFeatures";

export default function GoldPage() {

  const [showAmountBox, setShowAmountBox] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [investmentType, setInvestmentType] = useState<
    "ONETIME" | "DAILY" | "WEEKLY" | "MONTHLY"
  >("ONETIME");
  const [selectedRange, setSelectedRange] = useState<
    "6M" | "1Y" | "3Y" | "5Y"
  >("3Y");

  const [showSipAppsSheet, setShowSipAppsSheet] =
    useState(false);

  const { data: livePrice } = useGoldPrice();
  const { mutate: createPaymentMutation, isPending: isCreatingPayment } =
    useCreatePayment();

  const { data: breakdown } = useGoldBreakdown(
    Number(amount),
    livePrice?.current_price,
  );

  const UPI_APPS = [
    {
      id: "PHONEPE",
      label: "PhonePe",
      icon: "/UPI_logos/tr_phonepe.png",
    },
    {
      id: "GPAY",
      label: "Google Pay",
      icon: "/UPI_logos/tr_googlepay.png",
    },
    {
      id: "PAYTM",
      label: "Paytm",
      icon: "/UPI_logos/tr_paytm.png",
    },
    {
      id: "CRED",
      label: "CRED",
      icon: "/UPI_logos/tr_cred_logo.png",
    },
  ];

  const formatApiDate = (date: Date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(
      date.getMonth() + 1,
    ).padStart(2, "0");
    const day = String(date.getDate()).padStart(
      2,
      "0",
    );

    return `${year}-${month}-${day}`;
  };

  const getFromDate = () => {
    const today = new Date();
    const from = new Date();

    switch (selectedRange) {
      case "6M":
        from.setMonth(today.getMonth() - 6);
        break;

      case "1Y":
        from.setFullYear(today.getFullYear() - 1);
        break;

      case "3Y":
        from.setFullYear(today.getFullYear() - 3);
        break;

      case "5Y":
        from.setFullYear(today.getFullYear() - 5);
        break;
    }

    return formatApiDate(from);
  };

  const todayDate = formatApiDate(new Date());

  const {
    data: historicalData,
    isLoading: isChartLoading,
  } = useGoldHistoricalPrice({
    from_date: getFromDate(),
    to_date: todayDate,
    type: "m",
  });

  const handleStartInvestment = async () => {
    try {
      if (!amount) return;

      /*
       * For SIP, we directly show UPI apps for intent creation
       */

      if (investmentType !== "ONETIME") {
        setShowSipAppsSheet(true);
        return;
      }

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

  const handleSipSetup = async (
    selectedApp: string,
  ) => {
    try {
      setIsProcessing(true);

      /*
       * STEP 1
       * BUY VERIFY
       */

      const verifyResponse =
        await verifyGoldPurchase({
          rate_id:
            livePrice?.rate_id,

          gold_amount:
            breakdown?.gold_amount,

          buy_price:
            Number(amount),
        });

      const txId =
        verifyResponse?.tx_id;

      if (!txId) {
        setIsProcessing(false);
        return;
      }

      /*
       * ANDROID PACKAGE MAP
       */

      const PACKAGE_MAP: Record<
        string,
        string
      > = {
        PHONEPE:
          'com.phonepe.app',

        GPAY:
          'com.google.android.apps.nbu.paisa.user',

        PAYTM:
          'net.one97.paytm',

        CRED:
          'com.dreamplug.androidapp',
      };

      const packageName =
        PACKAGE_MAP[selectedApp];

      /*
       * STEP 2
       * CREATE SIP INTENT
       */

      const payload = {
        frequency:
          investmentType,

        amount:
          Number(amount),

        deviceOS:
          'ANDROID',

        targetApp:
          packageName,

        safegoldTxId:
          txId,

        productType:
          'GOLD',
      };

      const response =
        await createSipIntent(
          payload
        );

      const intentUrl =
        response?.intentUrl;

      const merchantOrderId =
        response?.merchantOrderId;

      if (
        !intentUrl ||
        !merchantOrderId
      ) {
        setIsProcessing(false);
        return;
      }

      setShowSipAppsSheet(false);

      /*
       * MOBILE APP
       */

      if (typeof window !== 'undefined' && window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: 'OPEN_UPI_INTENT',
            url: intentUrl,
            targetApp: PACKAGE_MAP[selectedApp], // pass the package name
            orderId: merchantOrderId,   // ADD THIS
            txId: txId,
          })
        );
      } else {
        /*
         * PWA WEB
         */

        localStorage.setItem(
          'sip_order_id',
          merchantOrderId,
        );

        localStorage.setItem(
          'sip_tx_id',
          String(txId),
        );

        window.location.href =
          intentUrl;
      }
    } catch (err) {
      console.log(err);

      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-6">
      <div className="flex items-center justify-between px-6 pt-12 pb-4 bg-white">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
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
      <div className="mx-4 mt-4 relative overflow-hidden rounded-[18px] bg-[#FAF8F5] border border-[#ECECEC] pointer-events-none">
        {/* Background Image */}
        <Image
          src="/images/gold/gold.png"
          alt="gold-bg"
          fill
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
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

      <div className="px-4 mt-6 relative z-50">
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
            <QuickActionCard
              key={i}
              title={item.title}
              icon={item.icon}
              recommended={
                item.title === "Monthly SIP"
              }
              onClick={() => {
                setAmount("");
                setSelectedChip(null);
                setShowBreakdown(false);

                const typeMap: Record<
                  string,
                  "ONETIME" | "DAILY" | "WEEKLY" | "MONTHLY"
                > = {
                  "One-Time Investment":
                    "ONETIME",
                  "Daily SIP": "DAILY",
                  "Weekly SIP": "WEEKLY",
                  "Monthly SIP":
                    "MONTHLY",
                };

                setInvestmentType(
                  typeMap[item.title],
                );

                setShowAmountBox(true);
              }}
            />
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

      {showAmountBox && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleStartInvestment}
            disabled={
              !amount ||
              isCreatingPayment ||
              isProcessing
            }
            className="w-[330px] h-[51px] bg-[#111111] rounded-[8px] text-white text-[15px] font-medium flex items-center justify-center"
          >
            {isProcessing
              ? "Processing..."
              : investmentType === "ONETIME"
                ? "Start Investing"
                : `Setup ${investmentType} SIP`}
          </button>
        </div>
      )}

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
          {/* Tabs */}
          <div className="flex justify-between mt-5">
            {["6M", "1Y", "3Y", "5Y"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setSelectedRange(
                    tab as
                    | "6M"
                    | "1Y"
                    | "3Y"
                    | "5Y",
                  )
                }
                className={`
        w-[68px]
        h-[48px]
        rounded-[12px]
        border
        text-[18px]
        font-medium
        transition-all
        ${selectedRange === tab
                    ? "bg-[#D4AF37] border-[#D4AF37] text-white"
                    : "bg-white border-[#E5E7EB] text-[#222222]"
                  }
      `}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Chart */}
          <div className="mt-6">
            {isChartLoading ? (
              <div className="h-[360px] rounded-[20px] bg-[#F3F4F6] animate-pulse" />
            ) : (
              <GoldPriceChart
                data={historicalData?.data || []}
              />
            )}
          </div>
        </div>
      </div>

      <InstantSipCard
        loading={isProcessing}
        onClick={async () => {
          try {
            setIsProcessing(true);

            /*
             * DEFAULT SIP CONFIG
             */

            const sipAmount = 2000;
            const sipType = "MONTHLY";

            /*
             * STEP 1
             * GET BREAKDOWN
             */

            const breakdownResponse =
              await getGoldBreakdown({
                amount: sipAmount,
                type: "RS",
                rate:
                  livePrice?.current_price,
              });

            /*
             * STEP 2
             * BUY VERIFY
             */

            const verifyResponse =
              await verifyGoldPurchase({
                rate_id:
                  livePrice?.rate_id,

                gold_amount:
                  breakdownResponse?.gold_amount,

                buy_price:
                  sipAmount,
              });

            const txId =
              verifyResponse?.tx_id;

            if (!txId) {
              setIsProcessing(false);
              return;
            }

            /*
             * PHONEPE PACKAGE
             */

            const packageName =
              "com.phonepe.app";

            /*
             * STEP 3
             * CREATE SIP INTENT
             */

            const response =
              await createSipIntent({
                frequency:
                  sipType,

                amount:
                  sipAmount,

                deviceOS:
                  "ANDROID",

                targetApp:
                  packageName,

                safegoldTxId:
                  txId,

                productType:
                  "GOLD",
              });

            const intentUrl =
              response?.intentUrl;

            const merchantOrderId =
              response?.merchantOrderId;

            if (
              !intentUrl ||
              !merchantOrderId
            ) {
              setIsProcessing(false);
              return;
            }

            /*
             * MOBILE APP
             */

            if (
              typeof window !==
              "undefined" &&
              window.ReactNativeWebView
            ) {
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  type:
                    "OPEN_UPI_INTENT",

                  url: intentUrl,

                  targetApp:
                    packageName,

                  orderId:
                    merchantOrderId,

                  txId,
                }),
              );
            } else {
              /*
               * PWA WEB
               */

              localStorage.setItem(
                "sip_order_id",
                merchantOrderId,
              );

              localStorage.setItem(
                "sip_tx_id",
                String(txId),
              );

              window.location.href =
                intentUrl;
            }
          } catch (err) {
            console.log(err);
          } finally {
            setIsProcessing(false);
          }
        }}
      />
      <CertificateCarousel />

      <FaqSection />

      <GoldFeatures />

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

      <BottomSheet
        open={showSipAppsSheet}
        onClose={() =>
          setShowSipAppsSheet(false)
        }
      >
        <div className="px-4 pb-8">
          <h2 className="text-[20px] font-semibold text-black">
            Select UPI App
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {UPI_APPS.map((app) => (
              <button
                key={app.id}
                onClick={() =>
                  handleSipSetup(app.id)
                }
                className="
            h-[110px]
            rounded-2xl
            border
            border-[#ECECEC]
            flex
            flex-col
            items-center
            justify-center
            active:scale-[0.98]
            transition
          "
              >
                <img
                  src={app.icon}
                  className="w-12 h-12 object-contain"
                />

                <p className="mt-3 text-sm font-medium text-black">
                  {app.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
