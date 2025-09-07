// src/components/Background3D.jsx
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Icosahedron } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { MathUtils } from 'three';

const Stars = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffffff" size={0.003} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

const Scene = () => {
  const sceneRef = useRef();

  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = MathUtils.lerp(sceneRef.current.rotation.y, state.mouse.x * 0.2, 0.05);
      sceneRef.current.rotation.x = MathUtils.lerp(sceneRef.current.rotation.x, -state.mouse.y * 0.2, 0.05);
    }
  });

  return (
    <group ref={sceneRef}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <Stars />
    </group>
  );
};

const Background3D = () => {
  // Removed "-z-10" from the className below
  return (
    <div className="w-full h-full fixed inset-0">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;