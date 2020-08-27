# IOV

In this docs, these are supporting message types in IOV.

The IOV Name Service is a proof of stake name service which comes with great features. It provides the starnames: decentralised usernames (like your twitter handle) which link to a list of crypto-addresses.

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
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSend",
			value: {
				amount: [
					{
						amount: String(100000), 	// 6 decimal places (1000000 uiov = 1 IOV)
						denom: "uiov"
					}
				],
				from_address: address,
				to_address: "star177payt9uaymzda0mmx2kuq95dtatrepk795km9"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

###  MsgMultiSend

```js
// cosmos-sdk/MsgMultiSend
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgMultiSend",
			value: {
				inputs: [
					{
						address: address,
						coins: [
							{
								amount: String(100000),		// 6 decimal places (1000000 uiov = 1 IOV)
								denom: "uiov"
							}
						]
					}
				],
				outputs: [
					{
						address: "star177payt9uaymzda0mmx2kuq95dtatrepk795km9",
						coins: [
							{
								amount: String(100000),
								denom: "uiov"
							}
						]
					}
				]
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgCreateValidator

```js
// cosmos-sdk/MsgCreateValidator
let stdSignMsg = iov.newStdMsg({
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
				validator_address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj",
				pubkey: "starvalconspub1zcjduepqtms8y5e9qw6ay8pkhvdqxkh6rueujp4p3arutpvked9n23sydzysxn6jdw",
				value: {
					denom: "uiov",
					amount: String(1)
				}
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgEditValidator

```js
// cosmos-sdk/MsgEditValidator
let stdSignMsg = iov.newStdMsg({
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
				address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj",
				commission_rate: "0.220000000000000000",	// 22.0%
				min_self_delegation: null
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgDelegate

```js
// cosmos-sdk/MsgDelegate
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uiov"
				},
				delegator_address: address,
				validator_address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgUndelegate

```js
// cosmos-sdk/MsgUndelegate
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUndelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uiov"
				},
				delegator_address: address,
				validator_address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgBeginRedelegate 

```js
// cosmos-sdk/MsgBeginRedelegate
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgBeginRedelegate",
			value: {
				amount: {
					amount: String(1000000),
					denom: "uiov"
				},
				delegator_address: address,
				validator_dst_address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj",
				validator_src_address: "starvaloper1nrnx8mft8mks3l2akduxdjlf8rwqs8r9667djw"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgWithdrawDelegationReward

```js
// cosmos-sdk/MsgWithdrawDelegationReward
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawDelegationReward",
			value: {
				delegator_address: address,
				validator_address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgWithdrawValidatorCommission

```js
// cosmos-sdk/MsgWithdrawValidatorCommission
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgWithdrawValidatorCommission",
			value: {
				validator_address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgModifyWithdrawAddress

```js
// cosmos-sdk/MsgModifyWithdrawAddress
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgModifyWithdrawAddress",
			value: {
				delegator_address: address,
				withdraw_address: "star177payt9uaymzda0mmx2kuq95dtatrepk795km9"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgSubmitProposal

```js
// cosmos-sdk/MsgSubmitProposal
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgSubmitProposal",
			value: {
				title: "Activate the Community Pool",
				description: "Enable governance to spend funds from the community pool. Full proposal: https://ipfs.io/ipfs/QmNsVCsyRmEiep8rTQLxVNdMHm2uiZkmaSHCR6S72Y1sL1",
				initial_deposit: [
                    {
                    	amount: String(1000000),
                        denom: "uiov"
                    }
                ],
                proposal_type: "Text",
                proposer: address
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgDeposit

```js
// cosmos-sdk/MsgDeposit
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgDeposit",
			value: {
				amount: [
                    {
                    	amount: String(1000000),
                        denom: "uiov"
                    }
                ],
                depositor: address,
				proposal_id: String(1)
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgVote

```js
// cosmos-sdk/MsgVote
let stdSignMsg = iov.newStdMsg({
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
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```

### MsgUnjail

```js
// cosmos-sdk/MsgUnjail
let stdSignMsg = iov.newStdMsg({
	msgs: [
		{
			type: "cosmos-sdk/MsgUnjail",
			value: {
				address: "starvaloper1vlqztrl5pwnw8v8vd2ejwge86y5zrgua7rx7xj"
			}
		}
	],
	chain_id: chainId,
	fee: { amount: [ { amount: String(5000), denom: "uiov" } ], gas: String(200000) },
	memo: "",
	account_number: String(data.result.value.account_number),
	sequence: String(data.result.value.sequence)
});
```
