require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
const GOERLI_URL = process.env.REACT_APP_ALCHEMY_API_URL;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: GOERLI_URL,
      accounts: ['99cf030ec71b181' + PRIVATE_KEY + '7b964a0']
    }
  },
  etherscan: {
    apiKey: process.env.GOERLI_API_KEY
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};