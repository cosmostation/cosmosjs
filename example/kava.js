const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "kava-4";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const kava = cosmosjs.network("YOUR REST SERVER URL", chainId);
kava.setBech32MainPrefix("kava");
kava.setPath("m/44'/459'/0'/0/0"); 		// new: m/44'/459'/0'/0/0, legacy: m/44'/118'/0'/0/0
const address = kava.getAddress(mnemonic);
const ecpairPriv = kava.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
kava.getAccounts(address).then(data => {
	let stdSignMsg = kava.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 ukava = 1 KAVA)
							denom: "ukava"
						}
					],
					from_address: address,
					to_address: "kava1qrlge6kqjz2763yp6ghws9ekv8u62dva9hs86p"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "ukava" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	const signedTx = kava.sign(stdSignMsg, ecpairPriv);
	kava.broadcast(signedTx).then(response => console.log(response));
})