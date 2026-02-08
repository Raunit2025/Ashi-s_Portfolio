
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment, ContactShadows, useProgress } from '@react-three/drei';
import Experience from './components/Experience';
import Overlay from './components/Overlay';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [wireframeMode, setWireframeMode] = useState(false);
  const { progress } = useProgress();
  const isLoaded = progress === 100;

  return (
    <div className="relative w-full h-full bg-[#050505]">
      {/* Loading Overlay */}
      <LoadingScreen progress={progress} visible={!isLoaded} />
      
      <div className="w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 0, 10], fov: 35 }}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#050505']} />
          <Environment preset="night" />
          
          <ScrollControls pages={5} damping={0.2} infinite={false}>
            {/* 3D Scene */}
            <Experience wireframeMode={wireframeMode} />
            
            {/* HTML UI sync with Scroll */}
            <Scroll html>
              <Overlay 
                wireframeMode={wireframeMode} 
                setWireframeMode={setWireframeMode} 
              />
            </Scroll>
          </ScrollControls>

          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.6} 
            scale={20} 
            blur={2.5} 
            far={10} 
          />
        </Canvas>
      </div>

      {/* Persistent Technical HUD */}
      <div className="fixed top-6 left-6 z-[60] pointer-events-none">
        <h1 className="text-xl font-mono font-extrabold tracking-tighter text-white uppercase flex items-center gap-2">
          <span className="w-3 h-3 bg-cyan-500 inline-block"></span>
          Nova <span className="text-cyan-500">Core</span> v2.4
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">System Online / Stream: ACTIVE</p>
        </div>
      </div>

      {/* Control Hint */}
      <div className="fixed bottom-6 left-6 z-[60] pointer-events-none">
         <div className="flex items-center gap-3">
            <div className="w-px h-12 bg-white/20"></div>
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest leading-tight">
              Interface: SCROLL TO NAVIGATE<br/>
              Status: BROWSING DATA ARCHIVE
            </p>
         </div>
      </div>
    </div>
  );
};

export default App;
