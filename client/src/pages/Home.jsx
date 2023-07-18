import React, { useEffect, useState } from "react";
import { DisplayProperties } from "../components";

import { useStateContext } from "../context";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [properties, setproperties] = useState([]);
    const { getProperties } = useStateContext();

    const fetchProperties = async () => {
        setIsLoading(true);
        const data = await getProperties(); // we are fetching data here because we cannot await in useEffect
        if (data.properties) setproperties(data.properties);
    };

    useEffect(() => {
        fetchProperties();
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
