// src/components/Background3D.jsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { MathUtils } from 'three';

const Stars = (props) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(10000 * 3), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial 
          transparent 
          color="#ffffff" 
          size={0.004}
          sizeAttenuation 
          depthWrite={false} 
        />
      </Points>
    </group>
  );
};

const Scene = ({ isFlying }) => {
  useFrame((state) => {
    const targetZ = isFlying ? -10 : 2;
    // Slower camera movement (speed changed from 0.04 to 0.02)
    state.camera.position.z = MathUtils.lerp(state.camera.position.z, targetZ, 0.02);

    const targetFov = isFlying ? 90 : 75;
    // Slower FOV animation (speed changed from 0.04 to 0.02)
    state.camera.fov = MathUtils.lerp(state.camera.fov, targetFov, 0.02);
    
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <Stars />
    </>
  );
};

const Background3D = ({ isFlying }) => {
  return (
    <div className="w-full h-full fixed inset-0">
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <Scene isFlying={isFlying} />
      </Canvas>
    </div>
  );
};

export default Background3D;