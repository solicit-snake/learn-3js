import { useState } from 'react'
import Box from './components/Box'
import { Canvas, useFrame } from '@react-three/fiber'

function App() {

  return (
    <div className="canvas-container">
      <Canvas className='canvas'>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <Box/>
        <Box/>
      </Canvas>
    </div>
  )
}

export default App
