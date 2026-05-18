"use client";
import { useRouter } from "next/navigation";

import PortfolioHoldingCard, {
  DigitalGoldIcon,
  DigitalSilverIcon,
  FixedDepositIcon,
  BondsIcon,
} from "./PortfolioHoldingCard";

type Asset = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string;
  returnPct: string;
  hasActivity: boolean;
  transactionRoute: string | null;
  investRoute: string;
  externalRedirect?: boolean;
};

const ASSETS: Asset[] = [
  {
    id: "gold",
    icon: <DigitalGoldIcon />,
    title: "Digital Gold",
    subtitle: "0.04 g",
    value: "₹100",
    returnPct: "(12.24%)",
    hasActivity: true,
    transactionRoute: "/gold/transaction",
    investRoute: "/gold",
  },
  {
    id: "silver",
    icon: <DigitalSilverIcon />,
    title: "Digital Silver",
    subtitle: "0.453 g",
    value: "₹13.5k",
    returnPct: "(12.24%)",
    hasActivity: true,
    transactionRoute: "/silver/transaction",
    investRoute: "/silver",
  },
  {
    id: "fd",
    icon: <FixedDepositIcon />,
    title: "Fixed Deposit",
    subtitle: "2 FD's",
    value: "₹2.5L",
    returnPct: "(12.24%)",
    hasActivity: true,
    transactionRoute: null,
    investRoute: "/fd",
    externalRedirect: true,
  },
  {
    id: "bonds",
    icon: <BondsIcon />,
    title: "Bonds",
    subtitle: "3 Bonds",
    value: "₹1.6L",
    returnPct: "(12.24%)",
    hasActivity: false,
    transactionRoute: null,
    investRoute: "/bonds",
  },
];

export default function PortfolioAssets() {
  const router = useRouter();

  function handleFixerraRedirect() {
    // TODO: call your authcode API and redirect
    // fetch('/api/fixed/authcode', { method: 'POST', body: ... })
    //   .then(res => res.json())
    //   .then(data => { window.location.href = `${PARTNER_URL}/login?authCode=${data.authcode}&redirect=portfolio_fd` })
    console.warn("Fixerra redirect not yet implemented");
  }

  function handleCardClick(asset: Asset) {
    if (!asset.hasActivity) {
      router.push(asset.investRoute);
      return;
    }

    if (asset.externalRedirect) {
      handleFixerraRedirect();
      return;
    }

    if (asset.transactionRoute) {
      router.push(asset.transactionRoute);
    }
  }

  return (
    <div className="px-4 pb-2">
      <div className="mb-3 flex items-center justify-between pt-5">
        <p className="text-[17px] font-semibold text-black">Your Assets</p>
        <button className="flex items-center gap-1.5 text-[12px] text-[#7B8494]">
          Refresh
          <img
            src="/images/porffolio/refres.svg"
            width={16.49}
            height={16.49}
            alt="refresh"
          />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {ASSETS.map((asset) => (
          <PortfolioHoldingCard
            key={asset.id}
            icon={asset.icon}
            title={asset.title}
            subtitle={asset.subtitle}
            value={asset.value}
            returnPct={asset.returnPct}
            hasActivity={asset.hasActivity}
            onClick={() => handleCardClick(asset)}
          />
        ))}
      </div>
    </div>
  );
}
