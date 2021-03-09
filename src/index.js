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

	console.log("WARN deprecated @cosmostation/cosmosjs@0.9.x: You needs to upgrade to @cosmostation/cosmosjs above 0.10.0+ : 1) Proper nodejs v14+ support 2) 0.10.0+ supports protobuf signing for cosmos-sdk 0.40.0+");
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
	if (this.chainId.indexOf("cosmos") != -1) {
		accountsApi = "/cosmos/auth/v1beta1/accounts/";
	} else if (this.chainId.indexOf("stargate-final") != -1) {
		accountsApi = "/cosmos/auth/v1beta1/accounts/";
	} else if (this.chainId.indexOf("bifrost") != -1) {
		accountsApi = "/cosmos/auth/v1beta1/accounts/";
	} else if (this.chainId.indexOf("irishub") != -1) {
		accountsApi = "/cosmos/auth/v1beta1/accounts/";
	} else if (this.chainId.indexOf("akash") != -1) {
		accountsApi = "/cosmos/auth/v1beta1/accounts/";
	} else if (this.chainId.indexOf("edgenet") != -1) {
		accountsApi = "/cosmos/auth/v1beta1/accounts/";
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
	stdSignMsg.bytes = convertStringToBytes(JSON.stringify(sortObject(stdSignMsg.json)));
	return stdSignMsg;
}

Cosmos.prototype.sign = function(stdSignMsg, ecpairPriv, modeType = "sync") {
	// The supported return types includes "block"(return after tx commit), "sync"(return after CheckTx) and "async"(return right away).
	let signMessage = new Object;
	signMessage = stdSignMsg.json;
	const json = JSON.stringify(sortObject(signMessage))
		.replace(/&/g, '\\u0026')
		.replace(/</g, '\\u003c')
		.replace(/>/g, '\\u003e')

	const hash = crypto.createHash('sha256').update(json).digest('hex');
	const buf = Buffer.from(hash, 'hex');
	let signObj = secp256k1.sign(buf, ecpairPriv);
	var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString('base64');
	let signedTx = new Object;
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

	return signedTx;
}

Cosmos.prototype.broadcast = function(signedTx) {
	let broadcastApi = "/txs";

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
