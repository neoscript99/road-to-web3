
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
  //[deployer, owner1] = await ethers.getSigners();

  // Setup Price Feeds
  PriceFeedMock = await ethers.getContractFactory("MockV3Aggregator");
  priceFeedMock = await PriceFeedMock.deploy(DECIMALS, INITIAL_PRICE);

  console.log('priceFeedMock: ', priceFeedMock.address, DECIMALS, INITIAL_PRICE)
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
  console.log('vrfCoordinatorMock: ', vrfCoordinatorMock.address, BASE_FEE, GAS_PRICE_LINK)

  // Setup dNFT
  Token = await ethers.getContractFactory("BullBear");
  tokenContract = await Token.deploy(
    UPDATE_INTERVAL_SEC,
    priceFeedMock.address,
    vrfCoordinatorMock.address
  );

  console.log('BullBear: ', tokenContract.address, UPDATE_INTERVAL_SEC,
    priceFeedMock.address,
    vrfCoordinatorMock.address)
  await tokenContract.setSubscriptionId(subscriptionId);
}
async function onlyToken() {
  // Setup dNFT
  Token = await ethers.getContractFactory("BullBear");
  priceFeedAddr = '0x4e70c784ca92fc73aeb8ccb799d0ecee41770bc6'
  //https://vrf.chain.link/
  vrfAddr = '0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d'
  tokenContract = await Token.deploy(
    UPDATE_INTERVAL_SEC,
    priceFeedAddr,
    vrfAddr
  );

  console.log('BullBear: ', tokenContract.address, UPDATE_INTERVAL_SEC,
    priceFeedAddr, vrfAddr)
  await tokenContract.setSubscriptionId(2600);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
onlyToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
//PriceFeed: https://goerli.etherscan.io/address/0x4e70c784ca92fc73aeb8ccb799d0ecee41770bc6
//VRFCoordinatorV2Mock(use link): https://goerli.etherscan.io/address/0xd95b2bb98d1b4cdb8168311077fd586bb848bb83  
//pnpm hardhat verify --network goerli 0x4e70c784ca92fc73aeb8ccb799d0ecee41770bc6 8 3000000000000 
//pnpm hardhat verify --network goerli 0xd95b2bb98d1b4cdb8168311077fd586bb848bb83 250000000000000000 1000000000
//pnpm hardhat verify --network goerli 0xA59fFdFE4C40030c7d6581F368C146470da38a56 60 0x4e70c784ca92fc73aeb8ccb799d0ecee41770bc6 0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d