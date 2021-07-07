<!-- TOTAL-DOWNLOADS-BADGE:START - Do not remove or modify this section -->
[![NPM Downloads](https://img.shields.io/npm/dt/@cosmostation/cosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)
<!-- TOTAL-DOWNLOADS-BADGE:END -->

<p align="center">
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="100" src="https://user-images.githubusercontent.com/34641838/107007567-0cc79200-67d6-11eb-83c8-9af239866785.png" alt="Cosmostation logo"></a>
</p>
<h1 align="center">
    CosmosJS - Cosmos JavaScript Library 
</h1>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*

A JavasSript Open Source Library for [Cosmoshub](https://cosmos.network/), [IRISnet](https://www.irisnet.org/), [Starname](https://iov.one/), and [Akash Network](https://akash.network/).

This library supports cosmos address generation and verification. It enables you to create an offline signature functions of different types of transaction messages. It will eventually support all the other blockchains that are based on Tendermint in the future.

> :warning: If you need for classic version for amino signing, download a version under v0.9.7

[![License](https://img.shields.io/npm/l/@cosmostation/cosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)
[![Latest Stable Version](https://img.shields.io/npm/v/@cosmostation/cosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)
[![NPM Downloads](https://img.shields.io/npm/dm/@cosmostation/cosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)

## Installation

In order to fully use this library, you need to run a local or remote full node and set up its rest server, which acts as an intermediary between the front-end and the full-node.

### NPM (Protobuf)

```bash
npm install @cosmostation/cosmosjs
```

### Yarn (Protobuf)

```bash
yarn add @cosmostation/cosmosjs
```

### NPM (Amino)
- https://github.com/cosmostation/cosmosjs/tree/classic

```bash
npm install @cosmostation/cosmosjs@0.9.7
```

### Yarn (Amino)
- https://github.com/cosmostation/cosmosjs/tree/classic

```bash
yarn add @cosmostation/cosmosjs@0.9.7
```

## Import 

```js
import { Cosmos } from "../src/index.js";
```

## Usage

- You need to import Cosmos-sdk Protobuf message file as js. It is created by [protocgen.sh](https://github.com/cosmos-client/cosmos-client-ts/blob/master/protocgen.sh).
- @cosmostation/cosmosjs@0.10.0+ is running above nodejs v14+
- You can run with this option for ES6.
```sh
$ node --es-module-specifier-resolution=node example/cosmoshub.js
```

- Import the message file that is converted from Cosmos-sdk proto.

```js
import message from "../src/messages/proto";
```

- Stargate-final: Generate Cosmos address from mnemonic 
```js
const mnemonic = "..."
const chainId = "cosmoshub-4";
const cosmos = new Cosmos(lcdUrl, chainId);

cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);

```

Generate both privKey and pubKeyAny that are needed for signing. 
```js
const privKey = cosmos.getECPairPriv(mnemonic);
const pubKeyAny = cosmos.getPubKeyAny(privKey);
```

Transfer ATOM to designated address. 
* Make sure to input proper type, account number, and sequence of the cosmos account to generate protobuf structure. You can get those account information on blockchain. Protobuf signing is different from Amino signing.
```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// ---------------------------------- (1)txBody ----------------------------------
	const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
		from_address: address,
		to_address: "cosmos1jf874x5vr6wkza6ahvamck4sy4w76aq4w9c4s5",
		amount: [{ denom: "uatom", amount: String(100000) }]		// 6 decimal places (1000000 uatom = 1 ATOM)
	});

	const msgSendAny = new message.google.protobuf.Any({
		type_url: "/cosmos.bank.v1beta1.MsgSend",
		value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
		public_key: pubKeyAny,
		mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
		sequence: data.account.sequence
	});

	const feeValue = new message.cosmos.tx.v1beta1.Fee({
		amount: [{ denom: "uatom", amount: String(5000) }],
		gas_limit: 200000
	});

	const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

	...
});
```

Sign transaction by using stdSignMsg and broadcast by using [/cosmos/tx/v1beta1/txs](https://v1.cosmos.network/rpc/v0.41.4) REST API
```js
const signedTxBytes = cosmos.sign(txBody, authInfo, data.account.account_number, privKey);
cosmos.broadcast(signedTxBytes).then(response => console.log(response));
```

Official LCD url([https://api.cosmos.network](https://api.cosmos.network/node_info)).
- This rest server URL may be disabled at any time. In order to maintain stable blockchain service, it is recommended to prepare your rest server.
- Setting up the rest server: (https://hub.cosmos.network/main/gaia-tutorials/join-mainnet.html#enable-the-rest-api)

## Supporting Message Types (Updating...)

We will continue to update the protobuf signing structure.

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


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.cosmostation.io/"><img src="https://avatars3.githubusercontent.com/u/34641838?v=4" width="100px;" alt=""/><br /><sub><b>Booyoun</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=Booyoun-Kim" title="Code">💻</a> <a href="https://github.com/cosmostation/cosmosjs/issues?q=author%3ABooyoun-Kim" title="Bug reports">🐛</a> <a href="#maintenance-Booyoun-Kim" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://jaybdev.net"><img src="https://avatars1.githubusercontent.com/u/20435620?v=4" width="100px;" alt=""/><br /><sub><b>JayB</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=kogisin" title="Code">💻</a> <a href="https://github.com/cosmostation/cosmosjs/commits?author=kogisin" title="Documentation">📖</a> <a href="#maintenance-kogisin" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://clovers.network"><img src="https://avatars2.githubusercontent.com/u/964052?v=4" width="100px;" alt=""/><br /><sub><b>billy rennekamp</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=okwme" title="Code">💻</a> <a href="https://github.com/cosmostation/cosmosjs/issues?q=author%3Aokwme" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/tonyfeung"><img src="https://avatars3.githubusercontent.com/u/5483234?v=4" width="100px;" alt=""/><br /><sub><b>Tony Phuong Nguyen</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=tonyfeung" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Tosch110"><img src="https://avatars2.githubusercontent.com/u/8368497?s=460&u=f82d3c518432276c191dc00f1524b7d8098bf828&v=4" width="100px;" alt=""/><br /><sub><b>Tobias Schwarz</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=Tosch110" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/scottburch"><img src="https://avatars3.githubusercontent.com/u/103808?s=460&v=4" width="100px;" alt=""/><br /><sub><b>
Scott Burch</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=scottburch" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/okwme"><img src="https://avatars0.githubusercontent.com/u/1866496?s=460&v=4" width="100px;" alt=""/><br /><sub><b>billy rennekamp</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=okwme" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/pgrimaud"><img src="https://avatars3.githubusercontent.com/u/5483234?v=4" width="100px;" alt=""/><br /><sub><b>Pierre Grimaud</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=pgrimaud" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/levackt"><img src="https://avatars3.githubusercontent.com/u/10286403?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Taariq Levack</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=levackt" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/atmoner"><img src="https://avatars.githubusercontent.com/u/1071490?v=4" width="100px;" alt=""/><br /><sub><b>ɐʇɯon3ɹ</b></sub></a><br /><a href="https://github.com/cosmostation/cosmosjs/commits?author=atmoner" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
