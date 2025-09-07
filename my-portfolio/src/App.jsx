// src/App.jsx
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from './components/Background3D';
import Projects from './components/Projects';

const Hero = ({ onViewWork }) => (
  <motion.div
    className="min-h-screen flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
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

  return (
    <main className="relative min-h-screen">
      <Background3D isFlying={currentSection === 'projects'} />
      
      <div className="relative z-10">
        {/* The only change is removing mode="wait" from the line below */}
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