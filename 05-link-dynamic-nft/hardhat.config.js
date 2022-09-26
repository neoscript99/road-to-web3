
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.6.4",
      },
    ],
  },
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: ['99cf030ec71b181' + PRIVATE_KEY + '7b964a0']
    }
  },
  etherscan: {
    apiKey: process.env.GOERLI_API_KEY
  }
};
