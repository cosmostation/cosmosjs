const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "kava-testnet-2000";
const kava = cosmosjs.network("https://lcd-kava.cosmostation.io", chainId);
kava.setBech32MainPrefix("kava");
kava.setPath("m/44'/118'/0'/0/0");
const address = kava.getAddress(mnemonic);
const ecpairPriv = kava.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
kava.getAccounts(address).then(data => {
	let stdSignMsg = kava.NewStdMsg({
		type: "cosmos-sdk/MsgSend",
		from_address: address,
		to_address: "kava1qrlge6kqjz2763yp6ghws9ekv8u62dva9hs86p",
		amountDenom: "ukava",
		amount: 100000,		// 6 decimal places
		feeDenom: "ukava",
		fee: 5000,
		gas: 200000,
		memo: "",
		account_number: data.value.account_number,
		sequence: data.value.sequence
	});

	const signedTx = kava.sign(stdSignMsg, ecpairPriv);
	kava.broadcast(signedTx).then(response => console.log(response));
})