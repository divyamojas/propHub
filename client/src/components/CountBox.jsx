import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-centre w-[130px]">
      <h4
        className="font-epilogue font-bold text-[20px] text-white
      p-1 pt-2 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate"
      >
        {value}
      </h4>
      <p
        className="font-epilogue font-semibold text-[14px] text-[#808191]
      bg-[#28282e] px-3 py-2 w-full rounded-b-[10px] text-center"
      >
        {title}
      </p>
    </div>
  );
};

export default CountBox;
