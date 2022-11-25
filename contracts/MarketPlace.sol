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

    struct Item {
        uint itemId; //Id of the item
        IERC721 nft; //instance of nft contract
        uint tokenId; //Token Id
        uint price; //price of the nft
        address payable seller; // Seller address
        bool sold; // True if sold else false
    }

    mapping(uint => Item) public items;

    //indexed will allow us to search for offered event
    //using nft and seller
    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function createItem(
        IERC721 _nft,
        uint _tokenId,
        uint _price
    ) external nonReentrant {
        require(_price > 0, "Price must be greater than 0");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);

        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit Offered(itemCount, address(_nft), _tokenId, _price, msg.sender);
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint totalPrice = gettotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "Item does not exist");
        require(msg.value >= totalPrice, "Money where");
        require(!item.sold,"Item not for sale");

   
        item.seller.transfer(item.price);
        feeAccount.transfer(totalPrice - item.price);

        item.sold = true;

        // Transfer the nft ownership
        // Converting the interger value into bytes and the bytes value will be converted back to integer to calculate the transaction amount.
        uint256 cprice = item.price;
        bytes memory b = new bytes(32);
        assembly { mstore(add(b, 32),cprice)}
        item.nft.safeTransferFrom(address(this), msg.sender, item.tokenId,b);


        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function gettotalPrice(uint _itemId) public view returns (uint) {
        return (items[_itemId].price * (100 + feePercent)) / 100;
    }
}
