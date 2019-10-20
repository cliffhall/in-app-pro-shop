pragma solidity ^0.5.0;


/**
 * @title FiatContractInterface
 * @notice Interface for third-party contract FiatContract (see: https://fiatcontract.com/)
 */
interface  FiatContractInterface {

    function ETH(uint _id) external view returns (uint256);

    function USD(uint _id) external view returns (uint256);

    function EUR(uint _id) external view returns (uint256);

    function GBP(uint _id) external view returns (uint256);

    function updatedAt(uint _id) external view returns (uint);
}
