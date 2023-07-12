import React, { useState } from "react";
import { ethers } from "ethers";

import { loader, money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useNavigate } from "react-router-dom";
// import { useStateContext } from "../context";

const ListProperty = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    // propertyId: "",
    // owner: "",
    title: "",
    category: "",
    description: "",
    area: "",
    location: "",
    basePrice: "",
    imgUrl: "",
    // sold: "",
    // bidIds: "",
    endTime: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.imgUrl, async (exists) => {
      if (exists) {
        setIsLoading(true);
        console.log(form);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, imgUrl: "" });
      }
    });
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Sell a Property
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[40px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Title *"
            placeholder="e.g. 2BHK Flat"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
          <FormField
            labelName="Category *"
            placeholder="Residential or Commercial"
            inputType="text"
            value={form.category}
            handleChange={(e) => handleFormFieldChange("description", e)}
          />
        </div>
        <FormField
          labelName="Description *"
          placeholder="Describe your property and details."
          isTextArea
          inputType="text"
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        {/* <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div> */}
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Area *"
            placeholder="in square feet only.."
            inputType="number"
            value={form.area}
            handleChange={(e) => handleFormFieldChange("area", e)}
          />
          <FormField
            labelName="Location *"
            placeholder="Enter Property Address"
            inputType="text"
            value={form.location}
            handleChange={(e) => handleFormFieldChange("location", e)}
          />
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Base Price *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.basePrice}
            handleChange={(e) => handleFormFieldChange("basePrice", e)}
          />
          <FormField
            labelName="Bid End Date *"
            placeholder="Bid End Date"
            inputType="date"
            value={form.endTime}
            handleChange={(e) => handleFormFieldChange("endTime", e)}
          />
        </div>
        <FormField
          labelName="Property image *"
          placeholder="Place Image URL of your property here"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Create an Ad for Property"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default ListProperty;
