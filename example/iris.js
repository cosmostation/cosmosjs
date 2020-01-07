const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "irishub";
const iris = cosmosjs.network("https://lcd-iris.cosmostation.io", chainId);
iris.setBech32MainPrefix("iaa");
iris.setPath("m/44'/118'/0'/0/0");
const address = iris.getAddress(mnemonic);
const ecpairPriv = iris.getECPairPriv(mnemonic);

// Generate irishub/bank/Send transaction and broadcast 
iris.getAccounts(address).then(data => {
	let stdSignMsg = iris.newStdMsg({
		type: "irishub/bank/Send",
		inputsAddress:address,
		inputsCoinsDenom:"iris-atto",
		inputsCoinsAmount: 1000000000000000000,		// 18 decimal places
		outputsAddress:"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
		outputsCoinsDenom:"iris-atto",
		outputsCoinsAmount: 1000000000000000000,
		feeDenom: "iris-atto",
		fee: 400000000000000000,
		gas: 50000,
		memo: "",
		account_number: data.value.account_number,
		sequence: data.value.sequence
	});

	const signedTx = iris.sign(stdSignMsg, ecpairPriv);
	iris.broadcast(signedTx).then(response => console.log(response));
})