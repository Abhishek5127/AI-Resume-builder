import React from 'react'
import Template2 from '../components/templates/Template3'
import Template3 from '../components/templates/Template1'
import Template4 from '../components/templates/Template4'

const templates = [Template2,Template3,Template4]


const SelectCard = () => {
  return (
    <div>
        <div className="flex w-auto h-auto flex-wrap ">
          {templates.map((Components,index)=>(
            <Components key={index}/>
          ))}
          
          </div>      
    </div>
  )
}

export default SelectCard
