
{-# LANGUAGE DataKinds           #-}
{-# LANGUAGE NoImplicitPrelude   #-}
{-# LANGUAGE TemplateHaskell     #-}
{-# LANGUAGE TypeApplications    #-}
{-# LANGUAGE TypeFamilies        #-}
{-# LANGUAGE TypeOperators       #-}

module PhoenixVault where

import           PlutusV2.Ledger.Api
import           PlutusV2.Ledger.Contexts
import           PlutusTx.Prelude
import qualified PlutusTx

-- The Datum: Storage of identity and time
data PhoenixDatum = PhoenixDatum
    { ownerPkh     :: PubKeyHash
    , successorPkh :: PubKeyHash
    , activateDate :: POSIXTime
    }
PlutusTx.unstableMakeIsData ''PhoenixDatum

{-# INLINEABLE mkPhoenixValidator #-}
mkPhoenixValidator :: PhoenixDatum -> () -> ScriptContext -> Bool
mkPhoenixValidator dat _ ctx = 
    isOwnerSigned || (isSuccessorSigned && isTimeReached)
  where
    info = scriptContextTxInfo ctx
    
    isOwnerSigned     = txSignedBy info (ownerPkh dat)
    isSuccessorSigned = txSignedBy info (successorPkh dat)
    
    -- Check if current time is after the activation date
    isTimeReached = contains (from (activateDate dat)) (txInfoValidRange info)

validator :: Validator
validator = mkValidatorScript $$(PlutusTx.compile [|| mkPhoenixValidator ||])
