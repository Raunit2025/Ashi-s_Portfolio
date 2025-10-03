import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import ModelViewerContent from './ModelViewer.jsx';
import ProjectDetail from './ProjectDetail.jsx';
import { projectsData } from '../data/projectsData';

const Projects = ({ onBack, selectedSkillId }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter(project =>
    project.skillIds.includes(selectedSkillId)
  );

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl h-full flex items-center justify-center relative p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              className="glass-container p-4 text-white text-center cursor-pointer"
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              layoutId={`project-card-${project.id}`}
            >
              <div className="h-64 w-full mb-4 pointer-events-none">
                <Canvas camera={{ fov: 45 }}>
                  <ModelViewerContent model={project.model} />
                </Canvas>
              </div>
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-gray-400 mt-2">{project.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <button
        onClick={onBack}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
      >
        Back to Skills
      </button>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;

