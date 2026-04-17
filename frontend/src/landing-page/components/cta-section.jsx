import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto py-24 md:py-32 px-6">
      <motion.section 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-[#050505] border border-white/5 rounded-[40px] px-6 py-32 flex flex-col items-center text-center overflow-hidden relative group"
      >
        <div className="absolute inset-0 bg-brand-neon/[0.02] -z-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 max-w-3xl text-white">Synthesize Your Success Protocol.</h2>
        <p className="text-zinc-400 text-lg mb-12">Generate your interview strategy and optimize your resume for the target JD today.</p>
        <div className="flex gap-4 sm:flex-row flex-col">
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/generate-report')}
             className="bg-brand-neon text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 shadow-[0_10px_40px_rgba(140,255,46,0.3)] transition-all"
           >
             Synthesize Strategy <ArrowRight size={20} />
           </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default CtaSection;
