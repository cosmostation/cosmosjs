const assert = require('assert');
const fetch = require("node-fetch");
const cosmosjs = require("../src");

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "cosmoshub-3";
const cosmos = cosmosjs.network("https://lcd-cosmos-free.cosmostation.io", chainId);
let address;
let ecpairPriv;

describe("getAddress", function () {
	before(function() {
		address = cosmos.getAddress(mnemonic);
	});

	it("address is 'cosmos1fnk3lxlks7tdg6x55ynv6vggtnd73ycqsq89sl'", function () {
		assert.equal(address, "cosmos1fnk3lxlks7tdg6x55ynv6vggtnd73ycqsq89sl");
	});
});

describe("sign", function () {
	let signedTx;

	before(function() {
		ecpairPriv = cosmos.getECPairPriv(mnemonic);

		let stdSignMsg = cosmos.NewStdMsg({
			type: "cosmos-sdk/MsgSend",
			from_address: address,
			to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
			amountDenom: "uatom",
			amount: 100000,		// 6 decimal places (1000000 uatom = 1 ATOM)
			feeDenom: "uatom",
			fee: 5000,
			gas: 200000,
			memo: "",
			account_number: 5711,
			sequence: 4
		});

		signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
	});

	it("signature is 'Jw83ZJae9zHNXzlsqzOCPvbxp4gDAtfd7GPsCocy3Okb7LDlm3HQfX46Nzyte/H7qtpKsAB7ucLKMNp0HfVINA=='", function () {
		assert.equal(signedTx.tx.signatures[0].signature, "Jw83ZJae9zHNXzlsqzOCPvbxp4gDAtfd7GPsCocy3Okb7LDlm3HQfX46Nzyte/H7qtpKsAB7ucLKMNp0HfVINA==");
	});
});