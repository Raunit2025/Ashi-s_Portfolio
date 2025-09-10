import React from "react";
import { motion} from "framer-motion";


const Timeline = ({
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
}) => {
  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${totalHeight}`}
      preserveAspectRatio="xMidYMin meet"
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%", // make it responsive
        maxWidth: `${svgWidth}px`, // constrain if needed
        height: `${totalHeight}px`,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="1" />
        </linearGradient>
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d={pathD}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

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

      <motion.circle
        r="12"
        fill="url(#glowGradient)"
        className="drop-shadow-[0_0_25px_#22d3ee]"
        cx={springX}
        cy={springY}
        style={{ translateZ: 0 }}
      />

      {skillsData.map((_, i) => {
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
  );
};

export default Timeline;
