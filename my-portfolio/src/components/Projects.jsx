// src/components/Projects.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Game Design',
    imageUrl: '/project1.png',
  },
  {
    id: 2,
    title: 'Character Modeling',
    category: '3D Art',
    imageUrl: '/project2.png',
  },
  {
    id: 3,
    title: 'Environment Concept',
    category: 'Art & Design',
    imageUrl: '/project3.png',
  },
  {
    id: 4,
    title: 'Project Gamma',
    category: 'Game Development',
    imageUrl: '/project4.png',
  },
];

const marqueeVariants = {
  animate: {
    x: [0, -100 * projectsData.length], 
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 30, 
        ease: 'linear',
      },
    },
  },
};

const Projects = ({ onBack }) => {
  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-white mb-4">My Work</h1>
        <p className="text-slate-400 mb-12">Hover over the belt to pause.</p>
      </div>

      <motion.div 
        className="w-full flex"
        whileHover={{ animationPlayState: 'paused' }}
      >
        <motion.div
          className="flex flex-shrink-0"
          variants={marqueeVariants}
          animate="animate"
        >
          {[...projectsData, ...projectsData].map((project, i) => (
            <motion.div
              key={`${project.id}-${i}`}
              className="group relative w-80 h-60 mx-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg flex-shrink-0"
              whileHover={{ scale: 1.05, zIndex: 10 }}
            >
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-slate-300">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <button 
        onClick={onBack}
        className="mt-16 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default Projects;