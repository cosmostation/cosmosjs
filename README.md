<p align="center">
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="100" src="https://user-images.githubusercontent.com/20435620/55696624-d7df2e00-59f8-11e9-9126-edf9a40b11a8.png" alt="Cosmostation logo"></a>
</p>
<h1 align="center">
    Cosmos JavaScript Library 
</h1>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*.

**WARNING:** CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.

## What is CosmosJS ?

A javascript open source library for [Cosmos Network](https://cosmos.network/)

This library has functions to verify, generate cosmos address, and create a different types of transaction messages. Check out the currently supprting message types below. This library will support all the other blockchains that are based on Tendermint in the future.

## Installation

You need to run a local or remote Cosmos node to utilize this library.

#### NPM

`npm install @cosmostation/cosmosjs`

#### Browser Distribution

CosmosJS can be converted to a library for browser using browserify.

## Import 

#### NodeJS

```js
const cosmosjs = require("cosmosjs");
```

#### Browser

```js
<script src='js/cosmosjs-bundle.js'></script>
```

## Usage

```js
const cosmosjs = require("cosmosjs");

const chainId = "chain-id";
const cosmos = cosmosjs.network(chainId);

```
Get the Cosmos address from mnemonic
```js
const address = cosmos.getAddress(mnemonic);
```

Get the ECPairPriv value that is needed for signing signatures.
```js
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
```

When transferring Cosmos Atom, you need to use MsgSend type. 
Make sure to input proper type, account number, and sequence value of the cosmos account to make StdSignMsg. 
> https://cosmos.network/rpc/, [GET], /auth/accounts/{address}

```js
const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgSend", accountNumber, sequence, fromAddress, toAddress, "uatom", amount, "uatom", fee, gas, "");
```

Signing the stdSignMsg will be used for broadcasting.
```js
const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
```
Broadcasting signedTx will send a Cosmos Atom. 
>https://cosmos.network/rpc/, [POST], /txs)

## Documentation

This library is pretty simple and easy to use. Presently, we do not have any formal documentation other than our examples. Ask for help if our examples aren't enough to guide you.

## Supporting Message Types

- MsgSend
- MsgDelegate
- MsgUndelegate
- MsgWithdrawDelegationReward
- MsgSubmitProposal
- MsgDeposit
- MsgVote

## Contribution

- All contributions are welcome
- Suggestions or improvements are welcome

## Cosmostation Community

- [Telegram](https://t.me/cosmostation)
- [Kakao](https://open.kakao.com/o/g6KKSe5)

