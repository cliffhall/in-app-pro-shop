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

## Testing on Ropsten
In order to run the app against the Ropsten testnet, do this:
* Install [MetaMask](https://metamask.io/)
* Get some Ether from the [Faucet](https://faucet.metamask.io/)
* Visit the [test installation](https://iaps-test.futurescale.com)

## Technical Discussion
![Building on Ethereum](assets/img/Building-on-Ethereum.png)
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

