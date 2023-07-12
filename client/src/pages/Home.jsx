import React, { useEffect, useState } from "react";
import { DisplayProperties } from "../components";

import { PROPERTIES } from "../Obj";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setproperties] = useState([]);


    // const fetchCampaigns = async () => {
    //     setIsLoading(true);
    //     const data = await getCampaigns(); // we are fetching data here because we cannot await in useEffect
    //     setCampaigns(data);
    //     setIsLoading(false);
    // };


    return (

        <DisplayProperties
            title="Properties for sale"
            isLoading={false} // isLoading
            properties={PROPERTIES}
        />

    );
};

export default Home;
