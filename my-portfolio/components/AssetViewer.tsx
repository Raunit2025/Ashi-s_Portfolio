
import React from 'react';
import { MeshDistortMaterial, MeshWobbleMaterial, MeshTransmissionMaterial } from '@react-three/drei';

interface AssetViewerProps {
  type: 'box' | 'sphere' | 'torus';
  wireframe: boolean;
  color: string;
  accentColor: string;
  scale?: number;
}

const AssetViewer: React.FC<AssetViewerProps> = ({ type, wireframe, color, accentColor, scale = 1 }) => {
  return (
    <mesh castShadow receiveShadow scale={scale}>
      {type === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
      {type === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
      {type === 'torus' && <torusKnotGeometry args={[0.8, 0.25, 256, 32]} />}
      
      {wireframe ? (
        <meshStandardMaterial 
          wireframe 
          color={accentColor} 
          emissive={accentColor} 
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      ) : (
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          roughness={0.05}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      )}
      
      {/* Outer Glow / Fresnel Shell */}
      <mesh scale={1.05}>
        {type === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {type === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {type === 'torus' && <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />}
        <meshStandardMaterial
          color={accentColor}
          transparent
          opacity={wireframe ? 0.2 : 0.05}
          wireframe={!wireframe}
        />
      </mesh>
    </mesh>
  );
};

export default AssetViewer;
