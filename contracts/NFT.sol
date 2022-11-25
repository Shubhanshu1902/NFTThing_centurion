// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    address public artist;
    address public txFeeToken;
    uint public txFeeAmount;
    mapping(address => bool) public excludedlist;

    constructor (
    //     address _artist,
    //     address _txFeeToken,
    //     uint _txFeeAmount
    // ) 
    )ERC721("Genshi_ NFT","Genshi_") {
        // artist = _artist;
        // txFeeToken = _txFeeToken;
        // txFeeAmount = _txFeeAmount;
        // excludedlist[artist] = true;
    }

    // function set_excluded(address excluded, bool status) external{
    //     require(msg.sender == artist,'artist only);
    //     excludedList[excluded] = status;
    // }

    
    // Minting an NFT, or non-fungible token, is publishing a unique
    // digital asset on a blockchain so that it can be bought, sold, and traded.
    // This function will mint the NFT 
    // _tokenURI :- IPFS address 
    // Return number of tokens present
    
    
    
    function mint(string memory _tokenURI) external returns(uint){
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }

}
