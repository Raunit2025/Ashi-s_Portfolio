
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import AssetViewer from './AssetViewer';

interface ExperienceProps {
  wireframeMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ wireframeMode }) => {
  const scroll = useScroll();
  const { camera } = useThree();
  
  // Refined waypoints for a 5-page scroll experience
  const waypoints = [
    { pos: new THREE.Vector3(0, 0, 8), look: new THREE.Vector3(0, 0, 0) },       // Intro
    { pos: new THREE.Vector3(-6, 2, 6), look: new THREE.Vector3(-8, 0, -5) },    // Project 1 Start
    { pos: new THREE.Vector3(6, -2, 4), look: new THREE.Vector3(8, 0, -8) },     // Project 2 Transition
    { pos: new THREE.Vector3(0, -10, 8), look: new THREE.Vector3(0, -12, 0) },   // Project 3 Finale
    { pos: new THREE.Vector3(0, 0, 15), look: new THREE.Vector3(0, 0, 0) },      // Outro
  ];

  const tempPos = new THREE.Vector3();
  const tempLook = new THREE.Vector3();

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 to 1
    
    // Map offset to waypoint segments (4 segments total for 5 points)
    const segmentCount = waypoints.length - 1;
    const rawIndex = offset * segmentCount;
    const segment = Math.min(Math.floor(rawIndex), segmentCount - 1);
    const segmentProgress = rawIndex % 1;

    const startWP = waypoints[segment];
    const endWP = waypoints[segment + 1];

    if (startWP && endWP) {
      tempPos.lerpVectors(startWP.pos, endWP.pos, segmentProgress);
      tempLook.lerpVectors(startWP.look, endWP.look, segmentProgress);

      // Snappier damping for better feedback
      camera.position.lerp(tempPos, delta * 4);
      
      // Smooth look-at
      const targetLook = new THREE.Vector3().copy(tempLook);
      state.camera.lookAt(targetLook);
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff004c" />

      {/* Visual Movement Indicators */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <gridHelper args={[100, 40, 0x111111, 0x080808]} position={[0, -5, 0]} rotation={[0, 0, 0]} />
      <gridHelper args={[100, 40, 0x111111, 0x080808]} position={[0, 15, 0]} rotation={[Math.PI, 0, 0]} />

      {/* Project 1 Group */}
      <group position={[-8, 0, -5]}>
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <AssetViewer 
            type="torus" 
            wireframe={wireframeMode} 
            color="#0ea5e9"
            accentColor="#38bdf8"
            scale={2}
          />
        </Float>
      </group>

      {/* Project 2 Group */}
      <group position={[8, 0, -8]}>
        <Float speed={4} rotationIntensity={2} floatIntensity={2}>
          <AssetViewer 
            type="sphere" 
            wireframe={wireframeMode} 
            color="#f59e0b"
            accentColor="#fbbf24"
            scale={2.5}
          />
        </Float>
      </group>

      {/* Project 3 Group */}
      <group position={[0, -12, 0]}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <AssetViewer 
            type="box" 
            wireframe={wireframeMode} 
            color="#ef4444"
            accentColor="#f87171"
            scale={3}
          />
        </Float>
      </group>

      {/* Subtle Dust/Mote effect */}
      <group>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        ))}
      </group>
    </>
  );
};

export default Experience;
