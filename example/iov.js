const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "iov-mainnet-2";
const iov = cosmosjs.network("https://lcd-iov.cosmostation.io", chainId);
iov.setBech32MainPrefix("star");
iov.setPath("m/44'/234'/0'/0/0");
const address = iov.getAddress(mnemonic);
const ecpairPriv = iov.getECPairPriv(mnemonic);

// Generate MsgSend transaction and broadcast 
iov.getAccounts(address).then(data => {
	let stdSignMsg = iov.newStdMsg({
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
		account_number: String(data.result.value.account_number),
		sequence: String(data.result.value.sequence)
	});

	const signedTx = iov.sign(stdSignMsg, ecpairPriv);
	iov.broadcast(signedTx).then(response => console.log(response));
})