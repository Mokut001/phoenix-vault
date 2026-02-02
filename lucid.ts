import { Lucid, Blockfrost } from "lucid-cardano";

export const initLucid = async (walletName: string) => {
  const lucid = await Lucid.new(
    new Blockfrost(
      process.env.NEXT_PUBLIC_BLOCKFROST_URL!,
      process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY!
    ),
    "Preprod"
  );

  const api = await window.cardano[walletName.toLowerCase()].enable();
  lucid.selectWallet(api);
  return lucid;
};