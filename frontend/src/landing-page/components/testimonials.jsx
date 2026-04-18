import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const AnimatedCounter = ({ value, suffix = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value.replace(/[^0-9]/g, ""));
      if (start === end) return;

      let totalDuration = 2000;
      let incrementTime = (totalDuration / end) > 10 ? (totalDuration / end) : 10;

      let timer = setInterval(() => {
        start += Math.ceil(end / 100);
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Testimonials = () => {
  const socialProof = [
    {
      name: "Alex Rivera",
      role: "Senior Frontend Engineer",
      company: "Google",
      quote: "The strategic roadmap was a game-changer. It didn't just tell me what to study—it mapped my experience directly to the L5 requirements. Landed the offer in 3 weeks.",
      logo: "G"
    },
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "Meta",
      quote: "The resume re-generation is absolute magic. I went from a 10% response rate to almost 80% after optimizing for specific role semantics. It's high-signal only.",
      logo: "M"
    },
    {
      name: "Jordan Smith",
      role: "Backend Architect",
      company: "Stripe",
      quote: "CareerLens identified skill gaps I didn't even know I had. The technical deep-dives and behavioral matrices are exactly what FAANG interviewers are looking for.",
      logo: "S"
    }
  ];

  return (
    <section id="testimonials" className="w-full flex flex-col items-center max-w-7xl py-24 md:py-32 px-6 mx-auto relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-neon/5 blur-[120px] rounded-full pointer-events-none -z-10 opacity-40"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 mb-6 font-mono text-[10px] uppercase tracking-widest text-brand-neon">
           <Star size={10} className="fill-brand-neon"/> Social Proof
        </div>
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6">Proven Protocol.</h2>
        <p className="text-zinc-500 text-base md:text-xl font-light max-w-2xl mx-auto">Engineers and managers from top-tier tech are already using the protocol to land their next level.</p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {socialProof.map((item, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col bg-[#0D0D0D] border border-white/5 p-6 md:p-8 rounded-[24px] md:rounded-[32px] relative group hover:border-brand-neon/20 transition-all duration-500 shadow-2xl"
          >
            <div className="absolute top-6 md:top-8 right-6 md:right-8 text-white/5 group-hover:text-brand-neon/10 transition-colors">
              <Quote className="w-10 h-10 md:w-20 md:h-20" />
            </div>
            
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10 relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-lg md:text-xl font-black text-white/50 group-hover:text-brand-neon transition-colors">
                   {item.logo}
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-white text-base md:text-lg tracking-tight">{item.name}</h4>
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                    {item.role} <span className="text-brand-neon/50">@</span> {item.company}
                  </div>
                </div>
              </div>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light mb-8 md:mb-10 relative z-10">
              "{item.quote}"
            </p>

            <div className="mt-auto flex items-center gap-2 relative z-10">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={14} className="text-brand-neon fill-brand-neon" />
               ))}
               <span className="text-[10px] text-zinc-600 font-bold ml-2 uppercase tracking-widest">Verified User</span>
            </div>
            
            {/* Subtle Hover Glow */}
            <div className="absolute inset-0 bg-brand-neon/5 opacity-0 group-hover:opacity-100 blur-[80px] transition-opacity duration-1000 -z-10 rounded-[32px]"></div>
          </motion.article>
        ))}
      </div>

      {/* Network Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-white/5 w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-32"
      >
         <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-white"><AnimatedCounter value="12" suffix="k+" /></span>
            <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em] mt-2">Reports Generated</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-white"><AnimatedCounter value="84" suffix="%" /></span>
            <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em] mt-2">Interview Success</span>
         </div>
         <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-white"><AnimatedCounter value="2" suffix=".4M" /></span>
            <span className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em] mt-2">Salary Impact</span>
         </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
