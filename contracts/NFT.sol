// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    
    address public artist;
    address public txFeeToken;
    uint public royalitypercentage;
    mapping(address => bool) public excludedlist;
    uint public balance;

    constructor (
        // address _txFeeToken,
        uint _royalitypercentage
    )
    ERC721("Genshi_ NFT","Genshi_") {
        artist = msg.sender;
        // txFeeToken = _txFeeToken;
        royalitypercentage = _royalitypercentage;
        excludedlist[artist] = true;
    }

    function set_excluded(address excluded, bool status) external{
        require(msg.sender == artist,'artist only');
        excludedlist[excluded] = status;
    }

  function _payTxFee(address from,uint256 cprice) internal{
    IERC20 token = IERC20(txFeeToken);
   // Modify the amount logic here
    uint256 amountval = (royalitypercentage/100)*(cprice);
    token.transferFrom(from, artist,amountval);
  }


  function safeTransfernew(
    address from,
    address to,
    uint256 tokenId,
    bytes memory _data
  ) public payable{
   
  }
    uint public royalityval; 
receive ()payable external{
    balance = msg.value;
    uint royalityval = (royalitypercentage/100)*balance;    
    payable(artist).transfer(msg.value);
    // _safeTransfer(from, sender, tokenId, _data);
    balance = 0;


  //do nothing
}


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