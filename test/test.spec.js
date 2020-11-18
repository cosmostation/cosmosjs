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

describe("Iris hub", function() {
	const chainId = "irisnet";
	const iris = cosmosjs.network("https://api.irisnet.org", chainId);
	const irisPath = "m/44'/118'/0'/0/0";
	const irisPrefix = "iaa";
	describe("getAddress", function () {
		it("gets an iris address from mnemonic", function () {
			iris.setBech32MainPrefix(irisPrefix);
  			iris.setPath(irisPath);
			let address = iris.getAddress(mnemonic);
			assert.strictEqual(address, "iaa1fnk3lxlks7tdg6x55ynv6vggtnd73ycq9z85jw");
		});
	});

	describe("sign", function () {
		it("creates a deterministic signature", function () {
			let address = iris.getAddress(mnemonic);
			let ecpairPriv = iris.getECPairPriv(mnemonic);
	
			let stdSignMsg = iris.newStdMsg({
				msgs: [
					{
						type: "irishub/bank/Send",
						value: {
							inputs: [
								{
									address: address,
									coins: [
										{
											denom: "iris-atto",
											amount: String(1000000000000000000)		// 18 decimal places
										}
									]
								}
							],
							outputs: [
								{
									address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
									coins: [
										{
											denom: "iris-atto",
											amount: String(1000000000000000000)
										}
									]
								}
							]
						}
					}
				],
				chain_id: chainId,
				fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
				memo: "",
				account_number: String(5711),
				sequence: String(4)
			});

			const expectedMsgs = [
				{
					"type":"irishub/bank/Send",
					"value":{
						"inputs": [
							{
								"address":"iaa1fnk3lxlks7tdg6x55ynv6vggtnd73ycq9z85jw",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"1000000000000000000"
									}
								]
							}
						],
						"outputs": [ 
							{ 
								"address":"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"1000000000000000000"
									}
								]
							}
						]
					}
				}
			];
	
			let signedTx = iris.sign(stdSignMsg, ecpairPriv);
			assert.strictEqual(signedTx.tx.signatures[0].signature, "mKNrtORr69xifV/1eGAwymxBeoHW38eMvGptuZMUAjtzS3G4gD2PHx1/mL1cwkN6RpzIxexdkra9FUZ2I0yKKw==");
			assert.deepStrictEqual(stdSignMsg.json.msgs, expectedMsgs);
		});
	});

	describe("multisend sign", function () {
		it("creates a deterministic signature", function () {
			let address = iris.getAddress(mnemonic);
			let ecpairPriv = iris.getECPairPriv(mnemonic);
	
			let stdSignMsg = iris.newStdMsg({
				msgs: [
					{
						type: "irishub/bank/Send",
						value: {
							inputs: [
								{
									address: address,
									coins: [
										{
											denom: "iris-atto",
											amount: String(1000000000000000000)		// 18 decimal places
										}
									]
								}
							],
							outputs: [
								{
									address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
									coins: [
										{
											denom: "iris-atto",
											amount: String(250000000000000000)
										}
									]
								},
								{
									address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
									coins: [
										{
											denom: "iris-atto",
											amount: String(250000000000000000)
										}
									]
								},
								{
									address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
									coins: [
										{
											denom: "iris-atto",
											amount: String(250000000000000000)
										}
									]
								},
								{
									address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
									coins: [
										{
											denom: "iris-atto",
											amount: String(250000000000000000)
										}
									]
								}
							]
						}
					}
				],
				chain_id: chainId,
				fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
				memo: "",
				account_number: String(5711),
				sequence: String(4)
			});

			const expectedMsgs = [
				{
					"type":"irishub/bank/Send",
					"value":{
						"inputs": [
							{
								"address":"iaa1fnk3lxlks7tdg6x55ynv6vggtnd73ycq9z85jw",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"1000000000000000000"
									}
								]
							}
						],
						"outputs": [ 
							{ 
								"address":"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"250000000000000000"
									}
								]
							},
							{ 
								"address":"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"250000000000000000"
									}
								]
							},
							{ 
								"address":"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"250000000000000000"
									}
								]
							},
							{ 
								"address":"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
								"coins": [
									{
										"denom":"iris-atto",
										"amount":"250000000000000000"
									}
								]
							}
						]
					}
				}
			];
	
			let signedTx = iris.sign(stdSignMsg, ecpairPriv);
			assert.strictEqual(signedTx.tx.signatures[0].signature, "GcPbtSQ9JTX3rGLELsiqFzRalLq7CcvkAHgbhJJTtstN1zsTiZrjW2+SSexFLJhH6fYClnMFwqn5edMMm7+5fg==");
			assert.deepStrictEqual(stdSignMsg.json.msgs, expectedMsgs);
		});
	});
});

