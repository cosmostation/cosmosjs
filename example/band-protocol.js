const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "band-guanyu-mainnet";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const band = cosmosjs.network("YOUR REST SERVER URL", chainId);
band.setBech32MainPrefix("band");
band.setPath("m/44'/494'/0'/0/0"); 		// new: m/44'/494'/0'/0/0, legacy: m/44'/118'/0'/0/0
const address = band.getAddress(mnemonic);
const ecpairPriv = band.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
band.getAccounts(address).then(data => {
	let stdSignMsg = band.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uband = 1 BAND)
							denom: "uband"
						}
					],
					from_address: address,
					to_address: "band1z67fshyr48pa9a6htdz4qd0zullfk6y0s8vy5k"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uband" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	const signedTx = band.sign(stdSignMsg, ecpairPriv);
	band.broadcast(signedTx).then(response => console.log(response));
})