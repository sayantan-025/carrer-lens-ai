"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "../../lib/utils"

const faqData = [
  {
    question: "How accurate is the AI match score?",
    answer:
      "Our AI uses deep semantic analysis and industry-standard competency models, achieving over 90% precision in predicting interview suitability by identifying hidden success criteria.",
  },
  {
    question: "Does it support all job types and industries?",
    answer:
      "Yes. Career Lens is designed for technical, creative, and leadership roles across all sectors, deconstructing requirements into atomic skills and behavioral personas.",
  },
  {
    question: "How do the tailored behavioral scripts work?",
    answer:
      "The engine analyzes the specific job description's 'ideal persona' and generates STAR-method responses mapped directly to your unique professional trajectory.",
  },
  {
    question: "Is my personal data and resume secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption for all data transmissions. Your documents are private, secure, and never used to train public models.",
  },
  {
    question: "Can I generate reports for multiple different roles?",
    answer:
      "Yes. You can run unlimited analysis reports, allowing you to pivot your strategy and optimize your resume for every high-stakes application in your pipeline.",
  },
  {
    question: "What makes this different from using ChatGPT?",
    answer:
      "Generic AI treats text as data. We treat it as strategy. Our models are fine-tuned specifically for industrial hiring protocols, ATS optimization, and competitive positioning.",
  },
]

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div
      className={cn(
        "w-full transition-all duration-500 ease-out border rounded-2xl overflow-hidden cursor-pointer group",
        isOpen 
          ? "bg-zinc-900/50 border-zinc-700 shadow-[0_0_30px_rgba(0,0,0,0.3)]" 
          : "bg-zinc-900/20 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/30"
      )}
      onClick={onToggle}
    >
      <div className="w-full px-6 py-5 flex justify-between items-center gap-4 text-left transition-all duration-300">
        <div className={cn(
          "flex-1 text-base font-medium transition-colors duration-300",
          isOpen ? "text-white" : "text-zinc-300 group-hover:text-zinc-100"
        )}>
          {question}
        </div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={cn(
              "w-5 h-5 text-zinc-500 transition-all duration-500 ease-out",
              isOpen ? "rotate-180 text-zinc-100 scale-110" : "rotate-0 group-hover:text-zinc-400"
            )}
          />
        </div>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-5 pt-0 border-t border-zinc-800/50">
              <div className="pt-4 text-zinc-400 text-sm leading-relaxed font-light">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="faq" className="relative py-24 bg-black overflow-hidden border-y border-zinc-900/50">
      {/* Dynamic Background Element */}
      {/* Premium Atmospheric Glow */}
      <div className="w-[400px] h-[600px] absolute top-[-100px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-white/[0.03] blur-[120px] pointer-events-none z-0" />
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-white/[0.02] blur-[100px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Intelligence Base</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            Operational Queries
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Everything you need to know about the Career Lens protocol and how it transforms your trajectory.
          </p>
        </motion.div>

        {/* FAQ Grid/List */}
        <div className="w-full max-w-[720px] mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index} 
              {...faq} 
              isOpen={activeIndex === index} 
              onToggle={() => setActiveIndex(activeIndex === index ? null : index)} 
            />
          ))}
        </div>

        {/* Final Bridge */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-zinc-500 text-sm font-light">
            Still have questions? <a href="mailto:support@careerlens.ai" className="text-zinc-300 hover:text-white transition-colors font-medium border-b border-zinc-300/20 pb-0.5">Reach out to our strategic team</a>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
