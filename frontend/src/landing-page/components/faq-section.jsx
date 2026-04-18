import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left group"
      >
        <span className="text-lg md:text-2xl font-bold text-white group-hover:text-brand-neon transition-colors duration-300">
           {question}
        </span>
        <div className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-brand-neon border-brand-neon' : ''}`}>
           {isOpen ? <Minus size={20} className="text-black" /> : <Plus size={20} className="text-zinc-500" />}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-6 text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-4xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "Is the re-generated resume actually ATS-friendly?",
      answer: "Yes. Our engine uses standard LaTeX-style structure that is perfectly parsable by major ATS systems (Workday, Greenhouse, Lever). We don't use multi-column layers or complex images that break parsers; we focus on semantic keyword density and logical information architecture."
    },
    {
      question: "How is my resume and bio data protected?",
      answer: "We use enterprise-grade encryption for all data at rest and in transit. Your resumes and JD uploads are processed in an isolated environment. We do not sell your data to recruiters or third-party training datasets. Your profile is yours alone."
    },
    {
      question: "Does the roadmap update if I change my target job?",
      answer: "Absolutely. Every time you upload a new JD and 'Synthesize', the engine creates a fresh 3-dimensional mapping. You can generate unlimited strategy reports to compare different career paths or target roles."
    },
    {
      question: "What AI models power the strategic synthesis?",
      answer: "We utilize a proprietary ensemble of models, including fine-tuned versions of GPT-4 and Claude 3 Opus, optimized specifically for career semantics and technical interview pattern matching. This ensures the output is indistinguishable from human expert coaching."
    },
    {
      question: "Can I export my preparation plan as a PDF?",
      answer: "Yes. Every report, including the technical/behavioral patterns and the day-wise roadmap, is exportable as a high-fidelity PDF, allowing you to study offline or keep a permanent record of your preparation cycle."
    }
  ];

  return (
    <section className="w-full flex flex-col items-center max-w-7xl py-16 md:py-32 px-6 mx-auto relative overflow-hidden">
      
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-neon/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 w-full"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 group cursor-default">
           <HelpCircle size={12} className="text-zinc-500 group-hover:text-brand-neon transition-colors" />
           <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500">The Intelligence FAQ</span>
        </div>
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-white mb-4 md:mb-6">Clarifying the Protocol.</h2>
        <p className="text-zinc-500 text-base md:text-xl font-light max-w-2xl mx-auto italic">Everything you need to know about the CareerLens AI framework.</p>
      </motion.div>

      {/* Accordion Container */}
      <div className="w-full max-w-5xl">
        {faqs.map((faq, index) => (
          <FAQItem key={index} {...faq} />
        ))}
      </div>

    </section>
  );
};

export default FAQSection;
