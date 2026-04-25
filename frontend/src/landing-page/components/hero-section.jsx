import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { LiquidCtaButton } from "../../components/buttons/liquid-cta-button";
import SoftAurora from "../../components/ui/soft-aurora";
import { useAuth } from "../../features/auth/hooks/use-auth";

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
  const { isAuthenticated } = useAuth();

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden pt-14 max-md:pt-20">
      {/* Background Aurora Effect */}
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
            className="mb-8 max-md:mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-bold max-sm:text-[9px]">
                Simple AI Interview Prep
              </span>
            </div>
          </motion.div>

          {/* Headline - Simple English */}
          <motion.h1 
            className="font-display text-8xl font-bold tracking-tighter mb-8 leading-[1.05] max-lg:text-7xl max-md:text-6xl max-sm:text-4xl max-md:mb-6"
            variants={itemVariants}
          >
            <span className="text-zinc-100 block">Get the Job.</span>
            <span className="text-zinc-100 block">
              Skip the Stress.
            </span>
          </motion.h1>

          {/* Subheadline - Simple English */}
          <motion.p 
            className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed text-pretty font-light max-md:text-lg max-sm:text-base max-md:mb-8"
            variants={itemVariants}
          >
            Upload your resume and the job details. Get a personalized plan to pass your interview and land the offer.
          </motion.p>

          {/* CTAs - Conditional based on Auth */}
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

          {/* Social Proof */}
          <motion.div 
            className="flex flex-row items-center justify-center gap-4 max-sm:flex-col max-sm:gap-6"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4 max-sm:flex-col">
              <div className="flex -space-x-3">
                {[
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-zinc-950 hover:-translate-y-1 transition duration-300 object-cover"
                    style={{ zIndex: i + 1 }}
                  />
                ))}
              </div>
              <div className="h-8 w-px bg-zinc-800 max-sm:hidden" />
              <div className="flex flex-col items-start text-left max-sm:items-center max-sm:text-center">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                  <span className="text-zinc-400 font-bold ml-1 text-sm">4.9</span>
                </div>
                <p className="text-sm text-zinc-500 font-medium max-sm:text-xs">
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
