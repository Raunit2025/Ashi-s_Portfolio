import { useState, useRef, useEffect } from "react";
// eslint-disable-next-line react-hooks/exhaustive-deps
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Howl } from "howler";

const projects = [
  { title: "Project 1", description: "Description of project 1" },
  { title: "Project 2", description: "Description of project 2" },
  { title: "Project 3", description: "Description of project 3" },
  { title: "Project 4", description: "Description of project 4" },
];

export default function Projects() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);

  // Scroll motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pathLengthMotion = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const [svgWidth, setSvgWidth] = useState(800);
  const sectionHeight = 300;

  useEffect(() => {
    const handleResize = () => setSvgWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sound
  const chime = new Howl({ src: ["/sounds/chime.mp3"], volume: 0.6 });

  // Build snake path
  const buildPath = () => {
    let d = "";
    const leftX = svgWidth * 0.25;
    const rightX = svgWidth * 0.75;

    projects.forEach((_, i) => {
      const x = i % 2 === 0 ? leftX : rightX;
      const y = i * sectionHeight + sectionHeight / 2;

      if (i === 0) {
        d = `M ${x} ${y}`;
      } else {
        const prevX = i % 2 === 0 ? rightX : leftX;
        const prevY = (i - 1) * sectionHeight + sectionHeight / 2;
        const curveStrength = sectionHeight * 0.6;

        d += ` C ${prevX} ${prevY + curveStrength}, ${x} ${
          y - curveStrength
        }, ${x} ${y}`;
      }
    });
    return d;
  };

  const pathD = buildPath();

  // Get glowing orb position along path
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const length = pathRef.current?.getTotalLength?.();
    if (!length) return;

    const unsubscribe = scrollYProgress.on("change", (v) => {
      const point = pathRef.current.getPointAtLength(v * length);
      setOrbPos({ x: point.x, y: point.y });

      // Detect milestone hit
      projects.forEach((_, i) => {
        const milestoneY = i * sectionHeight + sectionHeight / 2;
        if (Math.abs(point.y - milestoneY) < 20 && activeIndex !== i) {
          setActiveIndex(i);
          chime.play();
        }
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress, activeIndex, sectionHeight]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-gray-950 text-white">
      <svg className="absolute top-0 left-0 w-full h-full">
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Timeline path */}
        <motion.path
          ref={pathRef}
          d={pathD}
          stroke="url(#glowGradient)"
          strokeWidth="8"
          fill="none"
          style={{ pathLength: pathLengthMotion }}
        />

        {/* Milestone dots, ripples, and particles */}
        {projects.map((_, i) => {
          const x = i % 2 === 0 ? svgWidth * 0.25 : svgWidth * 0.75;
          const y = i * sectionHeight + sectionHeight / 2;
          const isActive = activeIndex === i;

          return (
            <g key={i}>
              {/* Static milestone */}
              <circle cx={x} cy={y} r="10" fill="#22d3ee" />

              {/* Ripple animation */}
              {isActive && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={20}
                  stroke="#22d3ee"
                  strokeWidth="2"
                  fill="none"
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: [0.5, 1.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}

              {/* Particle burst */}
              {isActive &&
                [...Array(6)].map((_, j) => (
                  <motion.circle
                    key={`particle-${i}-${j}`}
                    cx={x}
                    cy={y}
                    r={3}
                    fill="#a7f3d0"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 40,
                      y: (Math.random() - 0.5) * 40,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.8, delay: j * 0.05 }}
                  />
                ))}
            </g>
          );
        })}

        {/* Player orb (glowing dot) */}
        <motion.circle
          r="14"
          fill="url(#glowGradient)"
          className="drop-shadow-[0_0_25px_#22d3ee]"
          cx={orbPos.x}
          cy={orbPos.y}
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.9, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Rotating ring around orb */}
        <motion.circle
          r="22"
          stroke="#22d3ee"
          strokeWidth="2"
          fill="none"
          cx={orbPos.x}
          cy={orbPos.y}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Project cards */}
      <div className="relative z-10 flex flex-col gap-32 mt-40">
        {projects.map((project, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={i}
              className={`max-w-md p-6 rounded-2xl shadow-lg ${
                i % 2 === 0 ? "self-start bg-cyan-900/40" : "self-end bg-purple-900/40"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="mt-2 text-sm">{project.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
