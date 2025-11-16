import React from 'react'


const FeatureCard = ({heading,description}) => {
  return (
    <div className=" font-poppins max-w-5xl mx-auto gap-10">
        <div className="p-6 w-auto bg-gray-50 rounded-xl shadow-sm">
          <h4 className="text-xl text-black font-semibold mb-2">{heading}</h4>
          <p className="text-black">{description}</p>
        </div>
    </div>
  )
}

export default FeatureCard
