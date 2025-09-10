// src/App.jsx
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'

import BackgroundScene from './components/Background3D'
import Skills from './components/Skills'

const Hero = ({ onViewSkills }) => (
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
        onClick={onViewSkills}
        className="bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
      >
        View My Skills
      </button>
    </div>
  </motion.div>
)

function App() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const isSkillsVisible = currentSection === 'skills'

  return (
    <main className="relative h-screen w-screen bg-black">
      {/* 3D Starfield */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2], fov: 200 }}>
          <BackgroundScene isFlying={isSkillsVisible} />
        </Canvas>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {!isSkillsVisible && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onViewSkills={() => setCurrentSection('skills')} />
            </motion.div>
          )}
          {isSkillsVisible && (
            <motion.div
              key="skills"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full"
            >
              <Skills
                onBack={() => setCurrentSection('hero')}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App
