import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_MESSAGES = [
  "Synchronizing Intelligence Matrix",
  "Analyzing Professional Footprint",
  "Benchmarking Market Standards",
  "Synthesizing Strategic Prep",
  "Calibrating Neural Benchmarks",
  "Optimizing Output Matrix"
];

const FullScreenLoader = ({ message }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#020B18] selection:bg-blue-500/30"
    >
      {/* Visual Core */}
      <div className="relative size-32 flex items-center justify-center mb-12">
        {/* Layered Pulsing Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0.1, 0.3, 0],
              scale: [1, 1.8, 2.2],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "easeOut" 
            }}
            className="absolute inset-0 border border-blue-500/30 rounded-full"
          />
        ))}

        {/* The Central Lens */}
        <div className="relative size-16 bg-[#020B18] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden group">
            <motion.div 
              animate={{ 
                rotate: 360,
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-indigo-600/10"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="size-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
            />
        </div>

        {/* Orbiting Particles */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-1 bg-blue-400 rounded-full blur-[1px]" />
        </motion.div>
      </div>

      {/* Dynamic Status Text */}
      <div className="h-6 flex flex-col items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="text-[11px] font-bold text-blue-400/80 tracking-[0.2em] uppercase"
          >
            {message || LOADING_MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-[10px] text-gray-600 font-medium tracking-widest uppercase"
      >
        Initializing Analysis Module
      </motion.p>
    </motion.div>
  );
};

export default FullScreenLoader;
