import VaultForm from '../components/VaultForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black text-phoenix-gold tracking-tighter mb-2">PHOENIX VAULT</h1>
        <p className="text-gray-500 uppercase tracking-widest text-xs">Decentralized Legacy Recovery</p>
      </header>
      <VaultForm />
      <footer className="mt-12 text-gray-600 text-xs">
        Connected to Cardano Preprod Network
      </footer>
    </div>
  );
}