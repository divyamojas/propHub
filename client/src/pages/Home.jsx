import React, { useEffect, useState } from "react";
import { DisplayProperties } from "../components";

import { useStateContext } from "../context";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const { getProperties } = useStateContext();
    const fetchProperties = async () => {
        setIsLoading(true);
        const data = await getProperties(); // we are fetching data here because we cannot await in useEffect


        const activeProperties = data.properties?.filter(el => el.endTime * 1000 - new Date() > 0)

        if (activeProperties) setProperties(activeProperties);
    };

    useEffect(() => {
        fetchProperties();
        setIsLoading(false);
    }, [])


    return (

        <DisplayProperties
            title="Properties for sale"
            isLoading={isLoading}
            properties={properties}
        />

    );
};

export default Home;
