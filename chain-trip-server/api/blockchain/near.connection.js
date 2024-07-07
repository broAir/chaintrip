
import * as nearApi from "near-api-js";
const { keyStores, KeyPair, connect } = nearApi;

const contractId = "corgi-trip.testnet";
const apiSettings = {
    networkId: "testnet",
    rpc: "https://rpc.testnet.near.org",
    walletUrl: "https://testnet.mynearwallet.com/",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://testnet.nearblocks.io",
};


//https://github.com/near-examples/near-api-rest-server/blob/master/blockchain.js
//https://docs.near.org/tools/near-api-js/account
// contract, method, params, rpc_node, headers

const getKeyStore = async () => {
    const PRIVATE_KEY =
        process.env.NEAR_CON_PK;
    // creates a public / private key pair using the provided private key
    const keyPair = KeyPair.fromString(PRIVATE_KEY);
    // adds the keyPair you created to keyStore
    const myKeyStore = new keyStores.InMemoryKeyStore();
    await myKeyStore.setKey("testnet", "corgi-account.testnet", keyPair);

    return myKeyStore;
}

const connectToNear = async () => {
    const myKeyStore = await getKeyStore();
    const connectionConfig = {
        networkId: apiSettings.networkId,
        keyStore: myKeyStore, // first create a key store
        nodeUrl: apiSettings.rpc,
        walletUrl: apiSettings.walletUrl,
        helperUrl: apiSettings.helperUrl,
        explorerUrl: apiSettings.explorerUrl,
    };

    return await connect(connectionConfig);
}

export {
    connectToNear
}
