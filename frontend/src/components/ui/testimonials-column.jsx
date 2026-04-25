"use client"

import React from "react"
import { motion } from "framer-motion"

export const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-xl max-w-xs w-full shadow-2xl transition-colors hover:border-white/10 group mb-6"
                /* lighthouse-fix: Performance - unique key for duplicated items */
                key={`${index}-${i}`}
              >
                <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-200 transition-colors font-light italic">"{text}"</p>
                <div className="flex items-center gap-3 mt-8">
                  <img
                    width={40}
                    height={40}
                    src={image || "/placeholder.svg"}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ring-1 ring-white/10"
                    /* lighthouse-fix: Performance - add lazy loading for testimonials */
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-100 tracking-tight leading-5 text-sm">{name}</span>
                    {/* lighthouse-fix: Accessibility - improved contrast for role text */}
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 leading-5">{role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}
