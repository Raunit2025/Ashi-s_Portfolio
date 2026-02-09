
import React, { useEffect, useMemo } from 'react';
import { MeshDistortMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface AssetViewerProps {
  type: 'box' | 'sphere' | 'torus';
  wireframe: boolean;
  color: string;
  accentColor: string;
  modelPath: string;
  scale?: number;
}

const AssetViewer: React.FC<AssetViewerProps> = ({ type, wireframe, color, accentColor, modelPath, scale = 1 }) => {
  const gltf = useGLTF(modelPath, true);
  const scene = useMemo(() => {
    const root = gltf.scene ?? gltf.scenes?.[0];
    return root ? root.clone(true) : null;
  }, [gltf.scene, gltf.scenes]);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const mesh = child as THREE.Mesh;
      const original = mesh.userData.originalMaterial;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (wireframe) {
        if (!original) {
          mesh.userData.originalMaterial = mesh.material;
        }
        mesh.material = new THREE.MeshStandardMaterial({
          color: accentColor,
          emissive: accentColor,
          emissiveIntensity: 1.2,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
      } else if (original) {
        mesh.material = original;
        delete mesh.userData.originalMaterial;
      }
    });
  }, [accentColor, scene, wireframe]);

  return (
    <group scale={scale}>
      {modelPath && scene ? (
        <primitive object={scene} />
      ) : (
        <mesh castShadow receiveShadow>
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
      )}
    </group>
  );
};

export default AssetViewer;
