import GoldSuccess from "@/components/gold/GoldSuccess";

export const dynamic =
  "force-dynamic";

type Props = {
  searchParams: Promise<{
    txId?: string;
  }>;
};

export default async function GoldSuccessPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  return (
    <GoldSuccess
      txId={params.txId}
    />
  );
}