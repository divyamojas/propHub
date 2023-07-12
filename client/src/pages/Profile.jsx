import React, { useEffect, useState } from "react";
import DisplayCampaigns from "../components/DisplayProperties";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);


  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns(); // we are fetching data here because we cannot await in useEffect
    setCampaigns(data);
    setIsLoading(false);
  };

  return (
    <DisplayCampaigns
      title="Your Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
