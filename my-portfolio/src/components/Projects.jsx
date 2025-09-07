// src/components/Projects.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Projects = ({ onBack }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      initial={{ opacity: 0 }}
      // Quick fade-in
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      // Quick fade-out
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <h1 className="text-6xl font-bold text-white mb-8">My Work</h1>
      
      <div className="text-slate-400">
        <p>Project gallery will go here.</p>
      </div>

      <button 
        onClick={onBack}
        className="mt-12 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default Projects;