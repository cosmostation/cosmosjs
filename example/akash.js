const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "akashnet-1";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const akash = cosmosjs.network("YOUR REST SERVER URL", chainId);
akash.setBech32MainPrefix("akash");
akash.setPath("m/44'/118'/0'/0/0");
const address = akash.getAddress(mnemonic);
const ecpairPriv = akash.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast
akash.getAccounts(address).then(data => {
	let stdSignMsg = akash.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uakt = 1 AKT)
							denom: "uakt"
						}
					],
					from_address: address,
					to_address: "akash1fnk3lxlks7tdg6x55ynv6vggtnd73ycqam2zf9"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uakt" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.account.account_number), 	// If the address is a vesting account, use account_number of base_vesting_account
		sequence: String(data.account.sequence)					// If the address is a vesting account, use sequence of base_vesting_account
	});

	const signedTx = akash.sign(stdSignMsg, ecpairPriv);
	akash.broadcast(signedTx).then(response => console.log(response));
})