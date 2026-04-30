import HeaderHero from "@/components/home/HeaderHero";
import Category from "@/components/home/Category";
import Investments from "@/components/home/Investments";
import Utility from "@/components/home/Utility";
import BottomNav from "@/components/home/BottomNav";

export default function HomePage() {
  return (
    <div className="h-[100dvh] max-w-[430px] mx-auto bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        <HeaderHero />
        <Category />
        <Investments />
        <Utility /> {/* 🔥 ADD THIS */}
      </div>

      <BottomNav />
    </div>
  );
}
