import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Stars, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import AssetViewer from './AssetViewer';
import { WAYPOINTS, PROJECTS } from '../constants';

interface ExperienceProps {
  wireframeMode: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ wireframeMode }) => {
  const scroll = useScroll();
  const { camera, mouse } = useThree();
  
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const tempLook = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const offset = scroll.offset;
    const segmentCount = WAYPOINTS.length - 1;
    const rawIndex = offset * segmentCount;
    const segment = Math.min(Math.floor(rawIndex), segmentCount - 1);
    const segmentProgress = rawIndex % 1;

    const startWP = WAYPOINTS[segment];
    const endWP = WAYPOINTS[segment + 1];

    if (startWP && endWP) {
      tempPos.lerpVectors(startWP.pos, endWP.pos, segmentProgress);
      tempLook.lerpVectors(startWP.look, endWP.look, segmentProgress);

      // Mouse Parallax Influence
      const parallaxX = mouse.x * 0.5;
      const parallaxY = mouse.y * 0.5;
      tempPos.x += parallaxX;
      tempPos.y += parallaxY;

      camera.position.lerp(tempPos, delta * 3);
      targetLook.lerp(tempLook, delta * 3);
      camera.lookAt(targetLook);
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f2ff" />
      <spotLight position={[-20, 20, 10]} angle={0.15} penumbra={1} intensity={3} color="#ff004c" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <gridHelper args={[200, 100, 0x222222, 0x050505]} position={[0, -8, 0]} />
      
      {PROJECTS.map((project) => (
        <group key={project.id} position={project.position}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <AssetViewer 
              type={project.type}
              wireframe={wireframeMode} 
              color={project.color}
              accentColor={project.accent}
              scale={project.scale}
            />
          </Float>
          <Text
            position={[0, project.scale + 1.5, 0]}
            fontSize={0.4}
            color={project.color}
            fillOpacity={0.4}
            anchorX="center"
            anchorY="middle"
          >
            {project.id}_DATA_STREAM
          </Text>
        </group>
      ))}
    </>
  );
};

export default Experience;
