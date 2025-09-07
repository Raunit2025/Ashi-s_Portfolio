// src/components/ProjectsBackgroundExamples.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Dodecahedron, Box } from '@react-three/drei';

// Example 1: This one was already correct as it doesn't use hooks
export const CrystalScene = () => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={3} />
      <Dodecahedron args={[1.5, 0]}>
        <meshStandardMaterial 
          color="#9370DB"
          roughness={0.1} 
          metalness={0.9} 
        />
      </Dodecahedron>
    </Canvas>
  </div>
);


// ==== CORRECTED Example 2: Wireframe Scene ====
// We moved the hook and the 3D objects into this new inner component
const WireframeContent = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.x += delta / 4;
    groupRef.current.rotation.y += delta / 6;
  });

  return (
    <>
      <ambientLight intensity={2} />
      <group ref={groupRef}>
        <Box args={[1, 1, 1]} rotation={[0.4, 0.2, 0]}>
          <meshBasicMaterial color="#FF1493" wireframe />
        </Box>
        <Box args={[1, 1, 1]} scale={0.5} rotation={[0.1, 0.5, 0]}>
          <meshBasicMaterial color="#00BFFF" wireframe />
        </Box>
      </group>
    </>
  );
};

export const WireframeScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <WireframeContent />
      </Canvas>
    </div>
  );
};


// ==== CORRECTED Example 3: Floating Cubes Scene ====
// We did the same here: moved the hook and objects into an inner component
const FloatingCubesContent = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t / 4) / 2;
    groupRef.current.rotation.x = Math.cos(t / 4) / 2;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <group ref={groupRef}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Box 
            key={i} 
            args={[0.2, 0.2, 0.2]} 
            position={[(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5]}
          >
            <meshStandardMaterial color={i % 2 === 0 ? "#FFD700" : "#ADFF2F"} roughness={0.5} metalness={0.5} />
          </Box>
        ))}
      </group>
    </>
  );
};

export const FloatingCubesScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <FloatingCubesContent />
      </Canvas>
    </div>
  );
};