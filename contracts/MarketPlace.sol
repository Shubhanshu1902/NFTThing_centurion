// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MarketPlace is ReentrancyGuard {
    // Account which get fees
    address payable public immutable feeAccount;     
    // % of fees   
    uint public immutable feePercent;
    // Number of items 
    uint public itemCount;

    constructor (uint _feePercent){
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    

}