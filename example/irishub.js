const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "irishub-1";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const iris = cosmosjs.network("https://api.irisnet.org", chainId);
iris.setBech32MainPrefix("iaa");
iris.setPath("m/44'/118'/0'/0/0");
const address = iris.getAddress(mnemonic);
const ecpairPriv = iris.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
iris.getAccounts(address).then(data => {
	let stdSignMsg = iris.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uiris = 1 IRIS)
							denom: "uiris"
						}
					],
					from_address: address,
					to_address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.account.account_number),
		sequence: String(data.account.sequence)
	});

	const signedTx = iris.sign(stdSignMsg, ecpairPriv);
	iris.broadcast(signedTx).then(response => console.log(response));
})