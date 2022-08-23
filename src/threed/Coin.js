import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

export function Coin(props) {
    const { nodes, materials } = useGLTF("/coin_model.glb");
    const meshRef = useRef();

    const [rotDelta] = useState(new THREE.Vector3());
    const [curRotVect] = useState(new THREE.Vector3());

    useFrame(() => {
        rotDelta.copy(curRotVect);
        curRotVect.lerp(props.rotVect, 0.01);
        rotDelta.set(curRotVect.x - rotDelta.x, curRotVect.y - rotDelta.y);

        meshRef.current.rotation.setFromVector3(curRotVect);

        if (props.alignRotation)
            props.alignRotation(rotDelta.length());
    });

    useEffect(() => {
        document.getElementById('splash').style.display = 'none';
    });

    return (
        <group {...props} dispose={null}>
            <mesh
                ref={meshRef}
                castShadow
                receiveShadow
                geometry={nodes.Coin.geometry}
                material={materials.Material}
                scale={1.5}
            />
        </group>
    );
}

useGLTF.preload("/coin_model.glb");