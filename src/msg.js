const cosmosjsUtil = require('./utils.js');

function getStdMsg(input, chainId) {
	const stdSignMsg = new Object;

	if (input.type == "cosmos-sdk/MsgSend") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: [
							{
								amount: String(input.amount),
								denom: input.amountDenom
							}
						],
						from_address: input.from_address,
						to_address: input.to_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgMultiSend") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						inputs: [
							{
								address: input.from_address,
								coins: [
									{
										amount: String(input.amount),
										denom: input.amountDenom
									}
								]
							}
						],
						outputs: [
							{
								address: input.to_address,
								coins: [
									{
										amount: String(input.amount),
										denom: input.amountDenom
									}
								]
							}
						]
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgCreateValidator") {
	    stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						description: {
							moniker: input.description_moniker,
							identity: input.description_identity,
							website: input.description_website,
							details: input.description_details
						},
						commission: {
							rate: input.commission_rate,
							max_rate: input.commission_max_rate,
							max_change_rate: input.commission_max_change_rate
						},
						min_self_delegation: String(input.min_self_delegation),
						delegator_address: input.delegator_address,
						validator_address: input.validator_address,
						pubkey: input.pubkey,
						value: {
							denom: input.value_denom,
							amount: String(input.value_amount)
						}
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgEditValidator") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						Description: {
							moniker: input.description_moniker,
							identity: input.description_identity,
							website: input.description_website,
							details: input.description_details
						},
						address: input.address,
						commission_rate: input.commission_rate,
						min_self_delegation: input.min_self_delegation
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgDelegate") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_address: input.delegator_address,
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgUndelegate") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_address: input.delegator_address,
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgBeginRedelegate") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_address: input.delegator_address,
						validator_dst_address: input.validator_dst_address,
						validator_src_address: input.validator_src_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgWithdrawDelegationReward") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegator_address: input.delegator_address,
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgWithdrawValidatorCommission") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						validator_address: input.validator_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgModifyWithdrawAddress") {
	    stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegator_address: input.delegator_address,
						withdraw_address: input.withdraw_address
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgSubmitProposal") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						description: input.description,
						initial_deposit: [
	                        {
	                        	amount: String(input.initialDepositAmount),
	                            denom: input.initialDepositDenom
	                        }
	                    ],
	                    proposal_type: input.proposal_type,
	                    proposer: input.proposer,
						title: input.title
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgDeposit") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						amount: [
	                        {
	                        	amount: String(input.amount),
	                            denom: input.amountDenom
	                        }
	                    ],
	                    depositor: input.depositor,
						proposal_id: String(input.proposal_id)
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgVote") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						option: input.option,
						proposal_id: String(input.proposal_id),
	                    voter: input.voter
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/TextProposal") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "cosmos-sdk/MsgUnjail") {
	    stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/bank/Send") {
	    stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						inputs: [
							{
								address: input.inputsAddress,
								coins: [
									{
										denom: input.inputsCoinsDenom,
										amount: String(input.inputsCoinsAmount)
									}
								]
							}
						],
						outputs: [
							{
								address: input.outputsAddress,
								coins: [
									{
										denom:input.outputsCoinsDenom,
										amount: String(input.outputsCoinsAmount)
									}
								]
							}
						]
					}
				}
			],
			sequence: String(input.sequence)
		}

		stdSignMsg.jsonForSigningIrisTx =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					inputs: [
						{
							address: input.inputsAddress,
							coins: [
								{
									denom: input.inputsCoinsDenom,
									amount: String(input.inputsCoinsAmount)
								}
							]
						}
					],
					outputs: [
						{
							address: input.outputsAddress,
							coins: [
								{
									denom:input.outputsCoinsDenom,
									amount: String(input.outputsCoinsAmount)
								}
							]
						}
					]
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/bank/Issue") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/bank/Burn") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/distr/MsgWithdrawDelegationRewardsAll") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegator_addr: input.delegator_addr
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/distr/MsgWithdrawDelegationReward") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegator_addr: input.delegator_addr,
						validator_addr: input.validator_addr
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/distr/MsgWithdrawValidatorRewardsAll") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/distr/MsgModifyWithdrawAddress") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegator_addr: input.delegator_addr,
						withdraw_addr: input.withdraw_addr
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/gov/MsgSubmitProposal") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/gov/MsgSubmitCommunityTaxUsageProposal") {
		// developing...
	} else if (input.type == "irishub/gov/MsgSubmitSoftwareUpgradeProposal") {
		// developing...
	} else if (input.type == "irishub/gov/MsgSubmitTokenAdditionProposal") {
		// developing...
	} else if (input.type == "irishub/gov/MsgDeposit") {
		// developing...
	} else if (input.type == "irishub/gov/MsgVote") {
		// developing...
	} else if (input.type == "irishub/guardian/MsgAddProfiler") {
		// developing...
	} else if (input.type == "irishub/guardian/MsgAddTrustee") {
		// developing...
	} else if (input.type == "irishub/guardian/MsgDeleteProfiler") {
		// developing...
	} else if (input.type == "irishub/guardian/MsgDeleteTrustee") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcDef") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcBinding") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcBindingUpdate") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcDisable") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcEnable") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcRefundDeposit") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcRequest") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcResponse") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcRefundFees") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcWithdrawFees") {
		// developing...
	} else if (input.type == "irishub/service/MsgSvcWithdrawTax") {
		// developing...
	} else if (input.type == "irishub/slashing/MsgUnjail") {
		// developing...
	} else if (input.type == "irishub/stake/MsgCreateValidator") {
		// developing...
	} else if (input.type == "irishub/stake/MsgEditValidator") {
		// developing...
	} else if (input.type == "irishub/stake/MsgDelegate") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegation: {
							amount: String(input.amount),
							denom: input.amountDenom
						},
						delegator_addr: input.delegator_addr,
						validator_addr: input.validator_addr
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/stake/BeginUnbonding") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						shares_amount: String(input.amount) + ".0000000000",
						delegator_addr: input.delegator_addr,
						validator_addr: input.validator_addr
					}
				}
			],
			sequence: String(input.sequence)
		}

		stdSignMsg.jsonForSigningIrisTx =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					shares_amount: String(input.amount) + ".0000000000",
					delegator_addr: input.delegator_addr,
					validator_addr: input.validator_addr
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/stake/BeginRedelegate") {
		stdSignMsg.json =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						delegator_addr: input.delegator_addr,
						validator_src_addr: input.validator_src_addr,
						validator_dst_addr: input.validator_dst_addr,
						shares_amount: String(input.shares_amount) + ".0000000000"		// IRIS Exception) For broadcasting, shares_amount is correct.
					}
				}
			],
			sequence: String(input.sequence)
		}

		stdSignMsg.jsonForSigningIrisTx =
		{
		  	account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					delegator_addr: input.delegator_addr,
					validator_src_addr: input.validator_src_addr,
					validator_dst_addr: input.validator_dst_addr,
					shares: String(input.shares_amount) + ".0000000000"		// IRIS Exception) For signing, shares is correct.
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/asset/MsgIssueToken") {
		stdSignMsg.json =
		{
			account_number: String(input.account_number),
			chain_id: chainId,
			fee: {
				amount: [
					{
						amount: String(input.fee),
						denom: input.feeDenom
					}
				],
				gas: String(input.gas)
			},
			memo: input.memo,
			msgs: [
				{
					type: input.type,
					value: {
						// developing...
					}
				}
			],
			sequence: String(input.sequence)
		}
	} else if (input.type == "irishub/asset/MsgCreateGateway") {
		// developing...
	} else if (input.type == "irishub/asset/MsgEditGateway") {
		// developing...
	} else if (input.type == "irishub/asset/MsgEditToken") {
		// developing...
	} else if (input.type == "irishub/asset/MsgTransferGatewayOwner") {
		// developing...
	} else if (input.type == "irishub/asset/MsgMintToken") {
		// developing...
	} else if (input.type == "irishub/asset/MsgTransferTokenOwner") {
		// developing...
	} else if (input.type == "irishub/rand/MsgRequestRand") {
		// developing...
	} else {
		throw new Error("No such input.type: " + input.type)
	}

	stdSignMsg.bytes = cosmosjsUtil.convertStringToBytes(JSON.stringify(cosmosjsUtil.sortObject(stdSignMsg.json)));

	return stdSignMsg;
}

module.exports = {
	getStdMsg: getStdMsg
}