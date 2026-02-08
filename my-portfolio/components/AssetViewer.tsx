
import React from 'react';
import { MeshDistortMaterial } from '@react-three/drei';

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
      
      <MeshDistortMaterial
        color={wireframe ? '#ffffff' : color}
        wireframe={wireframe}
        speed={wireframe ? 0 : 3}
        distort={wireframe ? 0 : 0.4}
        radius={1}
        roughness={0.05}
        metalness={0.9}
        emissive={wireframe ? accentColor : '#000000'}
        emissiveIntensity={wireframe ? 2 : 0}
      />
    </mesh>
  );
};

export default AssetViewer;
