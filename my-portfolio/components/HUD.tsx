
import React, { useState, useEffect } from 'react';

const HUD: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(["[SYS] Initializing Nova Core...", "[SYS] Neural Link Established."]);

  useEffect(() => {
    const systemMessages = [
      "Fetching sector data...",
      "Optimizing vertex buffers...",
      "Raytracing enabled",
      "PBR shader compilation: OK",
      "Traffic: Normal",
      "Node 0x42: Syncing...",
      "Nanite virtualization: 100%"
    ];

    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), `[SYS] ${systemMessages[Math.floor(Math.random() * systemMessages.length)]}`]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed top-8 left-8 z-[60] pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-cyan-500 shadow-[0_0_10px_cyan]" />
          <div>
            <h1 className="text-xl font-mono font-black tracking-tighter text-white uppercase leading-none">
              Nova <span className="text-cyan-500">Core</span> <span className="text-white/20 text-[10px] align-top">v2.5</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <p className="text-[9px] font-mono text-cyan-500/60 uppercase tracking-[0.3em]">System: Active // High-Fidelity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Terminal Log */}
      <div className="fixed bottom-8 right-8 z-[60] pointer-events-none text-right">
        <div className="font-mono text-[9px] text-cyan-500/40 space-y-1 mb-4">
          {logs.map((log, i) => (
            <div key={i} className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">{log}</div>
          ))}
        </div>
        <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
          Lat: 37.77 / Long: -122.41<br/>
          Env: Production_Stage_01<br/>
          &copy; 2025 Nova Creative Lab
        </div>
      </div>

      <div className="fixed bottom-8 left-8 z-[60] pointer-events-none">
         <div className="flex items-center gap-4">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent" />
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.4em] leading-relaxed">
              Interaction: MOUSE_PARALLAX<br/>
              Navigation: SCROLL_SEQUENCE
            </p>
         </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
};

export default HUD;
