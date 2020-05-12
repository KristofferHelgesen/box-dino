import React, { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, extend, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";


export const MainCharacter = ({ width,handleSetPos,pos }) => {
  const meshRef = useRef();
  
  const [active, setActive] = useState(false);
  
  const props = useSpring({
    color: active ? "red" : "hotpink",
    width: width,
    position: pos
  });

  const handleJump = (e) => {
    handleSetPos()
  };

  return (
    <a.mesh
    name="mainCharacter"
    position={props.position}
    ref={meshRef}
    onClick={(e) => handleJump(e)}
  >
    <boxBufferGeometry attach="geometry" args={width} />
    <a.meshStandardMaterial attach="material" color={props.color} />
  </a.mesh>
  );
};
/*   */