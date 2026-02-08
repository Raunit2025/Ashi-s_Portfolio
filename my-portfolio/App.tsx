
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, ContactShadows, useProgress, Preload } from '@react-three/drei';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import LoadingScreen from './components/LoadingScreen';
import HUD from './components/HUD';
import { LOADING_MIN_MS } from './constants';

/** Simple progress connector for the Canvas */
const ProgressTracker: React.FC<{ onProgress: (p: number) => void }> = ({ onProgress }) => {
  const { progress } = useProgress();
  useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);
  return null;
};

const App: React.FC = () => {
  const [wireframeMode, setWireframeMode] = useState(false);
  const [assetProgress, setAssetProgress] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  // Artificial time-based progress to ensure smooth loading transition
  useEffect(() => {
    const start = startTimeRef.current;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min((elapsed / LOADING_MIN_MS) * 100, 100);
      setTimeProgress(t);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  const combinedProgress = Math.max(assetProgress, timeProgress);
  const isLoaded = assetProgress === 100 && timeProgress >= 100;

  // Handles smooth "Back to Top"
  const scrollToTop = useCallback(() => {
    const scrollEl = document.querySelector('div[style*="overflow-y: auto"]');
    if (scrollEl) {
      scrollEl.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-[#050505]">
      {/* Cinematic Loading Overlay */}
      <LoadingScreen progress={combinedProgress} visible={!isLoaded} />
      
      {/* UI Elements (Z-Index above Canvas, below Loading) */}
      <HUD />

      <div className="w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 0, 12], fov: 35 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#050505']} />
          <ProgressTracker onProgress={setAssetProgress} />
          <Environment preset="night" />
          
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.25} infinite={false}>
              {/* 3D Experience Logic */}
              <Experience wireframeMode={wireframeMode} />
              
              {/* HTML Scrollytelling Layer */}
              <Scroll html>
                <Overlay 
                  wireframeMode={wireframeMode} 
                  setWireframeMode={setWireframeMode} 
                  onBackToTop={scrollToTop}
                />
              </Scroll>
            </ScrollControls>
            <Preload all />
          </Suspense>

          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={30} 
            blur={2} 
            far={15} 
          />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
