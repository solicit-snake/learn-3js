import React from 'react'
import Slider from './Slider'


export default function ControlBox(props) {
  const {properties, setProperties, label, min, max, step} = props
  return (
    <div>
      <Slider label="X" min={-10} max={10} step={0.1} defaultValue={properties.position.x} onChange={(value) => setProperties({...properties, position: {...properties.position, x: value}})}/>
      <Slider label="Y" min={-10} max={10} step={0.1} defaultValue={properties.position.y} onChange={(value) => setProperties({...properties, position: {...properties.position, y: value}})}/>
      <Slider label="Z" min={-10} max={10} step={0.1} defaultValue={properties.position.z} onChange={(value) => setProperties({...properties, position: {...properties.position, z: value}})}/>
    </div>
  )
}
