const path = require('path');
const HDWalletProvider = require("truffle-hdwallet-provider");

// Replace with your MetaMask Seed Phrase
//const mnemonic = 'cabbage inflict doctor valve address roast bring club fiber celery lab render';
const mnemonic = 'cry crisp noble verb alpha edge invite deer crane fetch quality doctor';

// Use your Infura project id
const url = 'https://ropsten.infura.io/v3/4ded77f972874ae8b44aeb237dbe846b';

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
            provider: () => new HDWalletProvider(mnemonic, url, 1),
            network_id: "3"
        }
    }
};