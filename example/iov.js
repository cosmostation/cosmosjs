const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "iov-mainnet-ibc";
// Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
const starname = cosmosjs.network("YOUR REST SERVER URL", chainId);
starname.setBech32MainPrefix("star");
starname.setPath("m/44'/234'/0'/0/0");
const address = starname.getAddress(mnemonic);
const ecpairPriv = starname.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
// Above Cosmos SDK 40, use getAccounts([YOUR ADDRESS], true) and below Cosmos SDK 40, use getAccounts([YOUR ADDRESS]) or getAccounts([YOUR ADDRESS], false)
starname.getAccounts(address, true).then(data => {
	let stdSignMsg = starname.newStdMsg({
		msgs: [
			{
				type: "cosmos-sdk/MsgSend",
				value: {
					amount: [
						{
							amount: String(100000), 	// 6 decimal places (1000000 uiov = 1 IOV)
							denom: "uiov"
						}
					],
					from_address: address,
					to_address: "star177payt9uaymzda0mmx2kuq95dtatrepk795km9"
				}
			}
		],
		chain_id: chainId,
		fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
		memo: "",
		account_number: String(data.account.account_number),
		sequence: String(data.account.sequence)
	});

	const signedTx = starname.sign(stdSignMsg, ecpairPriv);
	starname.broadcast(signedTx).then(response => console.log(response));
})