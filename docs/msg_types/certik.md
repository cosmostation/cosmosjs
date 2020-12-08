# Certik

In this docs, these are supporting message types in CTK.

CertiK Chain, a security-first, delegated proof-of-stake blockchain, for trustworthy execution of mission-critical applications, including DeFi, NFTs, and autonomous vehicles.

### Supporting Message Types

- [bank/MsgSend](#msgsend)
- [cosmos-sdk/MsgMultiSend](#msgmultisend)
- [cosmos-sdk/MsgCreateValidator](#msgcreatevalidator)
- [cosmos-sdk/MsgEditValidator](#msgeditvalidator)
- [cosmos-sdk/MsgDelegate](#msgdelegate)
- [cosmos-sdk/MsgUndelegate](#msgundelegate)
- [cosmos-sdk/MsgBeginRedelegate](#msgbeginredelegate)
- [cosmos-sdk/MsgWithdrawDelegationReward](#msgwithdrawdelegationreward)
- [cosmos-sdk/MsgWithdrawValidatorCommission](#msgwithdrawvalidatorcommission)
- [cosmos-sdk/MsgModifyWithdrawAddress](#msgmodifywithdrawaddress)
- [cosmos-sdk/MsgSubmitProposal](#msgsubmitproposal)
- [cosmos-sdk/MsgDeposit](#msgdeposit)
- [cosmos-sdk/MsgVote](#msgvote)
- [cosmos-sdk/MsgUnjail](#msgunjail)

###  MsgSend

```js
// cosmos-sdk/MsgSend
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "bank/MsgSend",
			value: {
				amount: [
					{
						amount: String(100000), 	// 6 decimal places (1000000 uctk = 1 CTK)
						denom: "uctk"
					}
				],
				from_address: address,
				to_address: "certik1zymhgddfc6hwwk6hw6hcsc88v9cnkl969xxch5"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

###  MsgMultiSend

```js
// cosmos-sdk/MsgMultiSend
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgMultiSend",
			value: {
				inputs: [
					{
						address: address,
						coins: [
							{
								amount: String(100000),		// 6 decimal places (1000000 uctk = 1 CTK)
								denom: "uctk"
							}
						]
					}
				],
				outputs: [
					{
						address: "certik1zymhgddfc6hwwk6hw6hcsc88v9cnkl969xxch5",
						coins: [
							{
								amount: String(100000),
								denom: "uctk"
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgCreateValidator

```js
// cosmos-sdk/MsgCreateValidator
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgCreateValidator",
			value: {
				description: {
					moniker: "Test Validator",
					identity: "",
					website: "",
					details: ""
				},
				commission: {
					rate: "0.250000000000000000",	// 25.0%
					max_rate: "1.000000000000000000",
					max_change_rate: "0.100000000000000000"
				},
				min_self_delegation: String(1),
				delegator_address: address,
				validator_address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4",
				pubkey: "certikvalconspub1zcjduepqgl44x87cvcxq9emuv4em8u5e5gyh9zqyfksacg6p3rc2s96ann0s49d23w",
				value: {
					denom: "uctk",
					amount: String(1)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgEditValidator

```js
// cosmos-sdk/MsgEditValidator
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgEditValidator",
			value: {
				Description: {
					moniker: "Best Validator",
					identity: "[do-not-modify]",
					website: "[do-not-modify]",
					details: "[do-not-modify]"
				},
				address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4",
				commission_rate: "0.220000000000000000",	// 22.0%
				min_self_delegation: null
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgDelegate

```js
// cosmos-sdk/MsgDelegate
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uctk"
				},
				delegator_address: address,
				validator_address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgUndelegate

```js
// cosmos-sdk/MsgUndelegate
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUndelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uctk"
				},
				delegator_address: address,
				validator_address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgBeginRedelegate 

```js
// cosmos-sdk/MsgBeginRedelegate
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgBeginRedelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uctk"
				},
				delegator_address: address,
				validator_dst_address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4",
				validator_src_address: "certikvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfpn43fr"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgWithdrawDelegationReward

```js
// cosmos-sdk/MsgWithdrawDelegationReward
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawDelegationReward",
			value: {
				delegator_address: address,
				validator_address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgWithdrawValidatorCommission

```js
// cosmos-sdk/MsgWithdrawValidatorCommission
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawValidatorCommission",
			value: {
				validator_address: "certikvaloper1hdcfct8yvc4069tku92txtjz0rf50dsugutdv4"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgModifyWithdrawAddress

```js
// cosmos-sdk/MsgModifyWithdrawAddress
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgModifyWithdrawAddress",
			value: {
				delegator_address: address,
				withdraw_address: "certik1zymhgddfc6hwwk6hw6hcsc88v9cnkl969xxch5"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgSubmitProposal

```js
// cosmos-sdk/MsgSubmitProposal
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSubmitProposal",
			value: {
				title: "Activate the Community Pool",
				description: "Enable governance to spend funds from the community pool. Full proposal: https://ipfs.io/ipfs/QmNsVCsyRmEiep8rTQLxVNdMHm2uiZkmaSHCR6S72Y1sL1",
				initial_deposit: [
                    {
                    	amount: String(1000000),
                        denom: "uctk"
                    }
                ],
                proposal_type: "Text",
                proposer: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgDeposit

```js
// cosmos-sdk/MsgDeposit
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDeposit",
			value: {
				amount: [
                    {
                    	amount: String(1000000),
                        denom: "uctk"
                    }
                ],
                depositor: address,
				proposal_id: String(1)
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgVote

```js
// cosmos-sdk/MsgVote
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgVote",
			value: {
				option: "Yes",	// Yes, No, NowithVeto, Abstain
				proposal_id: String(1),
                voter: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgUnjail

```js
// cosmos-sdk/MsgUnjail
let stdSignMsg = certik.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUnjail",
			value: {
				address: "certikvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfpn43fr"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uctk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
