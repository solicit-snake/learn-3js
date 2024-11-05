import React from 'react'
import Slider from './Slider'

// takes a properties variable
export default function ControlBox(props) {
  // const {properties, setProperties, label, min, max, step} = props
  const {properties, setProperties} = props

  const customizableVariables = ['position', 'rotation', 'size']
  
  return (
    <div className='control-box'>
      <h3>Controlling {properties.title}</h3>
      {Object.entries(properties)
        .filter(([propertyName]) => customizableVariables.includes(propertyName))
        .map(([propertyName, propertyValue]) => (
          <div key={propertyName} className='control-box-property'>
          <h4>{propertyName}</h4>
          {Object.entries(propertyValue).map(([subPropertyName, subPropertyValue]) => (
            <Slider 
              key={`${propertyName}-${subPropertyName}`}
              label={subPropertyName} 
              min={-10} 
              max={10} 
              step={0.1} 
              defaultValue={subPropertyValue} 
              onChange={(value) => setProperties({
                ...properties, 
                [propertyName]: {
                  ...properties[propertyName], 
                  [subPropertyName]: value
                }
              })}
            />
      ))}
    </div>
  ))
}
    </div>
  )
}
