const cosmosjs = require("../src");

const mnemonic = "YOUR MNEMONIC";
const chainId = "kava-testnet-6000";
const kava = cosmosjs.network("PUBLIC REST SERVER ENDPOINT", chainId);
kava.setBech32MainPrefix("kava"); // same prefix as Mainnet
kava.setPath("m/44'/459'/0'/0/0"); // legacy derivation path: m/44'/118'/0'/0/0
const address = kava.getAddress(mnemonic);
const ecpairPriv = kava.getECPairPriv(mnemonic);

// Testnet faucet URL: https://faucet.kava.io/

// Generate MsgDeposit transaction and broadcast 
kava.getAccounts(address).then(data => {
	let stdSignMsg = kava.newStdMsg({
    msgs: [
      {
        type: "cdp/MsgDeposit",
        value: {
          owner: "CDP OWNDER ADDRESS",
          depositor: address,
          collateral: [
            {
              denom: "btc",
              amount: "1500"
            }
          ]
        }
      }
    ],
    chain_id: chainId,
    fee: {
      amount: [{ amount: String(5000), denom: "ukava" }],
      gas: String(200000)
    },
    memo: "Test transaction using CosmosJS by Cosmostation",
    account_number: String(data.result.value.account_number),
    sequence: String(data.result.value.sequence)
  });

	const signedTx = kava.sign(stdSignMsg, ecpairPriv);
	kava.broadcast(signedTx).then(response => console.log(response));
})