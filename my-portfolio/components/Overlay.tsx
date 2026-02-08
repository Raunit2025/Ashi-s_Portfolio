
import React from 'react';

interface OverlayProps {
  wireframeMode: boolean;
  setWireframeMode: (val: boolean) => void;
}

const Overlay: React.FC<OverlayProps> = ({ wireframeMode, setWireframeMode }) => {
  return (
    <div className="w-screen pointer-events-none text-white select-none">
      
      {/* Section 1: Hero */}
      <section className="h-screen w-full flex flex-col items-center justify-center p-12 text-center">
        <div className="max-w-2xl pointer-events-auto">
          <p className="font-mono text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4 opacity-70">Portfolio / Deployment</p>
          <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter uppercase mb-6 leading-[0.9]">
            Architecting <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Virtual Worlds</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
            Senior Environment Artist & Level Designer focused on high-fidelity AAA game assets and cinematic scrollytelling.
          </p>
          <div className="mt-12 animate-bounce">
            <span className="font-mono text-xs tracking-widest text-gray-500 uppercase">Scroll to Initialize Data</span>
          </div>
        </div>
      </section>

      {/* Section 2: Project 1 */}
      <section className="h-screen w-full flex flex-col justify-center p-12 md:p-32">
        <div className="max-w-xl pointer-events-auto bg-black/40 backdrop-blur-md p-8 border-l-4 border-cyan-500">
          <p className="font-mono text-cyan-500 text-sm mb-2">01. PROJECT_NEON_CITY</p>
          <h3 className="text-4xl font-bold uppercase mb-4 tracking-tight">Modular Cyber Structure</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A complex modular building kit optimized for urban sprawling. Features high-density mesh modeling and custom PBR material pipelines.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-white/10 p-4">
              <span className="block text-[10px] font-mono text-gray-500 uppercase">Tris</span>
              <span className="text-xl font-mono">12,450</span>
            </div>
            <div className="border border-white/10 p-4">
              <span className="block text-[10px] font-mono text-gray-500 uppercase">Texture Res</span>
              <span className="text-xl font-mono">4K PBR</span>
            </div>
          </div>

          <button 
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${wireframeMode ? 'bg-cyan-500 text-black border-cyan-500' : 'bg-transparent text-white border-white/20 hover:border-cyan-500'}`}
          >
            {wireframeMode ? 'Disable Topology View' : 'Inspect Topology (Wireframe)'}
          </button>
        </div>
      </section>

      {/* Section 3: Project 2 */}
      <section className="h-screen w-full flex flex-col justify-center items-end p-12 md:p-32">
        <div className="max-w-xl pointer-events-auto bg-black/40 backdrop-blur-md p-8 border-r-4 border-amber-500 text-right">
          <p className="font-mono text-amber-500 text-sm mb-2">02. ORGANIC_SYNTHESIS</p>
          <h3 className="text-4xl font-bold uppercase mb-4 tracking-tight">Kinetic Character Rig</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Procedural deformation study using custom vertex shaders. Designed for real-time physics interaction in open-world environments.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="border border-white/10 p-4 text-left">
              <span className="block text-[10px] font-mono text-gray-500 uppercase">Joints</span>
              <span className="text-xl font-mono">152</span>
            </div>
            <div className="border border-white/10 p-4 text-left">
              <span className="block text-[10px] font-mono text-gray-500 uppercase">Draw Calls</span>
              <span className="text-xl font-mono">1</span>
            </div>
          </div>

          <button 
            onClick={() => setWireframeMode(!wireframeMode)}
            className={`px-6 py-3 font-mono text-xs uppercase tracking-widest transition-all duration-300 border ${wireframeMode ? 'bg-amber-500 text-black border-amber-500' : 'bg-transparent text-white border-white/20 hover:border-amber-500'}`}
          >
            {wireframeMode ? 'Hide Geometry' : 'Show Bone Hierarchy'}
          </button>
        </div>
      </section>

      {/* Section 4: Project 3 */}
      <section className="h-screen w-full flex flex-col justify-center items-center p-12">
        <div className="max-w-2xl pointer-events-auto bg-black/60 backdrop-blur-xl p-12 border border-red-500/30 text-center rounded-sm">
          <p className="font-mono text-red-500 text-sm mb-2">03. ARCHIVE_PROP</p>
          <h3 className="text-5xl font-extrabold uppercase mb-6 tracking-tighter">Monolith Prop Design</h3>
          <p className="text-gray-300 mb-10 leading-relaxed text-lg">
            A high-fidelity environmental asset utilizing Nanite-level detailing techniques. Baked using industry-standard raytracing workflows.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
             <div className="text-center">
                <span className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Workflow</span>
                <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded">High-to-Low</span>
             </div>
             <div className="text-center">
                <span className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Engine</span>
                <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded">UE5 / Unity</span>
             </div>
             <div className="text-center">
                <span className="block text-[10px] font-mono text-gray-500 uppercase mb-1">LODs</span>
                <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded">5 Levels</span>
             </div>
          </div>

          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-[0.2em] transition-all">
              Request Technical Docs
            </button>
            <button className="px-8 py-4 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-[0.2em] transition-all">
              Contact Designer
            </button>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <div className="fixed bottom-6 right-6 font-mono text-[9px] text-gray-600 uppercase tracking-widest pointer-events-none">
        Copyright &copy; 2024 Nova Systems Inc. // All Rights Reserved
      </div>
    </div>
  );
};

export default Overlay;
