import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Re-usable Social Media Icons
const ArtStationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.22 10.49L12 2L9.78 10.49H2l7.55 5.42l-2.88 8.09L12 18.34l5.33 5.66l-2.88-8.09L22 15.91h-7.78Z"/></svg>
);
const LinkedInIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);
const MailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const About = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = ['about', 'contact'];

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <motion.div
      // Further reduced opacity and increased blur for better visibility of the background
      className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-container w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: 0.1, duration: 0.4 } }}
      >
        {/* Header with Tabs */}
        <header className="flex-shrink-0 p-4 border-b border-white/10">
          <div className="flex justify-center space-x-8 relative">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xl font-semibold capitalize transition-colors duration-300 relative py-2 ${
                  activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'about' ? 'About Me' : 'Contact'}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow p-8 styled-scrollbar-vertical overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img 
                      src="https://placehold.co/150x150/1a1a1a/ffffff?text=Ashi" 
                      alt="Ashi, 3D Artist"
                      className="rounded-full border-2 border-cyan-400/50"
                    />
                  </div>
                  <div className="text-lg text-gray-300 leading-relaxed space-y-4 text-center md:text-left">
                    <p>
                      Hello! I'm Ashi, a dedicated 3D Game Designer and Artist driven by a passion for crafting immersive digital experiences. My journey involves bringing fantastical worlds and compelling characters to life through a blend of technical skill and artistic vision.
                    </p>
                    <p>
                      I specialize in a range of disciplines from intricate hard-surface modeling to expressive organic sculpting, always striving for optimized topology and stunning visual fidelity.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div
                key="contact"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <p className="text-lg text-center text-gray-300">
                    I'm always excited about new opportunities and collaborations. Let's connect!
                </p>
                 <a 
                  href="mailto:ashi.designer@example.com"
                  className="group flex items-center gap-4 p-4 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                    <MailIcon />
                    <span className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">ashi.designer@example.com</span>
                </a>
                <a 
                  href="#"
                  className="group flex items-center gap-4 p-4 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                    <ArtStationIcon />
                    <span className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">ArtStation Profile</span>
                </a>
                <a 
                  href="#"
                  className="group flex items-center gap-4 p-4 rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                    <LinkedInIcon />
                    <span className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">LinkedIn Profile</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Close Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 bg-white/10 text-white font-bold w-10 h-10 flex items-center justify-center text-xl rounded-full border border-white/20 hover:bg-white/20 transition-all"
        >
          &times;
        </button>
      </motion.div>
    </motion.div>
  );
};

export default About;

