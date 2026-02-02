import { Data } from "lucid-cardano";

export const VestingDatumSchema = Data.Object({
  beneficiary: Data.String,
  deadline: Data.BigInt,
});

export type VestingDatum = Data.Static<typeof VestingDatumSchema>;

// Placeholder CBOR for a basic AlwaysSucceeds or simple Vesting script
// In a real app, you would compile your Aiken/Plutus code to get this
export const scriptCBOR = "582258200101002232323232323232323232323232323232323232323232323232323232"; 

export const getVestingScript = () => {
  return {
    type: "PlutusV2",
    script: scriptCBOR,
  };
};