"use client"

import React from "react"
import { motion } from "framer-motion"
import { Link } from "react-router"
import { LiquidCtaButton } from "../../components/buttons/liquid-cta-button"
import { useAuth } from "../../features/auth/hooks/use-auth"
import { Rocket } from "lucide-react"

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function CallToAction() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="w-full pt-20 md:pt-60 lg:pt-60 pb-10 md:pb-20 px-5 relative flex flex-col justify-center items-center overflow-visible">
      {/* Background SVG - Industrial Aura */}
      <div className="absolute inset-0 top-[-90px] pointer-events-none">
        <svg
          className="w-full h-full opacity-60"
          viewBox="0 0 1388 825"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <mask
            id="mask0_cta"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="269"
            y="27"
            width="850"
            height="493"
          >
            <rect x="269.215" y="27.4062" width="849.57" height="492.311" fill="url(#paint0_linear_cta)" />
          </mask>
          <g mask="url(#mask0_cta)">
            <g filter="url(#filter0_f_cta)">
              <ellipse
                cx="694"
                cy="-93.0414"
                rx="670.109"
                ry="354.908"
                fill="url(#paint1_radial_cta)"
                fillOpacity="0.8"
              />
            </g>
            <ellipse cx="694" cy="-91.5385" rx="670.109" ry="354.908" fill="url(#paint2_linear_cta)" />
            <ellipse cx="694" cy="-93.0414" rx="670.109" ry="354.908" fill="url(#paint3_linear_cta)" />
          </g>
          <defs>
            <filter
              id="filter0_f_cta"
              x="-234.109"
              y="-705.949"
              width="1856.22"
              height="1225.82"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="129" result="effect1_foregroundBlur_cta" />
            </filter>
            <linearGradient
              id="paint0_linear_cta"
              x1="1118.79"
              y1="273.562"
              x2="269.215"
              y2="273.562"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="black" stopOpacity="0" />
              <stop offset="0.2" stopColor="black" stopOpacity="0.8" />
              <stop offset="0.8" stopColor="black" stopOpacity="0.8" />
              <stop offset="1" stopColor="black" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_cta"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(683.482 245.884) rotate(-3.78676) scale(469.009 248.4)"
            >
              <stop offset="0.1294" stopColor="#d4d4d8" />
              <stop offset="0.2347" stopColor="#a1a1aa" />
              <stop offset="0.3" stopColor="#a1a1aa" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="paint2_linear_cta"
              x1="694"
              y1="-446.446"
              x2="694"
              y2="263.369"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_cta"
              x1="694"
              y1="-447.949"
              x2="694"
              y2="261.866"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="black" />
              <stop offset="1" stopColor="black" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col justify-start items-center max-w-4xl mx-auto text-center">
        <motion.div 
          className="flex flex-col justify-start items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* Synced Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-4">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">Ready to Start?</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-[1.1] max-w-4xl mx-auto">
            Master Your Next <br className="hidden md:block" /> 
            <span className="text-zinc-500">Interview Today.</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light mb-10">
            Join thousands of professionals who have improved their interview success and landed their dream jobs with Career Lens AI.
          </motion.p>

          <motion.div 
            className="flex flex-row items-center justify-center gap-6 mb-16 max-md:mb-12"
            variants={itemVariants}
          >
            {isAuthenticated ? (
              <Link to="/generate-report">
                <LiquidCtaButton>Generate Analysis</LiquidCtaButton>
              </Link>
            ) : (
              <Link to="/register">
                <LiquidCtaButton>Get Started</LiquidCtaButton>
              </Link>
            )}
          </motion.div>
        </motion.div>

        <motion.p 
          className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.4em] mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Secure. Private. Precise.
        </motion.p>
      </div>
    </section>
  )
}
