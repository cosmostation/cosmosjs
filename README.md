<p align="center">
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="100" src="https://user-images.githubusercontent.com/20435620/55696624-d7df2e00-59f8-11e9-9126-edf9a40b11a8.png" alt="Cosmostation logo"></a>
</p>
<h1 align="center">
    CosmosJS - Cosmos JavaScript Library 
</h1>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*

A JavasSript Open Source Library for [Cosmos Network](https://cosmos.network/)

This library supports cosmos address generation and verification. It enables you to create an offline signature functions of different types of transaction messages. It will eventually support all the other blockchains that are based on Tendermint in the future, such as IRISnet

[![MIT](https://img.shields.io/apm/l/vim-mode.svg)](https://github.com/cosmostation/cosmosjs/blob/master/LICENSE)
[![NPM](https://img.shields.io/npm/v/@cosmostation/cosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)

<b>WARNING:</b> CosmosJS is under <b>ACTIVE DEVELOPMENT</b> and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and ready to be used in production

## Installation

In order to fully use this library, you need to run a local or remote  Cosmos full node and set up the rest server, which acts as an intermediary between the front-end and the full-node

### NPM

```bash
npm install @cosmostation/cosmosjs
```

### Yarn

```bash
yarn add @cosmostation/cosmosjs
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
const lcdUrl = "https://cosmoshub.validator.network:443";
const cosmos = cosmosjs.network(lcdUrl, chainId)

const mnemonic = "..."
cosmos.setPath("m/44'/118'/0'/0/0");
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
cosmos.getAccounts(address).then(data => {
	let stdSignMsg = cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgSend",
		from_address: address,
		to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
		amountDenom: "uatom",
		amount: 100000,
		feeDenom: "uatom",
		fee: 5000,
		gas: 200000,
		memo: "",
		account_number: data.value.account_number,
		sequence: data.value.sequence
	});

	...
})
```

Sign transaction by using stdSignMsg and broadcast by using [/txs](https://lcd-do-not-abuse.cosmostation.io/txs) REST API
```js
const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
cosmos.broadcast(signedTx).then(response => console.log(response));
```

Cosmostation offers LCD url(https://lcd-do-not-abuse.cosmostation.io).
* API Rate Limiting: 10 requests per second

## Supporting Message Types (Updating...)

- MsgSend
```js
let stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgSend",
	from_address: address,
	to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgDelegate
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgDelegate",
	delegator_address: address,
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgUndelegate
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgUndelegate",
	delegator_address: address,
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgWithdrawDelegationReward
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgWithdrawDelegationReward",
	delegator_address: address,
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgSubmitProposal
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgSubmitProposal",
	title: "Activate the Community Pool",
	description: "Enable governance to spend funds from the community pool. Full proposal: https://ipfs.io/ipfs/QmNsVCsyRmEiep8rTQLxVNdMHm2uiZkmaSHCR6S72Y1sL1",
	initialDepositDenom: "uatom",
	initialDepositAmount: 1000000,
	proposal_type: "Text",
	proposer: address,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgDeposit
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgDeposit",
	depositor: address,
	proposal_id: 1,
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgVote
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgVote",
	voter: address,
	proposal_id: 1,
	option: "Yes",	// Yes, No, NowithVeto, Abstain
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgBeginRedelegate
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgBeginRedelegate",
	delegator_address: address,
	validator_src_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	validator_dst_address: "cosmosvaloper1ec3p6a75mqwkv33zt543n6cnxqwun37rr5xlqv",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- MsgModifyWithdrawAddress
```js
stdSignMsg = cosmos.NewStdMsg({
	type: "cosmos-sdk/MsgModifyWithdrawAddress",
	delegator_address: address,
	withdraw_address: "cosmos133mtfk63fuac5e2npfgcktwufnty2536wedfal",
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```

## Documentation

This library is simple and easy to use. We don't have any formal documentation yet other than examples. Ask for help if our examples aren't enough to guide you

## Contribution

- Contributions, suggestions, improvements, and feature requests are always welcome

When opening a PR with a minor fix, make sure to add #trivial to the title/description of said PR.

## Cosmostation's Services and Community

- [Official Website](https://www.cosmostation.io)
- [Mintscan Explorer](https://www.mintscan.io)
- [Web Wallet](https://wallet.cosmostation.io)
- [Android Wallet](https://bit.ly/2BWex9D)
- [iOS Wallet](https://apple.co/2IAM3Xm)
- [Telegram - International](https://t.me/cosmostation)
- [Kakao - Koreans](https://open.kakao.com/o/g6KKSe5)

