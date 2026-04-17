import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Activity, FileCheck, Milestone, Upload, Download, Target, ChevronRight, Sparkles } from 'lucide-react';

const blockVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  }
};

const cardStyle = {
  boxShadow: 'inset 0px 1px 1px 0px rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.05)',
  backgroundColor: 'rgba(13, 13, 13, 0.7)',
  backdropFilter: 'blur(20px)'
};

const SpotlightFeatures = () => {
  return (
    <section className="w-full flex flex-col items-center max-w-7xl py-24 md:py-32 px-6 mx-auto">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">The Intelligence Pipeline</h2>
        <p className="text-zinc-500 text-xl font-light">Engineered for high-signal interview conversion.</p>
      </motion.div>

      <div className="w-full flex flex-col gap-6">
        
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-6 min-h-auto md:min-h-[500px]">
          {/* Massive Card (Synthesis Engine) */}
          <motion.div 
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)" }}
            className="flex-[2] rounded-[32px] p-8 md:p-14 flex flex-col relative overflow-hidden group transition-all duration-500"
            style={cardStyle}
          >
             {/* Border Beam Effect */}
             <div className="absolute inset-0 border border-brand-neon/0 group-hover:border-brand-neon/20 transition-colors duration-500 rounded-[32px] z-20 pointer-events-none" />
             
             <div className="absolute right-0 top-0 w-96 h-96 bg-brand-neon/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-neon/15 transition-all duration-1000"></div>
             
             <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20 shadow-[0_0_20px_rgba(140,255,46,0.1)] group-hover:scale-110 transition-transform duration-500">
                 <BrainCircuit size={24} className="text-brand-neon" />
               </div>
               <span className="text-[10px] font-bold text-brand-neon uppercase tracking-widest bg-brand-neon/5 px-3 py-1 rounded-full border border-brand-neon/10">Engine Phase 01</span>
             </div>

             <h3 className="text-4xl font-bold tracking-tight mb-4 text-white">Contextual Synthesis</h3>
             <p className="text-zinc-400 max-w-lg mb-12 font-light z-10 leading-relaxed text-lg">
               Drop your <span className="text-white font-medium italic">Resume</span>, the <span className="text-white font-medium italic">Job Description</span>, and a <span className="text-white font-medium italic">Self-Bio</span>. 
               Our AI cross-references every data point to build a hyper-personalized conversion strategy.
             </p>
             
             {/* UI Graphic: Input Synthesis System */}
             <div className="mt-auto w-full aspect-video md:aspect-[21/10] bg-[#050505] rounded-t-2xl border border-white/10 border-b-0 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl pt-12 pb-16 group/synthesis">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-neon/[0.02] to-transparent pointer-events-none" />
                <div className="flex gap-6 items-center relative z-10">
                   {[
                     { label: "JD", icon: Upload },
                     { label: "RESUME", icon: Upload },
                     { label: "BIO", icon: Upload }
                   ].map((item, i) => (
                     <motion.div 
                       key={i}
                       whileHover={{ y: -2, borderColor: "rgba(140, 255, 46, 0.4)" }}
                       className="px-5 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-[10px] text-white/70 font-mono flex items-center gap-3 shadow-lg backdrop-blur-md transition-all"
                     >
                       <item.icon size={14} className="text-brand-neon/60" /> {item.label}
                     </motion.div>
                   ))}
                </div>
                <div className="w-px h-16 bg-gradient-to-b from-white/10 via-brand-neon/40 to-brand-neon my-6 relative z-10">
                   <motion.div 
                     animate={{ top: ["0%", "100%"] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                     className="absolute w-2 h-2 bg-brand-neon rounded-full left-1/2 -translate-x-1/2 blur-[2px]"
                   />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.02, 1], boxShadow: ["0 0 20px rgba(140,255,46,0.1)", "0 0 40px rgba(140,255,46,0.3)", "0 0 20px rgba(140,255,46,0.1)"] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="px-8 py-4 bg-brand-neon/10 border border-brand-neon/30 rounded-full text-xs font-black text-brand-neon tracking-[0.3em] shadow-lg relative z-10"
                >
                  SYNTHESIZING PROTOCOL
                </motion.div>
             </div>
          </motion.div>

          {/* Side Card (Precision Metrics - Actual UI Style) */}
          <motion.div 
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)" }}
            className="flex-[1] rounded-[32px] p-8 md:p-14 flex flex-col relative overflow-hidden group transition-all duration-500"
            style={cardStyle}
          >
             <div className="absolute inset-0 border border-brand-neon/0 group-hover:border-brand-neon/20 transition-colors duration-500 rounded-[32px] z-20 pointer-events-none" />

             <div className="w-12 h-12 rounded-2xl bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20 shadow-[0_0_20px_rgba(140,255,46,0.1)] group-hover:rotate-12 transition-all duration-500 mb-6">
                <Activity size={24} className="text-brand-neon" />
             </div>
             <h3 className="text-3xl font-bold tracking-tight mb-2 text-white">Precision Metrics</h3>
             <p className="text-zinc-500 text-sm font-light mb-8 italic">Signal evaluation vs market benchmarks.</p>
             
             <div className="flex items-baseline gap-1 mt-6 mb-4 relative group/score">
               <span className="text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 group-hover/score:via-brand-neon group-hover/score:to-white transition-all duration-1000">94</span>
               <span className="text-3xl font-mono text-brand-neon font-bold drop-shadow-[0_0_10px_rgba(140,255,46,0.5)]">%</span>
               <div className="absolute -top-4 -right-12 hidden group-hover/score:block bg-brand-neon text-black text-[8px] font-black px-2 py-1 rounded tracking-tighter animate-bounce">TOP 1% CANDIDATE</div>
             </div>

             <div className="mt-auto space-y-3">
               <div className="flex justify-between items-end mb-2">
                 <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Identified Skill Gaps</div>
                 <div className="text-[9px] font-mono text-brand-neon/60">LIVE UPDATING...</div>
               </div>
               {[
                 { skill: "System Design", severity: "High", color: "text-red-500 bg-red-400/5 border-red-500/20" },
                 { skill: "Latency Optimization", severity: "Medium", color: "text-yellow-500 bg-yellow-400/5 border-yellow-500/20" },
                 { skill: "Unit Testing", severity: "Medium", color: "text-yellow-500 bg-yellow-400/5 border-yellow-500/20" }
               ].map((gap, i) => (
                 <motion.div 
                   key={i} 
                   whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                   className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-2xl transition-all"
                 >
                   <span className="text-xs text-white/70 font-medium flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-white/20"></span>
                     {gap.skill}
                   </span>
                   <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase border shadow-sm ${gap.color}`}>
                     {gap.severity}
                   </span>
                 </motion.div>
               ))}
             </div>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-6 min-h-auto md:min-h-[400px]">
          {/* Side Card (AI Re-generation - Solid Neon) */}
          <motion.div 
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)" }}
            className="flex-[1] bg-brand-neon text-black rounded-[32px] p-8 md:p-14 flex flex-col relative overflow-hidden group transition-all duration-500"
          >
             <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center border border-black/10 transition-transform group-hover:rotate-12 mb-6">
               <FileCheck size={24} className="text-black" />
             </div>
             <h3 className="text-3xl font-bold tracking-tight mb-4 text-black relative z-10 leading-tight">Contextual Resume Re-gen</h3>
             <p className="font-semibold text-black/70 relative z-10 text-lg leading-snug">
               Automatically rewrite your resume with high-signal keywords tailored to the target JD.
             </p>
             <div className="mt-auto flex items-center justify-between bg-black/10 p-5 rounded-3xl border border-black/10 relative z-10 group/btn hover:bg-black transition-all cursor-pointer">
                <span className="text-xs font-black uppercase tracking-widest group-hover:text-brand-neon transition-colors">Export High-Signal PDF</span>
                <Download size={20} className="group-hover:text-brand-neon transition-colors" />
             </div>
             
             <motion.div
               animate={{ rotate: 360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute -right-20 -bottom-20 w-64 h-64 border-[32px] border-black/[0.05] rounded-full pointer-events-none"
             ></motion.div>
          </motion.div>
          
          {/* Span Card (Roadmap / Preparations) */}
          <motion.div 
            variants={blockVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, borderColor: "rgba(140, 255, 46, 0.3)" }}
            className="flex-[2] rounded-[32px] p-8 md:p-14 flex flex-col relative overflow-hidden group transition-all duration-500"
            style={cardStyle}
          >
             <div className="absolute inset-0 border border-brand-neon/0 group-hover:border-brand-neon/20 transition-colors duration-500 rounded-[32px] z-20 pointer-events-none" />

             <div className="absolute left-0 top-0 w-64 h-64 bg-brand-neon/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-brand-neon/10 transition-all duration-1000"></div>
             
             <div className="w-12 h-12 rounded-2xl bg-zinc-400/10 flex items-center justify-center border border-white/10 shadow-lg group-hover:shadow-brand-neon/5 transition-all duration-500 mb-6">
                <Milestone size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
             </div>

             <h3 className="text-4xl font-bold tracking-tight mb-4 text-white">Execution Roadmap</h3>
             <p className="text-zinc-500 font-light max-w-md z-10 leading-relaxed text-lg mb-10">
               Get <span className="text-white">Technical Questions</span>, <span className="text-white">Behavioral Questions</span>, and a day-by-day roadmap tailored to your timeline.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 mt-auto">
               {[
                 { day: "01", focus: "Architecture", task: "System Design", color: "bg-brand-neon/20" },
                 { day: "02", focus: "Behavioral", task: "STAR Matrix", color: "bg-white/10" }
               ].map((step, i) => (
                 <div key={i} className="flex-1 bg-white/[0.02] border border-white/10 rounded-[28px] p-6 relative overflow-hidden group/item hover:bg-white/[0.05] transition-all duration-500 backdrop-blur-md">
                    <div className="absolute top-4 right-4 text-[8px] text-brand-neon font-black tracking-widest uppercase bg-brand-neon/10 px-2 py-0.5 rounded-full border border-brand-neon/20">DAY {step.day}</div>
                    <div className="w-1.5 h-full bg-brand-neon absolute left-0 top-0 group-hover/item:shadow-[0_0_15px_rgba(140,255,46,0.5)] transition-all"></div>
                    <div className="text-sm font-black text-white mb-1 mt-4">{step.focus}</div>
                    <div className="flex items-center gap-1.5 text-[9px] text-white/50 uppercase tracking-widest font-black">
                       <ChevronRight size={10} className="text-brand-neon"/> {step.task}
                    </div>
                 </div>
               ))}
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightFeatures;
