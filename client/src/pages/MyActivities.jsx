import React from 'react'
import { CustomButton, DisplayProperties } from '../components'
import { PROPERTIES } from '../Obj'
import { useNavigate } from 'react-router-dom'

const MyActivities = () => {
  const navigate = useNavigate();
  return (
    <div>
      <DisplayProperties
        title="Properties Bought"
        isLoading={false} // isLoading
        properties={PROPERTIES}
        nullText="You haven't bought any properties mate!"
      />
      <DisplayProperties
        title="Properties sold"
        isLoading={false} // isLoading
        properties={[]}
        nullText="You haven't sold any property yet!"
      />
      <DisplayProperties
        title="Properties listed for sale"
        isLoading={false} // isLoading
        properties={[]}
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