const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "irishub";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const iris = cosmosjs.network("YOUR REST SERVER URL", chainId);
iris.setBech32MainPrefix("iaa");
iris.setPath("m/44'/118'/0'/0/0");
const address = iris.getAddress(mnemonic);
const ecpairPriv = iris.getECPairPriv(mnemonic);

// Generate irishub/bank/Send transaction and broadcast 
iris.getAccounts(address).then(data => {
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
		account_number: String(data.value.account_number),
		sequence: String(data.value.sequence)
	});

	const signedTx = iris.sign(stdSignMsg, ecpairPriv);
	iris.broadcast(signedTx).then(response => console.log(response));
})