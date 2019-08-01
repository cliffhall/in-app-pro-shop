# In-App Pro Shop
An Ethereum blockchain-based system for in-app purchases implemented as ERC-721 non-fungible tokens.

## Status
* Fully open-sourced.
* Deployed to Ropsten testnet.
* Developers can run locally on Ganache to integrate with their apps or games.

Omitted is the approach to making tokens unique. This can be done in a number of
ways. This project does not offer a prescriptive solution, since each project may
have different requirements.

## Goal
In-App Pro Shop aims to help Ethereum developers easily support in-app
purchases, freeing them to focus their energies on creating a better
product for their users.

Using smart contracts that live on the blockchain and a web-based
maintenance application, IAPS implements a franchise system, whereby
anyone can create a Shop, define and categorize the items they will
sell, and quickly integrate that Shop into their application.

Those applications can then interact with the In-App Pro Shop smart
contracts to allow users to purchase items, which are minted as
[ERC-721 non-fungible tokens](http://erc721.org/).

A configurable percentage of each sale goes to the Franchise Owner
(the contract deployer), and the rest is immediately available for
withdrawal by the Shop Owner. Anyone can create a Shop, and so the
system demonstrates an Ethereum-based franchise revenue model.

Prices are set in a stable fiat currency (USD, EUR, or GBP) so that
sudden swings in ETH price don't make items to expensive or cheap,
keeping the market stable for the Shop Owner.

Current Fiat currency quotes are retrieved from [Fiat Contract](https://fiatcontract.com/)
at time of sale, in order to ensure the purchaser has sent the
appropriate amount of ether for the transaction.

## Background
In-App purchases are an undeniably huge potential revenue stream for any
game or application. Consider that Fortnite sold [over 1 billion dollars in in-game purchases](https://www.gamesindustry.biz/articles/2018-07-17-fortnite-has-earned-usd1-billion-from-in-game-purchases-alone)
in less than a year from it's inception.

But many traditional game platforms are "walled gardens" &mdash; all the
assets that gamers purchase live on servers of the company who wrote the
game. That's good for the company; they're the only source of magic
swords. But for the players, frankly, it sucks.

With Ethereum, those assets could live on the public blockchain, and
actually be *owned* by the users, who could sell or trade them like
CryptoKitties or any other NFT. When a player tires of a game after a year
or two, she could sell all her assets to other players to recoup her
investment.

An interesting potential for apps built on Ethereum is that they can
incorporate existing smart contracts that already live on the blockchain.
For instance, Loom network's [CryptoZombies](https://cryptozombies.io/)
feed on [CryptoKitties](https://www.cryptokitties.co/) which are
[non-fungible tokens](https://en.wikipedia.org/wiki/Non-fungible_token)
created by another app entirely. Game developers could choose to allow
assets from other games to be used in their own, simply by choosing to
support those NFTs, the way CryptoKities can be used in various games in the
['Kittyverse'](https://medium.com/cryptokitties/welcome-to-the-kittyverse-kittybattles-and-kittyhats-9e83bb1ded88).

You still need to write a great game or application, but while those that
serve their users in this way may not extract the maximum revenue from
every signup, they will almost certainly be rewarded by a grateful and
loyal user base.

## Technical Discussion
![Building on Ethereum](docs/assets/img/Building-on-Ethereum.png)
### Building on Ethereum
An eight-part [web series](http://cliffordhall.com/building-on-ethereum) discussing the various aspects of building a non-trivial project with Solidity and React.

* Part 1 – Decisions
* Part 2 – Functionality
* Part 3 – Setup and Test
* Part 4 – Writing Contracts
* Part 5 – Writing Tests
* Part 6 – Bootstrapping the Client
* Part 7 – Client to Contract Communications
* Part 8 – Deployment

## Architecture / Stack
The _In App Pro Shop_ project is composed of:

### Blockchain
Two stratified sets of Solidity contracts, ending with *ProShop.sol* and *StockRoom.sol*, which are deployed.

#### Dependencies
* [Openzepplin-Solidity](https://github.com/OpenZeppelin/openzeppelin-solidity) base contracts for ERC721 tokens, role-based access control, safe math, and more.
* [FiatContract](https://fiatcontract.com) external contract dependency for getting current ETH -> USD/EUR/GBP quotes from the blockchain.
* [Ganache-CLI](https://github.com/trufflesuite/ganache-cli) for running a local blockchain.
* [Truffle](https://github.com/trufflesuite/truffle) for compiling, testing, and migrating contracts to the blockchain.

#### Stockroom Contract Structure
```
* RBAC (Open Zepplin contract for implementing role-based access)
:
* AccessControl (Role-based access, SafeMath, contract pause, unpause, upgrade)
:
* StockRoomBase (Structs, state vars, and mappings related to Shops, SKU Types, and SKUs)
:
* ShopFactory (Factory method and related event for creating new Shops)
:
* SKUTypeFactory (Factory method and related event for creating new SKU Types)
:
* SKUFactory (Factory method and related event for creating new SKUs)
:
* StockRoom (Utility methods for accessing contract data)
```

#### ProShop Contract Structure
```
* ERC721Token (Open Zepplin contract for implementing ERC-721 non-fungible tokens)
:
:  * RBAC (Open Zepplin contract for implementing role-based access)
:  :
:..* AccessControl (Role-based access, SafeMath, contract pause, unpause, upgrade)
:
* ProShopBase (Structs, state vars, and mappings related to Items and balances)
:
* ItemFactory (Factory method and related event for selling and minting new Items)
:
* ProShop (Utility methods for accessing contract and withdrawing balances)
```

### Web
A React/Redux application for maintaining Shops and checking/withdrawing Shop owner and Franchise Owner balances.

#### Dependencies
* [React-scripts](https://www.npmjs.com/package/react-scripts) for managing webpack configuration, compilation, testing, code watching, local server, etc.
* [Babel-core](https://babeljs.io/docs/en/next/babel-core.html) for ES6/7 support.
* [Redux-thunk](https://github.com/reduxjs/redux-thunk) middleware for asynchronous action creators.
* [React-bootstrap](https://react-bootstrap.github.io) for UI components.
* [React-app-rewired](https://github.com/timarney/react-app-rewired) for webpack config overrides to support Styled Components.
* [Styled-components](https://github.com/styled-components/styled-components) for easy application of CSS in JS.
* [Drizzle](https://github.com/trufflesuite/drizzle) and [Drizzle-react](https://github.com/trufflesuite/drizzle-react) for interacting with the blockchain and keeping data fresh.

#### Project Structure
```
+ in-app-pro-shop
|
+---+ contracts (Solidity smart contracts)
|
+---+ docs (Github pages documentation)
|
+---+ migrations (Solidity contract migration scripts)
|
+---+ mock (JS scripts for creating mock contract data)
|
+---+ public (React app HTML template and assets)
|
+---+ src (React store maintenance app)
|   |
|   +---+ abi (compiled Solidity contracts)
|   |
|   +---+ components (React app UI components)
|   |   |
|   |   +---+ theme (Application theme configuration)
|   |       |
|   |       + ---+ kit (Styled component kit)
|   |
|   +---+ constants (Contracts, Events, and other constants)
|   |
|   +---+ domain (JS domain model entities and tests)
|   |
|   +---+ services (JS code for persistence and retrieval)
|   |
|   +---+ store (Redux store, actions, reducers, and tests)
|   |
|   +---+ index.js (React app bootstrap)
|
+---+ test (Solidity contract tests)
```

#  Developer Setup
### Build / Run / Deploy Prerequisites
 * [Node](https://nodejs.org/en/download/) 8.11 or above (also installs npm)

### Install Node modules
* ```cd path/to/in-app-pro-shop``` (instructions in this document will assume you are at this path)

* ``` npm install```

### Install Ganache CLI
* ```npm install -g ganache-cli```

### Install Truffle
* ```npm install -g truffle```

# Development Tasks
## Blockchain
### Start Ganache CLI
An Ethereum client on 127.0.0.1:7545, will start up a local blockchain for testing.

```npm run ganache:start```

### Start Truffle console
Communicates with the Ethereum client, allows compiling, migrating, debugging, etc.

```truffle console```

#### Compile contracts
*truffle(development)>* ```compile```

#### Migrate contracts, replacing previous deployments
*truffle(development)>* ```migrate --reset```

#### Run contract tests
*truffle(development)>* ```test```

#### Execute mock data scripts
*truffle(development)>* ```exec mock/<script-name>.js```

## React App
### Launch application
Compiles, serves, and launches app on http://localhost:3000/. Watches files for changes and reloads app in browser automatically.
Make sure you have launched Ganache first.

```npm run app:start```

### Build application
Creates a production build of the application for deployment

```npm run app:build```

### Run unit tests
Runs all tests found in the /src tree

```npm run app:test```

# License
* In-App Pro Shop - Copyright © 2018-Present Futurescale, Inc.
* All rights reserved.

* Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
  * Neither the name of Futurescale, Inc., In-App Pro Shop, nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.