"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useTransform, useScroll, useSpring } from "framer-motion"
import { cn } from "../../lib/utils"
import { Target, UserSearch, FileBarChart, Activity, Zap, ShieldCheck, ChevronRight } from "lucide-react"

const steps = [
  {
    phase: "01",
    protocol: "Job Analysis",
    title: "Enter the Job Details.",
    description: "Paste the job description you're aiming for. Our engine breaks down the requirements, hidden success criteria, and the skills they're looking for.",
    icon: Target,
    color: "text-white",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.08)]",
    side: "left",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[280px] rounded-xl border border-zinc-800 bg-zinc-950/90 p-5 font-mono text-[10px] text-zinc-400/90 shadow-2xl backdrop-blur-md relative overflow-hidden group border-t-zinc-100/10">
          {/* Active Scan Effect */}
          <motion.div 
            className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="flex justify-between items-center mb-4 border-b border-zinc-900 pb-2">
            <div className="flex gap-1.5">
               <div className="w-2 h-2 rounded-full bg-zinc-800" />
               <div className="w-2 h-2 rounded-full bg-zinc-800" />
               <div className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-zinc-500 font-bold">JD_CORE_v5.2</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-3/4 bg-zinc-900 rounded-sm overflow-hidden relative">
              <motion.div className="absolute inset-0 bg-zinc-700" initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 1 }} />
            </div>
            <div className="h-2 w-1/2 bg-zinc-900 rounded-sm overflow-hidden relative">
              <motion.div className="absolute inset-0 bg-zinc-700" initial={{ x: "-100%" }} whileInView={{ x: "0%" }} transition={{ duration: 1, delay: 0.2 }} />
            </div>
            <p className="flex items-center gap-2 pt-2"><ChevronRight className="w-2.5 h-2.5 text-white/50" /> {`ANALYZING_JOB...`}</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
               <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05] text-[7px] text-zinc-500 uppercase tracking-widest">REQUIREMENTS</div>
               <div className="p-2 rounded bg-white/[0.02] border border-white/[0.05] text-[7px] text-zinc-500 uppercase tracking-widest">SUCCESS_CRITERIA</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    phase: "02",
    protocol: "Resume Sync",
    title: "Upload your Resume.",
    description: "Submit your resume to sync your professional history. We map your skills against the job requirements, identifying exactly where you match and where you can improve.",
    icon: UserSearch,
    color: "text-white",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.08)]",
    side: "right",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[320px] aspect-video flex items-center justify-center">
           <div className="absolute inset-0 border border-white/5 rounded-full" />
           <div className="absolute inset-12 border border-white/5 rounded-full" />
           <div className="flex items-center gap-8 z-10">
              <motion.div 
                className="w-16 h-16 rounded-2xl border border-zinc-700 bg-zinc-900/50 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-zinc-600 font-mono text-[7px] uppercase tracking-tighter mb-1">Source</div>
                <div className="text-white font-mono text-[9px] font-bold tracking-widest">RESUME</div>
              </motion.div>
              <div className="relative w-24 h-px bg-zinc-800">
                 <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 />
                 <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent" />
              </div>
              <motion.div 
                className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center shadow-2xl backdrop-blur-md"
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-zinc-600 font-mono text-[7px] uppercase tracking-tighter mb-1">Target</div>
                <Target className="w-5 h-5 text-white" />
              </motion.div>
           </div>
        </div>
      </div>
    )
  },
  {
    phase: "03",
    protocol: "Your Strategy",
    title: "Get your Study Guide.",
    description: "Receive a personalized preparation plan including match scores, recommended answers to tough questions, and a daily schedule to help you get hired.",
    icon: FileBarChart,
    color: "text-white",
    glow: "shadow-[0_0_40px_rgba(255,255,255,0.08)]",
    side: "left",
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[280px] rounded-[2.5rem] border border-white/10 bg-zinc-950/90 p-8 shadow-3xl backdrop-blur-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] blur-3xl -z-10" />
           <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-bold">MATCH_INDEX</p>
                <div className="flex items-baseline gap-1">
                  <motion.span 
                    className="text-5xl font-display font-bold text-white tracking-tighter"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    94
                  </motion.span>
                  <span className="text-lg text-zinc-500 font-bold">%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-6 h-6 text-white/80" />
              </div>
           </div>
           <div className="space-y-5">
              {[85, 92].map((w, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex justify-between text-[7px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                    <span>{i === 0 ? "SKILL_MATCH" : "CULTURE_FIT"}</span>
                    <span className="text-white/60 tracking-normal">{w}%</span>
                  </div>
                  <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                    <motion.div 
                      className="h-full bg-white/80 rounded-full" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${w}%` }}
                      transition={{ duration: 1.5, delay: 0.3 * i, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    )
  }
]

export default function WorkflowSteps() {
  const ref = useRef(null)
  const contentRef = useRef(null)
  const [svgHeight, setSvgHeight] = useState(0)

  useEffect(() => {
    if (!contentRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSvgHeight(entry.contentRect.height)
      }
    })

    observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  })

  // Smooth springs for the tracing logic - physics-based movement
  const beamY = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight]), {
    stiffness: 80,
    damping: 35,
    restDelta: 0.001
  })

  return (
    <section ref={ref} id="workflow" className="relative py-24 md:py-40 bg-black overflow-hidden border-y border-zinc-900/50">
      {/* Premium Atmospheric Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent" />

      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-6 mb-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">The Process</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            How it <br className="hidden md:block" /> 
            <span className="text-zinc-500">Works</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            A simple 3-step process designed to transform your experience into a clear plan that helps you get hired.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Centered Tracing Beam (Desktop) */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-zinc-900/50 hidden md:block">
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
              stroke="rgba(39, 39, 42, 0.8)"
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
                <stop stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.1" stopColor="#ffffff" />
                <stop offset="0.5" stopColor="#ffffff" />
                <stop offset="0.9" stopColor="#ffffff" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </motion.linearGradient>
            </defs>

            {/* The Leading Edge Laser Point */}
            <motion.circle
              cx="10"
              r="4"
              fill="#ffffff"
              style={{ y: beamY }}
              className="shadow-[0_0_25px_rgba(255,255,255,0.8)]"
            />
          </svg>
        </div>

        {/* Steps Content */}
        <div ref={contentRef} className="space-y-40 md:space-y-64 relative z-10">
          {steps.map((step, i) => (
            <div 
              key={step.phase} 
              className={cn(
                "flex flex-col md:flex-row items-center justify-between gap-16 md:gap-32",
                step.side === "right" ? "md:flex-row-reverse" : ""
              )}
            >
              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, x: step.side === "left" ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                   "w-full md:w-[42%] group",
                   step.side === "left" ? "md:text-left" : "md:text-left"
                )}
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:border-white/20 group-hover:bg-zinc-900 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]",
                    step.glow
                  )}>
                    <step.icon className={cn("w-7 h-7", step.color)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] font-bold">
                      Step {step.phase}
                    </span>
                    <span className="text-[12px] text-zinc-100 font-bold uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                      {step.protocol}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter leading-tight group-hover:text-zinc-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light text-pretty">
                  {step.description}
                </p>

                {/* Mobile visual indicator */}
                <div className="mt-12 md:hidden">
                   {step.visual}
                </div>
              </motion.div>

              {/* Central Indicator Node (Desktop) */}
              <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center">
                 <motion.div 
                    className="w-8 h-8 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center relative z-20 group"
                    whileInView={{ 
                      scale: [1, 1.1, 1], 
                      borderColor: ["#27272a", "#ffffff", "#27272a"],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                 >
                    <div className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-white transition-colors" />
                    <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse" />
                 </motion.div>
              </div>

              {/* Augmented Visual (Desktop) */}
              <motion.div 
                className="hidden md:flex w-[42%] aspect-square items-center justify-center"
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                 <div className="w-full h-full p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-3xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-linear-to-tr from-white/[0.02] to-transparent pointer-events-none" />
                   {step.visual}
                 </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
