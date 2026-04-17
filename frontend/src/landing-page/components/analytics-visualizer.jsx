import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Zap, AlertTriangle, TrendingUp, BarChart3 } from 'lucide-react';

const AnalyticsVisualizer = () => {
  return (
    <section className="w-full flex flex-col items-center max-w-7xl pt-32 px-4 mx-auto mb-32 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-neon/5 blur-[150px] -z-10 rounded-full" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 font-mono text-[10px] uppercase tracking-widest text-white/50">
           Diagnostic Mode: Active
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">High-Signal Analytics.</h2>
        <p className="text-zinc-500 text-xl font-light max-w-2xl mx-auto">Proprietary scoring mapping your exact profile against real-market demand semantics.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
        
        {/* Left: The Match Score Hub */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-12 relative flex flex-col items-center justify-center aspect-square md:aspect-auto h-auto md:h-[600px]"
        >
          {/* Radial Progress Gauge Simulation */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90">
                <circle 
                   cx="50%" cy="50%" r="48%" 
                   className="stroke-white/[0.03] fill-transparent" 
                   strokeWidth="12"
                />
                <motion.circle 
                   cx="50%" cy="50%" r="48%" 
                   className="stroke-brand-neon fill-transparent" 
                   strokeWidth="12"
                   strokeLinecap="round"
                   strokeDasharray="100 100"
                   initial={{ strokeDasharray: "0 100" }}
                   whileInView={{ strokeDasharray: "94 100" }}
                   viewport={{ once: true }}
                   transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-8xl md:text-9xl font-black text-white tracking-tighter"
                >
                  94
                </motion.span>
                <span className="text-brand-neon font-bold text-xl md:text-2xl mt-[-10px]">MATCH SCORE</span>
             </div>
          </div>
          
          <div className="mt-12 flex gap-8 w-full justify-between items-center text-center px-6">
             <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">88%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Tech Fit</span>
             </div>
             <div className="w-px h-10 bg-white/5"></div>
             <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">96%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Cultural Logic</span>
             </div>
             <div className="w-px h-10 bg-white/5"></div>
             <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">92%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">ATS Strength</span>
             </div>
          </div>
        </motion.div>

        {/* Right: Detailed Diagnostic Breakdown */}
        <div className="flex flex-col gap-8 h-full justify-center">
           {[
             { label: "Technical Prowess", val: "92%", icon: Zap, color: "bg-brand-neon" },
             { label: "Semantic Optimization", val: "98%", icon: BarChart3, color: "bg-brand-neon" },
             { label: "Keyword Density", val: "85%", icon: TrendingUp, color: "bg-brand-neon" }
           ].map((metric, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 + (i * 0.1) }}
               className="bg-[#0D0D0D] border border-white/5 p-8 rounded-2xl group hover:border-brand-neon/20 transition-all hover:bg-white/[0.02]"
             >
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-xl text-zinc-400 group-hover:text-brand-neon transition-colors">
                        <metric.icon size={20} />
                      </div>
                      <span className="text-lg font-bold text-white tracking-tight">{metric.label}</span>
                   </div>
                   <span className="text-brand-neon font-black font-mono">{metric.val}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: metric.val }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, delay: 0.8 }}
                     className={`${metric.color} h-full rounded-full shadow-[0_0_15px_#8CFF2E]`}
                   />
                </div>
             </motion.div>
           ))}

           {/* Identified Gaps Preview */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-4 p-8 bg-brand-neon/5 border border-brand-neon/10 rounded-3xl flex items-center justify-between"
           >
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-red-500/20 flex items-center justify-center text-red-500"><AlertTriangle size={14}/></div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-brand-neon/20 flex items-center justify-center text-brand-neon"><Target size={14}/></div>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Diagnostic Report</span>
                    <span className="text-[10px] text-brand-neon/70 font-bold uppercase tracking-widest">3 Skill Gaps Identified</span>
                 </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-brand-neon/20 rounded-full text-brand-neon hover:bg-brand-neon hover:text-black transition-all">View Details</button>
           </motion.div>
        </div>

      </div>
    </section>
  );
};

export default AnalyticsVisualizer;
