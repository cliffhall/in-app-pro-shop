const path = require('path');

const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = 'cabbage inflict doctor valve address roast bring club fiber celery lab render'; // Replace with your MetaMask mnemonic

module.exports = {
    contracts_build_directory: path.join(__dirname, "src/abi"),
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            from: "0xea5f1f147332e32a0dbbf25f4cbcb78d8ba879ce",
            network_id: "*",
            gas: 8000000
        },
        ropsten: {
            provider: () => new HDWalletProvider(mnemonic, "wss://ropsten.infura.io/v3/4ded77f972874ae8b44aeb237dbe846b", 1),
            websockets: true,
            network_id: "3"
        }
    }
};
