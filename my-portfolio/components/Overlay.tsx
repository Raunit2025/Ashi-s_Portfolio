
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { GoogleGenAI } from "@google/genai";

export interface OverlayProps {
  wireframeMode: boolean;
  setWireframeMode: (val: boolean) => void;
  onBackToTop?: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ wireframeMode, setWireframeMode, onBackToTop }) => {
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null);

  const analyzeProject = async (projectId: string, title: string) => {
    // If we already have the analysis, just toggle wireframe mode
    if (aiAnalysis[projectId]) {
      setWireframeMode(!wireframeMode);
      return;
    }

    setIsAnalyzing(projectId);
    setWireframeMode(true);

    try {
      // Re-initialize AI client per request for key freshness as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior technical artist. Provide a concise (2 sentences) technical breakdown of the architectural complexity for a project named "${title}". Use heavy technical industry jargon like 'sub-d modeling', 'atlas texturing', 'draw call optimization', and 'occlusion culling'.`,
      });
      
      const technicalText = response.text || "Analysis complete.";
      setAiAnalysis(prev => ({ ...prev, [projectId]: technicalText }));
    } catch (error) {
      console.error("AI Analysis failed", error);
      setAiAnalysis(prev => ({ ...prev, [projectId]: "Error retrieving technical diagnostics. System offline." }));
    } finally {
      setIsAnalyzing(null);
    }
  };

  return (
    <div className="w-screen pointer-events-none text-white select-none">
      
      <section className="h-screen w-full flex flex-col items-center justify-center p-12 text-center">
        <div className="max-w-4xl pointer-events-auto">
          <p className="font-mono text-blue-400 text-xs tracking-[0.6em] uppercase mb-8 opacity-60">Archives // Senior Environment Artist</p>
          <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase mb-8 leading-[0.8] italic">
            Architect <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
              Virtual_Space
            </span>
          </h2>
          <div className="flex flex-col items-center gap-6 animate-bounce opacity-40 mt-12">
             <span className="font-mono text-[9px] tracking-[0.8em] text-white uppercase">Link_Start</span>
             <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      {PROJECTS.map((project, index) => (
        <section 
          key={project.id} 
          className={`h-screen w-full flex flex-col justify-center p-8 md:p-32 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}
        >
          <div 
            className={`max-w-xl pointer-events-auto bg-black bg-opacity-80 backdrop-filter backdrop-blur-3xl p-10 border border-white border-opacity-5 rounded-sm shadow-2xl transition-all duration-700 hover:border-blue-500 hover:border-opacity-50 ${
              index % 2 === 0 ? 'border-l-4 border-blue-500' : 'border-r-4 border-blue-500 text-right'
            }`}
          >
            <p className="font-mono text-[10px] text-blue-400 tracking-[0.4em] mb-4 uppercase">
              Entry_ID: {project.id} // SEC_A
            </p>
            <h3 className="text-5xl font-black uppercase mb-6 tracking-tighter leading-none italic">
              {project.title.replace(/_/g, ' ')}
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed text-base font-light">
              {project.description}
            </p>

            {aiAnalysis[project.id] && (
              <div className="mb-8 p-4 bg-blue-500 bg-opacity-5 border border-blue-500 border-opacity-20 rounded font-mono text-[10px] text-blue-300 leading-relaxed italic animate-pulse">
                <span className="block mb-2 font-bold opacity-50">AI_TECHNICAL_ASSESSMENT</span>
                {aiAnalysis[project.id]}
              </div>
            )}
            
            <div className={`grid grid-cols-2 gap-4 mb-8 ${index % 2 !== 0 ? 'text-left' : ''}`}>
              <div className="bg-white bg-opacity-5 p-4 border border-white border-opacity-5">
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Density</span>
                <span className="text-lg font-mono text-white">{project.tris}</span>
              </div>
              <div className="bg-white bg-opacity-5 p-4 border border-white border-opacity-5">
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Pipeline</span>
                <span className="text-lg font-mono text-white">{project.texture}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => analyzeProject(project.id, project.title)}
              className={`group flex items-center gap-4 px-10 py-5 font-mono text-[10px] uppercase tracking-[0.3em] transition-all border ${
                wireframeMode 
                  ? 'bg-blue-500 text-black border-blue-500' 
                  : 'bg-white bg-opacity-5 text-white border-white border-opacity-20 hover:border-blue-500 hover:text-blue-400'
              } ${index % 2 !== 0 ? 'ml-auto' : ''}`}
            >
              <div className={`w-2 h-2 rounded-full ${isAnalyzing === project.id ? 'bg-white animate-ping' : 'bg-blue-500'}`} />
              {isAnalyzing === project.id ? 'Running Diagnostic...' : (wireframeMode ? 'Release View' : 'Analyze Topology')}
            </button>
          </div>
        </section>
      ))}

      <section className="h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-black">
        <div className="max-w-2xl pointer-events-auto border border-white border-opacity-5 p-20 rounded-sm">
          <p className="font-mono text-[10px] text-blue-400 tracking-[0.5em] uppercase mb-8">System: Ready</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-none">
            Forge the <br /> <span className="text-blue-500">Unseen</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <a
              href="mailto:contact@novacore.arch"
              className="px-12 py-6 bg-white text-black font-mono text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-blue-500 hover:text-black"
            >
              Request_Access
            </a>
            <button
              type="button"
              onClick={onBackToTop}
              className="px-12 py-6 border border-white border-opacity-20 hover:border-blue-500 text-white font-mono text-[11px] uppercase tracking-[0.4em] transition-all"
            >
              Reset_Seq
            </button>
          </div>

          <div className="font-mono text-[8px] uppercase tracking-[1em] text-white/20">End_Of_Archive</div>
        </div>
      </section>
    </div>
  );
};

export default Overlay;
