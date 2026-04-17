import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, RefreshCw, CheckCircle2, XCircle, ArrowRight, MousePointer2 } from 'lucide-react';

const ResumeComparison = () => {
  return (
    <section className="w-full flex flex-col items-center max-w-7xl py-24 md:py-32 px-6 mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-neon/5 blur-[150px] -z-10 rounded-full" />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/5 border border-brand-neon/10 mb-6 group cursor-default">
           <RefreshCw size={12} className="text-brand-neon group-hover:rotate-180 transition-transform duration-700" />
           <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-neon/70">Transformation</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">The Convergent Resume.</h2>
        <p className="text-zinc-500 text-xl font-light max-w-2xl mx-auto">One-click transform of your raw profile into a high-signal masterpiece tailored to target JD semantics.</p>
      </motion.div>

      <div className="w-full flex flex-col md:flex-row gap-12 items-center justify-center max-w-5xl">
        
        {/* Left: Raw Resume (Low Signal) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full bg-[#0D0D0D] border border-white/5 rounded-[32px] p-8 relative opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
          <div className="absolute top-4 right-6 flex items-center gap-2 text-red-500/50">
             <span className="text-[9px] font-bold tracking-widest uppercase">Low Signal</span>
             <XCircle size={14} />
          </div>
          <h3 className="text-zinc-500 font-mono text-xs mb-8 uppercase tracking-widest">_Source_Resume.pdf</h3>
          
          <div className="space-y-4 font-light text-zinc-500 text-xs">
             <div className="h-2 w-3/4 bg-zinc-900 rounded-full"></div>
             <div className="h-2 w-full bg-zinc-900 rounded-full"></div>
             <div className="h-2 w-2/3 bg-zinc-900 rounded-full"></div>
             <div className="mt-8 space-y-2">
                <div className="h-2 w-full bg-zinc-900 rounded-full opacity-50"></div>
                <div className="h-2 w-full bg-zinc-900 rounded-full opacity-50"></div>
             </div>
             <div className="mt-10 h-24 w-full bg-zinc-900/50 rounded-xl flex items-center justify-center border border-dashed border-white/5 italic opacity-40">
                General experience sections...
             </div>
          </div>
        </motion.div>

        {/* Center: Conversion Icon */}
        <div className="shrink-0 z-10 w-16 h-16 rounded-full bg-brand-neon flex items-center justify-center shadow-[0_0_40px_rgba(140,255,46,0.5)] rotate-90 md:rotate-0">
           <ArrowRight size={24} className="text-black" />
        </div>

        {/* Right: Optimized Resume (High Signal) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-[1.2] w-full bg-[#0A0A0A] border border-brand-neon/20 rounded-[40px] p-10 relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Scanning Animation */}
          <motion.div 
            animate={{ top: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-brand-neon/10 to-transparent pointer-events-none -z-10"
          />
          
          <div className="absolute top-6 right-8 flex items-center gap-3">
             <span className="text-[10px] bg-brand-neon/10 text-brand-neon border border-brand-neon/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 size={12}/> High Signal
             </span>
          </div>

          <h3 className="text-white font-mono text-xs mb-10 uppercase tracking-widest flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 rounded-full bg-brand-neon shadow-[0_0_8px_#8CFF2E]" />
            _Optimized_Protocol_V2.pdf
          </h3>

          <div className="space-y-6">
             <div className="space-y-3">
                <div className="h-2 w-1/3 bg-brand-neon/40 rounded-full border border-brand-neon/20"></div>
                <div className="h-2 w-full bg-white/10 rounded-full"></div>
             </div>
             
             {/* Highlighted Section */}
             <div className="bg-brand-neon/5 border border-brand-neon/10 rounded-2xl p-6 relative group overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-brand-neon"></div>
                <div className="text-[9px] text-brand-neon/70 uppercase tracking-widest font-black mb-3">Contextual Keywords Added</div>
                <div className="flex flex-wrap gap-2">
                   {["System Design", "Scalability", "Latency Optimization", "Microservices"].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-brand-neon/10 text-brand-neon text-[8px] font-bold rounded-lg border border-brand-neon/20">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>

             <div className="space-y-3 pt-4">
                <div className="h-2 w-4/5 bg-white/10 rounded-full"></div>
                <div className="h-2 w-full bg-white/5 rounded-full"></div>
                <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
             </div>
          </div>

          {/* Floating Interaction Badge */}
          <div className="absolute bottom-6 right-8">
             <motion.div 
               whileHover={{ scale: 1.1 }}
               className="bg-brand-neon text-black px-6 py-3 rounded-xl flex items-center gap-3 font-bold text-xs shadow-lg cursor-pointer"
             >
                <FileDown size={14} />
                <span>EXPORT GENERATED PDF</span>
             </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Success Badge */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-16 flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest"
      >
        <span>ATS COMPLIANCE SCORE:</span>
        <span className="text-brand-neon text-base font-black">98.4%</span>
      </motion.div>
    </section>
  );
};

export default ResumeComparison;
