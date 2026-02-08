
import React from 'react';

interface LoadingScreenProps {
  progress: number;
  visible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, visible }) => {
  if (!visible && progress >= 100) return null;

  const steps = [
    { label: 'Initializing Core', done: progress > 10 },
    { label: 'Compiling Shaders', done: progress > 40 },
    { label: 'Loading Geometry', done: progress > 70 },
    { label: 'Link Established', done: progress >= 100 },
  ];

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050505] transition-all duration-1000 ease-in-out ${
        !visible ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Tech Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[radial-gradient(circle,rgba(6,182,212,0.15)_0%,transparent_70%)] animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-4 h-4 bg-cyan-500 animate-ping rounded-full absolute opacity-20" />
          <div className="w-3 h-3 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-sm" />
          <h2 className="font-mono text-xl font-bold tracking-tighter text-white uppercase">
            Nova <span className="text-cyan-500">Systems</span>
          </h2>
        </div>

        <div className="w-full mb-8">
           <div className="flex justify-between items-end mb-3">
              <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">Buffer Status</span>
              <span className="font-mono text-2xl text-white font-black">{Math.round(progress)}%</span>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-cyan-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ width: `${progress}%` }}
              />
           </div>
        </div>

        <div className="space-y-4 w-full">
           {steps.map((step, i) => (
             <div key={i} className="flex items-center gap-4 group">
                <div className={`w-1 h-1 rounded-full ${step.done ? 'bg-cyan-500 shadow-[0_0_5px_cyan]' : 'bg-white/10'}`} />
                <p className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${step.done ? 'text-white' : 'text-gray-600'}`}>
                  {step.label}
                  {step.done && <span className="ml-2 text-cyan-500/50">_COMPLETE</span>}
                </p>
             </div>
           ))}
        </div>
      </div>

      <div className="absolute bottom-12 font-mono text-[8px] text-gray-700 tracking-[0.5em] uppercase">
        Encrypted Session / 0x42f9a2
      </div>
    </div>
  );
};

export default LoadingScreen;
