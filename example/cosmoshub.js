import { Cosmos } from "../src/index.js";
import message from "../src/messages/proto";

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "cosmoshub-4";
// This rest server URL may be disabled at any time. In order to maintain stable blockchain service, it is recommended to prepare your rest server.
// (https://hub.cosmos.network/main/gaia-tutorials/join-mainnet.html#enable-the-rest-api)
const cosmos = new Cosmos("https://api.cosmos.network", chainId);
cosmos.setBech32MainPrefix("juno");
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const privKey = cosmos.getECPairPriv(mnemonic);
const pubKeyAny = cosmos.getPubKeyAny(privKey);

cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// ---------------------------------- (1)txBody ----------------------------------
	const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
		from_address: address,
		to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
		amount: [{ denom: "uatom", amount: String(100000) }]		// 6 decimal places (1000000 uatom = 1 ATOM)
	});

	const msgSendAny = new message.google.protobuf.Any({
		type_url: "/cosmos.bank.v1beta1.MsgSend",
		value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSendAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
		public_key: pubKeyAny,
		mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
		sequence: data.account.sequence
	});

	const feeValue = new message.cosmos.tx.v1beta1.Fee({
		amount: [{ denom: "uatom", amount: String(5000) }],
		gas_limit: 200000
	});

	const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

	// -------------------------------- sign --------------------------------
	const signedTxBytes = cosmos.sign(txBody, authInfo, data.account.account_number, privKey);
	cosmos.broadcast(signedTxBytes).then(response => console.log(response));
});
