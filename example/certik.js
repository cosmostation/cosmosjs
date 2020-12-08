const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "shentu-1";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const certik = cosmosjs.network("https://certik.stakesystems.io", chainId);
certik.setBech32MainPrefix("certik");
certik.setPath("m/44'/118'/0'/0/0");
const address = certik.getAddress(mnemonic);
const ecpairPriv = certik.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast
certik.getAccounts(address).then(data => {
	let stdSignMsg = certik.newStdMsg({
		msgs: [
			{
				type: "bank/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uctk = 1 CTK)
							denom: "uctk"
						}
					],
					from_address: address,
					to_address: "certik1zymhgddfc6hwwk6hw6hcsc88v9cnkl969xxch5"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	const signedTx = certik.sign(stdSignMsg, ecpairPriv);
	certik.broadcast(signedTx).then(response => console.log(response));
})