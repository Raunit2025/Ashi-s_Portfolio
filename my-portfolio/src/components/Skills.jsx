import React, { useRef, useEffect, useState, useMemo } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion"
import { skillsData } from "../data/skillsData.jsx"
import SkillCard from "./SkillCard"
import Timeline from "./Timeline"

const Skills = ({ onBack, setActiveIndex, activeIndex, onSkillClick }) => {
  const scrollRef = useRef(null)
  const pathRef = useRef(null)

  const [sectionHeight, setSectionHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  )
  const svgWidth = 150
  const totalHeight = sectionHeight * skillsData.length

  const { scrollYProgress } = useScroll({ container: scrollRef })
  const pathLengthMotion = useTransform(scrollYProgress, [0, 1], [0, 1])

  const dotX = useMotionValue(svgWidth / 2)
  const dotY = useMotionValue(sectionHeight / 2)
  const springX = useSpring(dotX, { stiffness: 160, damping: 26 })
  const springY = useSpring(dotY, { stiffness: 160, damping: 26 })

  // Build the path only when sectionHeight or skillsData changes
  const pathD = useMemo(() => {
    const leftX = svgWidth * 0.1
    const rightX = svgWidth * 1.5
    let d = ""

    skillsData.forEach((_, i) => {
      const x = i % 2 === 0 ? rightX : leftX
      const y = i * sectionHeight + sectionHeight / 2

      if (i === 0) {
        d += `M ${x} ${y}`
      } else {
        const prevX = (i - 1) % 2 === 0 ? rightX : leftX
        const prevY = (i - 1) * sectionHeight + sectionHeight / 2
        const baseStrength = sectionHeight * 0.6
        const curveStrength = i % 2 === 0 ? baseStrength * 1.2 : baseStrength * 0.8
        const controlY1 = prevY + curveStrength
        const controlY2 = y - curveStrength
        d += ` C ${prevX} ${controlY1}, ${x} ${controlY2}, ${x} ${y}`
      }
    })
    return d
  }, [sectionHeight])

  const [pathLen, setPathLen] = useState(0)
  useEffect(() => {
    if (!pathRef.current || !pathD) return
    const len = pathRef.current.getTotalLength()
    setPathLen(len)
    const p0 = pathRef.current.getPointAtLength(0)
    dotX.set(p0.x)
    dotY.set(p0.y)
  }, [pathD, dotX, dotY])

  useEffect(() => {
    if (!scrollYProgress) return

    let animationFrameId

    const update = () => {
      const p = scrollYProgress.get()
      if (pathLen > 0) {
        const dist = p * pathLen
        try {
          const pt = pathRef.current.getPointAtLength(dist)
          dotX.set(pt.x)
          dotY.set(pt.y)
        } catch (e) {}

        const idx = Math.round(p * (skillsData.length - 1))
        if (idx !== activeIndex) {
          setActiveIndex(idx)
        }
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(update)
    }

    const unsubscribe = scrollYProgress.on("change", onScroll)

    // Initial run
    onScroll()

    return () => {
      unsubscribe()
      cancelAnimationFrame(animationFrameId)
    }
  }, [scrollYProgress, pathLen, dotX, dotY, setActiveIndex, activeIndex])

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div
        ref={scrollRef}
        className="w-full max-w-4xl h-screen overflow-y-scroll relative scroll-smooth hide-scrollbar snap-y snap-mandatory"
        style={{ willChange: "transform" }}
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

        {/* Floating skill card */}
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
                onClick={() => onSkillClick(skillsData[activeIndex].id)}
              >
                <SkillCard skill={skillsData[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scroll sections */}
        {skillsData.map((skill) => (
          <section key={skill.id} className="h-screen snap-start" />
        ))}
      </div>

      <button
        onClick={onBack}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-8 rounded-xl border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 z-20"
      >
        Go Back
      </button>
    </div>
  )
}

export default Skills