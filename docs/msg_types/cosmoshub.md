# Cosmos  

In this docs, these are supporting message types in Cosmos Hub.

And, Kava currently has pretty much the same message types as Cosmos Network.

- [MsgSend](#msgsend)
- [MsgMultiSend](#msgmultisend)
- [MsgCreateValidator](#msgcreatevalidator)
- [MsgEditValidator](#msgeditvalidator)
- [MsgDelegate](#msgdelegate)
- [MsgUndelegate](#msgundelegate)
- [MsgBeginRedelegate](#msgbeginredelegate)
- [MsgWithdrawDelegationReward](#msgwithdrawdelegationreward)
- [MsgWithdrawValidatorCommission](#msgwithdrawvalidatorcommission)
- [MsgModifyWithdrawAddress](#msgmodifywithdrawaddress)
- [MsgSubmitProposal](#msgsubmitproposal)
- [MsgDeposit](#msgdeposit)
- [MsgVote](#msgvote)
- [MsgUnjail](#msgunjail)

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
						amount: String(100000), 	// 6 decimal places (1000000 uatom = 1 ATOM)
						denom: "uatom"
					}
				],
				from_address: address,
				to_address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
								amount: String(100000),		// 6 decimal places (1000000 uatom = 1 ATOM)
								denom: "uatom"
							}
						]
					}
				],
				outputs: [
					{
						address: "cosmos18vhdczjut44gpsy804crfhnd5nq003nz0nf20v",
						coins: [
							{
								amount: String(100000),
								denom: "uatom"
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
				validator_address: "cosmosvaloper106kt5cmued596rqusmthfnh39h38k64e73fxce",
				pubkey: "cosmosvalconspub1zcjduepq8ve2hfuvnyhan9tz7vjgstslw7lygnk85sgp3emehtnxjpu3j7gqw5wvcz",
				value: {
					denom: "uatom",
					amount: String(1)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
				address: "cosmosvaloper106kt5cmued596rqusmthfnh39h38k64e73fxce",
				commission_rate: "0.220000000000000000",	// 22.0%
				min_self_delegation: null
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
					denom: "uatom"
				},
				delegator_address: address,
				validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
					denom: "uatom"
				},
				delegator_address: address,
				validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
					denom: "uatom"
				},
				delegator_address: address,
				validator_dst_address: "cosmosvaloper1ec3p6a75mqwkv33zt543n6cnxqwun37rr5xlqv",
				validator_src_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
				validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
				validator_address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
				withdraw_address: "cosmos133mtfk63fuac5e2npfgcktwufnty2536wedfal"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
                        denom: "uatom"
                    }
                ],
                proposal_type: "Text",
                proposer: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
                        denom: "uatom"
                    }
                ],
                depositor: address,
				proposal_id: String(1)
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
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
				address: "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uatom" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

- irishub/bank/Send

```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/bank/Send",
			value: {
				inputs: [
					{
						address: address,
						coins: [
							{
								denom: "iris-atto",
								amount: String(1000000000000000000)		// 18 decimal places
							}
						]
					}
				],
				outputs: [
					{
						address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
						coins: [
							{
								denom: "iris-atto",
								amount: String(1000000000000000000)
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/bank/Issue
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/bank/Issue",
			value: {
				banker: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
				outputs: [
					{
						address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
						coins: [
							{
								denom: "iris-atto",
								amount: String(2000000000000000000)
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/bank/Burn
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/bank/Burn",
			value: {
				owner: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
				coins: [
					{
						denom: "iris-atto",
						amount: String(1000000000000000000)
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/distr/MsgWithdrawValidatorRewardsAll
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/distr/MsgWithdrawValidatorRewardsAll",
			value: {
				delegator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/distr/MsgWithdrawDelegationReward
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/distr/MsgWithdrawDelegationReward",
			value: {
				delegator_addr: address,
				validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(600000000000000000), denom: "iris-atto" } ], gas: String(100000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/distr/MsgWithdrawDelegationRewardsAll
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/distr/MsgWithdrawDelegationRewardsAll",
			value: {
				validator_addr: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(600000000000000000), denom: "iris-atto" } ], gas: String(100000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/distr/MsgModifyWithdrawAddress
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/distr/MsgModifyWithdrawAddress",
			value: {
				delegator_addr: address,
				withdraw_addr: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/gov/MsgSubmitProposal
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/gov/MsgSubmitProposal",
			value: {
				title: "Raising the difficulty level for Validators",
				description: "",
				proposal_type: "ParameterChange",
				proposer: address,
				initial_deposit: [
					{
						denom: "iris-atto",
						amount: String(600000000000000000000)
					}
				],
				params: [
					{
						subspace: "slashing",
						key: "SlashFractionDowntime",
						value: "0.0003"
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
-- irishub/gov/MsgSubmitCommunityTaxUsageProposal
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "",
			value: {
				MsgSubmitProposal: {
				title: "70% airdrop + 30% community building",
				description: "The 70% of the remaining is allocated to those active addresses, and the 30% is used for community building.",
				proposal_type: "CommunityTaxUsage",
				proposer: address,
				initial_deposit: [
				    {
				        denom: "iris-atto",
				        amount: String(600000000000000000000)
				    }
				],
				params: null
			},
			usage: "Distribute",
			dest_address: "iaa12g4vfyq65yf5cds4v5pr3jmdd4v6s40fkaaxtf",
			percent: "1.0000000000"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/gov/MsgSubmitSoftwareUpgradeProposal
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/gov/MsgSubmitSoftwareUpgradeProposal",
			value: {
				MsgSubmitProposal: {
					title: "IRIS Hub Upgrade to v0.16.0",
					description: "New exciting features, namely AtomicSwap, Uniswap, Snapshot, etc. are coming.",
					proposal_type: "SoftwareUpgrade",
					proposer: address,
					initial_deposit: [
						{
							denom: "iris-atto",
							amount: String(1200000000000000000000)
						}
					],
					params: null
				},
				version: "2",
				software: "https://github.com/irisnet/irishub/tree/v0.16.0",
				switch_height: "3447000",
				threshold: "0.8000000000"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/gov/MsgDeposit
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/gov/MsgDeposit",
			value: {
				proposal_id: "9",
				depositor: address,
				amount: [
					{
						denom: "iris-atto",
						amount: String(750000000000000000000)
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/gov/MsgVote
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/gov/MsgVote",
			value: {
				proposal_id: "9",
				voter: address,
				option: "Yes"		// Yes, No, NowithVeto, Abstain
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/guardian/MsgAddProfiler
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/guardian/MsgAddProfiler",
			value: {
				AddGuardian: {
					description: "ZYL",
					address: "iaa12060eqmpeskvs9ffyctrsfhdl33v8z3fgldst3",
					added_by: "iaa1v6c3sa76s3grss3xu64tvn9nd556jlcw6azc85"
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/guardian/MsgAddTrustee
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/guardian/MsgAddTrustee",
			value: {
				AddGuardian: {
					description: "Trustee for Community Pool Distribtion",
					address: "iaa1ke2my4hxr5mzntv3ec42vsp5dlkjssr7e8tgjx",
					added_by: "iaa1k4vk9xv2ywq3p209qe2etwmlfav8aknt3agqzc"
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/service/MsgSvcWithdrawFees
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/service/MsgSvcWithdrawFees",
			value: {
				provider: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/slashing/MsgUnjail
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/slashing/MsgUnjail",
			value: {
				address: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/stake/MsgCreateValidator
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/stake/MsgCreateValidator",
			value: {
				Description: {
                    moniker: "Test Validator",
                    identity: "",
                    website: "",
                    details: ""
                },
                Commission: {
                    rate: "0.1000000000",
                    max_rate: "1.0000000000",
                    max_change_rate: "1.0000000000"
                },
                delegator_address: "iaa1mjqef3jkgksk59rtnz3ljz94easln6cm9rj5th",
                validator_address: "iva1mjqef3jkgksk59rtnz3ljz94easln6cmsjcmks",
                pubkey: {
                    type: "tendermint/PubKeyEd25519",
                    value: "OOWKIOGG/k3Ts6i93ErlMGXu+vWTgC5mKDNl1L3I/xo="
                },
                delegation: {
                    denom: "iris-atto",
                    amount: String(100000000000000000000)
                }
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/stake/MsgEditValidator
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/stake/MsgEditValidator",
			value: {
				Description: {
					moniker: "[do-not-modify]",
					identity: "[do-not-modify]",
					website: "[do-not-modify]",
					details: "[do-not-modify]"
				},
				address: "iva1gyhapedd7l0jaxe35hnwxc2tmjcdrvzx52sv0u",
				commission_rate: "0.2000000000"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/stake/MsgDelegate
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/stake/MsgDelegate",
			value: {
				shares_amount: String(1000000000000000000) + ".0000000000",
				delegator_addr: address,
				validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/stake/BeginUnbonding
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/stake/BeginUnbonding",
			value: {
				shares_amount: String(1000000000000000000) + ".0000000000",
				delegator_addr: address,
				validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/stake/BeginRedelegate
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/stake/BeginRedelegate",
			value: {
				delegator_addr: address,
				validator_src_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
				validator_dst_addr: "iva1msqqkd3v0gmullzwm56c4frevyczzxfeczvjru",
				shares_amount: String(1000000000000000000) + ".0000000000"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(600000000000000000), denom: "iris-atto" } ], gas: String(65000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/asset/MsgIssueToken
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/asset/MsgIssueToken",
			value: {
				family: "fungible",
                source: "native",
                gateway: "",
                symbol: "iBTC",
                canonical_symbol: "",
                name: "Iris BTC Token",
                decimal: 18,
                min_unit_alias: "",
                initial_supply: "137000000",
                max_supply: "1000000000000",
                mintable: true,
                owner: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
- irishub/rand/MsgRequestRand
```js
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/rand/MsgRequestRand",
			value: {
				consumer: address,
				block-interval: "60515"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
