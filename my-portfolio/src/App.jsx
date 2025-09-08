// src/App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from './components/Background3D';
import Projects from './components/Projects';

const Hero = ({ onViewWork }) => (
  <motion.div
    className="min-h-screen flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.5 } }}
    exit={{ opacity: 0, transition: { duration: 0.5 } }}
  >
    <div className="text-center max-w-4xl p-4">
      <h1 className="text-6xl font-bold text-white mb-4">Ashi's Portfolio</h1>
      <p className="text-xl text-gray-400 mb-8">3D Game Designer & Artist</p>
      <button
        onClick={onViewWork}
        className="bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
      >
        View My Work
      </button>
    </div>
  </motion.div>
);

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  useEffect(() => {
    // We handle scrolling inside the Projects component, so we can keep the body overflow hidden.
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <main className="relative h-screen w-screen bg-black">
      <Background3D isFlying={currentSection === 'projects'} />
      
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {currentSection === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onViewWork={() => setCurrentSection('projects')} />
            </motion.div>
          )}
          {currentSection === 'projects' && (
             <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              <Projects onBack={() => setCurrentSection('hero')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
