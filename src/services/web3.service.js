import Web3 from 'web3';

const LOCALHOST = 'http://127.0.0.1:7545';

export const getWeb3Instance = () => {

    return new Promise(function (resolve, reject) {

        let web3 = window.web3;

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {

            // Use Mist/MetaMask's provider.
            const message = 'Injected web3 detected';
            web3 = new Web3(web3.currentProvider);
            if (!!web3) {
                resolve(web3);
                console.log(message);
            } else {
                reject(`${message}, but provider was null.`);
            }

        } else {

            // Fallback to localhost if no web3 injection.
            const message = 'No web3 injected';
            let provider = new Web3.providers.HttpProvider(LOCALHOST);
            web3 = new Web3(provider);
            if (!!web3) {
                resolve(web3);
                console.log(`${message}, using local provider.`);
            } else {
                reject(`${message} and local provider failed.`)
            }

        }
    })
};

export const fetchAccounts = web3Instance => {
    return web3Instance.eth.getAccounts();
};
