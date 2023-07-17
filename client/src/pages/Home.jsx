import React, { useEffect, useState } from "react";
import { DisplayProperties } from "../components";

import { PROPERTIES } from "../Obj";
import { useStateContext } from "../context";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setproperties] = useState([]);
    const { getProperties } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getProperties(); // we are fetching data here because we cannot await in useEffect
        setproperties(data);
    };

    useEffect(() => {
        fetchCampaigns();
        setIsLoading(false);
    })


    return (

        <DisplayProperties
            title="Properties for sale"
            isLoading={isLoading} // isLoading
            properties={properties}
        />

    );
};

export default Home;
