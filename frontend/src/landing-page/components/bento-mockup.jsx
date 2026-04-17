import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Map, Target, Sparkles, ChevronRight, Binary } from 'lucide-react';

const BentoMockup = () => {
  return (
    <section className="w-full flex flex-col items-center max-w-7xl pt-20 px-4 mx-auto mb-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-neon/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/5 border border-brand-neon/10 mb-6 group cursor-default">
           <Sparkles size={12} className="text-brand-neon fill-brand-neon animate-pulse" />
           <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-neon/70">Visual Proof</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 italic">Inside the Strategy.</h2>
        <p className="text-zinc-500 text-xl font-light">A high-fidelity glimpse into your converted future.</p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 w-full h-auto lg:h-[700px]">
        
        {/* Card 1: Technical Questions (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-1 bg-[#0D0D0D] border border-white/5 rounded-[32px] p-8 relative overflow-hidden flex flex-col group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <Code2 size={24} className="text-brand-neon mb-6" />
          <h3 className="text-xl font-bold text-white mb-4">Technical Logic</h3>
          <div className="bg-black/40 rounded-xl p-4 border border-white/5 space-y-3 font-mono text-[10px] text-zinc-400">
             <div className="flex gap-2">
                <span className="text-brand-neon group-hover:animate-pulse">Q:</span>
                <span>Optimizing large-scale React renders?</span>
             </div>
             <div className="w-full h-px bg-white/5"></div>
             <div className="flex gap-2 text-white/60">
                <span className="text-zinc-600">A:</span>
                <span>Memoization, Virtualization, Fiber reconciliation analysis...</span>
             </div>
          </div>
        </motion.div>

        {/* Card 2: Behavioral Matrix (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-1 bg-[#0D0D0D] border border-white/5 rounded-[32px] p-8 relative overflow-hidden flex flex-col group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />
          <Users size={24} className="text-brand-neon mb-6" />
          <h3 className="text-xl font-bold text-white mb-4">Culture Fit</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">STAR Frame</span>
                <span className="text-[10px] text-brand-neon font-bold">READY</span>
             </div>
             <div className="space-y-2 opacity-40 group-hover:opacity-100 transition-opacity">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full"></div>
                <div className="h-1.5 w-3/4 bg-zinc-800 rounded-full"></div>
             </div>
          </div>
        </motion.div>

        {/* Card 3: Execution Roadmap (2x1 Large Right) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-2 md:row-span-2 bg-[#0D0D0D] border border-brand-neon/10 rounded-[40px] p-10 relative overflow-hidden flex flex-col group shadow-[0_0_50px_rgba(140,255,46,0.02)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="flex justify-between items-start mb-12">
             <div>
                <Map size={32} className="text-brand-neon mb-6" />
                <h3 className="text-3xl font-bold text-white mb-2">Execution Roadmap</h3>
                <p className="text-zinc-500 text-sm font-light">Custom 7-day conversion path.</p>
             </div>
             <div className="px-4 py-2 bg-brand-neon/10 border border-brand-neon/20 rounded-full text-[10px] font-bold text-brand-neon uppercase tracking-tighter">Day 01 Active</div>
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-hide">
             {[
               { day: "01", task: "Fundamentals & Architecture", status: "Active" },
               { day: "02", task: "Behavioral Matrix Refinement", status: "Pending" },
               { day: "03", task: "Mock Gauntlet: Senior Logic", status: "Pending" },
               { day: "04", task: "System Design Patterns", status: "Pending" }
             ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-5 bg-white/[0.02] border border-white/5 rounded-2xl group/row hover:bg-white/5 transition-colors">
                   <span className="text-2xl font-black text-white/10 group-hover/row:text-brand-neon transition-colors">{item.day}</span>
                   <span className="text-sm font-medium text-white/50 group-hover/row:text-white flex-1">{item.task}</span>
                   <ChevronRight size={16} className="text-zinc-800 group-hover/row:text-brand-neon" />
                </div>
             ))}
          </div>
        </motion.div>

        {/* Card 4: Match Score Detail (1x1) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="md:col-span-1 bg-brand-neon text-black rounded-[32px] p-8 relative overflow-hidden flex flex-col group shadow-[0_20px_40px_rgba(140,255,46,0.1)]"
        >
           <Binary size={24} className="mb-6 opacity-60" />
           <h3 className="text-xl font-bold mb-4">Match Score</h3>
           <div className="mt-auto flex items-end gap-2">
              <span className="text-7xl font-bold tracking-tighter">94</span>
              <span className="text-xl font-bold mb-3">%</span>
           </div>
           <p className="text-xs font-bold uppercase tracking-widest opacity-60 mt-4 leading-relaxed">Cross-referenced against <br/> 52+ Job semantics</p>
           
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/5 rounded-full border-[15px] border-black/10 group-hover:scale-110 transition-transform"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default BentoMockup;
