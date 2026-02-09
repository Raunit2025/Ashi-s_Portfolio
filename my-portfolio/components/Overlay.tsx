
import React, { useState } from 'react';
import { PROJECTS, PROFILE, SKILLS, CERTIFICATIONS, ACTIVITIES, EDUCATION } from '../constants';
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
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

    // If we already have the analysis, just toggle wireframe mode
    if (aiAnalysis[projectId]) {
      setWireframeMode(!wireframeMode);
      return;
    }

    setIsAnalyzing(projectId);
    setWireframeMode(true);

    try {
      if (!apiKey) {
        setAiAnalysis(prev => ({
          ...prev,
          [projectId]: 'AI diagnostics unavailable. Add VITE_GEMINI_API_KEY to enable live technical analysis.',
        }));
        return;
      }

      // Re-initialize AI client per request for key freshness as per guidelines
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a senior technical artist. Provide a concise (2 sentences) technical breakdown of the artistic and technical complexity for a project named "${title}". Mention topology hygiene, texture authoring, lighting, and real-time optimization.`,
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
          <p className="font-mono text-blue-400 text-xs tracking-[0.6em] uppercase mb-8 opacity-60">Ashi // 3D Game Designer Portfolio</p>
          <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter uppercase mb-6 leading-[0.85] italic">
            {PROFILE.name.split(' ')[0]} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
              {PROFILE.name.split(' ')[1]}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 leading-relaxed">
            {PROFILE.summary}
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-[0.4em] text-white/60">
            <span>{PROFILE.role}</span>
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 text-[11px] font-mono uppercase tracking-[0.35em]">
            <a href={`mailto:${PROFILE.email}`} className="text-blue-300 hover:text-blue-400 transition-colors">
              {PROFILE.email}
            </a>
            <a href={`tel:${PROFILE.phone}`} className="text-blue-300 hover:text-blue-400 transition-colors">
              {PROFILE.phone}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors">
              LinkedIn
            </a>
            <a href={PROFILE.artstation} target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors">
              ArtStation
            </a>
          </div>
          <div className="flex flex-col items-center gap-6 animate-bounce opacity-40 mt-12">
            <span className="font-mono text-[9px] tracking-[0.8em] text-white uppercase">Link_Start</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      <section className="h-screen w-full flex flex-col items-center justify-center p-8 md:p-24 text-center">
        <div className="max-w-5xl pointer-events-auto">
          <p className="font-mono text-blue-400 text-[10px] tracking-[0.5em] uppercase mb-6">Profile_Core</p>
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 italic">Skills Matrix</h3>
          <div className="grid gap-6 md:grid-cols-2 text-left">
            {SKILLS.map((skill) => (
              <div key={skill.title} className="bg-black/60 border border-white/10 p-6">
                <h4 className="text-lg font-semibold text-blue-300 uppercase tracking-wide mb-4">{skill.title}</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  {skill.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Timeline</span>
                <span className="text-lg font-mono text-white">{project.timeline}</span>
              </div>
              <div className="bg-white bg-opacity-5 p-4 border border-white border-opacity-5">
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Focus</span>
                <span className="text-lg font-mono text-white">{project.focus}</span>
              </div>
              <div className="bg-white bg-opacity-5 p-4 border border-white border-opacity-5 col-span-2">
                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Tools</span>
                <span className="text-sm font-mono text-white/80">{project.tools}</span>
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

      <section className="h-screen w-full flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-5xl pointer-events-auto border border-white border-opacity-10 p-10 md:p-16 rounded-sm bg-black/70">
          <p className="font-mono text-[10px] text-blue-400 tracking-[0.5em] uppercase mb-6">Experience_Log</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-10 leading-none">
            Certifications <span className="text-blue-500">&amp;</span> Activities
          </h2>

          <div className="grid gap-6 md:grid-cols-2 text-left mb-10">
            <div className="space-y-4">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.title} className="border border-white/10 p-4 bg-black/40">
                  <p className="text-sm font-semibold text-white">{cert.title}</p>
                  <p className="text-xs text-white/60">{cert.issuer} · {cert.date}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {ACTIVITIES.map((activity) => (
                <div key={activity.title} className="border border-white/10 p-4 bg-black/40">
                  <p className="text-sm font-semibold text-white">{activity.title}</p>
                  <p className="text-xs text-white/60">{activity.location} · {activity.date}</p>
                  <ul className="mt-3 space-y-1 text-xs text-white/70 list-disc list-inside">
                    {activity.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-semibold text-blue-300 uppercase tracking-wide mb-4">Education</h3>
            <div className="grid gap-4 md:grid-cols-3 text-left text-sm text-white/70">
              {EDUCATION.map((edu) => (
                <div key={`${edu.school}-${edu.program}`} className="border border-white/10 p-4 bg-black/40">
                  <p className="text-white font-semibold">{edu.school}</p>
                  <p className="text-xs text-white/60">{edu.location}</p>
                  <p className="mt-2">{edu.program}</p>
                  <p className="text-xs text-white/60">{edu.details}</p>
                  <p className="text-xs text-blue-300 mt-2">{edu.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="h-screen w-full flex flex-col items-center justify-center p-8 text-center bg-black">
        <div className="max-w-2xl pointer-events-auto border border-white border-opacity-10 p-14 rounded-sm bg-black/70">
          <p className="font-mono text-[10px] text-blue-400 tracking-[0.5em] uppercase mb-8">System: Ready</p>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-none">
            Let&apos;s Build <br /> <span className="text-blue-500">Immersive Worlds</span>
          </h2>
          <p className="text-sm text-white/60 mb-10">
            Open for internships, collaborations, and environment art roles.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a
              href={`mailto:${PROFILE.email}`}
              className="px-10 py-5 bg-white text-black font-mono text-[10px] font-black uppercase tracking-[0.35em] transition-all hover:bg-blue-500 hover:text-black"
            >
              Contact_Ashi
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 border border-white border-opacity-20 hover:border-blue-500 text-white font-mono text-[10px] uppercase tracking-[0.35em] transition-all"
            >
              LinkedIn_Profile
            </a>
            <a
              href={PROFILE.artstation}
              target="_blank"
              rel="noreferrer"
              className="px-10 py-5 border border-white border-opacity-20 hover:border-blue-500 text-white font-mono text-[10px] uppercase tracking-[0.35em] transition-all"
            >
              ArtStation_Portfolio
            </a>
            <button
              type="button"
              onClick={onBackToTop}
              className="px-10 py-5 border border-white border-opacity-20 hover:border-blue-500 text-white font-mono text-[10px] uppercase tracking-[0.35em] transition-all"
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
