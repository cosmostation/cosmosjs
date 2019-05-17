// CosmosJS
// Developed / Developing by Cosmostation.
// [WARNING] CosmosJS is under ACTIVE DEVELOPMENT and should be treated as alpha version. We will remove this warning when we have a release that is stable, secure, and propoerly tested.

const cosmosjs = require("../src");

const chainId = "cosmoshub-2";
// ** [WARNING] Do not use this mnemonic. Creating a wallet using this mnemonic will make your wallet subject to attacks. **
const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

const amount = 1000000;		// uatom
const fee = 500;
const gas = 200000;
const accountNumber = 0;
const sequence = 0;
const validatorOperatorAddress = "cosmosvaloper1clpqr4nrk4khgkxj78fcwwh6dl3uw4epsluffn";

const cosmos = cosmosjs.network(chainId);
const fromAddress = cosmos.getAddress(mnemonic);
const ecpairPriv = cosmos.getECPairPriv(mnemonic);

const toAddress = "cosmos1xy80njn94egxhqjuydek2jevv6peqkgxz9mjy4";

const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgSend", accountNumber, sequence, fromAddress, toAddress, "uatom", amount, "uatom", fee, gas, "");
// const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgDelegate", accountNumber, sequence, fromAddress, validatorOperatorAddress, "uatom", amount, "uatom", fee, gas, "");
// const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgUndelegate", accountNumber, sequence, fromAddress, validatorOperatorAddress, "uatom", amount, "uatom", fee, gas, "");
// const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgWithdrawDelegationReward", accountNumber, sequence, fromAddress, validatorOperatorAddress, "uatom", amount, "uatom", fee, gas, "");
// const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgSubmitProposal", accountNumber, sequence, fromAddress, null, "uatom", amount, "uatom", fee, gas, "", "Test title", "Test description");
// const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgDeposit", accountNumber, sequence, fromAddress, null, "uatom", amount, "uatom", fee, gas, "", null, null, 1);
// const stdSignMsg = cosmos.createStdSignMsg("cosmos-sdk/MsgVote", accountNumber, sequence, fromAddress, null, "uatom", amount, "uatom", fee, gas, "", null, null, 1, "NoWithVeto");

const signedTx = cosmos.sign(stdSignMsg, ecpairPriv);
console.log("signedTx: ", JSON.stringify(signedTx));

// Broadcast your signedTx! Please refer to https://cosmos.network/rpc/#/ICS0/post_txs