# Akash  

In this docs, these are supporting message types in AKT.

The DeCloud for DeFi, and the world's first decentralized cloud computing marketplace.

### Supporting Message Types

- [cosmos-sdk/MsgSend](#msgsend)
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
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSend",
			value: {
				amount: [
					{
						amount: String(100000), 	// 6 decimal places (1000000 uatk = 1 ATK)
						denom: "uatk"
					}
				],
				from_address: address,
				to_address: "akash1gzc54u4p67hh9r4m9vcml3ke9fc29tplazyrrv"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

###  MsgMultiSend

```js
// cosmos-sdk/MsgMultiSend
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgMultiSend",
			value: {
				inputs: [
					{
						address: address,
						coins: [
							{
								amount: String(100000),		// 6 decimal places (1000000 uatk = 1 ATK)
								denom: "uatk"
							}
						]
					}
				],
				outputs: [
					{
						address: "akash1gzc54u4p67hh9r4m9vcml3ke9fc29tplazyrrv",
						coins: [
							{
								amount: String(100000),
								denom: "uatk"
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgCreateValidator

```js
// cosmos-sdk/MsgCreateValidator
let stdSignMsg = cosmos.newStdMsg({
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
				validator_address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz",
				pubkey: "akashvalconspub1zcjduepquawhcmz2zc03xqqq2cxq9t2tldc8p8kzkcjax9t6r8zs52v8e78queuhwt",
				value: {
					denom: "uatk",
					amount: String(1)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgEditValidator

```js
// cosmos-sdk/MsgEditValidator
let stdSignMsg = cosmos.newStdMsg({
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
				address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz",
				commission_rate: "0.220000000000000000",	// 22.0%
				min_self_delegation: null
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgDelegate

```js
// cosmos-sdk/MsgDelegate
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uatk"
				},
				delegator_address: address,
				validator_address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgUndelegate

```js
// cosmos-sdk/MsgUndelegate
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUndelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uatk"
				},
				delegator_address: address,
				validator_address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgBeginRedelegate 

```js
// cosmos-sdk/MsgBeginRedelegate
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgBeginRedelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uatk"
				},
				delegator_address: address,
				validator_dst_address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz",
				validator_src_address: "akashvaloper1mp0t9f4lpgu2tqa2maxk3vp8kugn8meyua86fh"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgWithdrawDelegationReward

```js
// cosmos-sdk/MsgWithdrawDelegationReward
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawDelegationReward",
			value: {
				delegator_address: address,
				validator_address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgWithdrawValidatorCommission

```js
// cosmos-sdk/MsgWithdrawValidatorCommission
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawValidatorCommission",
			value: {
				validator_address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgModifyWithdrawAddress

```js
// cosmos-sdk/MsgModifyWithdrawAddress
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgModifyWithdrawAddress",
			value: {
				delegator_address: address,
				withdraw_address: "akash1gzc54u4p67hh9r4m9vcml3ke9fc29tplazyrrv"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgSubmitProposal

```js
// cosmos-sdk/MsgSubmitProposal
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSubmitProposal",
			value: {
				title: "Activate the Community Pool",
				description: "Enable governance to spend funds from the community pool. Full proposal: https://ipfs.io/ipfs/QmNsVCsyRmEiep8rTQLxVNdMHm2uiZkmaSHCR6S72Y1sL1",
				initial_deposit: [
                    {
                    	amount: String(1000000),
                        denom: "uatk"
                    }
                ],
                proposal_type: "Text",
                proposer: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgDeposit

```js
// cosmos-sdk/MsgDeposit
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDeposit",
			value: {
				amount: [
                    {
                    	amount: String(1000000),
                        denom: "uatk"
                    }
                ],
                depositor: address,
				proposal_id: String(1)
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgVote

```js
// cosmos-sdk/MsgVote
let stdSignMsg = cosmos.newStdMsg({
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
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgUnjail

```js
// cosmos-sdk/MsgUnjail
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUnjail",
			value: {
				address: "akashvaloper18tmu0lrfsdvke8e3a3jsd7fq2rs29krfkkw8gz"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatk" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
