"use client";

import FirstTimeGoldUser from "@/components/gold/FirstTimeGoldUser";
import ReturningGoldUser from "@/components/gold/ReturningGoldUser";
import { tr } from "framer-motion/client";

export default function GoldPage() {
  const hasInvestment = true; // Replace with actual logic to determine if the user has made an investment

  return <>{hasInvestment ? <ReturningGoldUser /> : <FirstTimeGoldUser />}</>;
}
