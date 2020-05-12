import React, { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, extend, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
 
export const Bird = ({ width, position,mainCharacterPos }) => {
  const meshRef = useRef();
  let [intersects, setIntersects] = useState(false);

  const props = useSpring({
    color: intersects ? "red" : "#f5e042",
    width: width,
    position: position,
  });
 

  const roundedNumber = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  useFrame(() => {
    if (!intersects) {
      meshRef.current.position.x -= 0.01;
    }

    const currentPosition = meshRef.current.position;
    //This is the place where i would like to improve. Need to calculate from center to center of theese objects and then the width /2 from center * 2 of the 2 objects 
    if (roundedNumber(currentPosition.x) + 1 == roundedNumber(mainCharacterPos[0])+2) {
       if(roundedNumber(currentPosition.y) + 1 == roundedNumber(mainCharacterPos[1]+2)){
        setIntersects(true);
       }
      
    }
  });

  return (
    <a.mesh name="bird" position={props.position} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={width} />
      <a.meshStandardMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};
