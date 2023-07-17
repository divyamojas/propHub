import React, { useState } from "react";
import { ethers } from "ethers";

import { loader, money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
// import { useStateContext } from "../context";

const ListProperty = () => {
  const navigate = useNavigate();
  const { listProperty } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    area: "",
    category: "",
    location: "",
    basePrice: "",
    imgUrl: "",
    endTime: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.imgUrl, async (exists) => {
      // if (exists) {
      if (true) {
        setIsLoading(false) // true;
        console.log({
          title: form.title.toString(),
          description: form.description.toString(),
          area: form.area * 1,
          basePrice: form.basePrice * 1,
          location: form.location.toString(),
          endTime: new Date(form.endTime).getTime(),
          imgUrl: form.imgUrl.toString(),
          category: form.category.toLowerCase() == 'residential' ? 0 : 1
        });
        await listProperty(
          form.title,
          form.description,
          form.category.toLowerCase() == 'residential' ? 0 : 1,
          form.area * 1,
          form.basePrice * 1,
          form.location,
          new Date(form.endTime).getTime(),
          form.imgUrl
        );
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
            placeholder="Residential or Commercial only!"
            inputType="text"
            value={form.category}
            handleChange={(e) => handleFormFieldChange("category", e)}
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
            inputType="text"
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
          inputType="text"
          value={form.imgUrl}
          handleChange={(e) => handleFormFieldChange("imgUrl", e)}
        />
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Create an Ad for Property"
            styles="bg-[#8c6dfd]"
          />
        </div>
      </form>
    </div>
  );
};

export default ListProperty;
