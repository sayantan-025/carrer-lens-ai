import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { LiquidCtaButton } from "../../components/buttons/liquid-cta-button";
import SoftAurora from "../../components/ui/soft-aurora";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

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

export default function HeroSection() {
  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Background Aurora Effect - True Inset 0 */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1}
          color1="#f7f7f7"
          color2="#ffffff"
          noiseFrequency={2.5}
          noiseAmplitude={1}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1}
          enableMouseInteraction
          mouseInfluence={0.25}
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Content Wrapper */}
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Feature Badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold">
                AI-Powered Interview Prep
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.05]"
            variants={itemVariants}
          >
            <span className="text-zinc-100 block">Land the Offer.</span>
            <span className="text-zinc-100 block">
              Skip the Stress.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty font-light"
            variants={itemVariants}
          >
            Career Lens AI uses your resume or self-description and the job details to create a 
            personalized plan for your interview success.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            variants={itemVariants}
          >
            <Link to="/register">
              <LiquidCtaButton>Get Started Now</LiquidCtaButton>
            </Link>
          </motion.div>

          {/* Social Proof Avatar Stack - BOTTOM POSITION */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition duration-300 object-cover z-[1]"
                />
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition duration-300 object-cover z-[2]"
                />
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition duration-300 object-cover z-[3]"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition duration-300 object-cover z-[4]"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                  alt="User avatar"
                  className="w-10 h-10 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition duration-300 object-cover z-[5]"
                />
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#FACC15"
                      stroke="#FACC15"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                  <span className="text-zinc-400 font-bold ml-1 text-sm">4.9</span>
                </div>
                <p className="text-sm text-zinc-500 font-medium">
                  Trusted by <span className="text-zinc-300 font-bold">2,000+ Professionals</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
