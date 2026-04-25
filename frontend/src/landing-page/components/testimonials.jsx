"use client"

import React from "react"
import { motion } from "framer-motion"
import { TestimonialsColumn } from "../../components/ui/testimonials-column"

const testimonials = [
  {
    text: "The AI analysis identified critical gaps in my resume that I hadn't noticed in 5 years. I landed an offer at Google within 3 weeks.",
    /* lighthouse-fix: Performance - optimized Unsplash URL with modern formats */
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Senior Engineer @ Google",
  },
  {
    text: "Behavioral interviews used to be my nightmare. The tactical prep plan gave me the exact scripts I needed to walk in with total confidence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Marcus Johnson",
    role: "Product Manager @ Meta",
  },
  {
    text: "The match score is scarily accurate. It correctly predicted which companies would move me to the next round with 90% precision.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Emily Rodriguez",
    role: "Lead Developer @ Stripe",
  },
  {
    text: "Finally, a tool that understands the nuances of tech stacks. It doesn't just look for keywords; it understands semantic experience.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "David Park",
    role: "SRE @ Amazon",
  },
  {
    text: "The LaTeX-inspired resume generator is elite. It's clean, professional, and passes every ATS filter without fail.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Aisha Patel",
    role: "Full Stack Dev @ Vercel",
  },
  {
    text: "I went from zero callbacks to three interviews in one week after using the AI-optimized resume. The results speak for themselves.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "James Wilson",
    role: "Frontend Lead @ Airbnb",
  },
  {
    text: "The customized technical challenges were spot on. They mirrored the actual whiteboarding questions I got during my final loop.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Lisa Thompson",
    role: "Senior Analyst @ Netflix",
  },
  {
    text: "Transforming 'Interview Anxiety' into 'Strategic Superiority' isn't just marketing; it's exactly what this platform did for me.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Michael Brown",
    role: "Software Architect @ Uber",
  },
  {
    text: "Every engineering leader should recommend this to their teams. It's the most high-fidelity prep tool I've ever used.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format,avif,webp&q=80&w=100&h=100&fit=crop&crop=face",
    name: "Rachel Kim",
    role: "Engineering Manager @ Coinbase",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

const logoAssets = [
  {
    name: "Google",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-6" aria-hidden="true">
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
      </svg>
    ),
  },
  {
    name: "Meta",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-6" aria-hidden="true">
        <path d="M11.66 16.035c-1.894 0-3.328-1.442-3.328-3.328 0-1.887 1.434-3.329 3.328-3.329 1.895 0 3.329 1.442 3.329 3.329 0 1.886-1.434 3.328-3.329 3.328zm8.618-8.252c-1.121-1.121-2.612-1.738-4.198-1.738-1.587 0-3.078.617-4.198 1.738L8.647 11.02c-1.121 1.121-2.612 1.738-4.198 1.738-1.587 0-3.078-.617-4.198-1.738C-.87 9.899-.87 8.136.251 7.015c1.121-1.121 2.612-1.738 4.198-1.738 1.587 0 3.078.617 4.198 1.738l3.235 3.235c1.121 1.121 2.612 1.738 4.198 1.738 1.587 0 3.078-.617 4.198-1.738 2.242-2.242 2.242-5.77 0-8.012z" />
      </svg>
    ),
  },
  {
    name: "Amazon",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-6" aria-hidden="true">
        <path d="M15.072 11.4c-.456-.048-1.092-.072-1.728-.072-1.512 0-3.048.264-3.048 2.304 0 1.296.84 1.968 1.896 1.968 1.488 0 2.28-1.08 2.544-1.872.168-.432.264-.936.264-1.416V11.4h.072zM21.576 19.344c-2.856 2.136-7.344 3.072-10.896 3.072-5.04 0-9.528-1.896-10.464-6.024-.072-.312.168-.456.384-.336 1.128.6 3.024 1.344 5.376 1.344 4.344 0 8.88-2.664 10.392-6.528.168-.408-.144-.768-.528-.552-1.68.912-3.816 1.464-5.832 1.464-2.208 0-4.608-.432-6.384-1.656-.24-.168-.072-.528.216-.48 2.52.48 6.576 1.128 10.224-1.008 2.856-1.68 4.296-4.56 4.296-7.44 0-1.128-.168-2.208-.504-3.192-.096-.288.168-.528.432-.336 1.248.888 2.28 2.328 2.28 4.872 0 2.4-1.08 4.584-3.432 6.168-.264.168-.168.504.12.384 1.296-.552 2.904-1.512 4.128-2.832.24-.264.504-.048.336.216-1.056 1.632-2.808 3.528-6.144 5.16-.144.072-.168.216-.024.288 3.504.312 7.032-.504 9.168-3.528.168-.24.528-.024.408.24-.72 1.464-1.992 2.808-3.768 4.08h.024z" />
      </svg>
    ),
  },
  {
    name: "Netflix",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-6" aria-hidden="true">
        <path d="M12 24c-2.73 0-5.35-1.01-7.42-2.82C2.5 19.38 1.16 16.79.8 14.1L0 12l.8-2.1c.36-2.69 1.7-5.28 3.78-7.08C6.65 1.01 9.27 0 12 0s5.35 1.01 7.42 2.82c2.08 1.8 3.42 4.39 3.78 7.08l.8 2.1-.8 2.1c-.36 2.69-1.7 5.28-3.78 7.08-2.07 1.81-4.69 2.82-7.42 2.82zm0-22c-2.19 0-4.3 0.81-5.96 2.26-1.67 1.45-2.75 3.53-3.04 5.7L2.24 12l.76 2.04c.29 2.17 1.37 4.25 3.04 5.7C7.7 21.19 9.81 22 12 22s4.3-0.81 5.96-2.26c1.67-1.45 2.75-3.53 3.04-5.7L21.76 12l-.76-2.04c-.29-2.17-1.37-4.25-3.04-5.7-1.66-1.45-3.77-2.26-5.96-2.26z" />
      </svg>
    ),
  },
  {
    name: "Stripe",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-24 h-6" aria-hidden="true">
        <path d="M13.962 8.196c0-2.43-1.7-3.715-4.133-3.715-2.152 0-3.608 1.09-4.321 2.219l-.618-1.693H2.035v11.325c.343 2.152 2.131 3.25 4.321 3.25 2.5 0 4.148-1.554 4.148-3.856 0-3.064-4.522-1.282-4.522-3.856 0-.822.659-1.255 1.636-1.255 1.053 0 1.636.527 1.702 1.516l4.642.065zM13.962 13.526c0 2.43 1.7 3.715 4.133 3.715 2.152 0 3.608-1.09 4.321-2.219l.618 1.693h2.857V5.39c-.343-2.152-2.131-3.25-4.321-3.25-2.5 0-4.148 1.554-4.148 3.856 0 3.064 4.522-1.282 4.522-3.856 0 .822-.659 1.255-1.636 1.255-1.053 0-1.636-.527-1.702-1.516l-4.642-.065z" />
      </svg>
    ),
  },
]

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
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Wall of Victory</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            Trusted by the Next <br className="hidden md:block" /> 
            <span className="text-zinc-500">Generation of Leaders.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
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
              {[...logoAssets, ...logoAssets].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="text-zinc-700 opacity-50 hover:opacity-100 transition-opacity duration-500 shrink-0"
                >
                  {logo.svg}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
