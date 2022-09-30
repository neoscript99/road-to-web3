# 6. How to Build a Staking Dapp

## Twitter
Week6. How to Build a Staking Dapp is done! @AlchemyPlatform  @crypt0zeke #roadtoweb3

## Code
https://github.com/neoscript99/road-to-web3/tree/master/06-staking-dapp
## Work Desc
1. compute interest: `uint256 indBalanceRewards = (individualBalance *
            (100 + rewardRatePerBlock)**exponential) / 100**exponential;`
2. arbitrary amount: `<InputNumber style={{ marginRight: 8 }} value={stakeAmount} step="0.1" onChange={amountChange} />`
3. re-deposit it back into the Staker contract: `packages\hardhat\contracts\ExampleExternalContract.sol`