# in-app-pro-shop
An Ethereum blockchain-based system for in-app purchases

## STATUS
Work in progress.

## PREMISE
An interesting potential for apps built on Ethereum is that they can
incorporate existing smart contracts that live on the blockchain.

For instance, Loom network's [CryptoZombies](https://cryptozombies.io/) feed on [CryptoKitties](https://www.cryptokitties.co/)
which are [non-fungible tokens](https://en.wikipedia.org/wiki/Non-fungible_token) created by another app entirely.

Meanwhile, in the wider gaming world, consider that Fortnite managed to
sell [over 1 billion dollars in in-game purchases](https://www.gamesindustry.biz/articles/2018-07-17-fortnite-has-earned-usd1-billion-from-in-game-purchases-alone) in less than a year
from it's inception.

Games like Fortnite are 'walled gardens'; all the assets that gamers purchase
live on servers of the company who wrote the game. With Ethereum, those
assets could live on the public blockchain, and be sold and traded like
CryptoKitties or any other NFT. And even better, game developers could
choose to allow assets from other games to be used in their own, simply
by choosing to support those NFTs.

The goal of In-app Pro Shop is to allow  developers to add in-app
purchases quickly with an existing system, and also to make it easy for
them to support assets from other apps if they so choose.

# DEVELOPER SETUP
### Build / Run / Deploy Prerequisites
 * [Node](https://nodejs.org/en/download/) 8.11 or above (also installs npm)

### Install Node modules
* ```cd path/to/in-app-pro-shop``` (instructions in this document will assume you are at this path)

* ``` npm install```

### Install Ganache CLI
* ```npm install -g ganache-cli```

### Install Truffle
* ```npm install -g truffle```

## DEVELOPMENT TASKS
### Start Ganache CLI
An Ethereum client, will start up a local blockchain for testing.
```npm run ganache:start```

### Start Truffle console
Communicates with the Ethereum client, allows compiling, migrating, debugging, etc.
```truffle console```

#### Compile contracts
*truffle(development)>* ```compile```

#### Migrate contracts, replacing previous deployments
*truffle(development)>* ```migrate --reset```

#### Run tests
*truffle(development)>* ```test```
