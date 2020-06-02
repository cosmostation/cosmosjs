# Iris  

In this docs, these are supporting message types in Iris Hub.

### Supporting Message Types

- [irishub/bank/Send](#send)
- [irishub/bank/Issue](#issue)
- [irishub/bank/Burn](#burn)
- [irishub/distr/MsgWithdrawValidatorRewardsAll](#msgwithdrawvalidatorrewardsall)
- [irishub/distr/MsgWithdrawDelegationReward](#msgwithdrawdelegationreward)
- [irishub/distr/MsgWithdrawDelegationRewardsAll](#msgwithdrawdelegationrewardsall)
- [irishub/distr/MsgModifyWithdrawAddress](#msgmodifywithdrawaddress)
- [irishub/gov/MsgSubmitProposal](#msgsubmitproposal)
- [irishub/gov/MsgSubmitCommunityTaxUsageProposal](#msgsubmitcommunitytaxusageproposal)
- [irishub/gov/MsgSubmitSoftwareUpgradeProposal](#msgsubmitsoftwareupgradeproposal)
- [irishub/gov/MsgDeposit](#msgdeposit)
- [irishub/gov/MsgVote](#msgvote)
- [irishub/guardian/MsgAddProfiler](#msgaddprofiler)
- [irishub/guardian/MsgAddTrustee](#msgaddtrustee)
- [irishub/service/MsgSvcWithdrawFees](#msgsvcwithdrawfees)
- [irishub/slashing/MsgUnjail](#msgunjail)
- [irishub/stake/MsgCreateValidator](#msgcreatevalidator)
- [irishub/stake/MsgEditValidator](#msgeditvalidator)
- [irishub/stake/MsgDelegate](#msgdelegate)
- [irishub/stake/BeginUnbonding](#beginunbonding)
- [irishub/stake/BeginRedelegate](#beginredelegate)
- [irishub/asset/MsgIssueToken](#msgissuetoken)
- [irishub/rand/MsgRequestRand](#msgrequestrand)

### Send

```js
// irishub/bank/Send
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### Issue

```js
// irishub/bank/Issue
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### Burn

```js
// irishub/bank/Burn
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgWithdrawValidatorRewardsAll

```js
// irishub/distr/MsgWithdrawValidatorRewardsAll
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgWithdrawDelegationReward

```js
// irishub/distr/MsgWithdrawDelegationReward
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgWithdrawDelegationRewardsAll

```js
// irishub/distr/MsgWithdrawDelegationRewardsAll
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgModifyWithdrawAddress

```js
// irishub/distr/MsgModifyWithdrawAddress
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgSubmitProposal

```js
// irishub/gov/MsgSubmitProposal
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgSubmitCommunityTaxUsageProposal

```js
// irishub/gov/MsgSubmitCommunityTaxUsageProposal
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgSubmitSoftwareUpgradeProposal

```js
// irishub/gov/MsgSubmitSoftwareUpgradeProposal
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgDeposit

```js
// irishub/gov/MsgDeposit
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgVote

```js
// irishub/gov/MsgVote
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgAddProfiler

```js
// irishub/guardian/MsgAddProfiler
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgAddTrustee

```js
// irishub/guardian/MsgAddTrustee
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/guardian/MsgAddTrustee",
			value: {
				AddGuardian: {
					description: "Trustee for Community Pool Distribution",
					address: "iaa1ke2my4hxr5mzntv3ec42vsp5dlkjssr7e8tgjx",
					added_by: "iaa1k4vk9xv2ywq3p209qe2etwmlfav8aknt3agqzc"
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgSvcWithdrawFees

```js
// irishub/service/MsgSvcWithdrawFees
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgUnjail

```js
// irishub/slashing/MsgUnjail
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgCreateValidator

```js
// irishub/stake/MsgCreateValidator
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgEditValidator

```js
// irishub/stake/MsgEditValidator
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgDelegate

```js
// irishub/stake/MsgDelegate
let stdSignMsg = iris.newStdMsg({
	msgs: [
		{
			type: "irishub/stake/MsgDelegate",
			value: {
				delegator_addr: address,
				validator_addr: "iva18pva3yzzzaxj7l5a9uk66a0q7lflscyw966jud",
				delegation: {
					denom: "iris-atto",
					amount: String(1000000000000000000)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(400000000000000000), denom: "iris-atto" } ], gas: String(50000) },
	memo: "",
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### BeginUnbonding

```js
// irishub/stake/BeginUnbonding
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### BeginRedelegate

```js
// irishub/stake/BeginRedelegate
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgIssueToken

```js
// irishub/asset/MsgIssueToken
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```

### MsgRequestRand

```js
// irishub/rand/MsgRequestRand
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
	account_number: String(data.value.account_number),
	sequence: String(data.value.sequence)
});
```
