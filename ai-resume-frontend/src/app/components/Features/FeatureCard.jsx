import React from 'react'


const FeatureCard = ({heading,description}) => {
  return (
    <div className="max-w-5xl mx-auto gap-10">
        <div className="p-6 w-[475px] bg-gray-50 rounded-xl shadow-sm">
          <h4 className="text-xl text-black font-semibold mb-2">{heading}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
    </div>
  )
}

export default FeatureCard
