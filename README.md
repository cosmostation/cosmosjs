<p align="center">
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="100" src="https://user-images.githubusercontent.com/20435620/55696624-d7df2e00-59f8-11e9-9126-edf9a40b11a8.png" alt="Cosmostation logo"></a>
</p>
<h1 align="center">
    CosmosJS - Cosmos JavaScript Library 
</h1>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*

A JavasSript Open Source Library for [Cosmos Network](https://cosmos.network/)

This library enables you to generate and verify cosmos address and create a different types of transaction messages. This library will eventually support all the other blockchains that are based on Tendermint in the future.

[![MIT](https://img.shields.io/apm/l/vim-mode.svg)](https://github.com/cosmostation/cosmosjs/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/v/@cosmostation/cosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)

<b>WARNING:</b> CosmosJS is under <b>ACTIVE DEVELOPMENT</b> and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and ready to be used in production

## Installation

In order to fully use this library, you need to run a local or remote  Cosmos full node and set up the rest server, which acts as an intermediary between the front-end and the full-node

### NPM

```bash
npm install @cosmostation/cosmosjs
```

### Browser Distribution

CosmosJS supports browserify.

## Import 

#### NodeJS

```js
const cosmosjs = require("@cosmostation/cosmosjs");
```

#### Browser

```js
<script src='js/cosmosjs-bundle.js'></script>
```

## Usage

Generate Cosmos address from mnemonic 
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "chain-id";
const cosmos = cosmosjs.network(chainId)

const mnemonic = "..."
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
```

Generate ECPairPriv value that is needed for signing signatures
```js
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
```

Transfer ATOM to designated address. 
* Make sure to input proper type, account number, and sequence of the cosmos account to generate StdSignMsg. You can get those account information on blockchain 

```js
const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgSend", accountNumber, sequence, fromAddress, toAddress, "uatom", amount, "uatom", fee, gas, "");
```

Sign transaction by using stdSignMsg and broadcast by using [/txs](https://cosmos.network/rpc/) REST API
```js
const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
```

## Supporting Message Types (Updating...)

- MsgSend
- MsgDelegate
- MsgUndelegate
- MsgWithdrawDelegationReward
- MsgSubmitProposal
- MsgDeposit
- MsgVote

## Documentation

This library is simple and easy to use. We don't have any formal documentation yet other than examples. Ask for help if our examples aren't enough to guide you.

## Contribution

- All contributions are welcome
- Suggestions or improvements are welcome

## Cosmostation's Services and Community

- [Official Website](https://www.cosmostation.io)
- [Mintscan Explorer](https://www.mintscan.io)
- [Web Wallet](https://wallet.cosmostation.io)
- [Android Wallet](https://bit.ly/2BWex9D)
- [iOS Wallet](https://apple.co/2IAM3Xm)
- [Telegram - International](https://t.me/cosmostation)
- [Kakao - Koreans](https://open.kakao.com/o/g6KKSe5)

