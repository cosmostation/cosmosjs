<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center">
  <a href="https://www.cosmostation.io" target="_blank" rel="noopener noreferrer"><img width="100" src="https://user-images.githubusercontent.com/20435620/55696624-d7df2e00-59f8-11e9-9126-edf9a40b11a8.png" alt="Cosmostation logo"></a>
</p>
<h1 align="center">
    CosmosJS - Cosmos JavaScript Library 
</h1>

*:star: Developed / Developing by [Cosmostation](https://www.cosmostation.io/)*

A JavasSript Open Source Library for [Cosmos Network](https://cosmos.network/), [IRISnet](https://www.irisnet.org/), [Kava](https://www.kava.io/), [Band Protocol](https://bandprotocol.com/), [Starname](https://iov.one/), and [Secret Network](https://scrt.network/)

This library supports cosmos address generation and verification. It enables you to create an offline signature functions of different types of transaction messages. It will eventually support all the other blockchains that are based on Tendermint in the future.

[![MIT](https://img.shields.io/apm/l/vim-mode.svg)](https://github.com/cosmostation/cosmosjs/blob/master/LICENSE)
[![NPM](https://badge.fury.io/js/%40cosmostation%2Fcosmosjs.svg)](https://www.npmjs.com/package/@cosmostation/cosmosjs)
[![](https://data.jsdelivr.com/v1/package/npm/@cosmostation/cosmosjs/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@cosmostation/cosmosjs?path=dist)

## Installation

In order to fully use this library, you need to run a local or remote full node and set up its rest server, which acts as an intermediary between the front-end and the full-node

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

#### ES6 module
```js
import cosmosjs from "@cosmostation/cosmosjs";
```

#### CDN

- You can find cosmosjs jsDelivr and use the global cosmosjs variable.
- You can see example file at [/example/browser-example.html](https://github.com/cosmostation/cosmosjs/tree/master/example/browser-example.html)

```js
<script src="https://cdn.jsdelivr.net/npm/@cosmostation/cosmosjs@0.6.8/dist/cosmos.min.js"></script>
```

## Usage
- Cosmos: Generate Cosmos address from mnemonic 
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "cosmoshub-3";
const cosmos = cosmosjs.network(lcdUrl, chainId);

const mnemonic = "..."
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
```
- Iris
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "irishub";
const iris = cosmosjs.network(lcdUrl, chainId);
iris.setBech32MainPrefix("iaa");
```
- Kava
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "kava-4";
const kava = cosmosjs.network(lcdUrl, chainId);
kava.setBech32MainPrefix("kava");
```
- Band
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "band-guanyu-mainnet";
const band = cosmosjs.network(lcdUrl, chainId);
band.setBech32MainPrefix("band");
```
- Starname
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "iov-mainnet-2";
const iov = cosmosjs.network(lcdUrl, chainId);
iov.setBech32MainPrefix("star");
```
- Secret Network
```js
const cosmosjs = require("@cosmostation/cosmosjs");

const chainId = "secret-2";
const scrt = cosmosjs.network(lcdUrl, chainId);
scrt.setBech32MainPrefix("secret");
```

Generate ECPairPriv value that is needed for signing signatures
```js
const ecpairPriv = cosmos.getECPairPriv(mnemonic);
```

Transfer ATOM to designated address. 
* Make sure to input proper type, account number, and sequence of the cosmos account to generate StdSignMsg. You can get those account information on blockchain 
* Above 0.5.0 version, CosmosJS follows the exact same json format as Cosmos SDK defines.
```js
cosmos.getAccounts(address).then(data => {
	let stdSignMsg = cosmos.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000),
							denom: "uatom"
						}
					],
					from_address: address,
					to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	...
})
```

Sign transaction by using stdSignMsg and broadcast by using [/txs](https://lcd-cosmos-free.cosmostation.io/txs) REST API
```js
const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
cosmos.broadcast(signedTx).then(response => console.log(response));
```

Cosmostation offers LCD url([https://lcd-cosmos-free.cosmostation.io](https://lcd-cosmos-free.cosmostation.io/node_info)).
- This rest server URL may be disabled at any time. In order to maintain stable blockchain service, it is recommended to prepare your rest server.
- Setting up the rest server: (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
- API Rate Limiting: 2 requests per second

## Supporting Message Types (Updating...)
- If you need more message types, you can see [/docs/msg_types](https://github.com/cosmostation/cosmosjs/tree/master/docs/msg_types)

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
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
