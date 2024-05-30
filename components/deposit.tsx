import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksMainnet } from "@stacks/network";
import {
  AnchorMode,
  Pc,
  PostConditionMode,
  uintCV,
} from "@stacks/transactions";
import ConnectWallet, { userSession } from "./stacks-session/connect";
import { Button } from "@components/ui/button";
import millify from "millify";

const Deposit = ({
  amount,
  stakingContractName,
  contractPrincipal,
  contractToken,
  tokenTicker
}: {
  amount: number,
  stakingContractName: string,
  contractPrincipal: `${string}.${string}`,
  contractToken: string,
  tokenTicker: string
}) => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  function deposit() {
    const sender = userSession.loadUserData().profile.stxAddress.mainnet
    doContractCall({
      network: new StacksMainnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS",
      contractName: stakingContractName,
      functionName: "deposit",
      functionArgs: [uintCV(amount * 1000000)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        Pc.principal(sender).willSendEq(amount * 1000000).ft(contractPrincipal, contractToken),
      ],
      onFinish: (data) => {
        console.log("onFinish:", data);
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
    <Button className='text-md w-full hover:bg-[#ffffffee] hover:text-primary' onClick={deposit}>{millify(amount)} {tokenTicker}</Button>
  );
};

export default Deposit;