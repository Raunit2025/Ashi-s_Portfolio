import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const ModelViewer = ({ model }) => {
  return (
    <div className="w-full h-2/3 cursor-grab">
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[-1, 1, 4]} intensity={3} />
        <AnimatePresence mode="wait">
          <motion.group
            key={model.id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.45 },
            }}
            exit={{
              opacity: 0,
              scale: 0.6,
              transition: { duration: 0.25 },
            }}
          >
            {model}
          </motion.group>
        </AnimatePresence>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;