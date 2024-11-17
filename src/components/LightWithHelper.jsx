import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LightWithHelper(props) {
    let {properties} = (props)

    if (!properties) 
        properties = {
            position: { x: 2, y: 2, z: 0 },
            color: "yellow",
            intensity: 1,
            radius: 0.1
        }

    
    const lightRef = useRef()
    const circleRef = useRef()

    // Create a circle geometry to show around the light
    const circle = (
        <mesh
            ref={circleRef}
            position={[properties.position.x, properties.position.y, properties.position.z]}
            rotation={[Math.PI / 2, 0, 0]} // Rotate to be horizontal
            onClick={() => {
                console.log('clicked', properties.title);
            }}
        >
        <ringGeometry args={[properties.radius, properties.radius + 0.3, 32]} />
        <meshBasicMaterial color={properties.color} side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
    )

    // Optional: make the circle always face the camera
    useFrame(({ camera }) => {
        if (circleRef.current) {
        circleRef.current.quaternion.copy(camera.quaternion)
        }
    })

    return (
        <>
            <directionalLight
                ref={lightRef}
                position={[properties.position.x, properties.position.y, properties.position.z]}
                intensity={properties.intensity}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                color="white"
            />
            {circle}
        </>
    )
}