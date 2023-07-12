import React from "react";

import { tagType, home_50 } from "../assets";
import { daysLeft, highestBidOnProperty, propertyBids } from "../utils";
import { BIDS } from "../Obj";

const PropertyCard = ({
  propertyId,
  owner,
  title,
  description,
  category,
  area,
  basePrice,
  location,
  imgUrl,
  sold,
  bidIds,
  endTime,
  handleClick
}) => {
  const remainingDays = daysLeft(endTime);
  const categ = ['Residential', 'Commercial'];
  const bids = propertyBids(BIDS, propertyId);
  const maxBid = highestBidOnProperty(BIDS, propertyId);
  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={imgUrl}
        alt="property"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[17px] h-[17px] object-contain"
          />
          {/* create the category functionality */}

          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            {categ[category]}
          </p>
        </div>
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {/* {amountCollected} */}
              {maxBid}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              {/* Raised Of {target} */}
              Highest Bid
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img
              src={home_50}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
            by <span className="text-[#b2b3bd]">{owner}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
