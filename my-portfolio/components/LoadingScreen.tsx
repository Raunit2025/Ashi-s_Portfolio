
import React from 'react';

interface LoadingScreenProps {
  progress: number;
  visible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-700">
      <div className="w-64">
        <div className="flex justify-between items-end mb-2">
          <span className="font-mono text-[10px] text-cyan-500 tracking-[0.2em] uppercase">Initializing Engine</span>
          <span className="font-mono text-xl text-white font-bold">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/5 overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-2">
             <div className="w-1 h-1 bg-cyan-500"></div>
             <p className="font-mono text-[8px] text-gray-500 uppercase">Mounting shaders...</p>
          </div>
          <div className="flex items-center gap-2">
             <div className={`w-1 h-1 ${progress > 50 ? 'bg-cyan-500' : 'bg-gray-800'}`}></div>
             <p className="font-mono text-[8px] text-gray-500 uppercase">Verifying asset integrity...</p>
          </div>
          <div className="flex items-center gap-2">
             <div className={`w-1 h-1 ${progress === 100 ? 'bg-cyan-500' : 'bg-gray-800'}`}></div>
             <p className="font-mono text-[8px] text-gray-500 uppercase">Establishing neural link...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
