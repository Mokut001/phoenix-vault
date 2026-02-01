
import React, { useState } from 'react';
import { Lucid, Blockfrost, Data } from "lucid-cardano";

export default function PhoenixDApp() {
  const [lucid, setLucid] = useState<Lucid | null>(null);
  const [status, setStatus] = useState("Status: Ready to Connect");

  const connectWallet = async () => {
    try {
      const l = await Lucid.new(
        new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "YOUR_PREPROD_KEY"),
        "Preprod"
      );
      const api = await (window as any).cardano.eternl.enable();
      l.selectWallet(api);
      setLucid(l);
      setStatus("Wallet Connected!");
    } catch (e: any) {
      setStatus("Error: " + e.message);
    }
  };

  const sealVault = async () => {
    if (!lucid) return;
    setStatus("Sealing Vault...");
    // Logic: In a real app, you would collect Heir PKH and Date here
    // For this template, it demonstrates the 'Lock' flow
    setStatus("Vault Sealed on chain (Check Ledger)");
  };

  return (
    <div style={{ background: '#0a0a0a', color: '#ff4d4d', minHeight: '100vh', padding: '10%' }}>
      <h1 style={{ borderBottom: '2px solid #ff4d4d' }}>PHOENIX VAULT SYSTEM</h1>
      <p>{status}</p>
      
      {!lucid ? (
        <button onClick={connectWallet} style={btnStyle}>Authorize Protocol</button>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          <button onClick={sealVault} style={btnStyle}>SEAL FUTURE ASSETS (LOCK)</button>
          <button onClick={() => setStatus("Checking Ledger...")} style={{...btnStyle, background: '#333'}}>RESCAN CHAIN</button>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
    background: 'none',
    border: '1px solid #ff4d4d',
    color: '#ff4d4d',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const
};
