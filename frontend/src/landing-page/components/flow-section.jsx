import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, FileCheck, Layers, Share2, Sparkles, Binary } from 'lucide-react';

const FlowSection = () => {
  const steps = [
    {
      id: '01',
      title: "Protocol Ingestion",
      subtitle: "Multi-Source Context Mapping",
      desc: "Our pipeline ingests the JD, your profile, and manual self-descriptions. We don't just 'read' them—we build a three-dimensional semantic map of your candidacy vs the target role.",
      icon: Database,
      accent: "from-brand-neon/40 to-transparent",
      layout: "flex-col md:flex-row"
    },
    {
      id: '02',
      title: "Strategic Synthesis",
      subtitle: "Gap Mapping & Report Generation",
      desc: "The AI identifies skill gaps and match scores, then generates Technical Questions, Behavioral Questions, and a day-wise execution roadmap tailored to your timeline.",
      icon: Binary,
      accent: "from-brand-neon/30 to-transparent",
      layout: "flex-col md:flex-row-reverse text-right"
    },
    {
      id: '03',
      title: "Convergent Output",
      subtitle: "ATS-Optimized Resume Export",
      desc: "Generate a perfectly tailored resume with one click. We re-write your experience using high-signal keywords from the JD while preserving your original identity and active hyperlinks.",
      icon: FileCheck,
      accent: "from-brand-neon/50 to-transparent",
      layout: "flex-col md:flex-row"
    }
  ];

  return (
    <section className="w-full flex flex-col items-center max-w-7xl py-24 md:py-32 px-6 mx-auto relative">
      
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/5 border border-brand-neon/10 mb-6 group cursor-default">
           <Zap size={12} className="text-brand-neon fill-brand-neon animate-pulse" />
           <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-neon/70">The Protocol</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">The Roadmap to Conversion.</h2>
        <p className="text-zinc-500 text-xl font-light max-w-2xl mx-auto">Zero friction. Highly-personalized strategy in seconds.</p>
      </motion.div>

      {/* Steps Container */}
      <div className="w-full flex flex-col gap-24 md:gap-40 relative">
        
        {/* Animated Connector Line */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-brand-neon/20 via-brand-neon/10 to-transparent -z-10 hidden md:block opacity-50">
           <motion.div 
             initial={{ top: "0%" }}
             whileInView={{ top: "100%" }}
             viewport={{ margin: "-200px" }}
             transition={{ duration: 2, ease: "linear" }}
             className="absolute top-0 left-[-1px] w-[3px] h-32 bg-brand-neon blur-sm rounded-full"
           />
        </div>

        {steps.map((step, idx) => (
          <div key={idx} className={`flex items-center gap-12 md:gap-32 w-full max-w-6xl mx-auto relative group ${step.layout}`}>
            
            {/* Visual Block (Icon/Graphic) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: idx === 1 ? 50 : -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
              className="w-full md:w-1/2 flex items-center justify-center relative"
            >
               <div className="relative">
                  {/* Outer Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-tr ${step.accent} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000`}></div>
                  
                  {/* Step ID Indicator */}
                  <div className="absolute -top-12 -left-12 md:-left-20 text-[10rem] font-black text-white/[0.02] select-none group-hover:text-brand-neon/[0.05] transition-colors duration-1000 leading-none font-mono">
                    {step.id}
                  </div>

                  {/* Icon Card */}
                  <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-[40px] border border-white/5 bg-[#0D0D0D] flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover:border-brand-neon/20 transition-all duration-500">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[40px]"></div>
                     <step.icon size={64} className="text-zinc-600 group-hover:text-brand-neon group-hover:scale-110 transition-all duration-500" />
                     
                     {/* Corner Decoration */}
                     <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-brand-neon/20 group-hover:bg-brand-neon group-hover:shadow-[0_0_10px_#8CFF2E] transition-all"></div>
                  </div>
               </div>
            </motion.div>

            {/* Content Block */}
            <div className={`w-full md:w-1/2 flex flex-col ${idx === 1 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
               <motion.div
                 initial={{ opacity: 0, x: idx === 1 ? -30 : 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ delay: 0.2, duration: 0.8 }}
                 className="flex flex-col"
               >
                 <span className="text-xs font-bold text-brand-neon uppercase tracking-[0.3em] font-mono mb-4 block">Process Stage {step.id}</span>
                 <h3 className="text-4xl font-bold mb-2 text-white tracking-tight">{step.title}</h3>
                 <div className={`h-1 w-12 bg-brand-neon mb-6 ${idx === 1 ? "md:ml-auto" : ""}`}></div>
                 <h4 className="text-zinc-300 text-lg font-semibold mb-4 opacity-80">{step.subtitle}</h4>
                 <p className="text-zinc-500 text-lg leading-relaxed font-light">
                   {step.desc}
                 </p>
               </motion.div>
            </div>

          </div>
        ))}
        
      </div>

      {/* Decorative Final Node */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mt-32 w-12 h-12 rounded-full bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center shadow-[0_0_40px_rgba(140,255,46,0.1)]"
      >
        <Sparkles size={20} className="text-brand-neon" />
      </motion.div>
    </section>
  );
};

export default FlowSection;

