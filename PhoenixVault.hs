
{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE TemplateHaskell     #-}
{-# LANGUAGE TypeApplications    #-}
{-# LANGUAGE ScopedTypeVariables #-}

module PhoenixVault where

import           Plutus.V2.Ledger.Api
import           Plutus.V2.Ledger.Contexts
import           PlutusTx
import           PlutusTx.Prelude          hiding (Semigroup (..), unless)

-- | Datum defines the vault ownership and inheritance rules
data VaultDatum = VaultDatum
    { ownerPkh     :: PubKeyHash  -- Original creator
    , successorPkh :: PubKeyHash  -- Heir
    , deadline     :: POSIXTime   -- The recovery threshold
    }
PlutusTx.unstableMakeIsData ''VaultDatum

{-# INLINABLE mkPhoenixValidator #-}
mkPhoenixValidator :: VaultDatum -> () -> ScriptContext -> Bool
mkPhoenixValidator dat () ctx = 
    case getPath of
        OwnerPath     -> traceIfFalse "Owner signature missing" checkOwnerSigned
        SuccessorPath -> traceIfFalse "Too early for successor" checkDeadlineReached &&
                         traceIfFalse "Successor signature missing" checkSuccessorSigned
  where
    info = scriptContextTxInfo ctx

    checkOwnerSigned     = txSignedBy info (ownerPkh dat)
    checkSuccessorSigned = txSignedBy info (successorPkh dat)
    checkDeadlineReached = contains (from (deadline dat)) (txInfoValidRange info)

    getPath | checkOwnerSigned = OwnerPath
            | otherwise        = SuccessorPath

data RecoveryPath = OwnerPath | SuccessorPath

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| wrap ||])
  where wrap = mkUntypedValidator mkPhoenixValidator
