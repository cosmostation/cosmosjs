const assert = require('assert');
const cosmosjs = require("../src");

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

describe("Cosmoshub", function() {
	const chainId = "cosmoshub-3";
	const cosmos = cosmosjs.network("https://lcd-cosmos-free.cosmostation.io", chainId);
	describe("getAddress", function () {

		it("gets a cosmos address from mnemonic", function () {
			let address = cosmos.getAddress(mnemonic);
			assert.strictEqual(address, "cosmos1fnk3lxlks7tdg6x55ynv6vggtnd73ycqsq89sl");
		});
	});
	
	describe("sign", function () {
		it("creates a deterministic signature", function () {
			let address = cosmos.getAddress(mnemonic);
			let ecpairPriv = cosmos.getECPairPriv(mnemonic);
	
			let stdSignMsg = cosmos.newStdMsg({
				msgs: [
					{
						type: "cosmos-sdk/MsgSend",
						value: {
							amount: [
								{
									amount: String(100000), 	// 6 decimal places (1000000 uatom = 1 ATOM)
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
				account_number: String(5711),
				sequence: String(4)
			});
	
			let signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
	
			assert.strictEqual(signedTx.tx.signatures[0].signature, "Jw83ZJae9zHNXzlsqzOCPvbxp4gDAtfd7GPsCocy3Okb7LDlm3HQfX46Nzyte/H7qtpKsAB7ucLKMNp0HfVINA==");
		});
	});
});

