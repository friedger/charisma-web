import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMainnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
} from "@stacks/transactions";
import ConnectWallet, { userSession } from "../hms/stacks-session/connect";
import Button from "@components/hms/Button";
import { Container, HandIcon, Wallet } from "lucide-react";
import IconLogo from "@components/icons/icon-logo";

const ClaimFaucetButton = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  function claim() {
    doContractCall({
      network: new StacksMainnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS",
      contractName: "dme005-token-faucet-v0",
      functionName: "claim",
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        (window as any)
          .open(
            `https://explorer.hiro.so/txid/${data.txId}?chain=mainnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return <ConnectWallet />;
  }

  return (
    <Button className='text-md w-full' onClick={claim}>Claim </Button>
  );
};

export default ClaimFaucetButton;