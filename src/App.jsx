import { useState, useRef, Suspense, useEffect} from 'react'
import Box from './components/Box'
import Header from './components/Header'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import ControlBox  from './components/ControlBox'
import LightWithHelper from './components/LightWithHelper'
import { EffectComposer, Outline, Selection, Select} from '@react-three/postprocessing'

function App() {
  const [selectedObjectId, setSelectedObjectId] = useState('');

  // Store all 3D objects in a single array with unique IDs
  const [objects, setObjects] = useState([
    {
      id: '1',
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 1.9, y: 3.1, z: 0.3 },
      size: { x: 1, y: 1, z: 1 },
      color: "#a3c2f7",
      title: "box 1"
    },
    {
      id: '2',
      position: { x: 0, y: -2, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      size: { x: 5, y: .2, z: 3 },
      color: "#abeb34",
      title: 'box 2'
    }
  ]);

 

  const [cameraProperties, setCameraProperties] = useState({
    position: { x: 0, y: 0, z: 7},
    rotation: { x: 0, y: 0, z: 0 },
    title: 'camera'
  })

  const [lightProperties, setLightProperties] = useState({
    position: { x: 1, y: 2, z: 0 },
    color: "yellow",
    intensity: 0.8,
    radius: 0,
    title: 'main directional light'
  })

  // Function to add a new object, 
  //TODO:: obviously it will take title and color as arguments
  const addObject = () => {
    const newObject = {
      id: Date.now().toString(),
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      size: { x: 1, y: 1, z: 1 },
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      title: `box ${objects.length + 1}`
    };
    setObjects([...objects, newObject]);
  }

  // Function to remove an object by ID
  const removeObject = (id) => {
    setObjects(objects.filter(obj => obj.id !== id));
    if (selectedObjectId === id) {
      setSelectedObjectId('');
    }
  }

  // Function to update object properties
  const updateObjectProperties = (id, newProperties) => {
    setObjects(objects.map(obj => 
      obj.id === id ? { ...obj, ...newProperties } : obj
    ));
  }

  // Function to clear the selected object when the void is clicked
  const handleVoidClick = () => { 
    setSelectedObjectId('')
  }

  //loads 3d scene
  const {scene} = useGLTF('/3DAssets/Environments/club_atomic/scene.gltf');

  //makes sure the environment scene's child isn't off in woop woop position wise
  useEffect(() => {
    if (scene && scene.children[0]) {
        // Set the first child's position to origin
        scene.children[0].position.set(0, 0, 0);
        // Or if you need specific coordinates:
        // scene.children[0].position.set(x, y, z);
    }
}, [scene]);

  return (
    <>
      <Header/>
      <div className='page'>
        <div className="canvas-container">
          <Canvas className='canvas' shadows camera={{manual: true}} onPointerMissed={() => handleVoidClick()}>

            {/* adds an outline to the selected object */}
            <Selection>
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

              <Suspense fallback={null}>
                    <primitive 
                      object={scene}  
                      position={[0, 0, 0]} 
                      scale={1}
                    />  
                <gridHelper args={[10, 10]} />
              </Suspense>
              

              <LightWithHelper properties={lightProperties} />
              
              {/* Fill light */}
              <directionalLight 
                position={[-5, 3, -5]}
                intensity={0.3}
                color="#b1e1ff"
              />
              <OrbitControls zoomSpeed={0.3} />

              {/* Render all 3D objects */}
              {objects.map(obj => (
                <Select enabled={obj.id === selectedObjectId}>
                  <Box 
                    key={obj.id}
                    properties={obj}
                    onClick={() => setSelectedObjectId(obj.id)}
                  />
                </Select>
                
              ))}
            <EffectComposer multisampling={8} autoClear={false}> 
              <Outline 
                    blur
                    visibleEdgeColor={0xffffff}
                    edgeStrength={10}
                    width={1024}
                  />
            </EffectComposer>
          </Selection>
          </Canvas>
        </div>
        <div className="controls">
          <button 
            onClick={addObject}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add New Box
          </button>

          <ControlBox properties={cameraProperties} setProperties={setCameraProperties}/>
          <ControlBox properties={lightProperties} setProperties={setLightProperties}/>

          {/* Dynamic control boxes for 3D objects */}
          {objects.map(obj => (
            obj.id === selectedObjectId ? 
            <div key={obj.id}>
              <ControlBox
                key={obj.id}
                properties={obj}
                setProperties={(newProps) => updateObjectProperties(obj.id, newProps)}
              />
              <button
                onClick={() => removeObject(obj.id)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div> : null
          ))}
        </div>
      </div>
    </>
  )
}

export default App
