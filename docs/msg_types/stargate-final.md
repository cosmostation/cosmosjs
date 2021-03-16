# Stargate-final  

In this docs, these are supporting protobuf message types in Cosmos Hub.

### Supporting Message Types

- [cosmos.bank.v1beta1.MsgSend](#msgsend)
- [cosmos.staking.v1beta1.MsgDelegate](#msgdelegate)

###  MsgSend

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
		from_address: address,
		to_address: "cosmos1jf874x5vr6wkza6ahvamck4sy4w76aq4w9c4s5",
		amount: [{ denom: "umuon", amount: String(100000) }]	// 6 decimal places (1000000 uatom = 1 ATOM)
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
		amount: [{ denom: "umuon", amount: String(5000) }],
		gas_limit: 200000
	});

	const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

	// -------------------------------- sign --------------------------------
	const signedTxBytes = cosmos.sign(txBody, authInfo, data.account.account_number, privKey);
	
	cosmos.broadcast(signedTxBytes).then(response => console.log(response));
});
```

### MsgDelegate

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgDelegate = new message.cosmos.staking.v1beta1.MsgDelegate({
		delegator_address: address,
		validator_address: "cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3",
		amount: new message.cosmos.base.v1beta1.Coin({ denom: "umuon", amount: String(100000) })
	});

	const msgDelegateAny = new message.google.protobuf.Any({
		type_url: "/cosmos.staking.v1beta1.MsgDelegate",
		value: message.cosmos.staking.v1beta1.MsgDelegate.encode(msgDelegate).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgDelegateAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	// ...

	// -------------------------------- sign --------------------------------
	// ...
});
```

