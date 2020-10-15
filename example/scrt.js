const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "secret-2";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const scrt = cosmosjs.network("https://api-node.chainofsecrets.org", chainId);
scrt.setBech32MainPrefix("secret");
scrt.setPath("m/44'/118'/0'/0/0");
const address = scrt.getAddress(mnemonic);
const ecpairPriv = scrt.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast
scrt.getAccounts(address).then(data => {
	let stdSignMsg = scrt.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uscrt = 1 SCRT)
							denom: "uscrt"
						}
					],
					from_address: address,
					to_address: "secret1quxn7c79z5vd85wzzpt4cxh0xcqyrl7fphcgx3"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uscrt" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	const signedTx = scrt.sign(stdSignMsg, ecpairPriv);
	scrt.broadcast(signedTx).then(response => console.log(response));
})