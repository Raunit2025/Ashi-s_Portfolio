import { motion } from 'framer-motion';

// Accept the new onViewAbout prop
const Hero = ({ onViewSkills, onViewAbout }) => ( 
  <motion.div
    className="min-h-screen flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 1 } }}
    exit={{ opacity: 0, transition: { duration: 1 } }}
  >
    <div className="text-center max-w-4xl p-4">
      <h1 className="text-6xl font-bold text-white mb-4">Ashi's Portfolio</h1>
      <p className="text-xl text-gray-400 mb-8">3D Game Designer & Artist</p>
      
      {/* Container for buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onViewSkills}
          className="bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          View My Skills
        </button>
        {/* New button for About & Contact */}
        <button
          onClick={onViewAbout}
          className="bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          About & Contact
        </button>
      </div>
    </div>
  </motion.div>
);

export default Hero;