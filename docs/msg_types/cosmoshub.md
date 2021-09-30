# Cosmos  

In this docs, these are supporting protobuf message types in Cosmoshub.

### Supporting Message Types

- [cosmos.bank.v1beta1.MsgSend](#msgsend)
- [cosmos.staking.v1beta1.MsgDelegate](#msgdelegate)
- [cosmos.staking.v1beta1.MsgUndelegate](#MsgUndelegate)
- [cosmos.staking.v1beta1.MsgBeginRedelegate](#MsgBeginRedelegate)
- [cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward](#MsgWithdrawDelegatorReward)
- [cosmos.distribution.v1beta1.MsgSetWithdrawAddress](#MsgSetWithdrawAddress)

### MsgSend

```js
// cosmos.bank.v1beta1.MsgSend
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
```

### MsgDelegate

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgDelegate = new message.cosmos.staking.v1beta1.MsgDelegate({
		delegator_address: address,
		validator_address: "cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3",
		amount: new message.cosmos.base.v1beta1.Coin({ denom: "uatom", amount: String(100000) })
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

### MsgUndelegate

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgUndelegate = new message.cosmos.staking.v1beta1.MsgUndelegate({
		delegator_address: address,
		validator_address: "cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3"
	});

	const msgUndelegateAny = new message.google.protobuf.Any({
		type_url: "/cosmos.staking.v1beta1.MsgUndelegate",
		value: message.cosmos.staking.v1beta1.MsgUndelegate.encode(msgUndelegate).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgUndelegateAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	// ...

	// -------------------------------- sign --------------------------------
	// ...
});
```

### MsgBeginRedelegate

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgBeginRedelegate = new message.cosmos.staking.v1beta1.MsgBeginRedelegate({
		delegator_address: address,
		validator_src_address: "cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3",
		validator_dst_address: "cosmosvaloper1grgelyng2v6v3t8z87wu3sxgt9m5s03xfytvz7",
		amount: new message.cosmos.base.v1beta1.Coin({ denom: "uatom", amount: String(100000) })
	});

	const msgBeginRedelegateAny = new message.google.protobuf.Any({
		type_url: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
		value: message.cosmos.staking.v1beta1.MsgBeginRedelegate.encode(msgBeginRedelegate).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgBeginRedelegateAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	// ...

	// -------------------------------- sign --------------------------------
	// ...
});
```

### MsgWithdrawDelegatorReward

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgWithdrawDelegatorReward = new message.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward({
		delegator_address: address,
		validator_address: "cosmosvaloper1tflk30mq5vgqjdly92kkhhq3raev2hnz6eete3"
	});

	const msgWithdrawDelegatorRewardAny = new message.google.protobuf.Any({
		type_url: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
		value: message.cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.encode(msgWithdrawDelegatorReward).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgWithdrawDelegatorRewardAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	// ...

	// -------------------------------- sign --------------------------------
	// ...
});
```

### MsgSetWithdrawAddress

```js
cosmos.getAccounts(address).then(data => {
	// signDoc = (1)txBody + (2)authInfo
	// --------------------------------- (1)txBody ---------------------------------
	const msgSetWithdrawAddress = new message.cosmos.distribution.v1beta1.MsgSetWithdrawAddress({
		delegator_address: address,
		withdraw_address: "rizon1vh3pnah460uf7y5xv46d7stkh7trxdw0c7kmq7"
	});

	const msgSetWithdrawAddressAny = new message.google.protobuf.Any({
		type_url: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
		value: message.cosmos.distribution.v1beta1.MsgSetWithdrawAddress.encode(msgSetWithdrawAddress).finish()
	});

	const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: [msgSetWithdrawAddressAny], memo: "" });

	// --------------------------------- (2)authInfo ---------------------------------
	// ...

	// -------------------------------- sign --------------------------------
	// ...
});
```