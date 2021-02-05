import assert from "assert";
import crypto from "crypto";
import secp256k1 from "secp256k1";
import { Cosmos } from "../src/index.js";
import message from "../src/messages/proto";

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

describe("stargate-final", function() {
	const chainId = "stargate-final";
	const cosmos = new Cosmos("http://34.71.170.158:1317", chainId);
	describe("getAddress", function () {

		it("gets a cosmos address from mnemonic", function () {
			const address = cosmos.getAddress(mnemonic);
			assert.strictEqual(address, "cosmos1fnk3lxlks7tdg6x55ynv6vggtnd73ycqsq89sl");
		});
	});
	
	describe("sign", function () {
		it("creates a deterministic signature", function () {
			const address = cosmos.getAddress(mnemonic);
			const privKey = cosmos.getECPairPriv(mnemonic);
			const pubKeyAny = cosmos.getPubKeyAny(privKey);

			const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
				from_address: address,
				to_address: "cosmos1jf874x5vr6wkza6ahvamck4sy4w76aq4w9c4s5",
				amount: [{ denom: "umuon", amount: String(193285) }]		// 6 decimal places (1000000 uatom = 1 ATOM)
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
				sequence: 5
			});

			const feeValue = new message.cosmos.tx.v1beta1.Fee({
				amount: [{ denom: "umuon", amount: String(5000) }],
				gas_limit: 200000
			});

			const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

			// sign
			const bodyBytes = message.cosmos.tx.v1beta1.TxBody.encode(txBody).finish();
			const authInfoBytes = message.cosmos.tx.v1beta1.AuthInfo.encode(authInfo).finish();
			const signDoc = new message.cosmos.tx.v1beta1.SignDoc({
				body_bytes: bodyBytes,
				auth_info_bytes: authInfoBytes,
				chain_id: chainId,
				account_number: 45
			});

			let signMessage = message.cosmos.tx.v1beta1.SignDoc.encode(signDoc).finish();
			const hash = crypto.createHash("sha256").update(signMessage).digest();
			const sig = secp256k1.sign(hash, Buffer.from(privKey));
			var signatureBase64 = Buffer.from(sig.signature, 'binary').toString('base64');

			assert.strictEqual(signatureBase64, "td0aUcNqTVFrAhNh+SKX5xeTG/fceyX4EKZQqpcczbAwrphjmP8i34QSBv1e7P7jdqLvRWGfqrq2nhzJK27ScA==");
		});
	});
});


