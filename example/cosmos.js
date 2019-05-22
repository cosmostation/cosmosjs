const cosmosjs = require("../src");

const chainId = "cosmoshub-2";
/** [WARNING] Do not use this mnemonic phrases. Creating a wallet using this mnemonic phrases will make your wallet subject to attacks. **/
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const cosmos = cosmosjs.network("https://lcd-do-not-abuse.cosmostation.io", chainId);
const address = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);

cosmos.getAccounts(address).then(data => {
	let stdSignMsg = cosmos.NewStdMsg({
		type: "cosmos-sdk/MsgSend",
		from_address: address,
		to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
		amountDenom: "uatom",
		amount: 100000,
		feeDenom: "uatom",
		fee: 5000,
		gas: 200000,
		memo: "",
		account_number: data.value.account_number,
		sequence: data.value.sequence
	});

	const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
	cosmos.broadcast(signedTx).then(response => console.log(response));
})