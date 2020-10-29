/*
    Developed / Developing by Cosmostation
    [WARNING] CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.
*/

'use strict'

global.fetch || (global.fetch = require('node-fetch').default);
const bip39 = require('bip39');
const bip32 = require('bip32');
const bech32 = require('bech32');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');
const bitcoinjs = require('bitcoinjs-lib');

let Cosmos = function(url, chainId) {
	this.url = url;
	this.chainId = chainId;
	this.path = "m/44'/118'/0'/0/0";
	this.bech32MainPrefix = "cosmos";

	if (!this.url) {
		throw new Error("url object was not set or invalid")
	}
	if (!this.chainId) {
		throw new Error("chainId object was not set or invalid")
	}
}

function network(url, chainId) {
	return new Cosmos(url, chainId);
}

function convertStringToBytes(str) {
	if (typeof str !== "string") {
	    throw new Error("str expects a string")
	}
	var myBuffer = [];
	var buffer = Buffer.from(str, 'utf8');
	for (var i = 0; i < buffer.length; i++) {
	    myBuffer.push(buffer[i]);
	}
	return myBuffer;
}

function getPubKeyBase64(ecpairPriv) {
	const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv);
	return Buffer.from(pubKeyByte, 'binary').toString('base64');
}

function sortObject(obj) {
	if (obj === null) return null;
	if (typeof obj !== "object") return obj;
	if (Array.isArray(obj)) return obj.map(sortObject);
	const sortedKeys = Object.keys(obj).sort();
	const result = {};
	sortedKeys.forEach(key => {
		result[key] = sortObject(obj[key])
	});
	return result;
}

Cosmos.prototype.setBech32MainPrefix = function(bech32MainPrefix) {
	this.bech32MainPrefix = bech32MainPrefix;

	if (!this.bech32MainPrefix) {
		throw new Error("bech32MainPrefix object was not set or invalid")
	}
}

Cosmos.prototype.setPath = function(path) {
	this.path = path;

	if (!this.path) {
		throw new Error("path object was not set or invalid")
	}
}

Cosmos.prototype.getAccounts = function(address) {
	let accountsApi = "";
	if (this.chainId.indexOf("irishub") != -1) {
		accountsApi = "/bank/accounts/";
	} else {
		accountsApi = "/auth/accounts/";
	}
	return fetch(this.url + accountsApi + address)
	.then(response => response.json())
}

Cosmos.prototype.getAddress = function(mnemonic, checkSum = true) {
	if (typeof mnemonic !== "string") {
	    throw new Error("mnemonic expects a string")
	}
	if (checkSum) {
		if (!bip39.validateMnemonic(mnemonic)) throw new Error("mnemonic phrases have invalid checksums");
	}
	const seed = bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(this.path);
	const words = bech32.toWords(child.identifier);
	return bech32.encode(this.bech32MainPrefix, words);
}

Cosmos.prototype.getECPairPriv = function(mnemonic) {
	if (typeof mnemonic !== "string") {
	    throw new Error("mnemonic expects a string")
	}
	const seed = bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(this.path);
	const ecpair = bitcoinjs.ECPair.fromPrivateKey(child.privateKey, {compressed : false})
	return ecpair.privateKey;
}

Cosmos.prototype.newStdMsg = function(input) {
	const stdSignMsg = new Object;
	stdSignMsg.json = input;

	// Exception
	if (input.msgs[0].type == "irishub/bank/Send") {
		stdSignMsg.jsonForSigningIrisTx =
		{
			msgs: [
				{
					inputs: [
						{
							address: input.msgs[0].value.inputs[0].address,
							coins: [
								{
									denom: input.msgs[0].value.inputs[0].coins[0].denom,
									amount: input.msgs[0].value.inputs[0].coins[0].amount
								}
							]
						}
					],
					outputs: [
						{
							address: input.msgs[0].value.outputs[0].address,
							coins: [
								{
									denom: input.msgs[0].value.outputs[0].coins[0].denom,
									amount: input.msgs[0].value.outputs[0].coins[0].amount
								}
							]
						}
					]
				}
			],
			chain_id: input.chain_id,
			fee: { amount: [ { amount: input.fee.amount[0].amount, denom: input.fee.amount[0].denom } ], gas: input.fee.gas },
			memo: input.memo,
			account_number: input.account_number,
			sequence: input.sequence
		}
	} else if (input.msgs[0].type == "irishub/stake/BeginUnbonding") {
		stdSignMsg.jsonForSigningIrisTx =
		{
			msgs: [
				{
					shares_amount: String(input.msgs[0].value.shares_amount),
					delegator_addr: input.msgs[0].value.delegator_addr,
					validator_addr: input.msgs[0].value.validator_addr
				}
			],
			chain_id: input.chain_id,
			fee: { amount: [ { amount: input.fee.amount[0].amount, denom: input.fee.amount[0].denom } ], gas: input.fee.gas },
			memo: input.memo,
			account_number: input.account_number,
			sequence: input.sequence
		}
	} else if (input.msgs[0].type == "irishub/stake/BeginRedelegate") {
		stdSignMsg.jsonForSigningIrisTx =
		{
			msgs: [
				{
					delegator_addr: input.msgs[0].value.delegator_addr,
					validator_src_addr: input.msgs[0].value.validator_src_addr,
					validator_dst_addr: input.msgs[0].value.validator_dst_addr,
					shares: String(input.msgs[0].value.shares_amount) + ".0000000000"		// IRIS Exception) For signing, shares is correct.
				}
			],
			chain_id: input.chain_id,
			fee: { amount: [ { amount: input.fee.amount[0].amount, denom: input.fee.amount[0].denom } ], gas: input.fee.gas },
			memo: input.memo,
			account_number: input.account_number,
			sequence: input.sequence
		}
	}

	stdSignMsg.bytes = convertStringToBytes(JSON.stringify(sortObject(stdSignMsg.json)));
	return stdSignMsg;
}

Cosmos.prototype.sign = function(stdSignMsg, ecpairPriv, modeType = "sync") {
	// The supported return types includes "block"(return after tx commit), "sync"(return after CheckTx) and "async"(return right away).
	let signMessage = new Object;
	if (stdSignMsg.json.msgs[0].type == "irishub/bank/Send" ||
		stdSignMsg.json.msgs[0].type == "irishub/stake/BeginUnbonding" ||
		stdSignMsg.json.msgs[0].type == "irishub/stake/BeginRedelegate") {
		signMessage = stdSignMsg.jsonForSigningIrisTx;
	} else {
		signMessage = stdSignMsg.json;
	}
	const hash = crypto.createHash('sha256').update(JSON.stringify(sortObject(signMessage))).digest('hex');
	const buf = Buffer.from(hash, 'hex');
	let signObj = secp256k1.sign(buf, ecpairPriv);
	var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString('base64');
	let signedTx = new Object;
	if (this.chainId.indexOf("irishub") != -1) {
		signedTx = {
		    "tx": {
		        "msg": stdSignMsg.json.msgs,
		        "fee": stdSignMsg.json.fee,
		        "signatures": [
		            {
		                "signature": signatureBase64,
		                "account_number": stdSignMsg.json.account_number,
                		"sequence": stdSignMsg.json.sequence,
		                "pub_key": {
		                    "type": "tendermint/PubKeySecp256k1",
		                    "value": getPubKeyBase64(ecpairPriv)
		                }
		            }
		        ],
		        "memo": stdSignMsg.json.memo
		    },
		    "mode": modeType
		}

		// The key of "shares" is using to sign for IRIS Redelegate.
		// After signing, you have to replace the "shares" key name to "shares_amount".
		// It is an exception to "irishub/stake/BeginRedelegate".
		if (stdSignMsg.json.msgs[0].type == "irishub/stake/BeginRedelegate") {
			var txBodyStr = JSON.stringify(signedTx);
			txBodyStr = txBodyStr.replace("\"shares", "\"shares_amount");
			signedTx = JSON.parse(txBodyStr);
		}
	} else {
		signedTx = {
		    "tx": {
		        "msg": stdSignMsg.json.msgs,
		        "fee": stdSignMsg.json.fee,
		        "signatures": [
		            {
		            	"account_number": stdSignMsg.json.account_number,
		            	"sequence": stdSignMsg.json.sequence,
		                "signature": signatureBase64,
		                "pub_key": {
		                    "type": "tendermint/PubKeySecp256k1",
		                    "value": getPubKeyBase64(ecpairPriv)
		                }
		            }
		        ],
		        "memo": stdSignMsg.json.memo
		    },
		    "mode": modeType
		}
	}

	return signedTx;
}

Cosmos.prototype.broadcast = function(signedTx) {
	let broadcastApi = "";
	if (this.chainId.indexOf("irishub") != -1) {
		broadcastApi = "/tx/broadcast";
	} else {
		broadcastApi = "/txs";
	}

	return fetch(this.url + broadcastApi, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(signedTx)
	})
	.then(response => response.json())
}

module.exports = {
	network: network
}
