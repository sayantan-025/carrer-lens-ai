import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const FullScreenLoader = ({ message }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-brand-dark fixed inset-0 z-[100] backdrop-blur-sm">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="mb-8"
      >
        <Loader2 size={48} className="text-brand-neon drop-shadow-[0_0_15px_rgba(140,255,46,0.5)]" />
      </motion.div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-sm font-medium tracking-widest uppercase animate-pulse"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default FullScreenLoader;
