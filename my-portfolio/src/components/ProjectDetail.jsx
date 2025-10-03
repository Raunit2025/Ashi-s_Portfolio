import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import ModelViewerContent from './ModelViewer.jsx';
import ImageCompare from './ImageCompare.jsx';

const ProjectDetail = ({ project, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full h-full flex flex-col styled-scrollbar overflow-y-auto p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 md:top-8 md:right-8 bg-white/10 text-white font-bold py-2 px-4 rounded-full border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 z-50"
        >
          &times;
        </button>

        {/* 3D Model Viewer */}
        <div className="w-full h-1/2 md:h-3/5 flex-shrink-0 mt-12 md:mt-0">
          <Canvas camera={{ fov: 45 }}>
            <ModelViewerContent model={project.model} />
          </Canvas>
        </div>

        {/* Project Information */}
        <div className="w-full max-w-4xl mx-auto p-8 md:p-12 text-white">
          
          {/* Image Comparison Section */}
          {project.imageRender && project.imageWireframe && (
            <motion.div 
              className="my-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
               <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">Render vs. Wireframe</h2>
              <ImageCompare 
                beforeImage={project.imageWireframe} 
                afterImage={project.imageRender} 
              />
            </motion.div>
          )}

          {/* Project Title */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
          >
            {project.title}
          </motion.h1>

          {/* Long Description */}
          <motion.p 
            className="text-lg text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          >
            {project.longDescription}
          </motion.p>
          
          {/* Tools & Software Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Tools & Software</h2>
            <div className="flex flex-wrap gap-3">
              {project.tools.map((tool, index) => (
                <span key={index} className="bg-white/10 text-gray-200 py-2 px-4 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;

