import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { loader } from "../assets";
import PropertyCard from "./PropertyCard";
// import { useStateContext } from "../context";

const DisplayProperties = ({ title, isLoading, properties }) => {
  const navigate = useNavigate();

  properties.sort((a, b) => a.endTime - b.endTime);
  

  const handleNavigate = (property) => {
    navigate(`/property-details/${property.propertyId}`, { state: property });
  };

  return (
    <div className="">
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({properties.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] mb-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {/* {console.log('hi')
        } */}
        {!isLoading && properties.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No properties listed for sale!
          </p>
        )}

        {!isLoading &&
          properties.length > 0 &&
          properties.map((property, i) => (
            <PropertyCard
              key={i}
              {...property}
              handleClick={() => handleNavigate(property)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayProperties;
