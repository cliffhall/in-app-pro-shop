pragma solidity ^0.5.0;

/*

    Crypto Market Prices via Ethereum Smart Contract

    A community driven smart contract that lets your contracts use fiat
    amounts in USD, EURO, and GBP. Need to charge $10.50 for a contract call?
    With this contract, you can convert ETH and other crypto's.

    Repo: https://github.com/hunterlong/coinmarketcontract

    Examples:

      FiatContract price = FiatContract(CONTRACT_ADDRESS);

      uint256 ethCent = price.USD(0);        // returns $0.01 worth of ETH in USD.
      uint256 weiAmount = ethCent * 2500     // returns $25.00 worth of ETH in USD
      require(msg.value == weiAmount);       // require $25.00 worth of ETH as a payment
      
    Please look at Repo or Website to get Currency ID values.

    @author Hunter Long
*/

contract FiatContract {

    mapping(uint => Token) public tokens;

    address public sender;

    event NewPrice(uint id, string token);

    struct Token {
        string name;
        uint256 eth;
        uint256 usd;
        uint256 eur;
        uint256 gbp;
        uint block;
    }

    // initialize function
    constructor() public {
        sender = msg.sender;
    }

    // returns rate price of coin related to ETH.
    function ETH(uint _id) view public returns (uint256) {
        return tokens[_id].eth;
    }

    // returns 0.01 value in United States Dollar
    function USD(uint _id) view public returns (uint256) {
        return tokens[_id].usd;
    }

    // returns 0.01 value in Euro
    function EUR(uint _id) view public returns (uint256) {
        return tokens[_id].eur;
    }

    // returns 0.01 value in British Pound
    function GBP(uint _id) view public returns (uint256) {
        return tokens[_id].gbp;
    }

    // returns block when price was updated last
    function updatedAt(uint _id) view public returns (uint) {
        return tokens[_id].block;
    }

    // update market rates in USD, EURO, and GBP for a specific coin
    function update(uint id, string calldata _token, uint256 eth, uint256 usd, uint256 eur, uint256 gbp) external {
        require(msg.sender==sender);
        tokens[id] = Token(_token, eth, usd, eur, gbp, block.number);
        emit NewPrice(id, _token);
    }

    // default function so this contract can accept ETH with low gas limits.
    function() payable external {

    }

}
