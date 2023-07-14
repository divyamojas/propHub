import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { home_50 } from "../assets";

const CampaignDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // const { donate, deleteCampaign, getDonations, contract, address } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState("");
    const [bids, setBids] = useState([]);

    const remainingDays = daysLeft(state.endTime);

    const handleBid = async () => {
        setIsLoading(true);

        await donate(state.pId, amount);
        setIsLoading(false);
        navigate("/");
    };
    // const handleDelete = async () => {
    //     setIsLoading(true);

    //     await deleteCampaign(state.pId);
    //     setIsLoading(false);
    //     navigate("/");
    // };

    // const fetchDonators = async () => {
    //     const data = await getDonations(state.pId);

    //     setBids(data);
    // };

    console.log(state);
    // useEffect(() => {
    //     if (contract) fetchDonators();
    // }, [contract, address]);
    return (
        <div>
            {isLoading && <Loader />}
            <div className="w-full flex md:flex-row flex-col mt-[10px] gap-[30px]">
                <div className="flex-1 flex-col">
                    <img
                        src={state.imgUrl}
                        alt="campaign"
                        className="w-full h-[410px] object-cover rounded-xl"
                    />
                    <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded-xl">
                        <div
                            className="absolute h-full bg-[#4acd8d] rounded-xl"
                            style={{
                                width: `${calculateBarPercentage(
                                    state.endTime,
                                    1111111111111
                                )}%`,
                                maxWidth: "100%",
                            }}
                        ></div>
                    </div>
                </div>

                <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                    <CountBox title="Days Left" value={remainingDays} />
                    <CountBox
                        title={`Highest Bid `}
                        value={/*state.amountCollected*/ 129}
                    />
                    <CountBox title="Base Price" value={state.basePrice} />
                    <CountBox title="Total Bids" value={bids.length} />
                </div>
            </div>

            <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
                <div className="flex-[2] flex flex-col gap-[40px]">
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                            Seller
                        </h4>
                        <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                            <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                                <img
                                    src={home_50}
                                    alt="user"
                                    className="w-[60%] h-[60%] object-contain"
                                />
                            </div>
                            <div>
                                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                                    {state.owner}
                                </h4>
                                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                                    10 Campaigns
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                            Description
                        </h4>
                        <div className="mt-[20px]">
                            <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                {state.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-start w-full">
                        <div className="mr-20">

                            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                                Base Price
                            </h4>
                            <div className="mt-[20px]">
                                <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                    {state.basePrice}
                                </p>
                            </div>
                        </div>
                        <div className="">
                            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                                Location
                            </h4>
                            <div className="mt-[20px]">
                                <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                    {state.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                            Bidders
                        </h4>
                        <div className="mt-[20px] flex flex-col gap-4">
                            {bids.length > 0 ? (
                                bids.map((item, index) => (
                                    <div
                                        key={`${item.donator}-${index}`}
                                        className="flex justify-between items-center gap-4"
                                    >
                                        <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                                            {index + 1}. {item.donator}
                                        </p>
                                        <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                                            {item.donation} Eth
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                                    No bidders yet. Be the first bidder
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                        Bid
                    </h4>
                    <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                        <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
                            Bid for your property
                        </p>
                        <div className="mt-[30px]">
                            <input
                                type="number"
                                placeholder="ETH 0.1"
                                step="0.01"
                                className="w-full my-[20px] py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            {/* <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                                <h4 className="font-epilogue font-semibold text-[14px] leading[22px] text-white">
                                    Back it because you believe in it
                                </h4>
                                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                                    Support the project for no reward, just because it speaks for
                                    you.
                                </p>
                            </div> */}
                            <CustomButton
                                btnType="button"
                                title="Raise Bid"
                                styles="w-full bg-[#8c6dfd]"
                                handleClick={handleBid}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="mt-[30px]">
                <CustomButton
                    btnType="button"
                    title="Delete Campaign"
                    styles="w-full bg-transparent text-red border-[1px] border-[red]"

                    deleteButton={true}
                    handleClick={handleDelete}
                />
            </div> */}
        </div>
    );
};

export default CampaignDetails;
