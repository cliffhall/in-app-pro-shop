const path = require('path');
const HDWalletProvider = require("truffle-hdwallet-provider");

// MetaMask or Ganache Seed Phrase
const keys = require('./.project_keys');

// Infura URL
const url = `https://ropsten.infura.io/v3/${keys.infura_project}`;

module.exports = {
    contracts_build_directory: path.join(__dirname, "src/abi"),
    compilers: {
        solc: {
            version: "^0.4.24"
        }
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            from: "0x2efe8c3e45e72764329eb0ab9b6897dc9e1320bc",
            network_id: "*",
            gas: 8000000
        },
        ropsten: {
            provider: () => new HDWalletProvider(keys.mnemonic, url, 1),
            network_id: "3"
        }
    }
};