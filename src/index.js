/*
    Developed / Developing by Cosmostation

    [WARNING] CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.
*/

'use strict'

const fetch = require("node-fetch");
const bip39 = require('bip39');
const bip32 = require('bip32');
const bech32 = require('bech32');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');
const bitcoinjs = require('bitcoinjs-lib');

const PATH = "m/44'/118'/0'/0/0";

let Cosmos = function (url, chainId) {
	this.url = url;
	this.chainId = chainId;

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
	var buffer = new Buffer(str, 'utf8');
	for (var i = 0; i < buffer.length; i++) {
	    myBuffer.push(buffer[i]);
	}
	return myBuffer;
}

function getPubKeyBase64(ecpairPriv) {
	const pubKeyByte = secp256k1.publicKeyCreate(ecpairPriv);
	return Buffer.from(pubKeyByte, 'binary').toString('base64');
}

Cosmos.prototype.getAccounts = function(address) {
	return fetch(this.url + "/auth/accounts/" + address)
	.then(response => response.json())
}

Cosmos.prototype.getAddress = function(mnemonic) {
	if (typeof mnemonic !== "string") {
	    throw new Error("mnemonic expects a string")
	}
	const seed = bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(PATH);
	const words = bech32.toWords(child.identifier);
	return bech32.encode('cosmos', words);
}

Cosmos.prototype.getECPairPriv = function(mnemonic) {
	if (typeof mnemonic !== "string") {
	    throw new Error("mnemonic expects a string")
	}
	const seed = bip39.mnemonicToSeed(mnemonic);
	const node = bip32.fromSeed(seed);
	const child = node.derivePath(PATH);
	const ecpair = bitcoinjs.ECPair.fromPrivateKey(child.privateKey, {compressed : false})
	return ecpair.privateKey;
}

Cosmos.prototype.NewStdMsg = function(input) {
	const stdSignMsg = new Object;

	if (input.type == "cosmos-sdk/MsgSend") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: [
							{
								amount: String(input.amount),
								denom: input.amountDenom
							}
						],
						from_address: input.from_address,
						to_address: input.to_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgDelegate") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_address: input.delegator_address,
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgUndelegate") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(input.fee), 
						denom: input.feeDenom 
					} 
				], 
				gas: String(input.gas) 
			},
			memo: input.memo,
			msgs: [
				{ 
					type: input.type, 
					value: {
						amount: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_address: input.delegator_address,
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence) 
		}
	} else if (input.type == "cosmos-sdk/MsgWithdrawDelegationReward") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(input.fee), 
						denom: input.feeDenom 
					} 
				], 
				gas: String(input.gas) 
			},
			memo: input.memo,
			msgs: [
				{ 
					type: input.type, 
					value: {
						delegator_address: input.delegator_address,
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence) 
		}
	} else if (input.type == "cosmos-sdk/MsgSubmitProposal") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(input.fee), 
						denom: input.feeDenom 
					} 
				], 
				gas: String(input.gas) 
			},
			memo: input.memo,
			msgs: [
				{ 
					type: input.type,
					value: {
						description: input.description,
						initial_deposit: [
	                        {
	                        	amount: String(input.initialDepositAmount),
	                            denom: input.initialDepositDenom
	                        }
	                    ],
	                    proposal_type: input.proposal_type,
	                    proposer: input.proposer,
						title: input.title
					}
				}
			],
			sequence: String(input.sequence) 
		}
	} else if (input.type == "cosmos-sdk/MsgDeposit") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(input.fee), 
						denom: input.feeDenom 
					} 
				], 
				gas: String(input.gas) 
			},
			memo: input.memo,
			msgs: [
				{ 
					type: input.type,
					value: {
						amount: [
	                        {
	                        	amount: String(input.amount),
	                            denom: input.amountDenom
	                        }
	                    ],
	                    depositor: input.depositor,
						proposal_id: String(input.proposal_id)
					}
				}
			],
			sequence: String(input.sequence) 
		}
	} else if (input.type == "cosmos-sdk/MsgVote") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(input.fee), 
						denom: input.feeDenom 
					} 
				], 
				gas: String(input.gas) 
			},
			memo: input.memo,
			msgs: [
				{ 
					type: input.type,
					value: {
						option: input.option,
						proposal_id: String(input.proposal_id),
	                    voter: input.voter
					}
				}
			],
			sequence: String(input.sequence) 
		}
	} else if (input.type == "cosmos-sdk/MsgBeginRedelegate") {
		stdSignMsg.json = 
		{
		  	account_number: String(input.account_number),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(input.fee), 
						denom: input.feeDenom 
					} 
				], 
				gas: String(input.gas) 
			},
			memo: input.memo,
			msgs: [
				{ 
					type: input.type,
					value: {
						amount: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_address: input.delegator_address,
						validator_dst_address: input.validator_dst_address,
						validator_src_address: input.validator_src_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else {
		throw new Error("No such input.type: " + input.type)
	}

	stdSignMsg.bytes = convertStringToBytes(JSON.stringify(stdSignMsg.json));

	return stdSignMsg;
}

Cosmos.prototype.sign = function(stdSignMsg, ecpairPriv, modeType = "sync") {
	// The supported return types includes "block"(return after tx commit), "sync"(return afer CheckTx) and "async"(return right away).
	const hash = crypto.createHash('sha256').update(JSON.stringify(stdSignMsg.json)).digest('hex');
	const buf = Buffer.from(hash, 'hex');
	let signObj = secp256k1.sign(buf, ecpairPriv);
	var signatureBase64 = Buffer.from(signObj.signature, 'binary').toString('base64');
	const signedTx = {
	    "tx": {
	        "msg": stdSignMsg.json.msgs,
	        "fee": stdSignMsg.json.fee,
	        "signatures": [
	            {
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
	return fetch(this.url + "/txs", {
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