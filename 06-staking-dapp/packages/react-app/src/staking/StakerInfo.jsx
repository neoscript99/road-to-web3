import { Balance } from "components";
import { useContractReader } from "eth-hooks";
import humanizeDuration from "humanize-duration";
import React from "react";
export default function StakerInfo({ readContracts }) {
  const rewardRatePerSecond = useContractReader(readContracts, "Staker", "rewardRatePerSecond");
  console.log("⏳ Claim Period Left:", rewardRatePerSecond);
  // ** keep track of a variable from the contract in the local React state:
  const claimPeriodLeft = useContractReader(readContracts, "Staker", "claimPeriodLeft");
  console.log("⏳ Claim Period Left:", claimPeriodLeft);

  const withdrawalTimeLeft = useContractReader(readContracts, "Staker", "withdrawalTimeLeft");
  console.log("⏳ Withdrawal Time Left:", withdrawalTimeLeft);
  return (
    <>
      <div style={{ padding: 8, marginTop: 16 }}>
        <div>Reward Rate Per Second:</div>
        <Balance balance={rewardRatePerSecond} fontSize={64} /> ETH
      </div>
      <div style={{ padding: 8, marginTop: 16, fontWeight: "bold" }}>
        <div>Claim Period Left:</div>
        {claimPeriodLeft && humanizeDuration(claimPeriodLeft.toNumber() * 1000)}
      </div>
      <div style={{ padding: 8, marginTop: 16, fontWeight: "bold" }}>
        <div>Withdrawal Period Left:</div>
        {withdrawalTimeLeft && humanizeDuration(withdrawalTimeLeft.toNumber() * 1000)}
      </div>
    </>
  );
}
