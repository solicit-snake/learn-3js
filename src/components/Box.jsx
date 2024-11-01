import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { BoxGeometry } from 'three'
import { useRef } from 'react'

import React from 'react'

export default function Box(props) {
    const boxRef = useRef();

    useFrame((_, delta) => {
        boxRef.current.rotation.x += 1 * delta
        boxRef.current.rotation.y += 0.5 * delta
    }, [])

    return (
        <mesh {...props} ref={boxRef}>
            <boxGeometry />
            <meshBasicMaterial color={0x00ff00} />
        </mesh>
    )
}
