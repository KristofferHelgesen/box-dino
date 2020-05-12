import "./App.css";
import { Floor } from "./components/3dobjects/floor";
import React, { useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { MainCharacter } from "./components/3dobjects/characters/main";
import { Bird } from "./components/3dobjects/characters/bird";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

extend({ OrbitControls });
const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });
  return <orbitControls ref={orbitRef} args={[camera, gl.domElement]} />;
};

function App() {
  const { raycaster } = useThree();
  const canvasContainerStyle = {
    width: "80vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "white",
  };

  const [jumping, setJumping] = useState(false);

  const [pos, setPos] = useState([-2, -1, 0]);

  const handleSetPos = () => {
    setJumping(!jumping);

    if (JSON.stringify(pos) === JSON.stringify([-2, -1, 0])) {
      setPos([-2, 3, 0]);
    } else {
      setPos([-2, -1, 0]);
    }
  };

  return (
    <div style={canvasContainerStyle}>
      <Canvas>
        <ambientLight />
        <spotLight position={[5, 5, 5]} />
        <Controls />
        <MainCharacter
          width={[1, 2, 1]}
          handleSetPos={() => handleSetPos()}
          pos={pos}
        />
        <Bird width={[1, 1, 1]} position={[0.4, 0, 0]} mainCharacterPos={pos} />
        <Floor width={[7, 1, 1]} position={[0, -2.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
