// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Sphere,
  Torus,
  Dodecahedron,
} from "@react-three/drei";

/* ---------- projectsData (same as yours) ---------- */
const projectsData = [
  {
    id: 1,
    title: "Project Alpha: The Lost Kingdom",
    category: "Game Design & Development",
    imageUrl: "/project1.png",
    shortDescription:
      "A 3D adventure game with a focus on exploration and puzzle-solving. Built with Unreal Engine.",
    longDescription:
      "The Lost Kingdom is a third-person adventure game that challenges players to uncover the secrets of a fallen civilization. My role involved level design, creating puzzle mechanics, and implementing character controls. The project emphasized atmospheric storytelling through environmental design.",
    technologies: ["Unreal Engine", "Blender", "C++"],
    model: (
      <Torus args={[1, 0.2, 16, 100]} rotation={[Math.PI / 2, 0.3, 0]}>
        <meshStandardMaterial color="#8A2BE2" roughness={0.3} metalness={0.9} />
      </Torus>
    ),
  },
  {
    id: 2,
    title: 'Cyborg "Helios": Character Model',
    category: "3D Art & Hard Surface Modeling",
    imageUrl: "/project2.png",
    shortDescription:
      "High-poly character model created in ZBrush and textured in Substance Painter.",
    longDescription:
      "Helios is a high-fidelity 3D character designed for a next-gen sci-fi title. The process involved sculpting intricate details in ZBrush, retopologizing for animation in Maya, and creating realistic PBR textures in Substance Painter. The goal was to create a visually striking and believable robotic character.",
    technologies: ["ZBrush", "Maya", "Substance Painter", "Marmoset Toolbag"],
    model: (
      <Dodecahedron args={[1.2, 0]}>
        <meshStandardMaterial
          color="#40E0D0"
          roughness={0.1}
          metalness={0.95}
          emissive="#003333"
          emissiveIntensity={0.5}
        />
      </Dodecahedron>
    ),
  },
  {
    id: 3,
    title: "Whispering Wilds: Environment Concept",
    category: "Art & Design",
    imageUrl: "/project3.png",
    shortDescription:
      "A stylized environment concept for a fantasy RPG, designed in Blender and Photoshop.",
    longDescription:
      "This project focused on establishing the visual style and mood for a fantasy world. I created a modular set of assets in Blender, allowing for rapid prototyping of lush, overgrown environments. The final scene was rendered and painted over in Photoshop to achieve a Ghibli-inspired aesthetic.",
    technologies: ["Blender", "Photoshop", "Unreal Engine"],
    model: (
      <Box args={[1.5, 1.5, 1.5]}>
        <meshStandardMaterial color="#32CD32" wireframe />
      </Box>
    ),
  },
  {
    id: 4,
    title: "Project Gamma: Gravity Shift",
    category: "Game Development",
    imageUrl: "/project4.png",
    shortDescription:
      "A 2D platformer with a unique gravity-shifting mechanic, developed in Unity.",
    longDescription:
      "Gravity Shift is a fast-paced 2D puzzle-platformer where players manipulate gravity to navigate complex levels. I was the sole developer, responsible for programming the core mechanics, designing 30 unique levels, and creating all the pixel art assets. The game was praised for its innovative and challenging gameplay.",
    technologies: ["Unity", "C#", "Aseprite"],
    model: (
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.8} />
      </Sphere>
    ),
  },
];

/* ---------- Modal (same as yours) ---------- */
const ProjectModal = ({ project, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="bg-slate-900/50 border border-white/20 p-8 rounded-2xl max-w-3xl w-full text-white"
      initial={{ scale: 0.9, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 50 }}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-6 shadow-2xl"
      />
      <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
      <h4 className="text-xl text-cyan-300 mb-4">{project.category}</h4>
      <p className="text-lg text-gray-300 mb-6">{project.longDescription}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="bg-cyan-900/50 text-cyan-200 py-1 px-3 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-8 bg-white/10 text-white py-2 px-6 rounded-lg hover:bg-white/20 transition-colors"
      >
        Close
      </button>
    </motion.div>
  </motion.div>
);

/* ---------- Main Projects component (updated) ---------- */
const Projects = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef(null);
  const pathRef = useRef(null);

  // responsive sizes
  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  const svgWidth = 300; // px (adjust for visual width of zig-zag)
  const totalHeight = sectionHeight * projectsData.length;

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const pathLengthMotion = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // motion values for dot
  const dotX = useMotionValue(svgWidth / 2);
  const dotY = useMotionValue(sectionHeight / 2);
  // spring them for smoothness
  const springX = useSpring(dotX, { stiffness: 160, damping: 26 });
  const springY = useSpring(dotY, { stiffness: 160, damping: 26 });

  // build pathD dynamically (zig-zag across the stacked sections)
  const [pathD, setPathD] = useState("");
  useEffect(() => {
  const buildPath = () => {
    const leftX = svgWidth * 0.1;
    const rightX = svgWidth * 1.5;
    let d = "";

    projectsData.forEach((_, i) => {
      const x = i % 2 === 0 ? rightX : leftX;
      const y = i * sectionHeight + sectionHeight / 2;

      if (i === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prevX = (i - 1) % 2 === 0 ? rightX : leftX;
        const prevY = (i - 1) * sectionHeight + sectionHeight / 2;

        // Alternate curve strength
        const baseStrength = sectionHeight * 0.6;
        const curveStrength =
          i % 2 === 0 ? baseStrength * 1.2 : baseStrength * 0.8;

        const controlY1 = prevY + curveStrength;
        const controlY2 = y - curveStrength;

        d += ` C ${prevX} ${controlY1}, ${x} ${controlY2}, ${x} ${y}`;
      }
    });

    setPathD(d);
  };

  buildPath();
  const onResize = () => {
    setSectionHeight(window.innerHeight);
    buildPath();
  };
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
}, [sectionHeight]);


  // after path renders, measure its length and initialize dot
  const [pathLen, setPathLen] = useState(0);
  useEffect(() => {
    if (!pathRef.current) return;
    // small timeout to ensure DOM updated
    requestAnimationFrame(() => {
      try {
        const len = pathRef.current.getTotalLength();
        setPathLen(len);
        const p0 = pathRef.current.getPointAtLength(0);
        dotX.set(p0.x);
        dotY.set(p0.y);
      } catch (e) {
        // defensive: sometimes getTotalLength can throw if path not ready
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathD, pathRef.current]);

  // subscribe to scroll progress to move the dot along path and set active index
  useEffect(() => {
    if (!pathRef.current || pathLen === 0) return;

    const unsubscribe = scrollYProgress.onChange((p) => {
      const progress = Math.max(0, Math.min(1, p));
      const dist = progress * pathLen;
      try {
        const pt = pathRef.current.getPointAtLength(dist);
        dotX.set(pt.x);
        dotY.set(pt.y);
      } catch (e) {}
      const idx = Math.round(progress * (projectsData.length - 1));
      setActiveIndex(idx);
    });

    // initialize once
    const initProgress = scrollYProgress.get();
    const initDist = initProgress * pathLen;
    try {
      const pt = pathRef.current.getPointAtLength(initDist);
      dotX.set(pt.x);
      dotY.set(pt.y);
    } catch (e) {}

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollYProgress, pathLen]);

  return (
    <motion.div
      className="h-screen w-full flex bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left sticky pane */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 sticky top-0 h-screen">
        <div className="w-full h-2/3 cursor-grab">
          <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[-1, 1, 4]} intensity={3} />
            <AnimatePresence mode="wait">
              <motion.group
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.45 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.6,
                  transition: { duration: 0.25 },
                }}
              >
                {projectsData[activeIndex].model}
              </motion.group>
            </AnimatePresence>
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        <div className="text-center h-1/3 p-4 flex flex-col justify-center w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">
            {projectsData[activeIndex].title}
          </h2>
          <p className="text-lg text-cyan-400">
            {projectsData[activeIndex].category}
          </p>
        </div>
      </div>

      {/* Right scrollable area (contains stacked full-screen sections) */}
      <div
        ref={scrollRef}
        className="w-1/2 overflow-y-scroll relative scroll-smooth hide-scrollbar snap-y snap-mandatory"
        style={{ height: "100vh" }}
      >
        {/* Centered SVG that spans full scrollable height */}
        <svg
          viewBox={`0 0 ${svgWidth} ${totalHeight}`}
          preserveAspectRatio="xMidYMin slice"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: `${svgWidth}px`,
            height: `${totalHeight}px`,
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {/* Define gradient + glow filter */}
          <defs>
            <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
            </linearGradient>
            <filter
              id="glowFilter"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="4"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* background faint path */}
          <path
            d={pathD}
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />

          {/* animated gradient glowing path */}
          <motion.path
            ref={pathRef}
            d={pathD}
            stroke="url(#glowGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            style={{ pathLength: pathLengthMotion }}
            filter="url(#glowFilter)"
          />

          {/* moving glowing dot */}
          <motion.circle
            r="12"
            fill="url(#glowGradient)"
            className="drop-shadow-[0_0_25px_#22d3ee]"
            cx={springX}
            cy={springY}
            style={{ translateZ: 0 }}
          />

          {/* small milestone dots */}
          {projectsData.map((_, i) => {
            const px = i % 2 === 0 ? svgWidth * 0.7 : svgWidth * 0.3;
            const py = i * sectionHeight + sectionHeight / 2;
            const isActive = i === activeIndex;
            return (
              <motion.circle
                key={i}
                cx={px}
                cy={py}
                r={isActive ? 10 : 6}
                fill={isActive ? "#a7f3d0" : "#ffffff"}
                opacity={isActive ? 1 : 0.75}
                animate={
                  isActive ? { scale: [1, 1.3, 1], opacity: [1, 0.9, 1] } : {}
                }
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            );
          })}
        </svg>

        {/* Sections (stacked h-screen) */}
        {projectsData.map((project, index) => (
          <section
            key={project.id}
            className="h-screen grid items-center snap-start"
            style={{ gridTemplateColumns: `1fr ${svgWidth}px 1fr` }}
          >
            {/* left or right column depending on index parity */}
            {index % 2 === 0 ? (
              <>
                <div className="col-start-1 col-end-2 px-12">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={
                      activeIndex === index
                        ? { opacity: 1, x: 0, scale: 1.02 }
                        : { opacity: 0.6, x: 30, scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 p-6 rounded-xl max-w-md"
                  >
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {project.shortDescription}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-cyan-400 font-semibold hover:text-white"
                    >
                      View Details →
                    </button>
                  </motion.div>
                </div>

                {/* center column left empty (svg overlays) */}
                <div className="col-start-2" />

                <div className="col-start-3 col-end-4" />
              </>
            ) : (
              <>
                <div className="col-start-1 col-end-2" />
                <div className="col-start-2" />
                <div className="col-start-3 col-end-4 px-12">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={
                      activeIndex === index
                        ? { opacity: 1, x: 0, scale: 1.02 }
                        : { opacity: 0.6, x: -30, scale: 1 }
                    }
                    transition={{ duration: 0.5 }}
                    className="bg-white/5 p-6 rounded-xl max-w-md ml-auto"
                  >
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4">
                      {project.shortDescription}
                    </p>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-cyan-400 font-semibold hover:text-white"
                    >
                      View Details →
                    </button>
                  </motion.div>
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <button
        onClick={onBack}
        className="absolute bottom-8 left-1/4 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default Projects;
