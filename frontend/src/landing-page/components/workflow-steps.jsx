"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll, useSpring } from "framer-motion"
import { cn } from "../../lib/utils"
import { Target, UserSearch, FileBarChart, Activity, Zap, ShieldCheck, ChevronRight } from "lucide-react"

const steps = [
  {
    phase: "01",
    protocol: "Target Extraction",
    title: "Upload the Target.",
    description: "Provide the job description. Our engine deconstructs the requirements into atomic parts—identifying tech stacks, hidden success criteria, and the 'ideal candidate' persona.",
    icon: Target,
    color: "text-blue-400",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.15)]",
    side: "left",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[280px] rounded-xl border border-zinc-800 bg-zinc-950/90 p-5 font-mono text-[10px] text-blue-400/90 shadow-2xl backdrop-blur-md relative overflow-hidden group border-t-blue-500/20">
          <div className="flex justify-between items-center mb-4 border-b border-zinc-900 pb-2">
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-red-500/20" />
               <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
               <div className="w-2 h-2 rounded-full bg-green-500/20" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-600">JD_SCAN_v4</span>
          </div>
          <div className="space-y-1.5">
            <p className="flex items-center gap-2"><ChevronRight className="w-2.5 h-2.5 text-blue-500" /> {`ANALYZING_CORE_STACK...`}</p>
            <p className="text-zinc-500 pl-4">{`[OK] REQ: React, TS, Node`}</p>
            <p className="text-zinc-500 pl-4">{`[OK] LEVEL: L5 Senior`}</p>
            <motion.div 
              className="mt-4 pt-2 border-t border-zinc-900 flex items-center gap-2 text-white/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-2.5 h-2.5 text-yellow-500" />
              <span>MAPPING_COMPETENCIES_</span>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-500/5 blur-[80px] -z-10" />
      </div>
    )
  },
  {
    phase: "02",
    protocol: "Alignment Matrix",
    title: "Sync your Profile.",
    description: "Upload your resume or provide a self-description. We map your professional trajectory against the role, identifying exactly where you overlap and where you need to pivot.",
    icon: UserSearch,
    color: "text-purple-400",
    glow: "shadow-[0_0_25px_rgba(147,51,234,0.15)]",
    side: "right",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[320px] aspect-video flex items-center justify-center">
           <div className="absolute inset-0 border border-zinc-800/50 rounded-full opacity-10" />
           <div className="absolute inset-8 border border-zinc-800/50 rounded-full opacity-20" />
           <div className="flex items-center gap-6 z-10">
              <motion.div 
                className="w-16 h-16 rounded-2xl border border-zinc-700 bg-zinc-900/50 flex items-center justify-center shadow-xl"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-zinc-500 font-mono text-[9px] font-bold">RESUME</div>
              </motion.div>
              <div className="relative w-20 h-px bg-zinc-800">
                 <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,1)]"
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 />
              </div>
              <motion.div 
                className="w-16 h-16 rounded-2xl border border-purple-500/20 bg-purple-500/5 flex items-center justify-center shadow-xl"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Target className="w-6 h-6 text-purple-400" />
              </motion.div>
           </div>
        </div>
        <div className="absolute inset-0 bg-purple-500/5 blur-[80px] -z-10" />
      </div>
    )
  },
  {
    phase: "03",
    protocol: "Strategic Output",
    title: "Get your Roadmap.",
    description: "Generate a structured interview report including match scores, tailored technical questions, behavioral scripts, and a tactical prep strategy.",
    icon: FileBarChart,
    color: "text-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.15)]",
    side: "left",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[280px] rounded-[2rem] border border-zinc-800 bg-zinc-950/90 p-6 shadow-3xl backdrop-blur-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10" />
           <div className="flex justify-between items-start mb-8">
              <div className="space-y-0.5">
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Strategic Match</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold text-white">94</span>
                  <span className="text-xl text-emerald-500 font-bold">%</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
           </div>
           <div className="space-y-4">
              {[85, 92].map((w, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[8px] uppercase tracking-tighter text-zinc-500 font-bold">
                    <span>{i === 0 ? "TECHNICAL_ALGN" : "CULTURE_INDEX"}</span>
                    <span className="text-zinc-300">{w}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-emerald-500/80" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w}%` }}
                      transition={{ duration: 1.2, delay: 0.2 * i, ease: "circOut" }}
                    />
                  </div>
                </div>
              ))}
           </div>
        </div>
        <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] -z-10" />
      </div>
    )
  }
]

export default function WorkflowSteps() {
  const ref = useRef(null)
  const contentRef = useRef(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight)
      }
    }
    // Initial height
    updateHeight()
    // Periodic check for dynamic content layout shifts
    const timer = setTimeout(updateHeight, 100)
    window.addEventListener('resize', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
      clearTimeout(timer)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  // Smooth springs for the tracing logic
  const beamY = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section ref={ref} id="workflow" className="relative py-24 bg-black overflow-hidden border-y border-zinc-900/50">
      {/* Dynamic Background Noise/Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_70%)] pointer-events-none" />

      {/* Section Header - Perfectly Synced with Features */}
      <div className="max-w-5xl mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-purple-500 uppercase tracking-[0.2em] mb-4">The Protocol</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter leading-tight">
            Strategic Deployment Pipeline
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            A three-phase industrial process designed to transform raw experience into a strategic advantage that dominates high-stakes interviews.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Centered Tracing Beam (Desktop) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-zinc-900/30 hidden md:block">
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="ml-[-10px] block overflow-visible"
            aria-hidden="true"
          >
            {/* The Static Path */}
            <path
              d={`M 10 0 V ${svgHeight}`}
              fill="none"
              stroke="rgba(39, 39, 42, 0.5)"
              strokeWidth="1"
            />
            
            {/* The Animated Glow Path */}
            <motion.path
              d={`M 10 0 V ${svgHeight}`}
              fill="none"
              stroke="url(#workflowGradientLaser)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <defs>
              <motion.linearGradient
                id="workflowGradientLaser"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={0}
                y2={svgHeight}
              >
                <stop stopColor="#3b82f6" stopOpacity="0" />
                <stop offset="0.1" stopColor="#3b82f6" />
                <stop offset="0.5" stopColor="#a855f7" />
                <stop offset="0.9" stopColor="#10b981" />
                <stop offset="1" stopColor="#10b981" stopOpacity="0" />
              </motion.linearGradient>
            </defs>

            {/* The Leading Edge Laser Point */}
            <motion.circle
              cx="10"
              r="3"
              fill="#a855f7"
              style={{ y: beamY }}
              className="shadow-[0_0_15px_#a855f7]"
            />
          </svg>
        </div>

        {/* Steps Content */}
        <div ref={contentRef} className="space-y-32 md:space-y-48 relative z-10">
          {steps.map((step, i) => (
            <div 
              key={step.phase} 
              className={cn(
                "flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20",
                step.side === "right" ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, x: step.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "circOut" }}
                className={cn(
                   "w-full md:w-[44%] group",
                   step.side === "left" ? "md:text-left" : "md:text-left"
                )}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-purple-500/40 group-hover:bg-zinc-900",
                    step.glow
                  )}>
                    <step.icon className={cn("w-6 h-6", step.color)} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold">
                      Protocol {step.phase}
                    </span>
                    <span className="text-[11px] text-zinc-300 font-bold uppercase tracking-widest">
                      {step.protocol}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-5 tracking-tighter leading-tight">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light text-pretty">
                  {step.description}
                </p>

                {/* Mobile visual indicator */}
                <div className="mt-10 md:hidden">
                   {step.visual}
                </div>
              </motion.div>

              {/* Central Indicator Node (Desktop) */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                 <motion.div 
                    className="w-6 h-6 rounded-full border border-zinc-800 bg-black flex items-center justify-center relative z-20"
                    whileInView={{ 
                      scale: [1, 1.15, 1], 
                      borderColor: ["#27272a", "#a855f7", "#27272a"],
                      boxShadow: ["0 0 0px rgba(168,85,247,0)", "0 0 20px rgba(168,85,247,0.3)", "0 0 0px rgba(168,85,247,0)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                 </motion.div>
              </div>

              {/* Augmented Visual (Desktop) */}
              <motion.div 
                className="hidden md:flex w-[44%] aspect-square items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                 {step.visual}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Section End Bridge */}
      <div className="mt-24 w-px h-16 bg-linear-to-b from-zinc-800 to-transparent mx-auto" />
    </section>
  )
}
