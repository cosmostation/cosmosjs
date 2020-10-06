const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "cosmoshub-3";
// This rest server URL may be disabled at any time. In order to maintain stable blockchain service, it is recommended to prepare your rest server.
// (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const cosmos = cosmosjs.network("https://lcd-cosmos-free.cosmostation.io", chainId);
cosmos.setBech32MainPrefix("cosmos");
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
cosmos.getAccounts(address).then(data => {
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
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
	cosmos.broadcast(signedTx).then(response => console.log(response));
})