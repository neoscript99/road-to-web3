# REPOSITORY FOR THE CHAINLINK LABS MODULE IN ALCHEMY'S ROAD TO WEB3 DEVELOPER PROGRAM
### Work done
Code: https://github.com/neoscript99/road-to-web3/tree/master/05-link-dynamic-nft
Bull&Bear Nft(Contract verified): https://goerli.etherscan.io/address/0xA59fFdFE4C40030c7d6581F368C146470da38a56
VRF: Use Chainlink goerli https://goerli.etherscan.io/address/0x53de3bdee83d50be923533a99f54738bc2ce5ed9, Subscription Id 2600
PriceFeed: https://goerli.etherscan.io/address/0xA39434A63A52E749F02807ae27335515BA4b07F7
Upkeep: Chainlink goerli https://goerli.etherscan.io/address/0x02777053d6764996e594c3e88af1d58d5363a2e6, id 74766432885586532059563617625143060684020462912915113159908805257248777214556
### TABLE OF CONTENTS

- [REPOSITORY FOR THE CHAINLINK LABS MODULE IN ALCHEMY'S ROAD TO WEB3 DEVELOPER PROGRAM](#repository-for-the-chainlink-labs-module-in-alchemys-road-to-web3-developer-program)
    - [Work done](#work-done)
    - [TABLE OF CONTENTS](#table-of-contents)
    - [Project Description](#project-description)
    - [Expanding your skills](#expanding-your-skills)
    - [TOOLING REQUIREMENTS](#tooling-requirements)
    - [Branches](#branches)
    - [Assignment](#assignment)
    - [Viewing NFTs on Opensea](#viewing-nfts-on-opensea)
    - [Thank you!](#thank-you)

### Project Description

Follow along with the [YouTube Codealong](https://www.youtube.com/watch?v=hNdXSMKLDi4)

This project mints Dynamic NFTs that change based on the market price of an asset pair (for example, the BTC/USD asset price). When prices go up, its a bull trend and when the go down its a bear trend. We run [Chainlink Keepers](https://docs.chain.link/docs/chainlink-keepers/introduction/) to have our smart contract automatically called at specified intervals so that on-chain logic checks the [Chainlink Price Feed](https://docs.chain.link/docs/using-chainlink-reference-contracts/) to see if there has been a change in price. Accordingly the minted NFTs dynamically alternate between the images below.

<p float="left">
    <img src="./ipfs/gamer_bull.png" width = "200" />
    <img src="./ipfs/party_bull.png" width = "200" />
    <img src="./ipfs/simple_bull.png" width = "200" />
    <img src="./ipfs/beanie_bear.png" width = "200" />
    <img src="./ipfs/coolio_bear.png" width = "200" />
    <img src="./ipfs/simple_bear.png" width = "200" />
</p>

The entire project is designed for ease of use by those new to Web3 and can be run from a Remix in-browser IDE and network environment.

### Expanding your skills

Though this code base is minimally designed for use in Remix, it's always great to push yourself to expand your skills! We encourage you to learn and use more advanced tools like Hardhat and Truffle by

- cloning the [Hardhat Starter Kit](https://github.com/smartcontractkit/hardhat-starter-kit) or the [Truffle Starter Kit](https://github.com/smartcontractkit/truffle-starter-kit) repos,
- dropping the smart contracts you write for this project into those repos,
- adapting the deploy scripts, interaction scripts and tests as scaffolded in those starter kits.
- **Note** : those starter kits include all the configuration you need to consider for deploying to test networks and also for Ethereum main nets. Be sure to read through the READMEs there to get a sense of what needs doing!

You can check out videos from the [Chainlink Spring 2022 Hackathon](chain.link/hackathon) on YouTube, especially the trainings on

- [using Hardhat](https://www.youtube.com/watch?v=5WBng0kWzJo&list=PLVP9aGDn-X0RXx1y3-GdzLWfetXiNqNiE&index=9),
- [using Truffle](https://www.youtube.com/watch?v=jPp7a1w-J6E&list=PLVP9aGDn-X0RXx1y3-GdzLWfetXiNqNiE&index=12),
- [testing with Hardhat](https://www.youtube.com/watch?v=dDr7glOjtvI&list=PLVP9aGDn-X0RXx1y3-GdzLWfetXiNqNiE&index=14),
- [testing with Truffle](https://www.youtube.com/watch?v=ZomjP89otb0&list=PLVP9aGDn-X0RXx1y3-GdzLWfetXiNqNiE&index=17), and
- [testing with Hardhat](https://www.youtube.com/watch?v=dDr7glOjtvI&list=PLVP9aGDn-X0RXx1y3-GdzLWfetXiNqNiE&index=15)

You can even dig into [Chainlink Smart Contract Examples](https://github.com/smartcontractkit/smart-contract-examples) to find more clever ways of extending your code!

### TOOLING REQUIREMENTS

All you need to run this code is the [Remix IDE](https://remix.ethereum.org/) running in your browser and a [Metamask wallet](https://metamask.io/). While this repo includes mocks for you to "mimic" Chainlink oracle services, for your [Assignment](#assignment) you will need to deploy to the Rinkeby test network.

When on test networks you will need [test Ether and test LINK tokens](https://docs.chain.link/docs/acquire-link/) in your Metamask wallet.

> :warning: **Be sure to use only test ethereum accounts in Metamask when developing. You don't want to lose or spend real money!**

### Branches

This repo is organized in "layers". Each branch below represents the subsequent stage of the code buildup.

- `main`: has the starting code and the IPFS picture and json files. Also has the Dynamic NFT (ERC721) smart contract code.
- `price-feeds` has the code that adds [Chainlink Data Feeds](https://docs.chain.link/docs/get-the-latest-price/) logic and functionality along with the implementation of the Keepers interface so that our NFT Contract is [Keepers compatible](https://docs.chain.link/docs/chainlink-keepers/compatible-contracts/). It also has the mock Price Feeds smart contract called `MockPriceFeed.sol` which can be used to mock what calls to the actual Chainlink price feed would do. An example of what the return value from a price feed looks like is: `int256 3034715771688` which denotes the price up to 8 decimals.
- `randomness` contains the code for the [assignment](#assignment).

### Assignment

Update the NFT contract code to make the following happen:

- track the current market trend (hint: use an enum like `enum MarketTrend{BULL, BEAR}`)
- update `performUpkeep` so that it tracks the latest market trend based on the `getLatestPrice()` and if there is a price change, it calls another function (eg `requestRandomnessForNFTUris()`) that initiates the process of calling a [Chainlink VRF V2 Coordinator](https://docs.chain.link/docs/get-a-random-number/) for a random number.
- implement `fulfillRandomWords()` as per the VRF documentation
- test thoroughly in-browser, and then deploy to either Rinkeby or Polygon Mumbai test networks. **We suggest you only use Rinkeby or Polygon Mumbai as you may have a smoother experience**

A suggested implementation of the assignment is in the branch called `randomness`.

### Viewing NFTs on Opensea

Once deployed to one of the testnets mentioned above, your NFT should be viewable on [Opensea testnets](https://testnets.opensea.io/).
**Note:** if the dynamic NFT is taking time to change on OpenSea that's not unusual. In that even just call your contracts `tokenUri()` method and check what IPFS URI is being pointed to. If it changes, then your code is working but OpenSea's cache may not show the new image for a while, even if you do a [force-update on Open Sea](https://docs.opensea.io/docs/3-viewing-your-items-on-opensea). However, you should see the name of the NFT update even if the image is lagging.

### Thank you!

Thank you for being curious and hungry to participate in the new Web3 movement! If you have any questions, reach out on [Twitter](https://twitter.com/zubinpratap) or tag me on [LinkedIn](https://linkedin.com/in/zubinpratap).
