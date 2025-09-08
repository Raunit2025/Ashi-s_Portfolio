import { useState, useRef, useEffect } from "react";
import {motion, AnimatePresence, useScroll, useTransform} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Sphere,
  Torus,
  Dodecahedron,
} from "@react-three/drei";

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

const Projects = ({ onBack }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const rafRef = useRef(null);

  // Track activeIndex from scroll position
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const ch = container.clientHeight; // one section = 100vh
        const scrollTop = container.scrollTop;
        const index = Math.round(scrollTop / ch);
        const clamped = Math.max(0, Math.min(index, projectsData.length - 1));
        setActiveIndex(clamped);
      });
    };

    handleScroll(); // init
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Dot snapping position
  const dotY = activeIndex * window.innerHeight + window.innerHeight / 2;

  return (
    <motion.div
      className="h-screen w-full flex bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left Sticky Pane */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 sticky top-0 h-screen">
        <div className="w-full h-2/3 cursor-grab">
          <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[-1, 1, 4]} intensity={3} />
            <AnimatePresence mode="wait">
              <motion.group
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.3, ease: "easeIn" },
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                {projectsData[activeIndex].title}
              </h2>
              <p className="text-lg text-cyan-400">
                {projectsData[activeIndex].category}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

<div
        ref={scrollRef}
        className="w-1/2 overflow-y-scroll relative scroll-smooth hide-scrollbar snap-y snap-mandatory"
      >
        {/* Background timeline */}
        <div
          className="absolute top-0 left-1/4 w-1 bg-white/10 -translate-x-1/2"
          style={{ height: `${projectsData.length * 100}vh` }}
        />

        {/* Glowing timeline */}
        <motion.div
          className="absolute top-0 left-1/4 w-1 -translate-x-1/2 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"
          animate={{ height: dotY }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Moving dot */}
        <motion.div
          className="absolute left-1/4 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee]"
          animate={{ y: dotY }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            className="h-screen flex items-center snap-start"
          >
            <div className="relative w-full flex items-center">
              <div className="absolute left-1/4 -translate-x-1/2">
                <motion.button
                  onClick={() => setSelectedProject(project)}
                  className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 glowing-dot-container flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="glowing-dot" />
                </motion.button>
              </div>
              <div className="pl-[calc(25%_+_2.5rem)] pr-16 w-full">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ root: scrollRef, amount: 0.6 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-4xl font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6">
                    {project.shortDescription}
                  </p>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-cyan-400 font-semibold hover:text-white transition-colors"
                  >
                    View Details &rarr;
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
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
