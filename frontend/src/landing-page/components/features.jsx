"use client"

import { motion } from "framer-motion"
import { 
  Zap, 
  BarChart3, 
  Layers, 
  ArrowRight, 
  Command, 
  Target, 
  FileCheck, 
  MessageSquare, 
  Search,
  ShieldCheck
} from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"

const integrationLogos = [
  { name: "LinkedIn" },
  { name: "Indeed" },
  { name: "Glassdoor" },
  { name: "Google" },
  { name: "GitHub" },
  { name: "PDF" },
  { name: "Docx" },
  { name: "ATS" },
]

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 mt-12 bg-black border-y border-zinc-900/50 bg-zinc-900/20 max-md:px-4 max-md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Smart Performance</span>
          </div>
          <h2 className="font-display text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-3xl mx-auto max-lg:text-5xl max-md:text-4xl max-sm:text-3xl">
            Everything you need <br className="max-md:hidden" /> 
            <span className="text-zinc-500">to land the job</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-xl leading-relaxed font-light max-md:text-lg max-sm:text-base">
            Skip the anxiety with AI tools designed to analyze job details, optimize your resume, and prepare you for any interview.
          </p>
        </motion.div>

        <div className="grid grid-cols-5 gap-4 max-md:grid-cols-1">
          {/* Card 1 - Job Match Analysis (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-3 max-md:col-span-1"
          >
            <Card className="group h-full overflow-hidden border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl hover:border-zinc-500/30 transition-all duration-500 rounded-3xl">
              <CardContent className="p-8 max-sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 shrink-0"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Target className="w-6 h-6 text-zinc-300 group-hover:text-zinc-100 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="font-display font-bold text-xl text-zinc-100">Job Match Analysis</p>
                    <p className="text-zinc-500 text-sm">Resume & job description alignment</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-base mb-8 leading-relaxed font-light max-sm:text-sm">
                  Deep analysis of job descriptions to find missing keywords and calculate your readiness score for the role.
                </p>
                <div className="rounded-2xl border border-zinc-800/50 bg-zinc-950/50 p-6 overflow-hidden relative max-sm:p-4">
                  {/* AI Scanline/Pulse Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-linear-to-b from-transparent via-zinc-400/5 to-transparent z-10 pointer-events-none"
                    animate={{ 
                      top: ["-100%", "100%"] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest max-sm:text-[8px]">Analysis Engine v2.5</div>
                  </div>
                  
                  {/* Metrics grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 max-sm:gap-2">
                    {[
                      { label: "Match Score", value: "87%", status: "High" },
                      { label: "Keywords", value: "18/22", status: "Strong" },
                      { label: "Skill Gaps", value: "Low", status: "Safe" },
                    ].map((metric, i) => (
                      <motion.div
                        key={metric.label}
                        className="bg-zinc-900/80 border border-zinc-800/50 rounded-xl p-3 max-sm:p-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 max-sm:text-[8px]">{metric.label}</p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-zinc-100 font-bold text-lg max-sm:text-base">{metric.value}</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 mt-2 rounded-full overflow-hidden">
                           <motion.div 
                            className="h-full bg-zinc-300" 
                            initial={{ width: 0 }}
                            whileInView={{ width: metric.value.includes('%') ? metric.value : '80%' }}
                            transition={{ duration: 1, delay: 0.6 }}
                           />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Visual Skill Coverage */}
                  <div className="flex items-end gap-2 h-20 px-2 max-sm:gap-1 max-sm:px-1">
                    {[45, 75, 55, 90, 65, 80, 50, 95, 70, 85, 60, 75].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-zinc-600/20 to-zinc-400/60 rounded-t-sm origin-bottom"
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: h / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.05, ease: "circOut" }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2 - Resume Optimizer (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-2 max-md:col-span-1"
          >
            <Card className="group h-full overflow-hidden border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl hover:border-zinc-500/30 transition-all duration-500 rounded-3xl">
              <CardContent className="p-8 flex flex-col h-full max-sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 shrink-0"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <FileCheck className="w-6 h-6 text-zinc-300 group-hover:text-zinc-100 transition-colors" />
                  </motion.div>
                  <p className="font-display font-bold text-xl text-zinc-100">Resume Optimizer</p>
                </div>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-light">
                  Generate professional resumes that are guaranteed to pass through automated screening systems (ATS).
                </p>

                {/* Technical Compliance Checklist */}
                <div className="grid grid-cols-1 gap-2.5 mb-8">
                  {[
                    { label: "Section Hierarchy", status: "Verified" },
                    { label: "Keyword Density", status: "Optimized" },
                    { label: "Formatting", status: "Approved" },
                    { label: "Readability", status: "High" }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex items-center justify-between p-2 rounded-xl bg-zinc-800/30 border border-zinc-700/30"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-zinc-500" />
                        <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-tight">{item.label}</span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{item.status}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-auto pt-8 border-t border-zinc-800/50 max-sm:pt-6">
                  <div className="flex items-baseline gap-2 mb-4">
                    <motion.span
                      className="text-5xl font-display font-bold text-zinc-100 max-sm:text-4xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      100%
                    </motion.span>
                    <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest max-sm:text-[10px]">Success Rate</span>
                  </div>
                  <div className="h-3 bg-zinc-800/50 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-zinc-500 to-zinc-300 rounded-full"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: 0.5, ease: "expoOut" }}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-4 text-center uppercase tracking-[0.2em] max-sm:text-[8px]">Industry Standard Templates</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3 - Interview Preparation (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-2 max-md:col-span-1"
          >
            <Card className="group h-full overflow-hidden border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl hover:border-zinc-500/30 transition-all duration-500 rounded-3xl">
              <CardContent className="p-8 flex flex-col h-full max-sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 shrink-0"
                    whileHover={{ y: -2 }}
                  >
                    <MessageSquare className="w-6 h-6 text-zinc-300 group-hover:text-zinc-100 transition-colors" />
                  </motion.div>
                  <p className="font-display font-bold text-xl text-zinc-100">Interview Prep</p>
                </div>
                <p className="text-zinc-400 text-sm mb-12 leading-relaxed font-light max-sm:mb-8">
                  Get technical and behavioral questions tailored to your experience and the specific role.
                </p>
                
                <div className="flex justify-center gap-3 mt-auto relative">
                   <div className="absolute inset-0 bg-zinc-500/5 blur-3xl rounded-full" />
                  {["⌘", "Q"].map((key, i) => (
                    <motion.div
                      key={key}
                      className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/50 shadow-2xl relative z-10 max-sm:w-12 max-sm:h-12"
                      initial={{ y: 0 }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <span className="text-zinc-200 font-mono text-xl font-bold">{key}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-600 mt-8 text-center uppercase tracking-widest max-sm:mt-6">Get Practice Questions</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 4 - Step-by-step Study Plan (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-3 max-md:col-span-1"
          >
            <Card className="group h-full overflow-hidden border-zinc-800/50 bg-zinc-900/40 backdrop-blur-xl hover:border-zinc-500/30 transition-all duration-500 rounded-3xl">
              <CardContent className="p-8 flex flex-col h-full max-sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 shrink-0"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Layers className="w-6 h-6 text-zinc-300 group-hover:text-zinc-100 transition-colors" />
                  </motion.div>
                  <div>
                    <p className="font-display font-bold text-xl text-zinc-100">Step-by-step Study Plan</p>
                    <p className="text-zinc-500 text-sm">Personalized preparation roadmap</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-base mb-8 leading-relaxed font-light max-sm:text-sm">
                  A clear preparation roadmap to bridge your skill gaps and master the company's specific interview culture.
                </p>
                
                <div className="grid grid-cols-8 gap-3 mt-auto max-md:grid-cols-4 max-sm:gap-2">
                  {integrationLogos.map((logo, i) => (
                    <motion.div
                      key={logo.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -4, borderColor: 'rgba(161, 161, 170, 0.5)' }}
                      className="aspect-square rounded-xl border border-zinc-800 bg-zinc-950/50 flex flex-col items-center justify-center cursor-pointer p-2 transition-colors group/logo max-sm:p-1"
                    >
                      <div className="w-full h-1 bg-zinc-800 mb-1 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-zinc-500/40 group-hover/logo:bg-zinc-300" 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1, delay: 1 + i * 0.1 }}
                        />
                      </div>
                      <span className="text-[8px] text-zinc-600 group-hover/logo:text-zinc-300 font-mono uppercase tracking-tighter truncate w-full text-center max-sm:text-[7px]">
                        {logo.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mt-8 max-sm:flex-col max-sm:gap-4 max-sm:mt-6">
                  <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <ShieldCheck className="w-4 h-4 text-zinc-400/50 shrink-0" />
                    <span>Secure and Private</span>
                  </div>
                  <motion.button
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
                  >
                    View preparation guide <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
