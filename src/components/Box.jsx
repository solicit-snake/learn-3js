import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import { useRef } from 'react'

import React from 'react'

export default function Box(props) {
    const boxRef = useRef();
    const {properties} = (props)

    function updatePosition() {
        boxRef.current.position.x = properties.position.x,
        boxRef.current.position.y = properties.position.y,
        boxRef.current.position.z = properties.position.z
    }

    useFrame((_, delta) => {
        boxRef.current.rotation.x += 1 * delta
        boxRef.current.rotation.y += 0.5 * delta
        updatePosition()
    }, [])

    return (
        <mesh ref={boxRef}>
            <boxGeometry />
            <meshBasicMaterial color={0x00ff00} />
        </mesh>
    )
}
