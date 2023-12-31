// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PropHub {
    enum PropertyCategory {
        Residential,
        Commercial
    }

    struct Property {
        uint256 propertyId;
        address payable owner;
        string title;
        string description;
        PropertyCategory category;
        uint256 area;
        uint256 basePrice;
        string location;
        bool sold;
        uint256[] bidIds;
        uint256 endTime;
        string imgUrl;
    }

    struct Bid {
        uint256 propertyId;
        address payable bidder;
        uint256 amount;
        bool refunded;
    }

    mapping(uint256 => Property) public properties;
    mapping(uint256 => Bid) public bids;
    uint256 public propertyIdCounter;
    uint256 public bidIdCounter;

    constructor() {
        propertyIdCounter = 1;
        bidIdCounter = 1;
    }

    function listProperty(
        string memory _title,
        string memory _description,
        PropertyCategory _category,
        uint256 _area,
        uint256 _basePrice,
        string memory _location,
        uint256 _bidDuration,
        string memory imgUrl
    ) external returns (uint256) {
        require(_basePrice > 0, "Base price must be greater than zero");

        uint256 endTime = block.timestamp + _bidDuration;

        Property memory newProperty = Property(
            propertyIdCounter,
            payable(msg.sender),
            _title,
            _description,
            _category,
            _area,
            _basePrice,
            _location,
            false,
            new uint256[](0),
            endTime,
            imgUrl
        );

        properties[propertyIdCounter] = newProperty;
        propertyIdCounter++;
        return propertyIdCounter - 1;
    }

    function bidProperty(uint256 _propertyId) external payable returns (bool) {
        Property storage property = properties[_propertyId];
        require(!property.sold, "Property is already sold");
        require(msg.sender != property.owner, "Cannot bid on own property");
        require(
            msg.value > property.basePrice,
            "Bid price must be higher than base price"
        );

        require(block.timestamp < property.endTime, "Bidding is closed");

        Bid memory newBid = Bid({
            propertyId: _propertyId,
            bidder: payable(msg.sender),
            amount: msg.value,
            refunded: false
        });

        uint256 bidId = bidIdCounter;
        bids[bidId] = newBid;
        properties[_propertyId].bidIds.push(bidId);

        bidIdCounter++;
        return true;
    }

    function closeBidding(uint256 _propertyId) external returns (bool) {
        Property storage property = properties[_propertyId];
        require(!property.sold, "Property is already sold");
        require(property.bidIds.length > 0, "No bids placed");
        require(block.timestamp >= property.endTime, "Bidding is still open");

        uint256 highestBid = property.basePrice;
        address payable highestBidder;

        uint256[] storage bidIds = property.bidIds;

        for (uint256 i = 0; i < bidIds.length; i++) {
            Bid storage bid = bids[bidIds[i]];
            uint256 bidAmount = bid.amount;
            if (bidAmount > highestBid) {
                highestBid = bidAmount;
                highestBidder = bid.bidder;
            }
        }

        require(highestBidder != address(0), "No valid bids");

        for (uint256 i = 0; i < bidIds.length; i++) {
            Bid storage bid = bids[bidIds[i]];
            address payable bidder = bid.bidder;
            uint256 bidAmount = bid.amount;
            if (bidder != highestBidder && !bid.refunded) {
                bidder.transfer(bidAmount);
                bid.refunded = true;
            }
        }

        property.owner.transfer(highestBid);
        property.owner = highestBidder;
        property.sold = true;

        return true;
    }
}
