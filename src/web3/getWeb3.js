import store from '../store/index'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';
const LOCALHOST = 'http://127.0.0.1:7545';

function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    let results;
    let web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {

      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);
      results = { web3Instance: web3 };
      resolve(store.dispatch(web3Initialized(results)));
      console.log('Injected web3 detected.');

    } else {

      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      let provider = new Web3.providers.HttpProvider(LOCALHOST);
      web3 = new Web3(provider);
      results = { web3Instance: web3 };
      resolve(store.dispatch(web3Initialized(results)));
        console.log('No web3 instance injected, using Local web3.');

    }
  })
});

export default getWeb3;
