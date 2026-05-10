import GoldSuccess from "@/components/gold/GoldSuccess";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    amount?: string;
    txId?: string;
    gold?: string;
  }>;
};

export default async function GoldSuccessPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <GoldSuccess
      amount={params.amount}
      txId={params.txId}
      gold={params.gold}
    />
  );
}