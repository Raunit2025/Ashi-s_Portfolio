import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const ImageCompare = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let newPosition = (x / rect.width) * 100;
    
    // Clamp the position between 0 and 100
    if (newPosition < 0) newPosition = 0;
    if (newPosition > 100) newPosition = 100;
    
    setSliderPosition(newPosition);
  }, []);

  const handleMouseDown = (e) => {
    const handleMouseMove = (event) => handleMove(event.clientX);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e) => {
    const handleTouchMove = (event) => handleMove(event.touches[0].clientX);
    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };
  
  const springConfig = { stiffness: 200, damping: 25 };
  const sprungSliderPosition = useSpring(sliderPosition, springConfig);

  const clipPath = useMotionValue(`inset(0 ${100 - sprungSliderPosition.get()}% 0 0)`);
  
  React.useEffect(() => {
    return sprungSliderPosition.on("change", (latest) => {
        clipPath.set(`inset(0 ${100 - latest}% 0 0)`);
    });
  }, [sprungSliderPosition, clipPath]);


  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto aspect-video rounded-lg overflow-hidden select-none cursor-ew-resize group">
      {/* After Image (Bottom Layer) */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable="false"
      />
      {/* Before Image (Top Layer, clipped) */}
      <motion.div 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ 
            clipPath: clipPath,
            backgroundImage: `url(${beforeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        draggable="false"
      />
      
      {/* Slider */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-sm cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        draggable="false"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg className="w-6 h-6 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageCompare;
