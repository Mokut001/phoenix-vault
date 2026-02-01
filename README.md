
# PHOENIX VAULT - FULL SYSTEM

This package contains the complete end-to-end integration for the Legacy Recovery Protocol.

### 1. The On-Chain Guard (contract/)
- `PhoenixVault.hs`: The core Haskell source. It handles the "Owner Recovery" or "Heir Inheritance" logic.
- `phoenix_vault.plutus`: The compiled script file you need for the frontend.


### 2. How it runs together
- The Haskell file defines the "Rules". 
- The `.plutus` file is the "Lock".
- The `lucid-cardano` library in React is the "Key" that interacts with the wallet.
