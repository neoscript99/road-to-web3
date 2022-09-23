
const { ethers } = require("hardhat");
let deployer, owner1;
let Token,
  tokenContract,
  PriceFeedMock,
  priceFeedMock,
  subscriptionId,
  VrfCoordinatorMock,
  vrfCoordinatorMock;

const TOKEN_ID_0 = 0;
const TOKEN_ID_1 = 1;

const UPDATE_INTERVAL_SEC = 60;
const DECIMALS = 8;
const INITIAL_PRICE = 3000000000000;

const VRF_FUND_AMOUNT = "1000000000000000000000";

const BASE_FEE = "250000000000000000";
const GAS_PRICE_LINK = 1e9; // 0.000000001 LINK per gas
async function main() {
    [deployer, owner1] = await ethers.getSigners();
  
    // Setup Price Feeds
    PriceFeedMock = await ethers.getContractFactory("MockV3Aggregator");
    priceFeedMock = await PriceFeedMock.deploy(DECIMALS, INITIAL_PRICE);
    // Setup VRF and Subscription
    VrfCoordinatorMock = await ethers.getContractFactory("VRFCoordinatorV2Mock");
    vrfCoordinatorMock = await VrfCoordinatorMock.deploy(
      BASE_FEE,
      GAS_PRICE_LINK
    );
    const transactionResponse = await vrfCoordinatorMock.createSubscription();
    const transactionReceipt = await transactionResponse.wait();
    subscriptionId = transactionReceipt.events[0].args.subId;
    // Fund the subscription
    // Our mock makes it so we don't actually have to worry about sending fund
    await vrfCoordinatorMock.fundSubscription(subscriptionId, VRF_FUND_AMOUNT);
  
    // Setup dNFT
    Token = await ethers.getContractFactory("BullBear");
    tokenContract = await Token.deploy(
      UPDATE_INTERVAL_SEC,
      priceFeedMock.address,
      vrfCoordinatorMock.address
    );
  
    console.log(priceFeedMock.address)
    console.log(vrfCoordinatorMock.address)
    console.log(tokenContract.address)
    await tokenContract.setSubscriptionId(subscriptionId);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });