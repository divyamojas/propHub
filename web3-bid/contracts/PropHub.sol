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
        uint256 _bidDuration
    ) external returns (bool) {
        require(_basePrice > 0, "Base price must be greater than zero");

        uint256 endTime = block.timestamp + _bidDuration;

        properties[propertyIdCounter] = Property(
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
            endTime
        );

        propertyIdCounter++;

        return true;
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
        property.bidIds.push(bidId);

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

        highestBidder.transfer(highestBid);
        property.owner = highestBidder;
        property.sold = true;

        return true;
    }

    function getProperty(uint256 _propertyId)
        external
        view
        returns (
            uint256,
            address,
            string memory,
            string memory,
            PropertyCategory,
            uint256,
            uint256,
            string memory,
            bool,
            uint256[] memory,
            uint256
        )
    {
        Property memory property = properties[_propertyId];
        return (
            property.propertyId,
            property.owner,
            property.title,
            property.description,
            property.category,
            property.area,
            property.basePrice,
            property.location,
            property.sold,
            property.bidIds,
            property.endTime
        );
    }

    function getPropertyCount() external view returns (uint256) {
        return propertyIdCounter - 1;
    }

    function getBid(uint256 _bidId)
        external
        view
        returns (
            uint256,
            address,
            uint256,
            bool
        )
    {
        Bid memory bid = bids[_bidId];
        return (bid.propertyId, bid.bidder, bid.amount, bid.refunded);
    }

    function getBidCount() external view returns (uint256) {
        return bidIdCounter - 1;
    }
}
