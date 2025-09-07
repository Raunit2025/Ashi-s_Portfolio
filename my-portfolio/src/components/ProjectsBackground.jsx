// src/components/ProjectsBackground.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere } from '@react-three/drei';
import { MathUtils } from 'three';

const Scene = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta / 5;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-1, 1, 2]} intensity={2} />

      <Torus args={[1, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#8A2BE2" roughness={0.3} metalness={0.9} />
      </Torus>

      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#40E0D0" roughness={0.1} metalness={1} />
      </Sphere>
    </group>
  );
};

const ProjectsBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default ProjectsBackground;