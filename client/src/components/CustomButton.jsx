import React from "react";

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
  deleteButton,
}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue text-[16px] leading-[26px] text-white font-semibold min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
