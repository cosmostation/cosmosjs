// CosmosJS
// Developed / Developing by Cosmostation.
// [WARNING] CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.

'use strict'

const bip39 = require('bip39');
const bip32 = require('bip32');
const bech32 = require('bech32');
const secp256k1 = require('secp256k1');
const crypto = require('crypto');
const bitcoinjs = require('bitcoinjs-lib');

const PATH = "m/44'/118'/0'/0/0";

let Cosmos = function (chainId) {
	this.chainId = chainId;

	if (!this.chainId) {
		throw new Error("chainId object was not set or invalid")
	}
}

function network(chainId) {
	return new Cosmos(chainId);
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

Cosmos.prototype.createStdSignMsg = function(msgType, accountNumber, sequence, fromAddress, toAddress, amountDenom, amount, feeDenom, fee, gas, memo, title = "", description = "", proposalId = 1, option = "") {
	const stdSignMsg = new Object;

	if (msgType == "cosmos-sdk/MsgSend") {
		stdSignMsg.json = 
		{ 
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [ 
				{ 
					type: msgType, 
					value: {
						amount: [
							{
								amount: String(amount), 
								denom: amountDenom 
							}
						], 
						from_address: fromAddress, 
						to_address: toAddress 
					} 
				} 
			],
			sequence: String(sequence) 
		}
	} else if (msgType == "cosmos-sdk/MsgDelegate") {
		stdSignMsg.json = 
		{
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [
				{ 
					type: msgType, 
					value: {
						delegator_address: fromAddress,
						validator_address: toAddress,
						amount: {
							amount: String(amount),
							denom: amountDenom
						}
					}
				}
			],
			sequence: String(sequence) 
		}
	} else if (msgType == "cosmos-sdk/MsgUndelegate") {
		stdSignMsg.json = 
		{
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [
				{ 
					type: msgType, 
					value: {
						delegator_address: fromAddress,
						validator_address: toAddress,
						amount: {
							amount: String(amount),
							denom: amountDenom
						}
					}
				}
			],
			sequence: String(sequence) 
		}
	} else if (msgType == "cosmos-sdk/MsgWithdrawDelegationReward") {
		stdSignMsg.json = 
		{
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [
				{ 
					type: msgType, 
					value: {
						delegator_address: toAddress,
						validator_address: fromAddress
					}
				}
			],
			sequence: String(sequence) 
		}
	} else if (msgType == "cosmos-sdk/MsgSubmitProposal") {
		if (title == "") {
			throw new Error("Does not exist: " + title)
		}

		if (description == "") {
			throw new Error("Does not exist: " + description)
		}

		stdSignMsg.json = 
		{
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [
				{ 
					type: msgType,
					value: {
						description: description,
						initial_deposit: [
	                        {
	                        	amount: String(amount),
	                            denom: amountDenom
	                        }
	                    ],
	                    proposal_type: "Text",
	                    proposer: fromAddress,
						title: title
					}
				}
			],
			sequence: String(sequence) 
		}
	} else if (msgType == "cosmos-sdk/MsgDeposit") {
		stdSignMsg.json = 
		{
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [
				{ 
					type: msgType,
					value: {
						amount: [
	                        {
	                        	amount: String(amount),
	                            denom: amountDenom
	                        }
	                    ],
	                    depositor: fromAddress,
						proposal_id: String(proposalId)
					}
				}
			],
			sequence: String(sequence) 
		}
	} else if (msgType == "cosmos-sdk/MsgVote") {
		stdSignMsg.json = 
		{
		  	account_number: String(accountNumber),
			chain_id: this.chainId,
			fee: { 
				amount: [ 
					{ 
						amount: String(fee), 
						denom: feeDenom 
					} 
				], 
				gas: String(gas) 
			},
			memo: memo,
			msgs: [
				{ 
					type: msgType,
					value: {
						option: option, // NoWithVeto
						proposal_id: String(proposalId),
	                    voter: fromAddress
					}
				}
			],
			sequence: String(sequence) 
		}
	} else {
		throw new Error("No such msgType: " + msgType)
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

module.exports = {
	network: network
}