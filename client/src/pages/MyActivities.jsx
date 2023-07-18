import React, { useEffect, useState } from 'react'
import { CustomButton, DisplayProperties } from '../components'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context'

const MyActivities = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [bought, setBought] = useState([]);
  const [listed, setListed] = useState([]);

  const { getProperties } = useStateContext();

  const fetchProperties = async () => {
    setIsLoading(true);
    const data = await getProperties(); // we are fetching data here because we cannot await in useEffect
    if (data.userBought) setBought(data.userBought);
    if (data.userListed) setListed(data.userListed);
  };

  useEffect(() => {
    fetchProperties();
    setIsLoading(false);
  })
  useEffect(() => {

  }, [])
  return (
    <div>
      <DisplayProperties
        title="Properties Bought"
        isLoading={false} // isLoading
        properties={bought}
        nullText="You haven't bought any properties mate!"
      />
      <DisplayProperties
        title="Properties listed for sale"
        isLoading={false} // isLoading
        properties={listed}
        nullText="Go list a property!"
      />
      <div className="flex justify-center items-center mt-[40px]">
        <CustomButton
          btnType="submit"
          title="Sell a property?"
          styles="bg-[#8c6dfd]"
          handleClick={() => navigate('/list-property')}
        />
      </div>
    </div>
  )
}

export default MyActivities