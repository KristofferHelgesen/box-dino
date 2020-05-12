import React, { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, extend, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
 
export const Floor = ({ position,width }) => {
 
  const meshRef = useRef();
  const [active, setActive] = useState(false);

  const props = useSpring({
    color: active ? "red" : "green",
    width:width,
    position:position
  });


  console.log(props)

  const handleClick = () => {
    setActive(!active);
  };

  useFrame(() => {
    //meshRef.current.position.x += 0.01;
  });

  return (
    <a.mesh
      name="floor"
      position={position}
      ref={meshRef}
      onClick={() => handleClick(!active)}
      
    >
      <boxBufferGeometry attach="geometry" args={width} />
      <a.meshStandardMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};
