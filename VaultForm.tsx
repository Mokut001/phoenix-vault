import React, { useState } from 'react';
import { initLucid } from '../lib/lucid';
import { VestingDatumSchema, getVestingScript } from '../lib/contract';
import { Data } from 'lucid-cardano';

export default function VaultForm() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSeal = async () => {
    try {
      setStatus('Connecting wallet...');
      const lucid = await initLucid('Nami'); // Defaulting to Nami for demo
      
      const deadline = BigInt(new Date(date).getTime());
      const pkh = lucid.utils.getAddressDetails(address).paymentCredential?.hash!;

      const datum: any = Data.to(
        { beneficiary: pkh, deadline: deadline },
        VestingDatumSchema
      );

      const script = getVestingScript();
      const scriptAddr = lucid.utils.validatorToAddress(script as any);

      setStatus('Building transaction...');
      const tx = await lucid
        .newTx()
        .payToContract(scriptAddr, { inline: datum }, { lovelace: BigInt(Number(amount) * 1000000) })
        .complete();

      const signedTx = await tx.sign().complete();
      const txHash = await signedTx.submit();
      setStatus(`Success! Tx Hash: ${txHash}`);
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div className="bg-phoenix-dark p-8 rounded-xl border border-phoenix-gold shadow-2xl max-w-md w-full">
      <h2 className="text-phoenix-gold text-2xl font-bold mb-6">Seal Assets</h2>
      <input 
        className="w-full bg-black border border-gray-700 p-2 rounded mb-4 text-white"
        placeholder="Recipient Address" 
        onChange={(e) => setAddress(e.target.value)}
      />
      <input 
        className="w-full bg-black border border-gray-700 p-2 rounded mb-4 text-white"
        placeholder="Amount (ADA)" 
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />
      <input 
        className="w-full bg-black border border-gray-700 p-2 rounded mb-4 text-white"
        type="datetime-local" 
        onChange={(e) => setDate(e.target.value)}
      />
      <button 
        onClick={handleSeal}
        className="w-full bg-phoenix-fire hover:bg-orange-600 text-white font-bold py-3 rounded transition"
      >
        Lock Assets in Vault
      </button>
      {status && <p className="mt-4 text-sm text-gray-400 break-words">{status}</p>}
    </div>
  );
}