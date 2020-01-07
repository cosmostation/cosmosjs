## Supporting Message Types (Updating...)

- cosmos-sdk/MsgSend
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgSend",
	from_address: address,
	to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgMultiSend
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgMultiSend",
	from_address: address,
	to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
	amountDenom: "uatom",
	amount: 100000,		// 6 decimal places (1000000 uatom = 1 ATOM)
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgCreateValidator
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgCreateValidator",
	description_moniker: "Test Validator",
	description_identity: "",
	description_website: "",
	description_details: "",
	commission_rate: "0.250000000000000000",	// 25.0%
	commission_max_rate: "1.000000000000000000",
	commission_max_change_rate: "0.100000000000000000",
	min_self_delegation: 1,
	delegator_address: address,
	validator_address: "cosmosvaloper106kt5cmued596rqusmthfnh39h38k64e73fxce",
	pubkey: "cosmosvalconspub1zcjduepq8ve2hfuvnyhan9tz7vjgstslw7lygnk85sgp3emehtnxjpu3j7gqw5wvcz",
	value_denom: "uatom",
	value_amount: 1,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgEditValidator
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgEditValidator",
	description_moniker: "Best Validator",
	description_identity: "[do-not-modify]",
	description_website: "[do-not-modify]",
	description_details: "[do-not-modify]",
	address: "cosmosvaloper106kt5cmued596rqusmthfnh39h38k64e73fxce",
	commission_rate: "0.220000000000000000",	// 22.0%
	min_self_delegation: null,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgDelegate
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgDelegate",
	delegator_address: address,
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgUndelegate
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgUndelegate",
	delegator_address: address,
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgWithdrawDelegationReward
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgWithdrawDelegationReward",
	delegator_address: address,
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgWithdrawValidatorCommission
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgWithdrawValidatorCommission",
	validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgSubmitProposal
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgSubmitProposal",
	title: "Activate the Community Pool",
	description: "Enable governance to spend funds from the community pool. Full proposal: https://ipfs.io/ipfs/QmNsVCsyRmEiep8rTQLxVNdMHm2uiZkmaSHCR6S72Y1sL1",
	initialDepositDenom: "uatom",
	initialDepositAmount: 1000000,
	proposal_type: "Text",
	proposer: address,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgDeposit
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgDeposit",
	depositor: address,
	proposal_id: 1,
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgVote
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgVote",
	voter: address,
	proposal_id: 1,
	option: "Yes",	// Yes, No, NowithVeto, Abstain
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgBeginRedelegate
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgBeginRedelegate",
	delegator_address: address,
	validator_src_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn",
	validator_dst_address: "cosmosvaloper1ec3p6a75mqwkv33zt543n6cnxqwun37rr5xlqv",
	amountDenom: "uatom",
	amount: 1000000,
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- cosmos-sdk/MsgModifyWithdrawAddress
```js
let stdSignMsg = cosmos.newStdMsg({
	type: "cosmos-sdk/MsgModifyWithdrawAddress",
	delegator_address: address,
	withdraw_address: "cosmos133mtfk63fuac5e2npfgcktwufnty2536wedfal",
	feeDenom: "uatom",
	fee: 5000,
	gas: 200000,
	memo: "",
	account_number: data.result.value.account_number,
	sequence: data.result.value.sequence
});
```
- irishub/bank/Send
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/bank/Send",
	inputsAddress:address,
	inputsCoinsDenom:"iris-atto",
	inputsCoinsAmount: 1000000000000000000,		// 18 decimal places
	outputsAddress:"iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
	outputsCoinsDenom:"iris-atto",
	outputsCoinsAmount: 1000000000000000000,
	feeDenom: "iris-atto",
	fee: 400000000000000000,
	gas: 50000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- irishub/stake/MsgDelegate
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/stake/MsgDelegate",
	delegator_addr: address,
	validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
	amountDenom: "iris-atto",
	amount: 1000000000000000000,
	feeDenom: "iris-atto",
	fee: 400000000000000000,
	gas: 50000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- irishub/stake/BeginUnbonding
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/stake/BeginUnbonding",
	delegator_addr: address,
	validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
	amountDenom: "iris-atto",
	amount: 1000000000000000000,
	feeDenom: "iris-atto",
	fee: 400000000000000000,
	gas: 50000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- irishub/distr/MsgWithdrawDelegationReward
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/distr/MsgWithdrawDelegationReward",
	delegator_addr: address,
	validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
	feeDenom: "iris-atto",
	fee: 600000000000000000,
	gas: 100000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- irishub/distr/MsgWithdrawDelegationRewardsAll
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/distr/MsgWithdrawDelegationRewardsAll",
	delegator_addr: address,
	feeDenom: "iris-atto",
	fee: 600000000000000000,
	gas: 100000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- irishub/distr/MsgModifyWithdrawAddress
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/distr/MsgModifyWithdrawAddress",
	delegator_addr: address,
	withdraw_addr: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
	feeDenom: "iris-atto",
	fee: 400000000000000000,
	gas: 50000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- irishub/stake/BeginRedelegate
```js
let stdSignMsg = iris.newStdMsg({
	type: "irishub/stake/BeginRedelegate",
	delegator_addr: address,
	validator_src_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
	validator_dst_addr: "iva1msqqkd3v0gmullzwm56c4frevyczzxfeczvjru",
	shares_amount: 1000000000000000000,
	feeDenom: "iris-atto",
	fee: 600000000000000000,
	gas: 65000,
	memo: "",
	account_number: data.value.account_number,
	sequence: data.value.sequence
});
```
- Kava has the same message types as Cosmos.