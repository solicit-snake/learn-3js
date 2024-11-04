import React from 'react'
import Slider from './Slider'

// takes a properties variable
export default function ControlBox(props) {
  // const {properties, setProperties, label, min, max, step} = props
  const {properties, setProperties} = props
  
  return (
    <div className='control-box'>
      {
        //Goes through the properties & prints out control boxes
        Object.entries(properties).map(([propertyName, propertyValue]) => (
          <div key={propertyName} className='control-box-property'>
            <h3>{propertyName}</h3>
            {Object.entries(propertyValue).map(([subPropertyName, subPropertyValue]) => (
              <Slider label={subPropertyName} min={-10} max={10} step={0.1} defaultValue={subPropertyValue} onChange={(value) => setProperties({...properties, [propertyName]: {...properties[propertyName], [subPropertyName]: value}})}/>
            ))}
          </div>
        )
      )
      }
    </div>
  )
}
