// src/App.jsx
// eslint-disable-next-line no-unused-vars
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
    document.body.style.overflow = 'hidden';
  }, [currentSection]);

  return (
    <main className="relative min-h-screen">
      <Background3D isFlying={currentSection === 'projects'} />
      
      <div className="relative z-10">
        <AnimatePresence>
          {currentSection === 'hero' && (
            <Hero key="hero" onViewWork={() => setCurrentSection('projects')} />
          )}
          {currentSection === 'projects' && (
            <Projects key="projects" onBack={() => setCurrentSection('hero')} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
