const path = require('path');
module.exports = {
    contracts_build_directory: path.join(__dirname, "src/abi"),
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            from: "0xea5f1f147332e32a0dbbf25f4cbcb78d8ba879ce",
            network_id: "*",
            gas: 8000000
        }
    }
};
