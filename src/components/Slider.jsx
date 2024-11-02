import React, { useState } from 'react';

const Slider = ({ 
  min = 0, 
  max = 100, 
  defaultValue = 50, 
  onChange = (value) => {console.log('onChange: ', value)},
  step = 1,
  label = "Slider",
}) => {
  const [value, setValue] = useState(defaultValue);

  function handleChange(val) {
    console.log('doing the handle change: ', val);
    setValue(Number(val));
    onChange(Number(val));
  }
  
  return (
    <div className="w-full max-w-sm">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}: </label>
        <span className="text-sm text-gray-500">{value}</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        
        <div 
          className="absolute -top-1 w-4 h-4 bg-blue-600 rounded-full shadow"
          style={{
            left: `calc(${((value - min) / (max - min)) * 100}% - 0.5rem)`,
            transition: 'left 0.1s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

export default Slider;