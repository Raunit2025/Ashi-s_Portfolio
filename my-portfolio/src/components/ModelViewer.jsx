// src/components/ModelViewer.jsx
import React from 'react';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

const ModelViewerContent = ({ model }) => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-1, 1, 4]} intensity={3} />
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
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export default ModelViewerContent;