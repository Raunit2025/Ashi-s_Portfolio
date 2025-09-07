// src/components/Hero.jsx

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white">
          Ashi's Portfolio
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mt-4">
          3D Game Designer & Artist
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;