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

    constructor (
        address _artist,
        address _txFeeToken,
        uint _royalitypercentage
    )
    ERC721("Genshi_ NFT","Genshi_") {
        artist = _artist;
        txFeeToken = _txFeeToken;
        royalitypercentage = _royalitypercentage;
        excludedlist[artist] = true;
    }

    function set_excluded(address excluded, bool status) external{
        require(msg.sender == artist,'artist only');
        excludedlist[excluded] = status;
    }

//     function safeTransferFrom(
//         address from,
//         address to,
//         uint256 tokenId,
//         uint256 cprice
//    ) public {
//         if(excludedlist[from] == false) {
//         _payTxFee(from,cprice);
//         }
//         safeTransferFrom(from, to, tokenId, '');
//    }

  function _payTxFee(address from,uint256 cprice) internal {
    IERC20 token = IERC20(txFeeToken);
   // Modify the amount logic here
    uint256 amountval = (royalitypercentage/100)*(cprice);
    token.transferFrom(from, artist,amountval);
  }


  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes memory _data
  ) public override {
    require(
      _isApprovedOrOwner(_msgSender(), tokenId), 
      'ERC721: transfer caller is not owner nor approved'
    );
    if(excludedlist[from] == false) {
      _payTxFee(from,uint256(bytes32(_data)));
    }
    _safeTransfer(from, to, tokenId, _data);
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


