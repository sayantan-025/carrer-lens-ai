import { Sparkles, Zap, TerminalSquare, Target, Activity, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20, mass: 1 }
  }
};

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex flex-col items-center pt-32 pb-24 md:pt-40 md:pb-32 max-w-7xl relative mx-auto px-6">
      
      {/* Background Glows (Deep Dark / Neon Theme) */}
      {/* Background Glows (Refined for maximum clarity) */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[120px] pointer-events-none -z-10 opacity-50"></div>
      <div className="absolute top-[40%] right-10 w-[300px] h-[300px] bg-brand-neon/15 rounded-full blur-[100px] pointer-events-none -z-10 opacity-30"></div>

      {/* Animated Hero Text */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col items-center text-center mb-20 z-10"
      >
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/5 mb-8 shadow-lg backdrop-blur-md"
        >
          <Sparkles size={14} className="text-brand-neon" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
            Next-Gen AI Pipeline
          </span>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-[6.5rem] font-bold tracking-[-0.04em] leading-[0.9] text-white max-w-5xl mx-auto mb-8"
        >
          Engineer Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-neon to-white bg-[length:200%_auto] animate-pulse-slow drop-shadow-lg">
            Interview Success
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-2xl mx-auto mb-10"
        >
          Map your <span className="text-white">Resume</span>, <span className="text-white">JD</span>, and <span className="text-white">Bio</span> to instantly generate Technical & Behavioral Questions, a Match Score, and a Day-Wise roadmap. Plus, one-click Resume re-generation.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/generate-report')}
            className="w-full sm:w-auto bg-brand-neon text-black px-10 py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 font-bold group relative overflow-hidden shadow-[0_10px_40px_rgba(140,255,46,0.3)]"
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
            <Zap size={18} className="fill-black group-hover:scale-110 transition-transform" />
            <span>Synthesize Strategy</span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Hero Mockup (Modern SaaS / Dashboard Clone) */}
      <motion.section 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl aspect-square md:aspect-[21/9] bg-[#0a0a0a] rounded-[32px] overflow-hidden flex flex-col p-2 md:p-6 group relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5"
      >
        <div className="flex justify-between items-center mb-4 px-4 relative z-10 w-full pt-2">
           <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/10"></div>
              <div className="w-3 h-3 rounded-full bg-white/10"></div>
              <div className="w-3 h-3 rounded-full bg-white/10"></div>
           </div>
           <div className="bg-white/[0.02] px-4 py-2 rounded-full hidden md:flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-white/30 border border-white/5">
             <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse shadow-[0_0_10px_#8CFF2E]" /> Analysis Active</span>
           </div>
        </div>
        
        {/* Mockup Dashboard Content */}
        <div className="flex-1 w-full bg-[#050505] rounded-t-2xl md:rounded-2xl border border-white/5 p-4 flex flex-col md:flex-row gap-4 relative overflow-hidden z-10 mx-auto shadow-inner">
           
           {/* Sidebar Mock */}
           <div className="hidden md:flex w-1/4 h-full flex-col gap-3">
              <div className="p-4 rounded-2xl bg-[#111] border border-white/10 relative overflow-hidden flex flex-col gap-3 group/nav">
                  <div className="absolute left-0 top-0 w-1.5 h-full bg-brand-neon"></div>
                  <div className="w-10 h-10 rounded-xl bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20">
                    <TerminalSquare size={18} className="text-brand-neon" />
                  </div>
                  <div>
                     <span className="text-sm font-bold text-white block">Engineering</span>
                     <span className="text-[10px] uppercase font-mono text-white/40">Technical Qs</span>
                  </div>
              </div>
              <div className="p-4 rounded-2xl bg-transparent border border-transparent flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Target size={18} className="text-white/30" />
                  </div>
                  <div>
                     <span className="text-sm font-bold text-white/50 block">Culture Fit</span>
                     <span className="text-[10px] uppercase font-mono text-white/30">Behavioral Matrix</span>
                  </div>
              </div>
           </div>

           {/* Editor Mock */}
           <div className="flex-1 h-full bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 flex flex-col shadow-lg overflow-hidden relative">
              <div className="absolute left-4 top-8 bottom-8 flex flex-col gap-[22px] text-white/10 font-mono text-xs select-none">
                 <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span>
              </div>
              <div className="pl-6 h-full flex flex-col gap-4">
                 <div className="w-3/4 h-3 rounded bg-white/10 mt-1"></div>
                 <div className="w-1/2 h-3 rounded bg-white/5"></div>
                 <div className="mt-4 p-4 rounded-xl bg-brand-neon/[0.03] border border-brand-neon/10 relative overflow-hidden">
                    <div className="absolute left-0 top-0 w-1 h-full bg-brand-neon/50"></div>
                    <div className="flex items-center gap-2 mb-3">
                       <span className="w-1 h-1 rounded-full bg-brand-neon"></span>
                       <span className="text-[9px] uppercase tracking-widest font-bold text-brand-neon/70">Optimal Execution Frame</span>
                    </div>
                    <div className="w-[90%] h-2.5 rounded bg-white/40 mb-2"></div>
                    <div className="w-[70%] h-2.5 rounded bg-white/20 mb-2"></div>
                    <div className="w-[85%] h-2.5 rounded bg-white/20"></div>
                 </div>
                 <div className="w-full h-[60px] rounded-xl bg-white/[0.02] border border-white/5 mt-auto flex items-center justify-between p-4">
                    <div className="flex gap-2">
                       <div className="w-6 h-6 rounded bg-brand-neon/10 border border-brand-neon/20"></div>
                       <div className="w-6 h-6 rounded bg-white/5 border border-white/10"></div>
                    </div>
                    <div className="w-12 h-6 rounded bg-white/10"></div>
                 </div>
              </div>
           </div>

           {/* Metrics Mock */}
           <div className="w-full md:w-1/4 h-full flex flex-row md:flex-col gap-4">
              <div className="flex-1 bg-[#111] rounded-2xl border border-white/5 p-4 relative overflow-hidden flex flex-col items-center justify-center">
                 <Target size={120} className="absolute -right-6 -top-6 text-white/5 rotate-12" />
                 <div className="flex items-center gap-2 w-full text-left mb-auto">
                    <Activity size={14} className="text-white/40" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Match</span>
                 </div>
                 <div className="flex items-start my-auto">
                    <span className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">94</span>
                    <span className="text-xl font-mono text-brand-neon mt-2">%</span>
                 </div>
              </div>
              <div className="flex-1 bg-[#111] rounded-2xl border border-white/5 p-4 flex flex-col relative">
                 <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={14} className="text-white/40" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">Gaps</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg flex items-center justify-between">
                       <div className="w-16 h-2 rounded bg-red-500/50"></div>
                       <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 text-[8px] font-bold">HIGH</span>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-2.5 rounded-lg flex items-center justify-between">
                       <div className="w-12 h-2 rounded bg-yellow-500/50"></div>
                       <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-500 text-[8px] font-bold">MED</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
