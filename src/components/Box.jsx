import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import { useRef } from 'react'

import React from 'react'

export default function Box(props) {
    const boxRef = useRef();
    const {properties, onClick} = (props)

    //if properties doesn't exist, give it a default value
    if (!properties) 
        properties = {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            size: { x: 1, y: 1, z: 1 },
            color: "0x00ff00",
            title: 'box'
        }

    function updatePosition() {
        boxRef.current.position.x = properties.position.x,
        boxRef.current.position.y = properties.position.y,
        boxRef.current.position.z = properties.position.z
    }

    function updateRotation() {
        boxRef.current.rotation.x = properties.rotation.x,
        boxRef.current.rotation.y = properties.rotation.y,
        boxRef.current.rotation.z = properties.rotation.z
    }

    useFrame((_, delta) => {
        // // Rotate the box static per frame using delta
        // boxRef.current.rotation.x += 1 * delta
        // boxRef.current.rotation.y += 0.5 * delta

        updateRotation()
        updatePosition()
    }, [])

    return (
        <mesh ref={boxRef}
            castShadow 
            receiveShadow
            onClick={()=> {
                console.log('clicked', properties.title);
                onClick()
            }}
        >
            {/* args = dimensions = width, height, depth */}
            <boxGeometry args={[properties.size.x, properties.size.y, properties.size.z]} castShadow  receiveShadow />
            <meshStandardMaterial color={properties.color} />
        </mesh>
    )
}
