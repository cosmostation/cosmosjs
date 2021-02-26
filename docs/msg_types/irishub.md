# Iris  

In this docs, these are supporting message types in Iris Hub(irishub-1).

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

### Send

```js
// cosmos-sdk/MsgSend
let stdSignMsg = cosmos.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSend",
			value: {
				amount: [
					{
						amount: String(100000), 	// 6 decimal places (1000000 uiris = 1 IRIS)
						denom: "uiris"
					}
				],
				from_address: address,
				to_address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
								amount: String(100000),		// 6 decimal places (1000000 uiris = 1 IRIS)
								denom: "uiris"
							}
						]
					}
				],
				outputs: [
					{
						address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
						coins: [
							{
								amount: String(100000),
								denom: "uiris"
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
				validator_address: "iva1mjqef3jkgksk59rtnz3ljz94easln6cmsjcmks",
				pubkey: "iap1addwnpepq24rufap6u0sysqcpgsfzqhw3x8nfkhqhtmpgqt0369rlyqcg0vkgwzc4k0",
				value: {
					denom: "uiris",
					amount: String(1)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
				address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
				commission_rate: "0.220000000000000000",	// 22.0%
				min_self_delegation: null
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
					denom: "uiris"
				},
				delegator_address: address,
				validator_address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
					denom: "uiris"
				},
				delegator_address: address,
				validator_address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
					denom: "uiris"
				},
				delegator_address: address,
				validator_dst_address: "iva1msqqkd3v0gmullzwm56c4frevyczzxfeczvjru",
				validator_src_address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
				validator_address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
				validator_address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
				withdraw_address: "iaa18pva3yzzzaxj7l5a9uk66a0q7lflscywstsap2"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
                        denom: "uiris"
                    }
                ],
                proposal_type: "Text",
                proposer: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
                        denom: "uiris"
                    }
                ],
                depositor: address,
				proposal_id: String(1)
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
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
				address: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(20000), denom: "uiris" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.account.account_number),
	sequence: String(data.account.sequence)
});
```