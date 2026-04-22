"use client"

import React from "react"
import { motion } from "framer-motion"
import { TestimonialsColumn } from "../../components/ui/testimonials-column"

const testimonials = [
  {
    text: "The AI analysis identified critical gaps in my resume that I hadn't noticed in 5 years. I landed an offer at Google within 3 weeks.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Senior Engineer @ Google",
  },
  {
    text: "Behavioral interviews used to be my nightmare. The tactical prep plan gave me the exact scripts I needed to walk in with total confidence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Johnson",
    role: "Product Manager @ Meta",
  },
  {
    text: "The match score is scarily accurate. It correctly predicted which companies would move me to the next round with 90% precision.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "Lead Developer @ Stripe",
  },
  {
    text: "Finally, a tool that understands the nuances of tech stacks. It doesn't just look for keywords; it understands semantic experience.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "David Park",
    role: "SRE @ Amazon",
  },
  {
    text: "The LaTeX-inspired resume generator is elite. It's clean, professional, and passes every ATS filter without fail.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Aisha Patel",
    role: "Full Stack Dev @ Vercel",
  },
  {
    text: "I went from zero callbacks to three interviews in one week after using the AI-optimized resume. The results speak for themselves.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "James Wilson",
    role: "Frontend Lead @ Airbnb",
  },
  {
    text: "The customized technical challenges were spot on. They mirrored the actual whiteboarding questions I got during my final loop.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Lisa Thompson",
    role: "Senior Analyst @ Netflix",
  },
  {
    text: "Transforming 'Interview Anxiety' into 'Strategic Superiority' isn't just marketing; it's exactly what this platform did for me.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Michael Brown",
    role: "Software Architect @ Uber",
  },
  {
    text: "Every engineering leader should recommend this to their teams. It's the most high-fidelity prep tool I've ever used.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Rachel Kim",
    role: "Engineering Manager @ Coinbase",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const logos = ["Google", "Meta", "Amazon", "Netflix", "Stripe", "Vercel", "Airbnb", "Uber"]

export default function Testimonials() {
  return (
    <section id="testimonials" className="px-6 py-24 bg-black border-y border-zinc-900/50 relative overflow-hidden bg-zinc-900/20">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">Wall of Victory</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
            Trusted by the Next Generation of Leaders.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Join thousands of professionals who have accelerated their careers with industrial-grade AI insights and strategic preparation.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>

        <div className="mt-24 pt-16 border-t border-zinc-900/50">
          <p className="text-center text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-12">Industrial Standard Partners</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
              className="flex gap-16 md:gap-24 items-center"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              {[...logos, ...logos].map((logo, index) => (
                <span
                  key={`${logo}-${index}`}
                  className="text-xl md:text-2xl font-display font-bold text-zinc-700 whitespace-nowrap flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-500"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
