import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { skillsData } from "../data/skillsData.jsx";
import SkillCard from "./SkillCard";
import ModelViewer from "./ModelViewer";
import Timeline from "./Timeline";

const Skills = ({ onBack }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const pathRef = useRef(null);

  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );
  const svgWidth = 150;
  const totalHeight = sectionHeight * skillsData.length;

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const pathLengthMotion = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const dotX = useMotionValue(svgWidth / 2);
  const dotY = useMotionValue(sectionHeight / 2);
  const springX = useSpring(dotX, { stiffness: 160, damping: 26 });
  const springY = useSpring(dotY, { stiffness: 160, damping: 26 });

  const [pathD, setPathD] = useState("");
  useEffect(() => {
    const buildPath = () => {
      const leftX = svgWidth * 0.1;
      const rightX = svgWidth * 1.5;
      let d = "";

      skillsData.forEach((_, i) => {
        const x = i % 2 === 0 ? rightX : leftX;
        const y = i * sectionHeight + sectionHeight / 2;

        if (i === 0) {
          d += `M ${x} ${y}`;
        } else {
          const prevX = (i - 1) % 2 === 0 ? rightX : leftX;
          const prevY = (i - 1) * sectionHeight + sectionHeight / 2;

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

  const [pathLen, setPathLen] = useState(0);
  useEffect(() => {
    if (!pathRef.current || !pathD) return;

    requestAnimationFrame(() => {
      try {
        const len = pathRef.current.getTotalLength();
        setPathLen(len);
        const p0 = pathRef.current.getPointAtLength(0);
        dotX.set(p0.x);
        dotY.set(p0.y);
      } catch (e) {}
    });
  }, [pathD, dotX, dotY]);

  useEffect(() => {
    if (!pathRef.current || pathLen === 0) return;

    const unsubscribe = scrollYProgress.on("change", (p) => {
      const progress = Math.max(0, Math.min(1, p));
      const dist = progress * pathLen;
      try {
        const pt = pathRef.current.getPointAtLength(dist);
        dotX.set(pt.x);
        dotY.set(pt.y);
      } catch (e) {}
      const idx = Math.round(progress * (skillsData.length - 1));
      setActiveIndex(idx);
    });

    const initProgress = scrollYProgress.get();
    const initDist = initProgress * pathLen;
    try {
      const pt = pathRef.current.getPointAtLength(initDist);
      dotX.set(pt.x);
      dotY.set(pt.y);
    } catch (e) {}

    return () => unsubscribe();
  }, [scrollYProgress, pathLen, dotX, dotY]);

  return (
    <motion.div
      className="h-screen w-full flex bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-1/3 flex flex-col items-center justify-center p-8 sticky top-0 h-screen">
        <ModelViewer model={skillsData[activeIndex].model} />
        <div className="text-center h-1/3 p-4 flex flex-col justify-center w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">
            {skillsData[activeIndex].title}
          </h2>
          <p className="text-lg text-cyan-400">
            {skillsData[activeIndex].category}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-2/3 overflow-y-scroll relative scroll-smooth hide-scrollbar snap-y snap-mandatory"
        style={{ height: "100vh" }}
      >
        <Timeline
          {...{
            svgWidth,
            totalHeight,
            pathD,
            pathRef,
            pathLengthMotion,
            springX,
            springY,
            skillsData,
            activeIndex,
            sectionHeight,
          }}
        />

        <motion.div
          className="absolute top-0 left-1/2"
          style={{
            x: "-50%",
            y: springY,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-auto"
              >
                <SkillCard skill={skillsData[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {skillsData.map((skill) => (
          <section key={skill.id} className="h-screen snap-start" />
        ))}
      </div>

      <button
        onClick={onBack}
        className="absolute bottom-8 left-[16.66%] -translate-x-1/2 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
      >
        Go Back
      </button>
    </motion.div>
  );
};

export default Skills;
