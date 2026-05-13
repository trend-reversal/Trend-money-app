import SilverSuccess from "@/components/silver/SilverSuccess";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    txId?: string;
  }>;
};

export default async function SilverSuccessPage({ searchParams }: Props) {
  const params = await searchParams;

  return <SilverSuccess txId={params.txId} />;
}
