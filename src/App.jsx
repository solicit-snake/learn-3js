import { useState } from 'react'
import Box from './components/Box'
import Header from './components/Header'
import { Canvas, useFrame } from '@react-three/fiber'
import ControlBox  from './components/ControlBox'

function App() {

  const [box1Properties, setBox1Properties] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  })

  return (
    <>
      <Header/>
      <div className='page'>
        <div className="canvas-container">
          <Canvas className='canvas'>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <Box properties={box1Properties}/>
          </Canvas>
        </div>
        <div className="controls">
          <ControlBox properties={box1Properties} setProperties={setBox1Properties}/>
        </div>
      </div>
    </>
  )
}

export default App
