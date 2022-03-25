import { Cosmos } from "../src/index.js";
import message from "../src/messages/proto";

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";
const chainId = "juno-1";
// In order to maintain stable blockchain service, it is recommended to create your rest server.
// (https://docs.cosmos.network/master/core/grpc_rest.html#rest-server)
const cosmos = new Cosmos("http://YOUR_REST_SERVER_URL:1317", chainId);
cosmos.setBech32MainPrefix("juno");
cosmos.setPath("m/44'/118'/0'/0/0");
const address = cosmos.getAddress(mnemonic);
const privKey = cosmos.getECPairPriv(mnemonic);
const pubKeyAny = cosmos.getPubKeyAny(privKey);

cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// ---------------------------------- (1)txBody ----------------------------------
	let cw20Contract = "juno168ctmpyppk90d34p3jjy658zf5a5l3w8wk35wht6ccqj4mr0yv8s4j5awr";
	let transferBytes = new Buffer('{"transfer":{"amount":"1","recipient":"juno1cx4nq77x3unvl2xsa9fmm9drxkexzkjnzwt2y7"}}');
	const msgExecuteContract = new message.cosmwasm.wasm.v1.MsgExecuteContract({
		sender: address,
		contract: cw20Contract,
		msg: transferBytes,
		funds: []
	});

	const msgExecuteContractAny = new message.google.protobuf.Any({
		type_url: "/cosmwasm.wasm.v1.MsgExecuteContract",
		value: message.cosmwasm.wasm.v1.MsgExecuteContract.encode(msgExecuteContract).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgExecuteContractAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
		public_key: pubKeyAny,
		mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
		sequence: data.account.sequence
	});

	const feeValue = new message.cosmos.tx.v1beta1.Fee({
		amount: [{ denom: "ujuno", amount: String(5000) }],
		gas_limit: 200000
	});

	const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

	// -------------------------------- sign --------------------------------
	const signedTxBytes = cosmos.sign(txBody, authInfo, data.account.account_number, privKey);
	cosmos.broadcast(signedTxBytes).then(response => console.log(response));
});
























