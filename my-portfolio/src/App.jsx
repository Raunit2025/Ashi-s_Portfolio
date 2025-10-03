import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'

import BackgroundScene from './components/Background3D'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Hero from './components/Hero'

function App() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedSkillId, setSelectedSkillId] = useState(null)


  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const handleViewSkills = () => {
    setCurrentSection('skills');
  }

  const handleBackToHero = () => {
    setCurrentSection('hero');
  }

    const handleBackToSkills = () => {
    setCurrentSection('skills');
  }

  const handleSkillClick = (skillId) => {
    setSelectedSkillId(skillId);
    setCurrentSection('projects');
  }

  const isSkillsVisible = currentSection === 'skills';
  const isProjectsVisible = currentSection === 'projects';
  const isHeroVisible = currentSection === 'hero';


  return (
    <main className="relative h-screen w-screen bg-black">
      {/* 3D Starfield */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 2], fov: 200 }}>
          <BackgroundScene isFlying={isSkillsVisible || isProjectsVisible} />
        </Canvas>
      </div>

      {/* Foreground UI */}
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait">
          {isHeroVisible && (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onViewSkills={handleViewSkills} />
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
                onBack={handleBackToHero}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
                onSkillClick={handleSkillClick}
              />
            </motion.div>
          )}
          {isProjectsVisible && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
                className="h-full w-full"
            >
              <Projects onBack={handleBackToSkills} selectedSkillId={selectedSkillId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default App