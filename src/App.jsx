import { useState } from 'react'
import Box from './components/Box'
import Header from './components/Header'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import ControlBox  from './components/ControlBox'

function App() {

  const [box1Properties, setBox1Properties] = useState({
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 1.9, y: 3.1, z: 0.3 },
    size: { x: 1, y: 1, z: 1 },
    color: "#a3c2f7",
    title: "box 1"
  })

  const [box2Properties, setBox2Properties] = useState({
    position: { x: 0, y: -2, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    size: { x: 5, y: .5, z: 3 },
    color: "#abeb34",
    title: 'box 2'
  })

  const [cameraProperties, setCameraProperties] = useState({
    position: { x: 0, y: 0, z: 5},
    rotation: { x: 0, y: 0, z: 0 },
    title: 'camera'
  })

  return (
    <>
      <Header/>
      <div className='page'>
        <div className="canvas-container">
          <Canvas className='canvas' shadows camera={{manual: true}}>
            {/* Ambient light for overall soft illumination */}
            <ambientLight intensity={0.4} />
            
            <PerspectiveCamera
              makeDefault  // Makes this the active camera
              position={[cameraProperties.position.x, cameraProperties.position.y, cameraProperties.position.z]}
              rotation={[cameraProperties.rotation.x, cameraProperties.rotation.y, cameraProperties.rotation.z]}
              fov={75}
              near={0.1}
              far={1000}
            />

            {/* Main key light */}
            <directionalLight 
              position={[5, 8, 3]}
              intensity={0.8}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
              color="white"
            />
            
            {/* Fill light */}
            <directionalLight 
              position={[-5, 3, -5]}
              intensity={0.3}
              color="#b1e1ff"
            />
            
            {/* Rim light for depth */}
            <spotLight
              position={[0, 5, -5]}
              intensity={0.5}
              color="#ffd1b1"
              angle={0.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <Box properties={box1Properties} />
            <Box properties={box2Properties}></Box>
          </Canvas>
        </div>
        <div className="controls">
          <ControlBox properties={box1Properties} setProperties={setBox1Properties}/>
          <ControlBox properties={cameraProperties} setProperties={setCameraProperties}/>

        </div>
      </div>
    </>
  )
}

export default App
